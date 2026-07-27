import { createFileRoute, Link } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import {
  ArrowRight, Smartphone, Globe, Bot, Zap, Wrench, Palette, Sparkles, Rocket, Code2, Shield, Heart, CheckCircle2,
} from "lucide-react";
import { projectsQuery, categoriesQuery, settingsQuery } from "@/lib/queries";
import { ProjectCard } from "@/components/site/ProjectCard";

export const Route = createFileRoute("/")({
  loader: ({ context }) =>
    Promise.all([
      context.queryClient.ensureQueryData(projectsQuery()),
      context.queryClient.ensureQueryData(categoriesQuery()),
      context.queryClient.ensureQueryData(settingsQuery()),
    ]),
  component: Home,
});

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Smartphone, Globe, Bot, Zap, Wrench, Palette,
};

const services = [
  { icon: Smartphone, title: "Android App Development", desc: "Native & hybrid Android apps built for speed, polish, and Play Store success." },
  { icon: Globe, title: "Website Development", desc: "Fast, responsive, SEO-ready websites — from landing pages to full SaaS dashboards." },
  { icon: Bot, title: "Telegram Bot Development", desc: "Powerful Telegram bots for automation, notifications, moderation & e-commerce." },
  { icon: Code2, title: "Custom Software", desc: "Tailor-made tools and scripts that solve your exact problem. No bloat." },
  { icon: Zap, title: "Automation", desc: "Save hours weekly with workflows, integrations and AI-powered automations." },
  { icon: Palette, title: "UI Design", desc: "Clean, premium interfaces designed to feel modern and convert users." },
];

function Home() {
  const projects = useSuspenseQuery(projectsQuery()).data;
  const categories = useSuspenseQuery(categoriesQuery()).data;
  const settings = useSuspenseQuery(settingsQuery()).data;

  const featured = projects.filter((p) => p.featured).slice(0, 6);
  const latest = (featured.length ? featured : projects).slice(0, 6);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden hero-bg">
        <div className="mx-auto max-w-7xl px-4 pt-20 pb-24 sm:px-6 lg:px-8 lg:pt-28 lg:pb-32">
          <div className="mx-auto max-w-4xl text-center animate-fade-up">
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-xs font-semibold text-muted-foreground shadow-sm">
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              Available for freelance projects
            </span>
            <h1 className="mt-6 text-4xl font-black tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
              Hi, I'm <span className="gradient-text">{settings?.site_name || "Ayush Dev"}</span>.
              <br className="hidden sm:block" /> I build software that ships.
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-base text-muted-foreground sm:text-lg">
              {settings?.tagline || "Building Modern Android Apps, Websites & Telegram Bots."} Premium design,
              production-grade code, and delivery you can trust.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link
                to="/projects"
                className="btn-primary hover:[&]:btn-primary-hover inline-flex items-center gap-2 rounded-2xl px-6 py-3 text-sm font-semibold"
              >
                View Projects <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-2xl border border-border bg-card px-6 py-3 text-sm font-semibold text-foreground hover:border-primary/40"
              >
                Contact Me
              </Link>
            </div>
          </div>
        </div>
      </section>


      {/* Services */}
      <section id="services" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">Services</p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">Everything you need, under one roof.</h2>
          <p className="mt-3 text-muted-foreground">
            From native Android apps to sharp websites and automated Telegram bots — shipped end-to-end.
          </p>
        </div>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <div key={s.title} className="surface-card hover:[&]:surface-card-hover p-6">
              <div className="grid h-12 w-12 place-items-center rounded-2xl btn-primary">
                <s.icon className="h-6 w-6" />
              </div>
              <h3 className="mt-5 text-lg font-semibold">{s.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Projects */}
      {latest.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-primary">Work</p>
              <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">Featured Projects</h2>
            </div>
            <Link to="/projects" className="text-sm font-semibold text-primary hover:underline inline-flex items-center gap-1">
              View all <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {latest.map((p) => (<ProjectCard key={p.id} project={p} />))}
          </div>
        </section>
      )}

      {latest.length === 0 && (
        <section className="mx-auto max-w-3xl px-4 py-10 text-center sm:px-6 lg:px-8">
          <div className="surface-card p-10">
            <Rocket className="mx-auto h-10 w-10 text-primary" />
            <h3 className="mt-4 text-xl font-semibold">Projects launching soon</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Sign in to the admin panel to add your first project — it'll appear here instantly.
            </p>
            <Link to="/admin/login" className="mt-6 inline-flex btn-primary hover:[&]:btn-primary-hover rounded-xl px-5 py-2.5 text-sm font-semibold">
              Go to Admin
            </Link>
          </div>
        </section>
      )}

      {/* Categories */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">Explore</p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">Browse by Category</h2>
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((c) => {
            const Icon = iconMap[c.icon || ""] || Sparkles;
            const count = projects.filter((p) => p.category_slug === c.slug).length;
            return (
              <Link
                key={c.slug}
                to="/projects"
                search={{ category: c.slug } as never}
                className="surface-card hover:[&]:surface-card-hover flex items-center gap-4 p-5"
              >
                <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
                  <Icon className="h-5 w-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="truncate font-semibold">{c.name}</div>
                  <div className="text-xs text-muted-foreground">{count} {count === 1 ? "project" : "projects"}</div>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground" />
              </Link>
            );
          })}
        </div>
      </section>

      {/* Why me */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="surface-card overflow-hidden p-8 sm:p-12">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-primary">Why me</p>
              <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">Craft. Speed. Reliability.</h2>
              <p className="mt-4 text-muted-foreground">
                I care about the details. From your first message to launch and beyond — you get clean code, thoughtful
                UX, and a partner who ships.
              </p>
              <ul className="mt-6 space-y-3 text-sm">
                {[
                  "Modern, production-grade stack",
                  "Clear communication & timelines",
                  "Pixel-perfect responsive design",
                  "Post-launch support & iteration",
                ].map((f) => (
                  <li key={f} className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary" /> {f}
                  </li>
                ))}
              </ul>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: Shield, title: "Secure", desc: "Best-practice auth & data handling." },
                { icon: Rocket, title: "Fast", desc: "Optimized for Core Web Vitals." },
                { icon: Heart, title: "Care", desc: "Built like it's my own product." },
                { icon: Zap, title: "Iterative", desc: "Ship, learn, improve. Repeat." },
              ].map((c) => (
                <div key={c.title} className="rounded-2xl bg-background p-5 border border-border">
                  <c.icon className="h-5 w-5 text-primary" />
                  <div className="mt-3 font-semibold">{c.title}</div>
                  <p className="mt-1 text-xs text-muted-foreground">{c.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-5xl px-4 pb-24 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl btn-primary p-10 text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Have a project in mind?</h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-primary-foreground/80">
            Let's turn your idea into a polished, production-ready product.
          </p>
          <Link
            to="/contact"
            className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-background px-6 py-3 text-sm font-semibold text-primary hover:bg-background/90"
          >
            Start a conversation <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
