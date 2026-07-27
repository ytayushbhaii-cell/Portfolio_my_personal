import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Bot, Code2, Globe, Palette, Smartphone, Zap, CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — Ayush Dev" },
      { name: "description", content: "Android apps, websites, Telegram bots, custom software, automation and UI design services." },
      { property: "og:title", content: "Services — Ayush Dev" },
    ],
  }),
  component: Services,
});

const services = [
  {
    num: "01",
    icon: Smartphone,
    title: "Android App Development",
    desc: "Native Kotlin/Java or hybrid Android apps built for performance and polish. Play Store ready, Material Design compliant.",
    features: ["Native Kotlin & Java", "Material Design 3", "Play Store publishing", "Backend integration"],
    color: "from-green-500/15 to-emerald-500/5 border-green-500/15",
    iconColor: "text-green-400",
    iconBg: "bg-green-500/15 border-green-500/20",
  },
  {
    num: "02",
    icon: Globe,
    title: "Website Development",
    desc: "Fast, responsive, SEO-optimized websites. From landing pages to complex SaaS dashboards.",
    features: ["React & Next.js", "Fully responsive", "SEO optimized", "Blazing fast"],
    color: "from-blue-500/15 to-cyan-500/5 border-blue-500/15",
    iconColor: "text-blue-400",
    iconBg: "bg-blue-500/15 border-blue-500/20",
  },
  {
    num: "03",
    icon: Bot,
    title: "Telegram Bot Development",
    desc: "Feature-rich Telegram bots for automation, moderation, e-commerce, notifications and more.",
    features: ["Custom commands", "Payment integration", "Multi-language", "Admin panels"],
    color: "from-sky-500/15 to-indigo-500/5 border-sky-500/15",
    iconColor: "text-sky-400",
    iconBg: "bg-sky-500/15 border-sky-500/20",
  },
  {
    num: "04",
    icon: Code2,
    title: "Custom Software",
    desc: "Tailor-made scripts, tools and apps built exactly for your workflow.",
    features: ["Clean architecture", "Well-documented", "Maintainable code", "Long-term support"],
    color: "from-violet-500/15 to-purple-500/5 border-violet-500/15",
    iconColor: "text-violet-400",
    iconBg: "bg-violet-500/15 border-violet-500/20",
  },
  {
    num: "05",
    icon: Zap,
    title: "Automation",
    desc: "Save hours weekly with automated workflows, integrations and AI-powered solutions.",
    features: ["API integrations", "Cron & scheduling", "AI workflows", "Data pipelines"],
    color: "from-yellow-500/15 to-orange-500/5 border-yellow-500/15",
    iconColor: "text-yellow-400",
    iconBg: "bg-yellow-500/15 border-yellow-500/20",
  },
  {
    num: "06",
    icon: Palette,
    title: "UI/UX Design",
    desc: "Modern, premium interfaces designed to feel great and convert users.",
    features: ["Figma prototyping", "Design systems", "User flows", "Interactive prototypes"],
    color: "from-pink-500/15 to-rose-500/5 border-pink-500/15",
    iconColor: "text-pink-400",
    iconBg: "bg-pink-500/15 border-pink-500/20",
  },
];

function Services() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="max-w-2xl mb-16">
        <p className="section-label">Services</p>
        <h1 className="mt-3 font-display text-4xl font-bold tracking-tight sm:text-5xl">
          What I can <span className="gradient-text">build for you.</span>
        </h1>
        <p className="mt-4 text-muted-foreground leading-relaxed">
          End-to-end delivery — from idea to launch. Pick a service or combine them into a full product.
        </p>
      </div>

      {/* Services grid */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((s) => (
          <div
            key={s.title}
            className={`relative glass-card hover:[&]:glass-card-hover p-6 bg-gradient-to-br ${s.color} overflow-hidden group`}
          >
            {/* Number watermark */}
            <span className="absolute top-4 right-5 font-display text-5xl font-bold text-white/5 select-none pointer-events-none">
              {s.num}
            </span>

            <div className="relative">
              <div className={`grid h-11 w-11 place-items-center rounded-xl border ${s.iconBg} ${s.iconColor}`}>
                <s.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-5 font-display text-base font-semibold">{s.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
              <ul className="mt-4 space-y-2">
                {s.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-xs text-muted-foreground">
                    <CheckCircle2 className={`h-3.5 w-3.5 shrink-0 ${s.iconColor}`} /> {f}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      {/* Process section */}
      <div className="mt-20">
        <div className="text-center mb-10">
          <p className="section-label">How I work</p>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight">
            Simple, <span className="gradient-text">transparent process.</span>
          </h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { step: "01", title: "Discovery", desc: "We discuss your idea, goals, and requirements in detail." },
            { step: "02", title: "Planning", desc: "I create a clear roadmap with milestones and timelines." },
            { step: "03", title: "Building", desc: "Development with regular updates and feedback loops." },
            { step: "04", title: "Delivery", desc: "Final testing, launch, and post-launch support." },
          ].map((p) => (
            <div key={p.step} className="glass-card p-6 text-center relative overflow-hidden">
              <span className="absolute top-3 right-4 font-display text-4xl font-bold text-white/5">{p.step}</span>
              <div className="mx-auto h-10 w-10 grid place-items-center rounded-xl btn-primary text-sm font-bold font-display">
                {p.step}
              </div>
              <h3 className="mt-4 font-display font-semibold">{p.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="mt-16 relative overflow-hidden glass-card p-10 sm:p-14 text-center">
        <div className="pointer-events-none absolute top-0 right-0 h-48 w-48 glow-violet opacity-20 translate-x-1/4 -translate-y-1/4" />
        <div className="pointer-events-none absolute bottom-0 left-0 h-40 w-40 glow-cyan opacity-15 -translate-x-1/4 translate-y-1/4" />
        <div className="relative">
          <h2 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">
            Ready to build something <span className="gradient-text">great?</span>
          </h2>
          <p className="mt-3 text-sm text-muted-foreground">Let's discuss your project — I usually reply within a few hours.</p>
          <Link
            to="/contact"
            className="mt-6 inline-flex btn-primary hover:[&]:btn-primary-hover items-center gap-2 rounded-2xl px-7 py-3.5 text-sm font-semibold"
          >
            Contact me <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
