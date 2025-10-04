"use client";
import Link from "next/link";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => setUser(u));
    return () => unsub();
  }, []);

  return (
    <nav style={{display:'flex', gap:12, padding:12, borderBottom:'1px solid #eee', flexWrap:'wrap'}}>
      <Link href="/">Beranda</Link>
      <Link href="/laporan">Laporan RT</Link>
      <Link href="/surat">Surat</Link>
      {!user && <Link href="/login">Login</Link>}
      {!user && <Link href="/register">Daftar</Link>}
      {user && <Link href="/warga">Warga</Link>}
      {user && <Link href="/dashboard-rt">Admin RT</Link>}
      {user && <Link href="/bendahara-rt">Bendahara RT</Link>}
      {user && <Link href="/dashboard-pkk">Admin PKK</Link>}
      {user && <Link href="/bendahara-pkk">Bendahara PKK</Link>}
      {user && <Link href="/dashboard-kt">Admin KT</Link>}
      {user && <Link href="/bendahara-kt">Bendahara KT</Link>}
      {user && (
        <button onClick={() => signOut(auth)} style={{marginLeft:'auto'}}>
          Logout
        </button>
      )}
    </nav>
  );
}
