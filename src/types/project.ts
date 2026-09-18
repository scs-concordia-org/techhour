/**
 * Core project type used across the app until the database is connected.
 *
 * Design notes:
 * - `status` and `difficulty` are string unions so filters can enumerate them
 *   without magic strings.
 * - `contact` is a single optional object rather than loose fields; a project
 *   that is not looking for collaborators can omit it entirely.
 * - `image` is a public/ path or absolute URL; optional so early projects can
 *   ship without artwork.
 */

export type ProjectStatus = "idea" | "in-progress" | "completed";

export type ProjectDifficulty = "beginner" | "intermediate" | "advanced";

export interface ProjectContact {
  /** e.g. "email", "discord", "github" — free-form label shown in the UI. */
  method: string;
  /** e.g. "mailto:ada@example.com", a Discord handle, or a GitHub URL. */
  value: string;
}

export interface Project {
  id: string;
  title: string;
  shortDescription: string;
  image?: string;
  creatorName: string;
  tags: string[];
  status: ProjectStatus;
  difficulty: ProjectDifficulty;
  lookingForCollaborators: boolean;
  contact?: ProjectContact;
  createdAt: string; // ISO date string
}
