import Image from "next/image";
import { Project } from "@/types/project";

export default function ProjectCard({ project }: { project: Project }) {
    const { title, image, description, tags, projectStatus, difficulty, isSeekingCollaborators, createdAt } = project;
    return (
        <div>
            <h2>Sample Project Title</h2>
            <Image src="" alt="Project alt text" width={500} height={300} />
            <p>{description.trim().slice(0, 100)}...</p>
            <ul>
                <li>
                    {tags.map((tag) => <span key={tag}>{tag}</span>)}
                </li>
            </ul>
            {projectStatus}
            {isSeekingCollaborators ? <p>Seeking Collaborators</p> : <p>Not Seeking Collaborators</p>}
            {"⭐".repeat(difficulty)}
        </div>
    )
}