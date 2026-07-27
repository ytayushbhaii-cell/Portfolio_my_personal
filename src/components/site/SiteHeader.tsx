import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X, Code2 } from "lucide-react";

const links = [
  { to: "/", label: "Home" },
  { to: "/projects", label: "Projects" },
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/contact", label: "Contact" },
];

export function SiteHeader() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setOpen(false); }, [pathname]);

  return (
    <header className={`sticky top-0 z-40 glass-nav transition-shadow ${scrolled ? "shadow-[0_1px_0_0_var(--border)]" : ""}`}>
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2 font-bold tracking-tight">
          <span className="grid h-9 w-9 place-items-center rounded-xl btn-primary">
            <Code2 className="h-5 w-5" />
          </span>
          <span className="text-lg">Ayush<span className="gradient-text">Dev</span></span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {links.map((l) => {
            const active = l.to === "/" ? pathname === "/" : pathname.startsWith(l.to);
            return (
              <Link
                key={l.to}
                to={l.to}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  active ? "bg-primary/10 text-primary" : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                }`}
              >
                {l.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            to="/contact"
            className="hidden sm:inline-flex btn-primary hover:[&]:btn-primary-hover items-center rounded-full px-4 py-2 text-sm font-semibold"
          >
            Hire Me
          </Link>
          <button
            onClick={() => setOpen((o) => !o)}
            className="md:hidden grid h-10 w-10 place-items-center rounded-xl border border-border bg-card"
            aria-label="Menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-border bg-background/95 backdrop-blur">
          <nav className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-3">
            {links.map((l) => (
              <Link key={l.to} to={l.to} className="rounded-lg px-3 py-2 text-sm font-medium hover:bg-secondary">
                {l.label}
              </Link>
            ))}
            <Link to="/contact" className="mt-1 btn-primary rounded-xl px-3 py-2 text-center text-sm font-semibold">Hire Me</Link>
          </nav>
        </div>
      )}
    </header>
  );
}
