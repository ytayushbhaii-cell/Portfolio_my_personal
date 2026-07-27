import { createFileRoute, Link } from "@tanstack/react-router";
import { Award, Code2, Rocket, Users, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Ayush Dev" },
      { name: "description", content: "Freelance developer specializing in Android apps, websites and Telegram bots." },
      { property: "og:title", content: "About — Ayush Dev" },
    ],
  }),
  component: About,
});

const skills = [
  { name: "Android (Kotlin / Java)", level: 95 },
  { name: "React / Next.js / TanStack", level: 92 },
  { name: "TypeScript", level: 90 },
  { name: "Node.js & Telegram Bots", level: 88 },
  { name: "Supabase / PostgreSQL", level: 85 },
  { name: "UI/UX Design", level: 82 },
];

const experience = [
  { year: "2022 — Now", title: "Freelance Developer", desc: "Delivering apps, websites and automation for clients worldwide." },
  { year: "2021", title: "Started with Android", desc: "Shipped first Play Store apps and started open-sourcing tools." },
  { year: "2020", title: "First lines of code", desc: "Fell in love with building things that people actually use." },
];

const techStack = [
  "Kotlin", "Java", "React", "TypeScript", "Node.js", "Supabase",
  "TanStack", "Tailwind CSS", "Figma", "PostgreSQL", "Firebase", "Python",
];

function About() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">

      {/* Header */}
      <div className="max-w-3xl mb-12">
        <p className="section-label">About</p>
        <h1 className="mt-2 font-display text-4xl font-bold tracking-tight sm:text-5xl">
          Hey, I'm <span className="gradient-text">Ayush</span> — a developer who ships.
        </h1>
        <p className="mt-4 text-muted-foreground leading-relaxed">
          I'm a freelance developer focused on Android, the modern web, and Telegram automation. I love turning
          rough ideas into premium, production-ready products — with a strong emphasis on design, performance,
          and clean architecture.
        </p>
        <Link
          to="/contact"
          className="mt-6 inline-flex btn-primary hover:[&]:btn-primary-hover items-center gap-2 rounded-2xl px-5 py-2.5 text-sm font-semibold"
        >
          Hire me <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-14">
        {[
          { icon: Rocket, label: "Projects Shipped", value: "50+" },
          { icon: Users, label: "Happy Clients", value: "30+" },
          { icon: Code2, label: "Lines of Code", value: "1M+" },
          { icon: Award, label: "Years Coding", value: "5+" },
        ].map((s) => (
          <div key={s.label} className="surface-card p-6 text-center">
            <s.icon className="mx-auto h-6 w-6 text-primary" />
            <div className="mt-4 font-display text-3xl font-bold gradient-text">{s.value}</div>
            <div className="mt-1 text-xs font-medium text-muted-foreground">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Skills + Journey */}
      <div className="grid gap-8 lg:grid-cols-2 mb-14">
        <div className="surface-card p-6 sm:p-8">
          <h2 className="font-display text-2xl font-bold tracking-tight mb-6">Skills</h2>
          <div className="space-y-5">
            {skills.map((s) => (
              <div key={s.name}>
                <div className="flex items-center justify-between text-sm font-medium mb-1.5">
                  <span>{s.name}</span>
                  <span className="text-muted-foreground text-xs font-mono">{s.level}%</span>
                </div>
                <div className="h-2 rounded-full bg-secondary overflow-hidden">
                  <div className="h-full rounded-full btn-primary" style={{ width: `${s.level}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="surface-card p-6 sm:p-8">
          <h2 className="font-display text-2xl font-bold tracking-tight mb-6">Journey</h2>
          <ol className="space-y-7 border-l border-border pl-6">
            {experience.map((e) => (
              <li key={e.year} className="relative">
                <span className="absolute -left-[31px] mt-1 grid h-4 w-4 place-items-center rounded-full btn-primary">
                  <span className="h-1.5 w-1.5 rounded-full bg-background" />
                </span>
                <div className="text-xs font-semibold uppercase tracking-widest text-primary">{e.year}</div>
                <div className="mt-1 font-display font-semibold">{e.title}</div>
                <p className="mt-1 text-sm text-muted-foreground">{e.desc}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>

      {/* Tech stack */}
      <div className="surface-card p-6 sm:p-8">
        <h2 className="font-display text-2xl font-bold tracking-tight mb-6">Tech Stack</h2>
        <div className="flex flex-wrap gap-2">
          {techStack.map((t) => (
            <span
              key={t}
              className="rounded-xl border border-border bg-secondary px-4 py-2 text-sm font-medium text-foreground hover:border-primary/30 hover:text-primary transition-colors cursor-default"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
