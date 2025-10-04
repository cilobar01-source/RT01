"use client";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const go = (role)=>{
    if (role === "admin_rt") router.replace("/dashboard-rt");
    else if (role === "bendahara_rt") router.replace("/bendahara-rt");
    else if (role === "admin_pkk") router.replace("/dashboard-pkk");
    else if (role === "bendahara_pkk") router.replace("/bendahara-pkk");
    else if (role === "admin_kt") router.replace("/dashboard-kt");
    else if (role === "bendahara_kt") router.replace("/bendahara-kt");
    else router.replace("/warga");
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    setErr("");
    setLoading(true);
    try {
      const cred = await signInWithEmailAndPassword(auth, email, password);
      const snap = await getDoc(doc(db, "users", cred.user.uid));
      const role = snap.exists() ? snap.data().role : "warga";
      go(role);
    } catch (e) {
      setErr(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} required />
        <button type="submit" disabled={loading}>{loading ? "Memproses..." : "Login"}</button>
      </form>
      {err && <p style={{color:'crimson'}}>{err}</p>}
      <p><a href="/lupa-password">Lupa password?</a></p>
    </main>
  );
}
