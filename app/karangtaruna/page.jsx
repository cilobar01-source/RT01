"use client";
import Protected from "@/components/Protected";

export default function KarangTaruna() {
  return (
    <Protected allowedRoles={['karangtaruna','admin']}>
      <main>
        <h2>Halaman Karang Taruna</h2>
        <p>Event kepemudaan, jadwal, dan kolaborasi.</p>
      </main>
    </Protected>
  );
}
