import type { Project } from "@/types/project";

/**
 * Example projects for frontend development before the database is connected.
 * Deliberately varied across tags, statuses, difficulties, and collaboration
 * intent so cards, search, and filters can be built against realistic data.
 */
export const projects: Project[] = [
  {
    id: "campus-events-board",
    title: "Campus Events Board",
    shortDescription:
      "A mobile-first board where student clubs post events and students RSVP with one tap.",
    image: "/projects/campus-events-board.png",
    creatorName: "Ada Nguyen",
    tags: ["Next.js", "Tailwind", "Community"],
    status: "in-progress",
    difficulty: "beginner",
    lookingForCollaborators: true,
    contact: { method: "discord", value: "ada.ng" },
    createdAt: "2026-09-01",
  },
  {
    id: "study-group-matcher",
    title: "Study Group Matcher",
    shortDescription:
      "Matches students into study groups by course, availability, and preferred meeting style.",
    creatorName: "Marcus Reid",
    tags: ["React", "Algorithms", "Matching"],
    status: "idea",
    difficulty: "intermediate",
    lookingForCollaborators: true,
    contact: { method: "email", value: "mailto:marcus@example.com" },
    createdAt: "2026-09-05",
  },
  {
    id: "professor-q-and-a",
    title: "Anonymous Q&A for Lectures",
    shortDescription:
      "Students submit and upvote questions during lectures; professors answer the top ones live.",
    image: "/projects/lecture-qa.png",
    creatorName: "Sofia Delgado",
    tags: ["Next.js", "Realtime", "Education"],
    status: "completed",
    difficulty: "intermediate",
    lookingForCollaborators: false,
    createdAt: "2026-08-12",
  },
  {
    id: "green-commute-tracker",
    title: "Green Commute Tracker",
    shortDescription:
      "Gamifies low-carbon commuting to campus with weekly leaderboards and team challenges.",
    creatorName: "Liam O'Connor",
    tags: ["TypeScript", "Maps", "Sustainability", "Gamification"],
    status: "in-progress",
    difficulty: "advanced",
    lookingForCollaborators: false,
    createdAt: "2026-09-10",
  },
];
