interface Project {
    id: string;
    title: string;
    description: string;
    image?: string;
    creator: string;
    collaborators: string[];
    tags: string[];
    projectStatus: "ongoing" | "completed";
    difficulty: 1 | 2 | 3 | 4 | 5;
    isSeekingCollaborators: boolean;
    contactMethods: "email" | "discord" | "linkedin" | "instagram" | "other";
    collaborationAvailability?: "part-time" | "full-time" | "flexible";
    collaborationNeeds?: string;
    createdAt: Date;
}


export type { Project };