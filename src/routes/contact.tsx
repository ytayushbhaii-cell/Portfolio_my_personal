import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Github, Linkedin, Mail, Send, Twitter } from "lucide-react";
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
    { icon: Mail, label: "Email", value: settings?.email || "hello@example.com", href: `mailto:${settings?.email || "hello@example.com"}` },
    { icon: Send, label: "Telegram", value: settings?.telegram || "@ayushdev", href: settings?.telegram ? `https://t.me/${settings.telegram.replace(/^@/, "")}` : "https://t.me/" },
    { icon: Github, label: "GitHub", value: "github.com", href: settings?.github || "https://github.com/" },
    { icon: Twitter, label: "Twitter", value: "twitter.com", href: settings?.twitter || "https://twitter.com/" },
    { icon: Linkedin, label: "LinkedIn", value: "linkedin.com", href: settings?.linkedin || "https://linkedin.com/" },
  ];

  return (
    <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
      <div className="max-w-2xl mb-12">
        <p className="section-label">Contact</p>
        <h1 className="mt-2 font-display text-4xl font-bold tracking-tight sm:text-5xl">Let's build something together.</h1>
        <p className="mt-4 text-muted-foreground">Tell me about your project — I'll reply within a few hours.</p>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr]">
        <form onSubmit={onSubmit} className="surface-card p-6 sm:p-8 space-y-5">
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Your name" name="name" placeholder="John Doe" required />
            <Field label="Email" name="email" type="email" placeholder="john@example.com" required />
          </div>
          <Field label="Subject" name="subject" placeholder="Project inquiry" />
          <div>
            <label className="text-sm font-medium">Message</label>
            <textarea
              name="message"
              required
              minLength={10}
              maxLength={2000}
              rows={6}
              placeholder="Tell me about your project..."
              className="mt-1.5 w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all resize-none"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="btn-primary hover:[&]:btn-primary-hover inline-flex items-center gap-2 rounded-2xl px-6 py-3 text-sm font-semibold disabled:opacity-70"
          >
            <Send className="h-4 w-4" /> {loading ? "Sending..." : "Send message"}
          </button>
        </form>

        <div className="space-y-3">
          {channels.map((c) => (
            <a
              key={c.label}
              href={c.href}
              target="_blank"
              rel="noreferrer"
              className="surface-card hover:[&]:surface-card-hover flex items-center gap-4 p-5"
            >
              <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
                <c.icon className="h-5 w-5" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">{c.label}</div>
                <div className="truncate font-medium">{c.value}</div>
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
      <label className="text-sm font-medium">{label}</label>
      <input
        {...props}
        className="mt-1.5 w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
      />
    </div>
  );
}
