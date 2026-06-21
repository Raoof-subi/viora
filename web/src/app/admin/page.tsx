import Link from "next/link";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { Settings, Mail } from "lucide-react";

export default function AdminDashboardPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <AdminHeader />
      <main className="mx-auto w-full max-w-4xl flex-1 px-4 py-12">
        <h1 className="font-serif text-3xl text-white">Dashboard</h1>
        <p className="mt-2 text-muted">Manage your VIORA website content.</p>

        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          <Link
            href="/admin/settings"
            className="group rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition hover:border-gold/30"
          >
            <Settings className="size-8 text-gold" />
            <h2 className="mt-4 font-serif text-xl text-white group-hover:text-gold">
              Site Settings
            </h2>
            <p className="mt-2 text-sm text-muted">
              Edit hero text, contact info, and social links.
            </p>
          </Link>

          <Link
            href="/admin/contact-submissions"
            className="group rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition hover:border-gold/30"
          >
            <Mail className="size-8 text-gold" />
            <h2 className="mt-4 font-serif text-xl text-white group-hover:text-gold">
              Contact Submissions
            </h2>
            <p className="mt-2 text-sm text-muted">
              View messages submitted through the contact form.
            </p>
          </Link>
        </div>
      </main>
    </div>
  );
}
