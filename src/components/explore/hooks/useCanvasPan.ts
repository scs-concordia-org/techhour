"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export type Point = { x: number; y: number };
export type Size = { width: number; height: number };
export type EdgeHits = { left: boolean; right: boolean; down: boolean };

export type Insets = { left: number; top: number; right: number; bottom: number };

export type CameraListener = (camera: Point) => void;

// Wheel travel per unit of wheel delta; below 1 slows the wheel down.
const WHEEL_SPEED = 0.5;
// Time constant (ms) of the wheel easing; larger glides longer.
const WHEEL_EASE_MS = 110;
const LINE_HEIGHT_PX = 16;
// Distance (px) from a limit at which its "no more projects" notice shows.
const EDGE_TOLERANCE = 1;

// Distance (px) one arrow key press pans; key repeat keeps it moving.
const KEY_STEP = 160;
const ARROW_KEYS: Record<string, Point> = {
  ArrowLeft: { x: -1, y: 0 },
  ArrowRight: { x: 1, y: 0 },
  ArrowUp: { x: 0, y: -1 },
  ArrowDown: { x: 0, y: 1 },
};
// A focused card inside this fraction of the screen from each edge is panned
// to the middle; it matches where the edge fade starts to clear.
const FOCUS_MARGIN = 0.2;

type Bounds = { minX: number; maxX: number; maxY: number };

/**
 * Camera for the canvas. Drag or wheel moves it, and it stops at the edges
 * of the content. The camera is the point of the layout shown at the screen
 * centre.
 *
 * The camera lives in refs, not state, so moving it does not re-render React.
 * Consumers `subscribe` to get the camera once per frame and move their own
 * DOM; only the rarely-changing `edges` and `dragging` are state.
 */
export function useCanvasPan(
  world: Size,
  insets: Insets,
  homeX = world.width / 2,
) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState<Size>({ width: 0, height: 0 });
  const [dragging, setDragging] = useState(false);
  const [edges, setEdges] = useState<EdgeHits>({
    left: false,
    right: false,
    down: false,
  });
  const drag = useRef<{ id: number; last: Point } | null>(null);
  // `pos` is the live position, `target` is where the wheel is easing it to.
  const pos = useRef<Point>({ x: homeX, y: 0 });
  const target = useRef<Point>({ x: homeX, y: 0 });
  const frame = useRef<number | null>(null);
  const notifyFrame = useRef<number | null>(null);
  const listeners = useRef(new Set<CameraListener>());

  // Sideways, the camera may overshoot the content by a quarter screen.
  const overshoot = size.width / 4;
  const minX = Math.min(overshoot, world.width / 2);
  const maxX = Math.max(world.width - overshoot, world.width / 2);
  const maxY = Math.max(
    0,
    world.height + insets.top + insets.bottom - size.height,
  );
  const view = useRef({
    bounds: { minX, maxX, maxY } as Bounds,
    centreY: size.height / 2 - insets.top,
  });

  const readCamera = useCallback((): Point => {
    const { bounds, centreY } = view.current;
    const p = clampPoint(pos.current, bounds);
    return { x: p.x, y: centreY + p.y };
  }, []);

  const notify = useCallback(() => {
    const { bounds } = view.current;
    const p = clampPoint(pos.current, bounds);
    const camera = readCamera();
    listeners.current.forEach((listener) => listener(camera));
    const next: EdgeHits = {
      left: p.x <= bounds.minX + EDGE_TOLERANCE,
      right: p.x >= bounds.maxX - EDGE_TOLERANCE,
      down: bounds.maxY > 0 && p.y >= bounds.maxY - EDGE_TOLERANCE,
    };
    setEdges((prev) =>
      prev.left === next.left &&
      prev.right === next.right &&
      prev.down === next.down
        ? prev
        : next,
    );
  }, [readCamera]);

  // Pointer events can arrive faster than frames; draw at most once a frame.
  const scheduleNotify = useCallback(() => {
    if (notifyFrame.current !== null) return;
    notifyFrame.current = requestAnimationFrame(() => {
      notifyFrame.current = null;
      notify();
    });
  }, [notify]);

  const subscribe = useCallback((listener: CameraListener) => {
    listeners.current.add(listener);
    return () => {
      listeners.current.delete(listener);
    };
  }, []);

  useEffect(() => {
    view.current = {
      bounds: { minX, maxX, maxY },
      centreY: size.height / 2 - insets.top,
    };
    notify();
  }, [minX, maxX, maxY, size.height, insets.top, notify]);

  // A new home (the layout was rebuilt for another screen size) recentres.
  useEffect(() => {
    pos.current = { x: homeX, y: pos.current.y };
    target.current = { ...pos.current };
    notify();
  }, [homeX, notify]);

  const stopEase = () => {
    if (frame.current !== null) cancelAnimationFrame(frame.current);
    frame.current = null;
  };

  // Drag moves the camera 1:1 and cancels any wheel glide in progress.
  const panBy = (dx: number, dy: number) => {
    stopEase();
    const next = clampPoint(
      { x: pos.current.x + dx, y: pos.current.y + dy },
      view.current.bounds,
    );
    pos.current = next;
    target.current = next;
    scheduleNotify();
  };

  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;
    const measure = () =>
      setSize((prev) =>
        prev.width === el.clientWidth && prev.height === el.clientHeight
          ? prev
          : { width: el.clientWidth, height: el.clientHeight },
      );
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // React's onWheel is passive; a native listener is needed for preventDefault.
  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;
    let last = 0;
    const step = (now: number) => {
      const k = 1 - Math.exp(-Math.min(now - last, 50) / WHEEL_EASE_MS);
      last = now;
      const dx = target.current.x - pos.current.x;
      const dy = target.current.y - pos.current.y;
      if (Math.abs(dx) < 0.1 && Math.abs(dy) < 0.1) {
        frame.current = null;
        pos.current = { ...target.current };
        notify();
        return;
      }
      pos.current = { x: pos.current.x + dx * k, y: pos.current.y + dy * k };
      notify();
      frame.current = requestAnimationFrame(step);
    };
    // Eases the camera by (dx, dy) from where the last glide was heading.
    const glideBy = (dx: number, dy: number) => {
      target.current = clampPoint(
        { x: target.current.x + dx, y: target.current.y + dy },
        view.current.bounds,
      );
      if (frame.current === null) {
        last = performance.now();
        frame.current = requestAnimationFrame(step);
      }
    };
    const onWheel = (e: WheelEvent) => {
      const unit =
        e.deltaMode === 1 ? LINE_HEIGHT_PX : e.deltaMode === 2 ? el.clientHeight : 1;
      let dx = e.deltaX * unit;
      let dy = e.deltaY * unit;
      // Shift + wheel pans sideways; some browsers already swap the axes.
      if (e.shiftKey && dx === 0) {
        dx = dy;
        dy = 0;
      }
      // A long card's text panel scrolls itself (overscroll-contain stops it
      // chaining); the canvas pans only when the pointer is outside it.
      if (isInScrollArea(e.target, el)) return;
      e.preventDefault();
      glideBy(dx * WHEEL_SPEED, dy * WHEEL_SPEED);
    };
    // Tab or Shift+Tab onto a card pans it into the clear middle of the
    // screen. The viewport is overflow: clip, so the browser's own
    // scroll-into-view cannot shift it and drag the overlays along.
    const onFocusIn = (e: FocusEvent) => {
      const focused = e.target;
      if (!(focused instanceof HTMLElement) || !focused.matches(":focus-visible")) {
        return;
      }
      const rect = (focused.closest("article") ?? focused).getBoundingClientRect();
      const screen = el.getBoundingClientRect();
      const padX = screen.width * FOCUS_MARGIN;
      const padY = screen.height * FOCUS_MARGIN;
      const inside =
        rect.left >= screen.left + padX &&
        rect.right <= screen.right - padX &&
        rect.top >= screen.top + padY &&
        rect.bottom <= screen.bottom - padY;
      if (inside) return;
      // Aim from the live position, not the last glide's target.
      target.current = { ...pos.current };
      glideBy(
        rect.left + rect.width / 2 - (screen.left + screen.width / 2),
        rect.top + rect.height / 2 - (screen.top + screen.height / 2),
      );
    };
    // Arrow keys pan while focus is on the canvas or on nothing in particular.
    const onKeyDown = (e: KeyboardEvent) => {
      const dir = ARROW_KEYS[e.key];
      if (!dir || e.defaultPrevented || e.altKey || e.ctrlKey || e.metaKey) return;
      const t = e.target;
      const onPage = t === document.body || t === document.documentElement;
      if (!onPage && !(t instanceof Node && el.contains(t))) return;
      if (t instanceof HTMLElement && t.closest("input, textarea, select")) return;
      // Arrows in a focused long text panel scroll it, never the canvas.
      if (isInScrollArea(t, el)) return;
      e.preventDefault();
      glideBy(dir.x * KEY_STEP, dir.y * KEY_STEP);
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    el.addEventListener("focusin", onFocusIn);
    window.addEventListener("keydown", onKeyDown);
    return () => {
      el.removeEventListener("wheel", onWheel);
      el.removeEventListener("focusin", onFocusIn);
      window.removeEventListener("keydown", onKeyDown);
      stopEase();
      if (notifyFrame.current !== null) cancelAnimationFrame(notifyFrame.current);
      notifyFrame.current = null;
    };
  }, [notify]);

  const endDrag = (e: React.PointerEvent) => {
    if (drag.current?.id !== e.pointerId) return;
    drag.current = null;
    setDragging(false);
  };

  const handlers = {
    onPointerDown: (e: React.PointerEvent) => {
      if (e.button !== 0) return;
      e.currentTarget.setPointerCapture(e.pointerId);
      drag.current = { id: e.pointerId, last: { x: e.clientX, y: e.clientY } };
      setDragging(true);
    },
    onPointerMove: (e: React.PointerEvent) => {
      const d = drag.current;
      if (!d || d.id !== e.pointerId) return;
      panBy(d.last.x - e.clientX, d.last.y - e.clientY);
      d.last = { x: e.clientX, y: e.clientY };
    },
    onPointerUp: endDrag,
    onPointerCancel: endDrag,
    onDragStart: (e: React.DragEvent) => e.preventDefault(),
  };

  return { viewportRef, size, dragging, handlers, edges, subscribe, readCamera };
}

/**
 * True when `from` sits inside an element (below `root`) whose content
 * overflows and scrolls, such as a long card's text panel. The canvas never
 * pans from there, even once the text has reached its end.
 */
function isInScrollArea(from: EventTarget | null, root: HTMLElement): boolean {
  if (!(from instanceof Element)) return false;
  for (let el: Element | null = from; el && el !== root; el = el.parentElement) {
    const style = getComputedStyle(el);
    const scrollsY =
      (style.overflowY === "auto" || style.overflowY === "scroll") &&
      el.scrollHeight > el.clientHeight;
    const scrollsX =
      (style.overflowX === "auto" || style.overflowX === "scroll") &&
      el.scrollWidth > el.clientWidth;
    if (scrollsY || scrollsX) return true;
  }
  return false;
}

function clampPoint(p: Point, b: Bounds): Point {
  return {
    x: Math.min(b.maxX, Math.max(b.minX, p.x)),
    y: Math.min(b.maxY, Math.max(0, p.y)),
  };
}
