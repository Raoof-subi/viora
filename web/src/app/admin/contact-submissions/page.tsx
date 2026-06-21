"use client";

import { useEffect, useState } from "react";
import { AdminHeader } from "@/components/admin/AdminHeader";

interface Submission {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  projectType: string;
  message: string;
  submittedAt: string;
}

export default function ContactSubmissionsPage() {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/admin/contact-submissions")
      .then((res) => res.json())
      .then((data) => setSubmissions(data.submissions ?? []))
      .catch(() => setError("Failed to load submissions."));
  }, []);

  return (
    <div className="flex min-h-screen flex-col">
      <AdminHeader />
      <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-12">
        <h1 className="font-serif text-3xl text-white">Contact Submissions</h1>
        <p className="mt-2 text-muted">Messages from the website contact form.</p>

        {error ? <p className="mt-6 text-red-300">{error}</p> : null}

        {submissions.length === 0 && !error ? (
          <p className="mt-8 text-muted">No submissions yet.</p>
        ) : (
          <div className="mt-8 space-y-4">
            {submissions.map((submission) => (
              <article
                key={submission.id}
                className="rounded-xl border border-white/10 bg-white/[0.03] p-5"
              >
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div>
                    <h2 className="font-medium text-white">{submission.name}</h2>
                    <p className="text-sm text-muted">{submission.email}</p>
                  </div>
                  <time className="text-xs text-muted">
                    {new Date(submission.submittedAt).toLocaleString()}
                  </time>
                </div>
                <dl className="mt-4 grid gap-2 text-sm sm:grid-cols-2">
                  <div>
                    <dt className="text-muted">Company</dt>
                    <dd className="text-white/80">{submission.company || "—"}</dd>
                  </div>
                  <div>
                    <dt className="text-muted">Phone</dt>
                    <dd className="text-white/80">{submission.phone || "—"}</dd>
                  </div>
                  <div>
                    <dt className="text-muted">Project Type</dt>
                    <dd className="text-white/80">{submission.projectType}</dd>
                  </div>
                </dl>
                <p className="mt-4 text-sm text-white/80">{submission.message}</p>
              </article>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
