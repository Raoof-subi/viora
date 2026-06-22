"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { Logo } from "@/components/ui/Logo";

export function AdminHeader() {
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <header className="flex shrink-0 items-center justify-between border-b border-white/10 bg-black px-4 py-3">
      <div>
        <Link href="/admin" className="block">
          <Logo size="sm" />
          <p className="mt-1 text-xs text-muted">Content Management</p>
        </Link>
      </div>
      <nav className="flex items-center gap-4">
        <Link href="/admin/settings" className="text-sm text-white/70 hover:text-gold">
          Settings
        </Link>
        <Link
          href="/admin/contact-submissions"
          className="text-sm text-white/70 hover:text-gold"
        >
          Submissions
        </Link>
        <button
          type="button"
          onClick={handleLogout}
          className="inline-flex items-center gap-2 rounded-lg border border-white/10 px-3 py-2 text-sm text-white/80 transition hover:border-gold/40 hover:text-gold"
        >
          <LogOut className="size-4" />
          Logout
        </button>
      </nav>
    </header>
  );
}
