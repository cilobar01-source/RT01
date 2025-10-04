"use client";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import { useRouter } from "next/navigation";

export default function Protected({ children, allowedRoles = [] }) {
  const [loading, setLoading] = useState(true);
  const [allowed, setAllowed] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        router.replace("/login");
        return;
      }
      const snap = await getDoc(doc(db, "users", user.uid));
      const role = snap.exists() ? snap.data().role : "warga";

      if (allowedRoles.length === 0 || allowedRoles.includes(role)) {
        setAllowed(true);
      } else {
        // Redirect sesuai role khusus dashboard
        if (role === "admin_rt") router.replace("/dashboard-rt");
        else if (role === "bendahara_rt") router.replace("/bendahara-rt");
        else if (role === "admin_pkk") router.replace("/dashboard-pkk");
        else if (role === "bendahara_pkk") router.replace("/bendahara-pkk");
        else if (role === "admin_kt") router.replace("/dashboard-kt");
        else if (role === "bendahara_kt") router.replace("/bendahara-kt");
        else router.replace("/warga");
      }
      setLoading(false);
    });
    return () => unsub();
  }, [allowedRoles, router]);

  if (loading) return <p style={{padding:16}}>Memeriksa akses…</p>;
  if (!allowed) return null;
  return children;
}
