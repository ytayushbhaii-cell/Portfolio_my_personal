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
  { icon: Smartphone, title: "Android App Development", desc: "Native Kotlin/Java or hybrid Android apps built for performance and polish. Play Store ready, Material Design compliant.", features: ["Native Kotlin & Java", "Material Design 3", "Play Store publishing", "Backend integration"] },
  { icon: Globe, title: "Website Development", desc: "Fast, responsive, SEO-optimized websites. From landing pages to complex SaaS dashboards.", features: ["React & Next.js", "Fully responsive", "SEO optimized", "Blazing fast"] },
  { icon: Bot, title: "Telegram Bot Development", desc: "Feature-rich Telegram bots for automation, moderation, e-commerce, notifications and more.", features: ["Custom commands", "Payment integration", "Multi-language", "Admin panels"] },
  { icon: Code2, title: "Custom Software", desc: "Tailor-made scripts, tools and apps built exactly for your workflow.", features: ["Clean architecture", "Well-documented", "Maintainable code", "Long-term support"] },
  { icon: Zap, title: "Automation", desc: "Save hours weekly with automated workflows, integrations and AI-powered solutions.", features: ["API integrations", "Cron & scheduling", "AI workflows", "Data pipelines"] },
  { icon: Palette, title: "UI/UX Design", desc: "Modern, premium interfaces designed to feel great and convert users.", features: ["Figma prototyping", "Design systems", "User flows", "Interactive prototypes"] },
];

function Services() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <div className="max-w-2xl mb-12">
        <p className="section-label">Services</p>
        <h1 className="mt-2 font-display text-4xl font-bold tracking-tight sm:text-5xl">What I can build for you.</h1>
        <p className="mt-4 text-muted-foreground">
          End-to-end delivery — from idea to launch. Pick a service or combine them into a full product.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((s) => (
          <div key={s.title} className="surface-card hover:[&]:surface-card-hover p-6">
            <div className="grid h-12 w-12 place-items-center rounded-2xl btn-primary">
              <s.icon className="h-6 w-6" />
            </div>
            <h3 className="mt-5 font-display text-lg font-semibold">{s.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
            <ul className="mt-4 space-y-1.5 text-xs text-muted-foreground">
              {s.features.map((f) => (
                <li key={f} className="flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-primary" /> {f}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-16 surface-card p-10 text-center">
        <h2 className="font-display text-2xl font-bold tracking-tight">Ready to build something great?</h2>
        <p className="mt-2 text-sm text-muted-foreground">Let's discuss your project — I usually reply within a few hours.</p>
        <Link to="/contact" className="mt-6 inline-flex btn-primary hover:[&]:btn-primary-hover items-center gap-2 rounded-2xl px-5 py-2.5 text-sm font-semibold">
          Contact me <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
