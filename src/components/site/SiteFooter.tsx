import { Link } from "@tanstack/react-router";
import { Send, Mail, Github, Twitter, Linkedin, ArrowUp, Code2 } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="mt-28 relative overflow-hidden">
      {/* Divider glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 h-px w-3/4 bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

      <div className="relative border-t border-border/40 bg-card/30 backdrop-blur-sm">
        {/* Background blobs */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="glow-violet absolute bottom-0 left-0 h-48 w-48 opacity-20 -translate-x-1/2 translate-y-1/2" />
          <div className="glow-cyan absolute top-0 right-0 h-48 w-48 opacity-15 translate-x-1/2 -translate-y-1/2" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="grid gap-10 md:grid-cols-4">
            {/* Brand */}
            <div className="md:col-span-2">
              <Link to="/" className="inline-flex items-center gap-2.5 font-bold">
                <span className="grid h-8 w-8 place-items-center rounded-lg btn-primary">
                  <Code2 className="h-4 w-4" />
                </span>
                <span className="text-lg font-display">
                  Ayush<span className="gradient-text">Dev</span>
                </span>
              </Link>
              <p className="mt-3 max-w-sm text-sm text-muted-foreground leading-relaxed">
                Building modern Android Apps, Websites & Telegram Bots. Available for freelance work worldwide.
              </p>
              <div className="mt-5 flex items-center gap-2">
                {[
                  { icon: Send, href: "https://t.me/", label: "Telegram" },
                  { icon: Mail, href: "mailto:hello@example.com", label: "Email" },
                  { icon: Github, href: "https://github.com/", label: "GitHub" },
                  { icon: Twitter, href: "https://twitter.com/", label: "Twitter" },
                  { icon: Linkedin, href: "https://linkedin.com/", label: "LinkedIn" },
                ].map(({ icon: Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={label}
                    className="grid h-9 w-9 place-items-center rounded-xl border border-border/60 bg-card text-muted-foreground transition-all hover:border-primary/40 hover:text-primary hover:bg-primary/10 hover:shadow-[0_0_12px_oklch(0.62_0.24_280/0.3)]"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </div>

            <div>
              <div className="text-sm font-semibold text-foreground/80 font-display">Explore</div>
              <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
                {[
                  { to: "/projects", label: "Projects" },
                  { to: "/services", label: "Services" },
                  { to: "/about", label: "About" },
                  { to: "/contact", label: "Contact" },
                ].map((l) => (
                  <li key={l.to}>
                    <Link to={l.to} className="hover:text-primary transition-colors">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <div className="text-sm font-semibold text-foreground/80 font-display">Categories</div>
              <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
                {[
                  { slug: "apps", label: "Android Apps" },
                  { slug: "websites", label: "Websites" },
                  { slug: "telegram-bots", label: "Telegram Bots" },
                  { slug: "automation", label: "Automation" },
                ].map((c) => (
                  <li key={c.slug}>
                    <Link
                      to="/projects"
                      search={{ category: c.slug } as never}
                      className="hover:text-primary transition-colors"
                    >
                      {c.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-border/40 pt-6 sm:flex-row sm:items-center">
            <p className="text-xs text-muted-foreground">
              © {new Date().getFullYear()} Ayush Dev. Crafted with ❤️
            </p>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="inline-flex items-center gap-1.5 rounded-full border border-border/60 bg-card px-3 py-1.5 text-xs font-medium text-muted-foreground transition-all hover:text-primary hover:border-primary/40"
            >
              <ArrowUp className="h-3 w-3" /> Back to top
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
