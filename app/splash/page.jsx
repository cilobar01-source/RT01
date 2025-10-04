"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

export default function Splash() {
  const [show, setShow] = useState(true);
  const router = useRouter();
  useEffect(()=>{ setTimeout(()=>{setShow(false);router.push("/");},2500)},[router]);
  return (
    <AnimatePresence>
      {show && (
        <motion.div className="flex items-center justify-center h-screen bg-gradient-to-br from-red-600 via-yellow-400 to-blue-800"
          initial={{opacity:1}} exit={{opacity:0}}>
          <div className="text-center">
            <Image src="/icon-192.png" alt="Logo RT" width={120} height={120} className="mx-auto mb-4"/>
            <h1 className="text-white text-2xl font-bold">Portal RT 01/RW 08</h1>
            <p className="text-white">Cilosari Barat, Kemijen, Semarang Timur</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
