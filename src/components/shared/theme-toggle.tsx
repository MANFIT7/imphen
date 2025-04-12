'use client';

import React, { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { FaMoon, FaSun } from 'react-icons/fa';

const ThemeToggle: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  // useEffect hanya berjalan di client, memastikan kita tidak mismatch saat hydration
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Placeholder saat loading
    return <button className="btn btn-ghost btn-circle text-base-content/80" aria-label="Loading theme toggle"><span className="loading loading-spinner loading-sm"></span></button>;
  }

  const toggleTheme = () => {
    setTheme(theme === 'light' || theme === 'system' ? 'dark' : 'light'); // Handle 'system' theme
  };

  // Tentukan ikon mana yang ditampilkan berdasarkan tema AKTIF
  // (theme bisa 'light', 'dark', atau 'system'. Kita perlu resolve 'system')
  // Untuk simplisitas, kita anggap system = light saat render awal
  const isCurrentlyDark = theme === "dark";
  const iconToShow = isCurrentlyDark ? <FaSun size={20} /> : <FaMoon size={20} />;
  const ariaLabel = isCurrentlyDark ? 'Switch to light mode' : 'Switch to dark mode';

  return (
    <button
      onClick={toggleTheme}
      // Tambahkan class warna teks
      className="btn btn-ghost btn-circle text-base-content/80 hover:text-base-content"
      aria-label={ariaLabel}
    >
      {iconToShow}
    </button>
  );
};

export default ThemeToggle; 