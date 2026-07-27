import { Link } from "@tanstack/react-router";
import { Send, Mail, Github, Twitter, Linkedin, ArrowUp } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-border bg-card">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="text-xl font-bold">
              Ayush<span className="gradient-text">Dev</span>
            </div>
            <p className="mt-3 max-w-md text-sm text-muted-foreground">
              Building Modern Android Apps, Websites & Telegram Bots. Available for freelance
              work worldwide.
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
                  className="grid h-10 w-10 place-items-center rounded-xl border border-border bg-background text-muted-foreground transition hover:text-primary hover:border-primary/40"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <div className="text-sm font-semibold">Explore</div>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li><Link to="/projects" className="hover:text-primary">Projects</Link></li>
              <li><Link to="/services" className="hover:text-primary">Services</Link></li>
              <li><Link to="/about" className="hover:text-primary">About</Link></li>
              <li><Link to="/contact" className="hover:text-primary">Contact</Link></li>
            </ul>
          </div>

          <div>
            <div className="text-sm font-semibold">Categories</div>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li><Link to="/projects" search={{ category: "apps" } as never} className="hover:text-primary">Android Apps</Link></li>
              <li><Link to="/projects" search={{ category: "websites" } as never} className="hover:text-primary">Websites</Link></li>
              <li><Link to="/projects" search={{ category: "telegram-bots" } as never} className="hover:text-primary">Telegram Bots</Link></li>
              <li><Link to="/projects" search={{ category: "automation" } as never} className="hover:text-primary">Automation</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-3 border-t border-border pt-6 sm:flex-row sm:items-center">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Ayush Dev. All rights reserved.
          </p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-3 py-1.5 text-xs font-medium text-muted-foreground hover:text-foreground"
          >
            Back to top <ArrowUp className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
