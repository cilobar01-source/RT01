"use client";
import Protected from "@/components/Protected";
import { LaporanListSaya } from "@/components/Laporan";

export default function LaporanSaya() {
  return (
    <Protected>
      <main>
        <h2>Laporan Saya</h2>
        <LaporanListSaya />
      </main>
    </Protected>
  );
}
