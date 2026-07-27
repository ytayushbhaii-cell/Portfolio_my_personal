import { createFileRoute } from "@tanstack/react-router";
import { Award, Code2, Rocket, Users } from "lucide-react";

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
  { name: "Android (Kotlin, Java)", level: 95 },
  { name: "React / Next.js / TanStack", level: 92 },
  { name: "TypeScript", level: 90 },
  { name: "Node.js & Bots", level: 88 },
  { name: "Supabase / Postgres", level: 85 },
  { name: "UI/UX Design", level: 82 },
];

const experience = [
  { year: "2022 — Now", title: "Freelance Developer", desc: "Delivering apps, websites and automation for clients worldwide." },
  { year: "2021", title: "Started with Android", desc: "Shipped first Play Store apps and started open-sourcing tools." },
  { year: "2020", title: "First lines of code", desc: "Fell in love with building things that people actually use." },
];

function About() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
      <div className="max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-widest text-primary">About</p>
        <h1 className="mt-2 text-4xl font-bold tracking-tight sm:text-5xl">
          Hey, I'm <span className="gradient-text">Ayush</span> — a developer who ships.
        </h1>
        <p className="mt-4 text-muted-foreground">
          I'm a freelance developer focused on Android, the modern web, and Telegram automation. I love turning
          rough ideas into premium, production-ready products — with a strong emphasis on design, performance,
          and clean architecture.
        </p>
      </div>

      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { icon: Rocket, label: "Projects Shipped", value: "50+" },
          { icon: Users, label: "Happy Clients", value: "30+" },
          { icon: Code2, label: "Lines of Code", value: "1M+" },
          { icon: Award, label: "Years Coding", value: "5+" },
        ].map((s) => (
          <div key={s.label} className="surface-card p-5">
            <s.icon className="h-6 w-6 text-primary" />
            <div className="mt-4 text-2xl font-bold">{s.value}</div>
            <div className="text-xs font-medium text-muted-foreground">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="mt-16 grid gap-10 lg:grid-cols-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Skills</h2>
          <div className="mt-6 space-y-4">
            {skills.map((s) => (
              <div key={s.name}>
                <div className="flex items-center justify-between text-sm font-medium">
                  <span>{s.name}</span>
                  <span className="text-muted-foreground">{s.level}%</span>
                </div>
                <div className="mt-1.5 h-2 rounded-full bg-secondary overflow-hidden">
                  <div className="h-full rounded-full btn-primary" style={{ width: `${s.level}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Journey</h2>
          <ol className="mt-6 space-y-6 border-l border-border pl-6">
            {experience.map((e) => (
              <li key={e.year} className="relative">
                <span className="absolute -left-[31px] mt-1 grid h-4 w-4 place-items-center rounded-full btn-primary">
                  <span className="h-1.5 w-1.5 rounded-full bg-background" />
                </span>
                <div className="text-xs font-semibold uppercase tracking-widest text-primary">{e.year}</div>
                <div className="mt-1 font-semibold">{e.title}</div>
                <p className="mt-1 text-sm text-muted-foreground">{e.desc}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}
