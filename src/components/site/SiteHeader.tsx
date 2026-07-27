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
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 ${
        scrolled ? "glass-nav shadow-[0_1px_0_0_var(--border)]" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 font-bold tracking-tight group">
          <span className="grid h-9 w-9 place-items-center rounded-xl btn-primary animate-pulse-glow group-hover:scale-105 transition-transform">
            <Code2 className="h-4.5 w-4.5" />
          </span>
          <span className="text-lg font-display">
            Ayush<span className="gradient-text">Dev</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1 rounded-2xl border border-border/50 bg-card/40 px-2 py-1.5 backdrop-blur">
          {links.map((l) => {
            const active = l.to === "/" ? pathname === "/" : pathname.startsWith(l.to);
            return (
              <Link
                key={l.to}
                to={l.to}
                className={`relative rounded-xl px-4 py-1.5 text-sm font-medium transition-all ${
                  active
                    ? "bg-primary/15 text-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                }`}
              >
                {active && (
                  <span className="absolute inset-0 rounded-xl ring-1 ring-primary/30 pointer-events-none" />
                )}
                {l.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            to="/contact"
            className="hidden sm:inline-flex btn-primary hover:[&]:btn-primary-hover items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold"
          >
            Hire Me →
          </Link>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            className="md:hidden grid h-10 w-10 place-items-center rounded-xl border border-border bg-card/60 backdrop-blur text-foreground transition hover:border-primary/40"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-navigation"
          >
            {open ? <X className="h-4.5 w-4.5" /> : <Menu className="h-4.5 w-4.5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div
          id="mobile-navigation"
          className="absolute inset-x-0 top-full md:hidden border-t border-border/50 bg-background/95 shadow-lg backdrop-blur-xl animate-fade-up"
        >
          <nav className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-4">
            {links.map((l) => {
              const active = l.to === "/" ? pathname === "/" : pathname.startsWith(l.to);
              return (
                <Link
                  key={l.to}
                  to={l.to}
                  className={`rounded-xl px-4 py-2.5 text-sm font-medium transition-colors ${
                    active
                      ? "bg-primary/15 text-primary"
                      : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
                  }`}
                >
                  {l.label}
                </Link>
              );
            })}
            <Link
              to="/contact"
              className="mt-2 btn-primary rounded-xl px-4 py-2.5 text-center text-sm font-semibold"
            >
              Hire Me →
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
