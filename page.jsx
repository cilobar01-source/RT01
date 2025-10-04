"use client";
import Protected from "@/components/Protected";
import { SuratListAdmin } from "@/components/Surat";

export default function SuratAdminPage() {
  return (
    <Protected allowedRoles={['admin_rt']}>
      <main>
        <h2>Admin Surat</h2>
        <SuratListAdmin />
      </main>
    </Protected>
  );
}
