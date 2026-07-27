import { Link } from "@tanstack/react-router";
import { ArrowRight, Bot, Download, ExternalLink, Star } from "lucide-react";
import type { Project } from "@/lib/queries";

export function ProjectCard({ project }: { project: Project }) {
  const type = project.project_type;
  const apkUrl = project.apk_url || project.apk_external_url;

  let cta: { href?: string; label: string; icon: React.ReactNode } | null = null;
  if (type === "android" && apkUrl)
    cta = { href: apkUrl, label: "Download APK", icon: <Download className="h-3.5 w-3.5" /> };
  else if (type === "website" && project.website_url)
    cta = { href: project.website_url, label: "Visit Site", icon: <ExternalLink className="h-3.5 w-3.5" /> };
  else if (type === "telegram" && project.bot_url)
    cta = { href: project.bot_url, label: "Open Bot", icon: <Bot className="h-3.5 w-3.5" /> };

  return (
    <article className="surface-card hover:[&]:surface-card-hover group flex flex-col overflow-hidden">
      <Link to="/projects/$slug" params={{ slug: project.slug }} className="block">
        <div className="relative aspect-[16/10] overflow-hidden bg-secondary">
          {project.thumbnail_url ? (
            <img
              src={project.thumbnail_url}
              alt={project.name}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="grid h-full w-full place-items-center text-3xl font-bold font-display gradient-text">
              {project.name.slice(0, 2).toUpperCase()}
            </div>
          )}
          {project.featured && (
            <span className="absolute top-3 left-3 inline-flex items-center gap-1 rounded-full bg-background/90 px-2.5 py-1 text-xs font-semibold text-primary shadow-sm backdrop-blur">
              <Star className="h-3 w-3 fill-primary" /> Featured
            </span>
          )}
          <span className="absolute top-3 right-3 rounded-full bg-background/90 px-2.5 py-1 text-[11px] font-medium text-muted-foreground backdrop-blur">
            {project.category_slug.replace(/-/g, " ")}
          </span>
        </div>
      </Link>

      <div className="flex flex-1 flex-col p-5">
        <Link to="/projects/$slug" params={{ slug: project.slug }}>
          <h3 className="font-display text-lg font-semibold tracking-tight group-hover:text-primary transition-colors">
            {project.name}
          </h3>
        </Link>
        <p className="mt-1.5 line-clamp-2 text-sm text-muted-foreground">
          {project.short_description}
        </p>

        {project.tech_stack.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-1.5">
            {project.tech_stack.slice(0, 4).map((t) => (
              <span key={t} className="tag-badge">{t}</span>
            ))}
          </div>
        )}

        <div className="mt-5 flex items-center justify-between border-t border-border pt-4">
          <Link
            to="/projects/$slug"
            params={{ slug: project.slug }}
            className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline"
          >
            View details <ArrowRight className="h-3.5 w-3.5" />
          </Link>
          {cta && (
            <a
              href={cta.href}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary hover:bg-primary/15 transition-colors"
            >
              {cta.icon} {cta.label}
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
