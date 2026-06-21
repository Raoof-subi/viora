import { Suspense } from "react";
import { AdminLoginPage } from "@/components/admin/AdminLoginPage";

export default function AdminLoginRoute() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-black" />}>
      <AdminLoginPage />
    </Suspense>
  );
}
