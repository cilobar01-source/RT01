"use client";
import { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "@/lib/firebase";

export default function LupaPassword() {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");

  const handleReset = async (e) => {
    e.preventDefault();
    setMsg("");
    try {
      await sendPasswordResetEmail(auth, email);
      setMsg("Email reset telah dikirim.");
    } catch (e) {
      setMsg(e.message);
    }
  };

  return (
    <main>
      <h2>Lupa Password</h2>
      <form onSubmit={handleReset}>
        <input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} required />
        <button type="submit">Kirim Email Reset</button>
      </form>
      {msg && <p>{msg}</p>}
    </main>
  );
}
