"use client";

import { useEffect, useState } from "react";
import { AdminHeader } from "@/components/admin/AdminHeader";
import type { SiteSettings } from "@/types";

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    fetch("/api/admin/settings")
      .then((res) => res.json())
      .then((data) => setSettings(data))
      .catch(() => setError("Failed to load settings."));
  }, []);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!settings) return;

    setIsSaving(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await fetch("/api/admin/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });

      if (!response.ok) {
        const data = await response.json();
        setError(data.error ?? "Failed to save settings.");
        return;
      }

      setSuccess(true);
    } catch {
      setError("Failed to save settings.");
    } finally {
      setIsSaving(false);
    }
  }

  if (!settings) {
    return (
      <div className="flex min-h-screen flex-col">
        <AdminHeader />
        <main className="flex flex-1 items-center justify-center text-muted">
          {error ?? "Loading settings..."}
        </main>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col">
      <AdminHeader />
      <main className="mx-auto w-full max-w-2xl flex-1 px-4 py-12">
        <h1 className="font-serif text-3xl text-white">Site Settings</h1>
        <p className="mt-2 text-muted">Update homepage hero and contact information.</p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          {(
            [
              ["siteName", "Site Name"],
              ["tagline", "Tagline"],
              ["heroHeadline", "Hero Headline"],
              ["heroSubheading", "Hero Subheading"],
              ["heroVideoUrl", "Hero Video URL"],
              ["heroPosterUrl", "Hero Poster URL"],
              ["logoText", "Logo Text"],
              ["email", "Email"],
              ["phone", "Phone"],
              ["address", "Address"],
              ["whatsappNumber", "WhatsApp Number"],
            ] as const
          ).map(([key, label]) => (
            <div key={key}>
              <label className="mb-2 block text-sm text-white/80">{label}</label>
              <input
                type="text"
                value={settings[key] ?? ""}
                onChange={(e) => setSettings({ ...settings, [key]: e.target.value })}
                className="w-full rounded-lg border border-white/10 bg-black px-4 py-3 text-white outline-none focus:border-gold/50"
              />
            </div>
          ))}

          {error ? <p className="text-sm text-red-300">{error}</p> : null}
          {success ? <p className="text-sm text-green-400">Settings saved successfully.</p> : null}

          <button
            type="submit"
            disabled={isSaving}
            className="rounded-lg bg-gold px-6 py-3 text-sm font-medium text-black hover:bg-gold-light disabled:opacity-60"
          >
            {isSaving ? "Saving..." : "Save Settings"}
          </button>
        </form>
      </main>
    </div>
  );
}
