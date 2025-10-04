# RT Portal — Next.js 14 + Firebase (Auth & Firestore) + PWA

Fitur:
- Register & Login (Email/Password)
- Simpan profil/role di Firestore: `users/{uid}`
- Redirect otomatis sesuai role: `admin` → /dashboard, `pkk` → /pkk, `karangtaruna` → /karangtaruna, default → /warga
- Guard halaman: hanya role tertentu yang bisa akses
- PWA dasar (service worker + manifest)

## Jalankan Lokal
```bash
npm install
cp .env.example .env.local  # isi sesuai Firebase project kamu
npm run dev
```

## Deploy
- **Vercel/Netlify/Firebase Hosting** — tambahkan seluruh variabel env dari `.env.example` ke dashboard environment variables.
- Netlify: Base directory kosong (root), Build `npm run build`, Publish `.next`.

## Struktur
- `app/` — routing Next.js (app router)
- `lib/firebase.js` — init Firebase
- `components/Protected.jsx` — guard berdasarkan role
- `public/manifest.json` + `public/sw.js` — PWA


## Seed Admin Pertama
1. Set variabel env `NEXT_PUBLIC_ADMIN_SETUP_CODE`.
2. Deploy / jalankan lokal, login dengan akun yang ingin dijadikan admin.
3. Buka `/admin-setup`, masukkan kode tadi → role akun jadi `admin`.
4. **Keamanan**: hapus halaman `app/admin-setup/page.jsx` setelah selesai.

## Firestore Rules
Gunakan file `firestore.rules` lalu deploy via Firebase CLI:
```bash
firebase init firestore  # jika belum
firebase deploy --only firestore
```


## Fitur Tambahan (Versi Final)
- **Role lengkap**: admin_rt, bendahara_rt, admin_pkk, bendahara_pkk, admin_kt, bendahara_kt, warga.
- **Kas**: /dashboard-rt, /bendahara-rt, /dashboard-pkk, /bendahara-pkk, /dashboard-kt, /bendahara-kt.
- **Laporan RT**: /laporan (buat), /laporan-saya (pantau), admin kelola di /dashboard-rt.
- **Surat Digital**: /surat (ajukan), /surat-admin (approve + generate PDF client-side).

### Catatan
- PDF surat dibuat **client-side** memakai `pdf-lib` saat admin menyetujui, dan langsung terunduh.
- Untuk simpan PDF ke Storage, bisa ditambahkan integrasi `getStorage()` dan `uploadBytes()`.


## Animasi & Splash
- Splash screen di `/splash` muncul 2.5 detik awal dengan logo + nama RT.
- Transisi halaman halus via framer-motion.
- TailwindCSS dipakai untuk styling gradient background.
