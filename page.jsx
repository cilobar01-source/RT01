"use client";
import { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleRegister = async (e) => {
    e.preventDefault();
    setErr("");
    setLoading(true);
    try {
      const cred = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(cred.user, { displayName: nama });
      await setDoc(doc(db, "users", cred.user.uid), {
        nama,
        email,
        role: "warga",
        createdAt: serverTimestamp(),
      });
      // Default warga
      router.replace("/warga");
    } catch (e) {
      setErr(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main>
      <h2>Daftar Akun Baru</h2>
      <form onSubmit={handleRegister}>
        <input placeholder="Nama Lengkap" value={nama} onChange={e=>setNama(e.target.value)} required />
        <input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} required />
        <button type="submit" disabled={loading}>{loading ? "Memproses..." : "Daftar"}</button>
      </form>
      {err && <p style={{color:'crimson'}}>{err}</p>}
    </main>
  );
}
