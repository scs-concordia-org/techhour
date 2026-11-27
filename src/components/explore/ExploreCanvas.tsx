"use client";

import { memo, useLayoutEffect, useMemo, useRef } from "react";
import styles from "./ExploreCanvas.module.css";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  type LucideIcon,
} from "lucide-react";
import ThemeToggle from "@/components/layout/ThemeToggle";
import ProjectCard from "@/components/projects/ProjectCard";
import { Project } from "@/types/project";
import { useCanvasPan, type Point } from "./hooks/useCanvasPan";
import { useViewportWidth } from "./hooks/useViewportWidth";
import { useVisibleItems } from "./hooks/useVisibleItems";
import {
  buildLayout,
  CARD_HEIGHT,
  CARD_WIDTH,
  VIEW_INSETS,
  type PlacedProject,
} from "./layout";

/** Below this screen width the canvas shrinks to fit and centres one column. */
const FULL_SIZE_WIDTH = 460;
const MIN_SCALE = 0.6;
const NARROW_WIDTH = 600;
/** Cards mount this far (px) before entering the screen, while still faded out. */
const MOUNT_MARGIN = 400;

const VIGNETTE =
  "radial-gradient(ellipse at center, transparent 45%, rgb(54 22 17 / 38%) 100%)";
/** Hover effects stay off until panning has been idle this long (ms). */
const PAN_IDLE_MS = 120;

function EdgeNotice({ className }: { className: string }) {
  return (
    <p
      className={`pointer-events-none absolute z-10 text-sm text-foreground/50 ${className}`}
    >
      No more projects this way
    </p>
  );
}

/** Faint chevron plus a short label hinting that the canvas pans this way. */
function DirectionHint({
  icon: Icon,
  label,
  vertical,
  labelFirst,
  className,
}: {
  icon: LucideIcon;
  label: string;
  /** Rotate the label so it stays narrow along the left and right edges. */
  vertical?: boolean;
  labelFirst?: boolean;
  className: string;
}) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute z-10 flex items-center gap-2 text-foreground/60 ${
        labelFirst ? "flex-col-reverse" : "flex-col"
      } ${className}`}
    >
      <Icon strokeWidth={1.5} className="size-9 animate-pulse" />
      <span
        className={`text-[11px] uppercase tracking-[0.2em] text-foreground/40 ${
          vertical ? "[writing-mode:vertical-rl]" : ""
        }`}
      >
        {label}
      </span>
    </div>
  );
}

function getCardTilt(id: string) {
  let value = 0;

  for (const character of id) {
    value += character.charCodeAt(0);
  }

  return ((value % 5) - 2) * 0.6;
}

const CanvasCard = memo(function CanvasCard({
  item,
  scale,
}: {
  item: PlacedProject;
  scale: number;
}) {
  return (
    <div
      className="absolute origin-top-left"
      style={{
        left: item.x,
        top: item.y,
        width: CARD_WIDTH,
        transform: scale === 1 ? undefined : `scale(${scale})`,
      }}
    >
      <div
        className={styles.pinnedCard}
        style={{
          transform: `rotate(${getCardTilt(item.project.id)}deg)`,
        }}
      >
        <ProjectCard project={item.project} />
        <span aria-hidden="true" className={styles.pushpin} />
      </div>
    </div>
  );
});

/**
 * This is a draggable canvas of project cards. Only cards near the screen
 * are mounted (useVisibleItems). They sit in one "world" layer, and panning
 * only moves that layer (useCanvasPan), so React never re-renders on a pan.
 */
export default function ExploreCanvas({ projects }: { projects: Project[] }) {
  const screenWidth = useViewportWidth();
  const scale = Math.min(1, Math.max(MIN_SCALE, screenWidth / FULL_SIZE_WIDTH));
  const narrow = screenWidth < NARROW_WIDTH;
  // On narrow screens the columns line up, so the start column sits centred.
  const layout = useMemo(
    () => buildLayout(projects, scale, narrow ? 0 : 1),
    [projects, scale, narrow],
  );
  const { viewportRef, size, dragging, handlers, edges, subscribe, readCamera } =
    useCanvasPan(layout, VIEW_INSETS, narrow ? layout.homeX : layout.width / 2);
  const cardSize = useMemo(
    () => ({ width: CARD_WIDTH * scale, height: CARD_HEIGHT * scale }),
    [scale],
  );
  const visible = useVisibleItems(
    layout.items,
    cardSize,
    size,
    subscribe,
    readCamera,
    MOUNT_MARGIN,
  );
  const worldRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const el = worldRef.current;
    if (!el) return;
    const dpr = window.devicePixelRatio || 1;
    // Whole device pixels keep card text sharp inside the moving layer.
    const snap = (v: number) => Math.round(v * dpr) / dpr;
    let idle: ReturnType<typeof setTimeout>;
    const place = (c: Point) => {
      el.style.transform = `translate3d(${snap(size.width / 2 - c.x)}px, ${snap(size.height / 2 - c.y)}px, 0)`;
      // Cards sliding under a still cursor must not fire hover fades mid-pan.
      el.style.pointerEvents = "none";
      clearTimeout(idle);
      idle = setTimeout(() => (el.style.pointerEvents = ""), PAN_IDLE_MS);
    };
    place(readCamera());
    const unsubscribe = subscribe(place);
    return () => {
      unsubscribe();
      clearTimeout(idle);
    };
  }, [size, subscribe, readCamera]);

  return (
    <div
      ref={viewportRef}
      {...handlers}
      className={`${styles.board} relative h-dvh w-full touch-none select-none overflow-clip text-foreground ${
        dragging ? "cursor-grabbing" : "cursor-grab"
      }`}
    >
      <h1 className="pointer-events-none absolute left-6 right-6 top-5 z-20 text-2xl font-semibold tracking-tight text-[#fff4da]">
        SCS Project Showcase
      </h1>

      {projects.length === 0 ? (
        <p className="absolute inset-0 flex items-center justify-center text-foreground/60">
          No projects to show yet. Check back soon.
        </p>
      ) : null}

      <div
        ref={worldRef}
        className="absolute left-0 top-0 will-change-transform"
      >
        {visible.map((item) => (
          <CanvasCard key={item.project.id} item={item} scale={scale} />
        ))}
      </div>

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[5]"
        style={{ backgroundImage: VIGNETTE }}
      />

      {!edges.left && (
        <DirectionHint
          icon={ChevronLeft}
          label="Different projects"
          vertical
          className="left-1 top-1/2 -translate-y-1/2"
        />
      )}
      {!edges.right && (
        <DirectionHint
          icon={ChevronRight}
          label="Different projects"
          vertical
          className="right-1 top-1/2 -translate-y-1/2"
        />
      )}
      {!edges.down && (
        <DirectionHint
          icon={ChevronDown}
          label="Similar projects"
          labelFirst
          className="bottom-1 left-1/2 -translate-x-1/2"
        />
      )}

      <ThemeToggle className="absolute bottom-4 left-4 z-20 text-foreground/60" />

      {edges.left && <EdgeNotice className="left-4 top-1/2 -translate-y-1/2" />}
      {edges.right && (
        <EdgeNotice className="right-4 top-1/2 -translate-y-1/2" />
      )}
      {edges.down && (
        <EdgeNotice className="bottom-14 left-1/2 -translate-x-1/2" />
      )}
    </div>
  );
}
