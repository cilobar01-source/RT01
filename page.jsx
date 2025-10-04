"use client";
import Protected from "@/components/Protected";
import KasManager from "@/components/KasManager";

export default function BendaharaKT() {
  return (
    <Protected allowedRoles={['bendahara_kt','admin_kt','admin_rt']}>
      <main>
        <h2>Dashboard Bendahara Karang Taruna</h2>
        <KasManager colName="kas_kt" title="Kas Karang Taruna" />
      </main>
    </Protected>
  );
}
