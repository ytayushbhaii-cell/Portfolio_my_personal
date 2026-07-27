import { createFileRoute, Link } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import {
  ArrowRight, Smartphone, Globe, Bot, Zap, Wrench, Palette,
  Sparkles, Rocket, Code2, Shield, Heart, CheckCircle2, Star,
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
  { icon: Smartphone, title: "Android Apps", desc: "Native & hybrid Android apps built for speed, polish, and Play Store success.", color: "from-green-500/20 to-emerald-500/10 border-green-500/20" },
  { icon: Globe, title: "Website Development", desc: "Fast, responsive, SEO-ready websites — from landing pages to full SaaS dashboards.", color: "from-blue-500/20 to-cyan-500/10 border-blue-500/20" },
  { icon: Bot, title: "Telegram Bots", desc: "Powerful bots for automation, notifications, moderation & e-commerce.", color: "from-sky-500/20 to-indigo-500/10 border-sky-500/20" },
  { icon: Code2, title: "Custom Software", desc: "Tailor-made tools and scripts that solve your exact problem. No bloat.", color: "from-violet-500/20 to-purple-500/10 border-violet-500/20" },
  { icon: Zap, title: "Automation", desc: "Save hours weekly with workflows, integrations and AI-powered automations.", color: "from-yellow-500/20 to-orange-500/10 border-yellow-500/20" },
  { icon: Palette, title: "UI Design", desc: "Clean, premium interfaces designed to feel modern and convert users.", color: "from-pink-500/20 to-rose-500/10 border-pink-500/20" },
];

const stats = [
  { value: "50+", label: "Projects Shipped" },
  { value: "30+", label: "Happy Clients" },
  { value: "5+", label: "Years Experience" },
  { value: "99%", label: "Client Satisfaction" },
];

function Home() {
  const projects = useSuspenseQuery(projectsQuery()).data;
  const categories = useSuspenseQuery(categoriesQuery()).data;
  const settings = useSuspenseQuery(settingsQuery()).data;

  const featured = projects.filter((p) => p.featured).slice(0, 6);
  const latest = (featured.length ? featured : projects).slice(0, 6);

  return (
    <>
      {/* ─── Hero ─── */}
      <section className="relative overflow-hidden min-h-[88vh] flex items-center">
        {/* Background */}
        <div className="pointer-events-none absolute inset-0 dot-grid opacity-40" />
        <div className="pointer-events-none absolute inset-0 hero-bg" />

        {/* Blobs */}
        <div className="pointer-events-none absolute top-[-8rem] left-[-8rem] h-[40rem] w-[40rem] glow-violet opacity-30 animate-float" />
        <div className="pointer-events-none absolute bottom-[-8rem] right-[-4rem] h-[32rem] w-[32rem] glow-cyan opacity-25 animate-float2" />
        <div className="pointer-events-none absolute top-1/2 right-1/4 h-[20rem] w-[20rem] glow-violet opacity-10 animate-float2" />

        <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 w-full">
          <div className="mx-auto max-w-4xl text-center">
            {/* Badge */}
            <div className="animate-fade-up inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-4 py-1.5 text-xs font-semibold text-primary backdrop-blur-sm">
              <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
              Available for freelance projects
            </div>

            {/* Heading */}
            <h1 className="animate-fade-up-delay-1 mt-6 font-display text-5xl font-bold tracking-tight sm:text-6xl md:text-7xl lg:text-8xl">
              Hi, I'm{" "}
              <span className="animate-shimmer">{settings?.site_name || "Ayush Dev"}</span>
              <br className="hidden sm:block" />
              <span className="text-foreground/90">I build software</span>
              <br className="hidden sm:block" />
              <span className="gradient-text">that ships.</span>
            </h1>

            <p className="animate-fade-up-delay-2 mx-auto mt-6 max-w-2xl text-base text-muted-foreground sm:text-lg leading-relaxed">
              {settings?.tagline || "Building Modern Android Apps, Websites & Telegram Bots."}{" "}
              Premium design, production-grade code, and delivery you can trust.
            </p>

            <div className="animate-fade-up-delay-3 mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link
                to="/projects"
                className="btn-primary hover:[&]:btn-primary-hover inline-flex items-center gap-2 rounded-2xl px-7 py-3.5 text-sm font-semibold"
              >
                View Projects <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-2xl border border-border/60 bg-card/40 px-7 py-3.5 text-sm font-semibold text-foreground hover:border-primary/40 hover:bg-card/80 backdrop-blur-sm transition-all"
              >
                Contact Me
              </Link>
            </div>

            {/* Stats row */}
            <div className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl mx-auto">
              {stats.map((s) => (
                <div key={s.label} className="glass-card p-4 text-center">
                  <div className="text-2xl font-bold font-display gradient-text">{s.value}</div>
                  <div className="mt-1 text-xs text-muted-foreground">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── Services ─── */}
      <section id="services" className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="section-label">Services</p>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl text-foreground">
            Everything you need, <span className="gradient-text">under one roof.</span>
          </h2>
          <p className="mt-3 text-muted-foreground leading-relaxed">
            From native Android apps to sharp websites and automated Telegram bots — shipped end-to-end.
          </p>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <div
              key={s.title}
              className={`relative glass-card hover:[&]:glass-card-hover p-6 bg-gradient-to-br ${s.color} overflow-hidden group`}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent pointer-events-none" />
              <div className="relative">
                <div className="grid h-11 w-11 place-items-center rounded-xl btn-primary">
                  <s.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 font-display text-base font-semibold">{s.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link
            to="/services"
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:gap-3 transition-all"
          >
            See all services <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* ─── Featured Projects ─── */}
      {latest.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="section-label">Work</p>
              <h2 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl">
                Featured <span className="gradient-text">Projects</span>
              </h2>
            </div>
            <Link
              to="/projects"
              className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:gap-2 transition-all"
            >
              View all <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {latest.map((p) => <ProjectCard key={p.id} project={p} />)}
          </div>
        </section>
      )}

      {latest.length === 0 && (
        <section className="mx-auto max-w-3xl px-4 py-10 text-center sm:px-6 lg:px-8">
          <div className="glass-card p-12">
            <div className="mx-auto h-12 w-12 grid place-items-center rounded-2xl btn-primary">
              <Rocket className="h-6 w-6" />
            </div>
            <h3 className="mt-5 font-display text-xl font-semibold">Projects launching soon</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Sign in to the admin panel to add your first project — it'll appear here instantly.
            </p>
            <Link to="/admin/login" className="mt-6 inline-flex btn-primary hover:[&]:btn-primary-hover rounded-xl px-5 py-2.5 text-sm font-semibold">
              Go to Admin
            </Link>
          </div>
        </section>
      )}

      {/* ─── Categories ─── */}
      {categories.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="section-label">Explore</p>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl">
              Browse by <span className="gradient-text">Category</span>
            </h2>
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
                  className="glass-card hover:[&]:glass-card-hover flex items-center gap-4 p-5 group"
                >
                  <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-primary/15 text-primary border border-primary/20 group-hover:bg-primary group-hover:text-white transition-all">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="truncate font-display font-semibold">{c.name}</div>
                    <div className="text-xs text-muted-foreground">{count} {count === 1 ? "project" : "projects"}</div>
                  </div>
                  <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                </Link>
              );
            })}
          </div>
        </section>
      )}

      {/* ─── Why me ─── */}
      <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden glass-card p-8 sm:p-12">
          {/* Background accent */}
          <div className="pointer-events-none absolute top-0 right-0 h-64 w-64 glow-violet opacity-15 translate-x-1/3 -translate-y-1/3" />
          <div className="pointer-events-none absolute bottom-0 left-0 h-48 w-48 glow-cyan opacity-10 -translate-x-1/4 translate-y-1/4" />

          <div className="relative grid gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="section-label">Why me</p>
              <h2 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl">
                Craft. Speed. <span className="gradient-text">Reliability.</span>
              </h2>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                I care about the details. From your first message to launch and beyond — you get clean code,
                thoughtful UX, and a partner who ships.
              </p>
              <ul className="mt-6 space-y-3 text-sm">
                {[
                  "Modern, production-grade stack",
                  "Clear communication & timelines",
                  "Pixel-perfect responsive design",
                  "Post-launch support & iteration",
                ].map((f) => (
                  <li key={f} className="flex items-center gap-3">
                    <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-primary/20 text-primary">
                      <CheckCircle2 className="h-3.5 w-3.5" />
                    </span>
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                to="/contact"
                className="mt-8 btn-primary hover:[&]:btn-primary-hover inline-flex items-center gap-2 rounded-2xl px-6 py-3 text-sm font-semibold"
              >
                Start a project <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: Shield, title: "Secure", desc: "Best-practice auth & data handling.", color: "text-green-400" },
                { icon: Rocket, title: "Fast", desc: "Optimized for Core Web Vitals.", color: "text-blue-400" },
                { icon: Heart, title: "Care", desc: "Built like it's my own product.", color: "text-pink-400" },
                { icon: Zap, title: "Iterative", desc: "Ship, learn, improve. Repeat.", color: "text-yellow-400" },
              ].map((c) => (
                <div key={c.title} className="rounded-2xl border border-border/50 bg-background/50 p-5 hover:border-primary/30 transition-colors">
                  <c.icon className={`h-5 w-5 ${c.color}`} />
                  <div className="mt-3 font-display font-semibold">{c.title}</div>
                  <p className="mt-1 text-xs text-muted-foreground leading-relaxed">{c.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="mx-auto max-w-5xl px-4 pb-28 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl btn-primary p-10 sm:p-14 text-center">
          <div className="pointer-events-none absolute inset-0 dot-grid opacity-20" />
          <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 h-40 w-40 rounded-full bg-white/10 blur-3xl" />
          <div className="relative">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/20 px-3 py-1 text-xs font-semibold text-white/90 mb-4">
              <Star className="h-3.5 w-3.5 fill-white" /> Open for work
            </span>
            <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl text-white">
              Have a project in mind?
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-sm text-white/75">
              Let's turn your idea into a polished, production-ready product.
            </p>
            <Link
              to="/contact"
              className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-white px-7 py-3.5 text-sm font-bold text-primary hover:bg-white/90 transition-colors shadow-lg"
            >
              Start a conversation <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
