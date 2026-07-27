import { createFileRoute, notFound } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { queryOptions } from "@tanstack/react-query";
import { ProjectEditor } from "@/components/admin/ProjectEditor";
import { supabase } from "@/integrations/supabase/client";
import type { Project } from "@/lib/queries";

const projectByIdQuery = (id: string) =>
  queryOptions({
    queryKey: ["admin", "project", id],
    queryFn: async (): Promise<Project | null> => {
      const { data, error } = await supabase.from("projects").select("*").eq("id", id).maybeSingle();
      if (error) throw error;
      return (data as Project | null) ?? null;
    },
  });

export const Route = createFileRoute("/admin/_authed/projects/$id")({
  loader: async ({ context, params }) => {
    const p = await context.queryClient.ensureQueryData(projectByIdQuery(params.id));
    if (!p) throw notFound();
    return { project: p };
  },
  component: EditProjectRoute,
});

function EditProjectRoute() {
  const { id } = Route.useParams();
  const project = useSuspenseQuery(projectByIdQuery(id)).data!;
  return <ProjectEditor existing={project} />;
}
