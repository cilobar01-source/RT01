"use client";
import Protected from "@/components/Protected";
import KasManager from "@/components/KasManager";

export default function BendaharaRT() {
  return (
    <Protected allowedRoles={['bendahara_rt','admin_rt']}>
      <main>
        <h2>Dashboard Bendahara RT</h2>
        <KasManager colName="kas_rt" title="Kas RT" />
      </main>
    </Protected>
  );
}
