"use client";
import Protected from "@/components/Protected";
import { SuratForm, SuratListSaya } from "@/components/Surat";

export default function SuratPage() {
  return (
    <Protected>
      <main>
        <h2>Surat Menyurat</h2>
        <SuratForm />
        <hr style={{margin:'16px 0'}}/>
        <SuratListSaya />
      </main>
    </Protected>
  );
}
