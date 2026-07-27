import { createFileRoute } from "@tanstack/react-router";
import { ProjectEditor } from "@/components/admin/ProjectEditor";

export const Route = createFileRoute("/admin/_authed/projects/new")({
  component: () => <ProjectEditor />,
});
