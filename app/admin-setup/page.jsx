"use client";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import { useRouter } from "next/navigation";

/**
 * Halaman ini untuk seed admin pertama.
 * Mekanisme: user login → masukkan "Admin Setup Code" (kode rahasia yang kamu tentukan di ENV) → set role: admin.
 * Setelah berhasil, hapus/rename halaman ini agar tidak bisa disalahgunakan.
 */
export default function AdminSetup() {
  const [user, setUser] = useState(null);
  const [code, setCode] = useState("");
  const [msg, setMsg] = useState("");
  const router = useRouter();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      if (!u) router.replace("/login");
      setUser(u);
    });
    return () => unsub();
  }, [router]);

  const handleMakeAdmin = async (e) => {
    e.preventDefault();
    setMsg("");
    try {
      const setupCode = process.env.NEXT_PUBLIC_ADMIN_SETUP_CODE;
      if (!setupCode) {
        setMsg("ENV NEXT_PUBLIC_ADMIN_SETUP_CODE belum diisi.");
        return;
      }
      if (code !== setupCode) {
        setMsg("Kode salah.");
        return;
      }
      const ref = doc(db, "users", user.uid);
      const snap = await getDoc(ref);
      const data = snap.exists() ? snap.data() : { email: user.email || "", nama: user.displayName || "" };
      await setDoc(ref, { ...data, role: "admin" }, { merge: true });
      setMsg("Berhasil menjadikan akun ini sebagai ADMIN. Silakan buka /dashboard");
    } catch (e2) {
      setMsg(e2.message);
    }
  };

  if (!user) return <main><p>Memeriksa sesi…</p></main>;

  return (
    <main>
      <h2>Admin Setup (Seed Admin Pertama)</h2>
      <p>User: <b>{user.email}</b></p>
      <form onSubmit={handleMakeAdmin}>
        <input placeholder="Masukkan Admin Setup Code" value={code} onChange={e=>setCode(e.target.value)} required />
        <button type="submit">Jadikan Admin</button>
      </form>
      {msg && <p style={{marginTop:8}}>{msg}</p>}
      <p style={{marginTop:16, fontSize:14, opacity:0.8}}>Setelah sukses, hapus file <code>app/admin-setup/page.jsx</code> dari repo.</p>
    </main>
  );
}
