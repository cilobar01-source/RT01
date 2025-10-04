"use client";
import { useState, useEffect } from "react";
import { collection, addDoc, query, orderBy, onSnapshot, serverTimestamp } from "firebase/firestore";
import { db, auth } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";

export default function KasManager({ colName, title }) {
  const [items, setItems] = useState([]);
  const [jenis, setJenis] = useState("pemasukan");
  const [jumlah, setJumlah] = useState("");
  const [keterangan, setKeterangan] = useState("");
  const [uid, setUid] = useState(null);

  useEffect(() => {
    const unsubAuth = onAuthStateChanged(auth, (u) => setUid(u?.uid || null));
    const q = query(collection(db, colName), orderBy("dibuatAt","desc"));
    const unsub = onSnapshot(q, (snap) => {
      setItems(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    });
    return () => {unsub(); unsubAuth();};
  }, [colName]);

  const add = async (e) => {
    e.preventDefault();
    if (!uid) return;
    await addDoc(collection(db, colName), {
      jenis, jumlah: Number(jumlah), keterangan,
      dibuatOleh: uid, dibuatAt: serverTimestamp()
    });
    setJumlah(""); setKeterangan("");
  };

  const saldo = items.reduce((acc, x) => acc + (x.jenis === "pemasukan" ? x.jumlah : -x.jumlah), 0);

  return (
    <section>
      <h3>{title}</h3>
      <form onSubmit={add}>
        <select value={jenis} onChange={e=>setJenis(e.target.value)}>
          <option value="pemasukan">Pemasukan</option>
          <option value="pengeluaran">Pengeluaran</option>
        </select>
        <input type="number" placeholder="Jumlah" value={jumlah} onChange={e=>setJumlah(e.target.value)} required />
        <input placeholder="Keterangan" value={keterangan} onChange={e=>setKeterangan(e.target.value)} required />
        <button type="submit">Tambah</button>
      </form>
      <p><b>Saldo:</b> Rp {saldo.toLocaleString("id-ID")}</p>
      <ul>
        {items.map(it => (
          <li key={it.id}>
            [{it.jenis}] Rp {it.jumlah?.toLocaleString("id-ID")} — {it.keterangan || "-"} {it.dibuatAt?.toDate ? `(${it.dibuatAt.toDate().toLocaleString("id-ID")})` : ""}
          </li>
        ))}
      </ul>
    </section>
  );
}
