"use client";
import Protected from "@/components/Protected";

export default function Warga() {
  return (
    <Protected>
      <main>
        <h2>Halaman Warga</h2>
        <p>Lihat pengumuman, agenda, dan UMKM.</p>
      </main>
    </Protected>
  );
}
