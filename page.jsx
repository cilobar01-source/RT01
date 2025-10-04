"use client";
import Protected from "@/components/Protected";
import KasManager from "@/components/KasManager";

export default function DashboardKT() {
  return (
    <Protected allowedRoles={['admin_kt','admin_rt']}>
      <main>
        <h2>Dashboard Admin Karang Taruna</h2>
        <p>Agenda & pengumuman KT (placeholder)</p>
        <KasManager colName="kas_kt" title="Kas Karang Taruna (read/write Bendahara KT)" />
      </main>
    </Protected>
  );
}
