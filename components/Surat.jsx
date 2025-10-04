"use client";
import { useEffect, useState } from "react";
import { db, auth } from "@/lib/firebase";
import { collection, addDoc, query, where, orderBy, onSnapshot, serverTimestamp, updateDoc, doc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { PDFDocument, StandardFonts } from "pdf-lib";

export function SuratForm() {
  const [uid, setUid] = useState(null);
  const [jenisSurat, setJenisSurat] = useState("domisili");
  const [nama, setNama] = useState("");
  const [nik, setNik] = useState("");
  const [alamat, setAlamat] = useState("");

  useEffect(()=> onAuthStateChanged(auth, (u)=> setUid(u?.uid||null)), []);

  const submit = async (e) => {
    e.preventDefault();
    if (!uid) return alert("Harus login");
    await addDoc(collection(db, "permohonan_surat"), {
      pemohon: uid, jenisSurat, data: { nama, nik, alamat },
      status: "menunggu", dibuatAt: serverTimestamp()
    });
    setNama(""); setNik(""); setAlamat(""); setJenisSurat("domisili");
    alert("Permohonan terkirim.");
  };

  return (
    <form onSubmit={submit}>
      <select value={jenisSurat} onChange={e=>setJenisSurat(e.target.value)}>
        <option value="domisili">Surat Domisili</option>
        <option value="sktm">SKTM</option>
        <option value="pengantar_kk_ktp">Pengantar KK/KTP</option>
      </select>
      <input placeholder="Nama" value={nama} onChange={e=>setNama(e.target.value)} required />
      <input placeholder="NIK" value={nik} onChange={e=>setNik(e.target.value)} required />
      <input placeholder="Alamat" value={alamat} onChange={e=>setAlamat(e.target.value)} required />
      <button type="submit">Ajukan Surat</button>
    </form>
  );
}

export function SuratListAdmin() {
  const [items, setItems] = useState([]);

  useEffect(()=>{
    const q = query(collection(db, "permohonan_surat"), orderBy("dibuatAt","desc"));
    return onSnapshot(q, (snap)=> setItems(snap.docs.map(d=>({id:d.id, ...d.data()}))));
  },[]);

  const approve = async (it) => {
    // generate simple PDF client-side
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([595, 842]); // A4
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const draw = (text, x, y, size=12) => page.drawText(text, { x, y, size, font });
    let y = 800;
    draw("SURAT KETERANGAN", 200, y, 18); y-=30;
    draw("RT 01 / RW 08, Cilosari Barat, Kemijen, Semarang Timur", 80, y); y-=30;
    draw(`Jenis: ${it.jenisSurat}`, 80, y); y-=20;
    draw(`Nama : ${it.data?.nama}`, 80, y); y-=20;
    draw(`NIK  : ${it.data?.nik}`, 80, y); y-=20;
    draw(`Alamat: ${it.data?.alamat}`, 80, y); y-=40;
    draw("Keterangan:", 80, y); y-=20;
    draw("Yang bersangkutan adalah benar warga RT 01/RW 08.", 80, y); y-=20;
    draw("Demikian surat keterangan ini dibuat untuk digunakan sebagaimana mestinya.", 80, y); y-=60;
    draw("Ketua RT 01/RW 08", 80, y); y-=60;
    draw("(...................................)", 80, y);
    const bytes = await pdfDoc.save();
    const blob = new Blob([bytes], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);
    // mark approved and prompt download
    await updateDoc(doc(db,"permohonan_surat", it.id), { status: "disetujui" });
    const a = document.createElement("a");
    a.href = url; a.download = `surat_${it.id}.pdf`; a.click();
    URL.revokeObjectURL(url);
  };

  const reject = async (id) => {
    await updateDoc(doc(db,"permohonan_surat", id), { status: "ditolak" });
  };

  return (
    <section>
      <h3>Permohonan Surat (Admin)</h3>
      <ul>
        {items.map(it=> (
          <li key={it.id} style={{marginBottom:8}}>
            <b>{it.jenisSurat}</b> — <i>{it.status}</i><br/>
            Nama: {it.data?.nama} | NIK: {it.data?.nik} | Alamat: {it.data?.alamat}
            <div style={{marginTop:4}}>
              <button onClick={()=>approve(it)}>Setujui & Unduh PDF</button>
              <button onClick={()=>reject(it.id)} style={{marginLeft:8}}>Tolak</button>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function SuratListSaya() {
  const [items, setItems] = useState([]);
  const [uid, setUid] = useState(null);
  useEffect(()=> onAuthStateChanged(auth, (u)=> setUid(u?.uid||null)), []);
  useEffect(()=>{
    if (!uid) return;
    const q = query(collection(db,"permohonan_surat"), where("pemohon","==",uid), orderBy("dibuatAt","desc"));
    return onSnapshot(q, (snap)=> setItems(snap.docs.map(d=>({id:d.id, ...d.data()}))));
  },[uid]);
  return (
    <section>
      <h3>Permohonan Saya</h3>
      <ul>
        {items.map(it=> (
          <li key={it.id}>
            {it.jenisSurat} — <i>{it.status}</i>
          </li>
        ))}
      </ul>
    </section>
  );
}
