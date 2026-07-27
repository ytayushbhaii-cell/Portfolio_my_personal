import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery, useQueryClient } from "@tanstack/react-query";
import { Mail, Trash2 } from "lucide-react";
import { contactMessagesQuery } from "@/lib/queries";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/_authed/messages")({
  loader: ({ context }) => context.queryClient.ensureQueryData(contactMessagesQuery()),
  component: Messages,
});

function Messages() {
  const messages = useSuspenseQuery(contactMessagesQuery()).data;
  const qc = useQueryClient();

  async function toggleRead(id: string, current: boolean) {
    const { error } = await supabase.from("contact_messages").update({ read: !current }).eq("id", id);
    if (error) toast.error(error.message);
    else qc.invalidateQueries({ queryKey: ["admin", "messages"] });
  }
  async function remove(id: string) {
    if (!confirm("Delete this message?")) return;
    const { error } = await supabase.from("contact_messages").delete().eq("id", id);
    if (error) toast.error(error.message);
    else { toast.success("Deleted"); qc.invalidateQueries({ queryKey: ["admin", "messages"] }); }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Messages</h1>
        <p className="mt-1 text-sm text-muted-foreground">Contact form submissions.</p>
      </div>
      <div className="space-y-3">
        {messages.length === 0 && (
          <div className="surface-card p-10 text-center text-sm text-muted-foreground">Inbox is empty.</div>
        )}
        {messages.map((m) => (
          <div key={m.id} className={`surface-card p-5 ${m.read ? "opacity-70" : ""}`}>
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-semibold">{m.name}</span>
                  <a href={`mailto:${m.email}`} className="text-xs text-primary hover:underline inline-flex items-center gap-1">
                    <Mail className="h-3 w-3" /> {m.email}
                  </a>
                  {!m.read && <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold text-primary">NEW</span>}
                </div>
                {m.subject && <div className="mt-1 text-sm font-medium">{m.subject}</div>}
                <p className="mt-2 whitespace-pre-wrap text-sm text-muted-foreground">{m.message}</p>
                <div className="mt-2 text-xs text-muted-foreground">{new Date(m.created_at).toLocaleString()}</div>
              </div>
              <div className="flex flex-col gap-1">
                <button onClick={() => toggleRead(m.id, m.read)} className="rounded-lg border border-border bg-background px-3 py-1 text-xs font-semibold hover:border-primary/40">
                  {m.read ? "Mark unread" : "Mark read"}
                </button>
                <button onClick={() => remove(m.id)} className="rounded-lg border border-border bg-background px-3 py-1 text-xs font-semibold text-destructive hover:border-destructive">
                  <Trash2 className="h-3 w-3 inline" /> Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
