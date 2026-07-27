import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Github, Linkedin, Mail, Send, MessageSquare, Clock, Globe } from "lucide-react";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { settingsQuery } from "@/lib/queries";
import { toast } from "sonner";

export const Route = createFileRoute("/contact")({
  loader: ({ context }) => context.queryClient.ensureQueryData(settingsQuery()),
  head: () => ({
    meta: [
      { title: "Contact — Ayush Dev" },
      { name: "description", content: "Get in touch with Ayush Dev for freelance projects." },
      { property: "og:title", content: "Contact — Ayush Dev" },
    ],
  }),
  component: Contact,
});

const schema = z.object({
  name: z.string().trim().min(2, "Name is too short").max(80),
  email: z.string().trim().email("Invalid email"),
  subject: z.string().trim().max(120).optional(),
  message: z.string().trim().min(10, "Message too short").max(2000),
});

function Contact() {
  const settings = useSuspenseQuery(settingsQuery()).data;
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const parsed = schema.safeParse({
      name: fd.get("name"),
      email: fd.get("email"),
      subject: fd.get("subject") || undefined,
      message: fd.get("message"),
    });
    if (!parsed.success) { toast.error(parsed.error.issues[0]?.message || "Invalid form"); return; }
    setLoading(true);
    const { error } = await supabase.from("contact_messages").insert(parsed.data);
    setLoading(false);
    if (error) { toast.error(error.message); return; }
    toast.success("Message sent — I'll get back to you soon!");
    e.currentTarget.reset();
  }

  const channels = [
    { icon: Mail, label: "Email", value: settings?.email || "hello@example.com", href: `mailto:${settings?.email || "hello@example.com"}`, color: "text-red-400 bg-red-500/15 border-red-500/20" },
    { icon: Send, label: "Telegram", value: settings?.telegram || "@ayushdev", href: settings?.telegram ? `https://t.me/${settings.telegram.replace(/^@/, "")}` : "https://t.me/", color: "text-sky-400 bg-sky-500/15 border-sky-500/20" },
    { icon: Github, label: "GitHub", value: "github.com", href: settings?.github || "https://github.com/", color: "text-gray-300 bg-gray-500/15 border-gray-500/20" },
    { icon: Linkedin, label: "LinkedIn", value: "linkedin.com", href: settings?.linkedin || "https://linkedin.com/", color: "text-blue-400 bg-blue-500/15 border-blue-500/20" },
  ];

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="max-w-2xl mb-12">
        <p className="section-label">Contact</p>
        <h1 className="mt-3 font-display text-4xl font-bold tracking-tight sm:text-5xl">
          Let's build something <span className="gradient-text">together.</span>
        </h1>
        <p className="mt-4 text-muted-foreground leading-relaxed">
          Tell me about your project — I'll reply within a few hours.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1.5fr_1fr]">
        {/* Form */}
        <form onSubmit={onSubmit} className="glass-card p-6 sm:p-8 space-y-5">
          <h2 className="font-display text-lg font-semibold mb-2">Send a message</h2>
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Your name" name="name" placeholder="John Doe" required />
            <Field label="Email address" name="email" type="email" placeholder="john@example.com" required />
          </div>
          <Field label="Subject" name="subject" placeholder="Project inquiry" />
          <div>
            <label className="text-sm font-medium text-foreground/80 block mb-1.5">Message</label>
            <textarea
              name="message"
              required
              minLength={10}
              maxLength={2000}
              rows={6}
              placeholder="Tell me about your project..."
              className="w-full rounded-2xl border border-border/60 bg-background/60 px-4 py-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-muted-foreground/60 resize-none"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="btn-primary hover:[&]:btn-primary-hover inline-flex items-center gap-2 rounded-2xl px-7 py-3.5 text-sm font-semibold disabled:opacity-60 disabled:cursor-not-allowed w-full justify-center sm:w-auto"
          >
            <Send className="h-4 w-4" /> {loading ? "Sending..." : "Send message"}
          </button>
        </form>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Quick info */}
          <div className="glass-card p-5 space-y-4">
            <h3 className="font-display font-semibold text-sm text-muted-foreground uppercase tracking-wider">Quick info</h3>
            {[
              { icon: Clock, label: "Response time", value: "Within a few hours" },
              { icon: Globe, label: "Available", value: "Worldwide, remote" },
              { icon: MessageSquare, label: "Preferred", value: "Telegram or Email" },
            ].map((i) => (
              <div key={i.label} className="flex items-center gap-3">
                <div className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-primary/10 border border-primary/15 text-primary">
                  <i.icon className="h-4 w-4" />
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">{i.label}</div>
                  <div className="text-sm font-medium">{i.value}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Channels */}
          {channels.map((c) => (
            <a
              key={c.label}
              href={c.href}
              target="_blank"
              rel="noreferrer"
              className="glass-card hover:[&]:glass-card-hover flex items-center gap-4 p-4"
            >
              <div className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl border ${c.color}`}>
                <c.icon className="h-4.5 w-4.5" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">{c.label}</div>
                <div className="truncate text-sm font-medium">{c.value}</div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

function Field({ label, ...props }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <label className="text-sm font-medium text-foreground/80 block mb-1.5">{label}</label>
      <input
        {...props}
        className="w-full rounded-2xl border border-border/60 bg-background/60 px-4 py-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-muted-foreground/60"
      />
    </div>
  );
}
