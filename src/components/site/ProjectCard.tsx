import { Link } from "@tanstack/react-router";
import { ArrowRight, Bot, Download, ExternalLink, Star } from "lucide-react";
import type { Project } from "@/lib/queries";

const typeColors: Record<string, string> = {
  android: "bg-green-500/15 text-green-400 border-green-500/25",
  website: "bg-blue-500/15 text-blue-400 border-blue-500/25",
  telegram: "bg-sky-500/15 text-sky-400 border-sky-500/25",
  automation: "bg-violet-500/15 text-violet-400 border-violet-500/25",
  other: "bg-gray-500/15 text-gray-400 border-gray-500/25",
};

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

  const badgeColor = typeColors[type] || typeColors.other;

  return (
    <article className="glass-card hover:[&]:glass-card-hover group flex flex-col overflow-hidden">
      {/* Thumbnail */}
      <Link to="/projects/$slug" params={{ slug: project.slug }} className="block">
        <div className="relative aspect-[16/10] overflow-hidden bg-secondary">
          {project.thumbnail_url ? (
            <img
              src={project.thumbnail_url}
              alt={project.name}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-108"
            />
          ) : (
            <div className="grid h-full w-full place-items-center bg-gradient-to-br from-primary/20 to-accent/10">
              <span className="text-4xl font-bold font-display gradient-text">
                {project.name.slice(0, 2).toUpperCase()}
              </span>
            </div>
          )}

          {/* Overlay gradient on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {project.featured && (
            <span className="absolute top-3 left-3 inline-flex items-center gap-1 rounded-full bg-black/50 px-2.5 py-1 text-xs font-semibold text-yellow-400 backdrop-blur-sm border border-yellow-400/20">
              <Star className="h-3 w-3 fill-yellow-400" /> Featured
            </span>
          )}
          <span className={`absolute top-3 right-3 rounded-full border px-2.5 py-0.5 text-[11px] font-medium backdrop-blur-sm ${badgeColor}`}>
            {project.category_slug.replace(/-/g, " ")}
          </span>
        </div>
      </Link>

      {/* Content */}
      <div className="flex flex-1 flex-col p-5">
        <Link to="/projects/$slug" params={{ slug: project.slug }}>
          <h3 className="text-base font-semibold font-display tracking-tight group-hover:text-primary transition-colors">
            {project.name}
          </h3>
        </Link>
        <p className="mt-1.5 line-clamp-2 text-sm text-muted-foreground leading-relaxed">
          {project.short_description}
        </p>

        {project.tech_stack.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-1.5">
            {project.tech_stack.slice(0, 4).map((t) => (
              <span key={t} className="tag-badge">{t}</span>
            ))}
          </div>
        )}

        <div className="mt-auto pt-5 flex items-center justify-between border-t border-border/50">
          <Link
            to="/projects/$slug"
            params={{ slug: project.slug }}
            className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:gap-2 transition-all"
          >
            View details <ArrowRight className="h-3.5 w-3.5" />
          </Link>
          {cta && (
            <a
              href={cta.href}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full bg-primary/15 border border-primary/20 px-3 py-1 text-xs font-medium text-primary hover:bg-primary/25 transition-colors"
            >
              {cta.icon} {cta.label}
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
