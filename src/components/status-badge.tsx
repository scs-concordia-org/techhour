import { CircleCheck, CircleDashed, LoaderCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export type ProjectStatus = "prototype" | "ongoing" | "completed";

export function StatusBadge({ status }: { status: ProjectStatus }) {
  let label = "Prototype";
  let className =
    "border-red-200 bg-red-50 text-red-800 dark:border-red-800 dark:bg-red-950 dark:text-red-300";
  let Icon = CircleDashed;

  if (status === "ongoing") {
    label = "Ongoing";
    className =
      "border-yellow-200 bg-yellow-50 text-yellow-800 dark:border-yellow-800 dark:bg-yellow-950 dark:text-yellow-300";
    Icon = LoaderCircle;
  }

  if (status === "completed") {
    label = "Completed";
    className =
      "border-green-200 bg-green-50 text-green-800 dark:border-green-800 dark:bg-green-950 dark:text-green-300";
    Icon = CircleCheck;
  }

  return (
    <Badge variant="outline" className={className}>
      <Icon aria-hidden="true" />
      {label}
    </Badge>
  );
}