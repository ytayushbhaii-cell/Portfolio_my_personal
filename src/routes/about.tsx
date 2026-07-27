import { createFileRoute, Link } from "@tanstack/react-router";
import { Award, Code2, Rocket, Users, ArrowRight, Download } from "lucide-react";

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
  { name: "Android (Kotlin / Java)", level: 95, color: "from-green-500 to-emerald-400" },
  { name: "React / Next.js / TanStack", level: 92, color: "from-blue-500 to-cyan-400" },
  { name: "TypeScript", level: 90, color: "from-blue-600 to-blue-400" },
  { name: "Node.js & Telegram Bots", level: 88, color: "from-sky-500 to-teal-400" },
  { name: "Supabase / PostgreSQL", level: 85, color: "from-green-600 to-emerald-500" },
  { name: "UI/UX Design", level: 82, color: "from-violet-500 to-purple-400" },
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
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">

      {/* Hero */}
      <div className="relative overflow-hidden glass-card p-8 sm:p-12 mb-12">
        <div className="pointer-events-none absolute top-0 right-0 h-64 w-64 glow-violet opacity-20 translate-x-1/3 -translate-y-1/3" />
        <div className="pointer-events-none absolute bottom-0 left-0 h-48 w-48 glow-cyan opacity-15 -translate-x-1/4 translate-y-1/4" />
        <div className="relative max-w-3xl">
          <p className="section-label">About me</p>
          <h1 className="mt-3 font-display text-4xl font-bold tracking-tight sm:text-5xl">
            Hey, I'm <span className="gradient-text">Ayush</span> —{" "}
            <span className="text-foreground/80">a developer who ships.</span>
          </h1>
          <p className="mt-5 text-muted-foreground leading-relaxed text-base sm:text-lg">
            I'm a freelance developer focused on Android, the modern web, and Telegram automation.
            I love turning rough ideas into premium, production-ready products — with a strong emphasis
            on design, performance, and clean architecture.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link
              to="/contact"
              className="btn-primary hover:[&]:btn-primary-hover inline-flex items-center gap-2 rounded-2xl px-6 py-3 text-sm font-semibold"
            >
              Hire me <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href="#"
              className="inline-flex items-center gap-2 rounded-2xl border border-border/60 bg-card/40 px-6 py-3 text-sm font-semibold text-foreground hover:border-primary/40 transition-all backdrop-blur-sm"
            >
              <Download className="h-4 w-4" /> Download CV
            </a>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-16">
        {[
          { icon: Rocket, label: "Projects Shipped", value: "50+", color: "text-violet-400" },
          { icon: Users, label: "Happy Clients", value: "30+", color: "text-cyan-400" },
          { icon: Code2, label: "Lines of Code", value: "1M+", color: "text-green-400" },
          { icon: Award, label: "Years Coding", value: "5+", color: "text-yellow-400" },
        ].map((s) => (
          <div key={s.label} className="glass-card p-6 text-center hover:[&]:glass-card-hover">
            <div className="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-primary/10 border border-primary/15">
              <s.icon className={`h-6 w-6 ${s.color}`} />
            </div>
            <div className="mt-4 font-display text-3xl font-bold gradient-text">{s.value}</div>
            <div className="mt-1 text-xs font-medium text-muted-foreground">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Skills + Journey */}
      <div className="grid gap-8 lg:grid-cols-2 mb-16">
        {/* Skills */}
        <div className="glass-card p-6 sm:p-8">
          <h2 className="font-display text-2xl font-bold tracking-tight mb-6">
            Tech <span className="gradient-text">Skills</span>
          </h2>
          <div className="space-y-5">
            {skills.map((s) => (
              <div key={s.name}>
                <div className="flex items-center justify-between text-sm font-medium mb-2">
                  <span>{s.name}</span>
                  <span className="text-muted-foreground font-mono text-xs">{s.level}%</span>
                </div>
                <div className="h-2 rounded-full bg-border/50 overflow-hidden">
                  <div
                    className={`h-full rounded-full bg-gradient-to-r ${s.color}`}
                    style={{ width: `${s.level}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Journey */}
        <div className="glass-card p-6 sm:p-8">
          <h2 className="font-display text-2xl font-bold tracking-tight mb-6">
            My <span className="gradient-text">Journey</span>
          </h2>
          <ol className="space-y-8 relative">
            <div className="absolute left-3 top-2 bottom-2 w-px bg-gradient-to-b from-primary/60 via-primary/20 to-transparent" />
            {experience.map((e, i) => (
              <li key={e.year} className="relative pl-10">
                <span className="absolute left-0 top-0.5 flex h-7 w-7 items-center justify-center rounded-full btn-primary shadow-[0_0_12px_oklch(0.62_0.24_280/0.4)] text-xs font-bold">
                  {i + 1}
                </span>
                <div className="text-xs font-bold uppercase tracking-widest text-primary/80">{e.year}</div>
                <div className="mt-1 font-display font-semibold">{e.title}</div>
                <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{e.desc}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>

      {/* Tech stack tags */}
      <div className="glass-card p-6 sm:p-8">
        <h2 className="font-display text-2xl font-bold tracking-tight mb-6">
          Tech <span className="gradient-text">Stack</span>
        </h2>
        <div className="flex flex-wrap gap-2">
          {techStack.map((t) => (
            <span key={t} className="rounded-xl border border-border/60 bg-secondary/60 px-4 py-2 text-sm font-medium text-foreground/80 hover:border-primary/40 hover:text-primary transition-colors cursor-default">
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
