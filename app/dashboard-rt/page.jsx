"use client";
import Protected from "@/components/Protected";
import KasManager from "@/components/KasManager";
import { LaporanListSemua } from "@/components/Laporan";

export default function DashboardRT() {
  return (
    <Protected allowedRoles={['admin_rt']}>
      <main>
        <h2>Dashboard Admin RT</h2>
        <KasManager colName="kas_rt" title="Kas RT" />
        <hr style={{margin:'16px 0'}}/>
        <h3>Kelola Laporan Warga</h3>
        <LaporanListSemua adminMode />
      </main>
    </Protected>
  );
}
