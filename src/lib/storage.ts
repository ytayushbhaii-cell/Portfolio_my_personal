import { supabase } from "@/integrations/supabase/client";

const BUCKET = "project-media";
// 10-year signed URLs so we can serve private-bucket assets as effectively public.
const LONG_EXPIRY = 60 * 60 * 24 * 365 * 10;

export async function uploadProjectMedia(file: File, folder: string): Promise<string> {
  const ext = file.name.split(".").pop() || "bin";
  const path = `${folder}/${crypto.randomUUID()}.${ext}`;
  const { error } = await supabase.storage.from(BUCKET).upload(path, file, {
    cacheControl: "31536000",
    upsert: false,
    contentType: file.type || undefined,
  });
  if (error) throw error;
  const { data, error: signErr } = await supabase.storage
    .from(BUCKET)
    .createSignedUrl(path, LONG_EXPIRY);
  if (signErr || !data) throw signErr || new Error("Failed to sign URL");
  return data.signedUrl;
}
