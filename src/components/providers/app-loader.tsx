'use client';

import React, { useState, useEffect, ReactNode } from 'react';
import InitialLoading from '../layout/initial-loading'; // Impor komponen loading

interface AppLoaderProps {
  children: ReactNode;
}

/**
 * Provider untuk menampilkan layar loading awal selama durasi minimum.
 */
export function AppLoader({ children }: AppLoaderProps) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Set timeout untuk menyembunyikan loading setelah 3 detik
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000); // 3000 milidetik = 3 detik

    // Bersihkan timer jika komponen unmount sebelum timeout selesai
    return () => clearTimeout(timer);
  }, []); // Jalankan hanya sekali saat komponen mount

  // Tampilkan loading jika isLoading true, jika tidak tampilkan children
  return isLoading ? <InitialLoading /> : <>{children}</>;
} 