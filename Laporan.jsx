"use client";
import { useEffect, useState } from "react";
import { db, auth } from "@/lib/firebase";
import { collection, addDoc, query, where, orderBy, onSnapshot, serverTimestamp, updateDoc, doc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

export function LaporanForm() {
  const [judul, setJudul] = useState("");
  const [kategori, setKategori] = useState("infrastruktur");
  const [deskripsi, setDeskripsi] = useState("");
  const [lokasi, setLokasi] = useState("");
  const [publik, setPublik] = useState(true);
  const [uid, setUid] = useState(null);

  useEffect(()=>{
    return onAuthStateChanged(auth, (u)=> setUid(u?.uid || null));
  },[]);

  const submit = async (e) => {
    e.preventDefault();
    if (!uid) return alert("Login dulu.");
    await addDoc(collection(db, "laporan_rt"), {
      judul, kategori, deskripsi, lokasi, publik,
      dibuatOleh: uid, status: "menunggu", dibuatAt: serverTimestamp()
    });
    setJudul(""); setDeskripsi(""); setLokasi(""); setKategori("infrastruktur"); setPublik(true);
    alert("Laporan terkirim.");
  };

  return (
    <form onSubmit={submit}>
      <input placeholder="Judul" value={judul} onChange={e=>setJudul(e.target.value)} required />
      <select value={kategori} onChange={e=>setKategori(e.target.value)}>
        <option value="infrastruktur">Infrastruktur</option>
        <option value="kebersihan">Kebersihan</option>
        <option value="keamanan">Keamanan</option>
        <option value="lainnya">Lainnya</option>
      </select>
      <textarea placeholder="Deskripsi" value={deskripsi} onChange={e=>setDeskripsi(e.target.value)} required />
      <input placeholder="Lokasi (ringkas)" value={lokasi} onChange={e=>setLokasi(e.target.value)} required />
      <label><input type="checkbox" checked={publik} onChange={e=>setPublik(e.target.checked)} /> Publik</label>
      <button type="submit">Kirim Laporan</button>
    </form>
  );
}

export function LaporanListSemua({ adminMode=false }) {
  const [items, setItems] = useState([]);

  useEffect(()=>{
    const q = query(collection(db, "laporan_rt"), orderBy("dibuatAt","desc"));
    return onSnapshot(q, (snap)=> setItems(snap.docs.map(d=>({id:d.id, ...d.data()}))));
  },[]);

  const setStatus = async (id, status)=>{
    await updateDoc(doc(db,"laporan_rt",id), { status });
  };

  return (
    <section>
      <h3>Daftar Laporan</h3>
      <ul>
        {items.map((x)=> (
          <li key={x.id} style={{marginBottom:8}}>
            <b>{x.judul}</b> — {x.kategori} — <i>{x.status}</i><br/>
            {x.deskripsi}<br/>
            Lokasi: {x.lokasi} | Publik: {x.publik ? "Ya":"Tidak"}
            {adminMode && (
              <div style={{marginTop:4}}>
                <button onClick={()=>setStatus(x.id,"menunggu")}>Menunggu</button>
                <button onClick={()=>setStatus(x.id,"diproses")}>Diproses</button>
                <button onClick={()=>setStatus(x.id,"selesai")}>Selesai</button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}

export function LaporanListSaya() {
  const [items, setItems] = useState([]);
  const [uid, setUid] = useState(null);
  useEffect(()=>{
    return onAuthStateChanged(auth, (u)=> setUid(u?.uid || null));
  },[]);

  useEffect(()=>{
    if (!uid) return;
    const q = query(collection(db, "laporan_rt"), where("dibuatOleh","==",uid), orderBy("dibuatAt","desc"));
    return onSnapshot(q, (snap)=> setItems(snap.docs.map(d=>({id:d.id, ...d.data()}))));
  },[uid]);

  return (
    <section>
      <h3>Laporan Saya</h3>
      <ul>
        {items.map((x)=> (
          <li key={x.id} style={{marginBottom:8}}>
            <b>{x.judul}</b> — {x.kategori} — <i>{x.status}</i><br/>
            {x.deskripsi}<br/>
            Lokasi: {x.lokasi}
          </li>
        ))}
      </ul>
    </section>
  );
}
