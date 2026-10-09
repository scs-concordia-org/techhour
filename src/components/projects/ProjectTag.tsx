const tagColors = {
  zinc: "border-zinc-300 bg-zinc-100 text-zinc-800 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-100",
  blue: "border-blue-300 bg-blue-100 text-blue-900 dark:border-blue-700 dark:bg-blue-950 dark:text-blue-100",
  green:
    "border-green-300 bg-green-100 text-green-900 dark:border-green-700 dark:bg-green-950 dark:text-green-100",
  amber:
    "border-amber-300 bg-amber-100 text-amber-950 dark:border-amber-700 dark:bg-amber-950 dark:text-amber-100",
  purple:
    "border-purple-300 bg-purple-100 text-purple-900 dark:border-purple-700 dark:bg-purple-950 dark:text-purple-100",
} as const;

export type ProjectTagColor = keyof typeof tagColors;

type ProjectTagProps = {
  label: string;
  color?: ProjectTagColor;
};

export function ProjectTag({ label, color = "zinc" }: ProjectTagProps) {
  return (
    <span
      className={`inline-block max-w-full rounded-full border px-2.5 py-0.5 text-xs font-medium leading-5 break-words ${tagColors[color]}`}
    >
      {label}
    </span>
  );
}
