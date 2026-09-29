import Image from "next/image";
import { Project } from "@/types/project";
import placeholderImage from "@/../public/images/project_placeholder.png";

export default function ProjectCard({ project }: { project: Project }) {
    const { title, image, description, tags, projectStatus, difficulty, isSeekingCollaborators } = project;
    return (
        <div>
            <h2>{title}</h2>
            <Image src={image || placeholderImage} alt="Project alt text" width={500} height={300} />
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