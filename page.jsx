"use client";
import Protected from "@/components/Protected";
import { LaporanForm, LaporanListSemua } from "@/components/Laporan";

export default function LaporanRT() {
  return (
    <Protected>
      <main>
        <h2>Laporan RT</h2>
        <LaporanForm />
        <hr style={{margin:'16px 0'}}/>
        {/* Tampilkan daftar publik (admin nanti punya halaman khusus) */}
        <LaporanListSemua adminMode={false} />
      </main>
    </Protected>
  );
}
