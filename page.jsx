"use client";
import Protected from "@/components/Protected";
import KasManager from "@/components/KasManager";

export default function DashboardPKK() {
  return (
    <Protected allowedRoles={['admin_pkk','admin_rt']}>
      <main>
        <h2>Dashboard Admin PKK</h2>
        <p>Agenda & pengumuman PKK (placeholder)</p>
        <KasManager colName="kas_pkk" title="Kas PKK (read/write Bendahara PKK)" />
      </main>
    </Protected>
  );
}
