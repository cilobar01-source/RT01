"use client";
import Protected from "@/components/Protected";

export default function PKK() {
  return (
    <Protected allowedRoles={['pkk','admin']}>
      <main>
        <h2>Halaman PKK</h2>
        <p>Informasi kegiatan dan pengumuman khusus PKK.</p>
      </main>
    </Protected>
  );
}
