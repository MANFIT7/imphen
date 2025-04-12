'use client'; // Tandai sebagai Client Component karena menggunakan framer-motion

import Image from 'next/image';
import { motion } from 'framer-motion';

/**
 * Komponen untuk menampilkan animasi loading awal.
 */
export default function InitialLoading() {
  return (
    // Container full-screen, di atas konten lain (z-50), dengan background
    <div className="fixed inset-0 flex items-center justify-center bg-base-100 z-50">
      <motion.div
        // Animasi awal: tidak terlihat
        initial={{ opacity: 0 }}
        // Animasi muncul: fade in dan pulse (sedikit membesar-mengecil)
        animate={{ opacity: 1, scale: [1, 1.05, 1] }}
        // Pengaturan transisi
        transition={{
          opacity: { duration: 0.4, ease: 'easeInOut' },
          scale: {
            duration: 1.2, // Durasi satu siklus pulse
            repeat: Infinity, // Ulangi tanpa henti
            ease: 'easeInOut', // Gerakan halus
            repeatType: 'loop', // Loop animasi scale
          },
        }}
      >
        <Image
          src="/logo-v1.png"
          alt="Memuat Imphen..."
          width={160} // Sesuaikan ukuran sesuai kebutuhan
          height={160} // Sesuaikan ukuran sesuai kebutuhan
          className="w-40 h-auto" // Kontrol ukuran tampilan
          priority // Prioritaskan pemuatan gambar logo
        />
      </motion.div>
    </div>
  );
} 