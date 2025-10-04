import "./globals.css";
import Navbar from "@/components/Navbar";
"use client";
import { AnimatePresence, motion } from "framer-motion";

export const metadata = { title:"Portal RT 0108", description:"Portal RT Cilosari Barat RT01/RW08"};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <head><link rel="manifest" href="/manifest.json" /></head>
      <body>
        <Navbar />
        <AnimatePresence mode="wait">
          <motion.div key={Math.random()}
            initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-10}} transition={{duration:0.3}}>
            {children}
          </motion.div>
        </AnimatePresence>
        <script dangerouslySetInnerHTML={{__html:`if('serviceWorker' in navigator){window.addEventListener('load',()=>{navigator.serviceWorker.register('/sw.js').catch(()=>{});});}`}}/>
      </body>
    </html>
  );
}
