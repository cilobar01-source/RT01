"use client";
import Protected from "@/components/Protected";
import KasManager from "@/components/KasManager";

export default function BendaharaPKK() {
  return (
    <Protected allowedRoles={['bendahara_pkk','admin_pkk','admin_rt']}>
      <main>
        <h2>Dashboard Bendahara PKK</h2>
        <KasManager colName="kas_pkk" title="Kas PKK" />
      </main>
    </Protected>
  );
}
