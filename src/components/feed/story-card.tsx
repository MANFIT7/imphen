'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaPlus } from 'react-icons/fa';

interface StoryCardProps {
  name: string;
  avatar?: string; // Avatar opsional untuk "Buat cerita"
  bgImage: string;
  isCreateStory?: boolean;
}

const StoryCard: React.FC<StoryCardProps> = ({ name, avatar, bgImage, isCreateStory = false }) => {
  return (
    <Link href="#" className="block relative w-28 h-48 rounded-xl overflow-hidden shadow-md group shrink-0">
      {/* Background Image */}
      <Image
        src={bgImage}
        alt={`${name} story background`}
        fill
        sizes="(max-width: 768px) 10vw, (max-width: 1200px) 8vw, 7rem" // Perkiraan ukuran untuk optimasi
        className="object-cover group-hover:scale-105 transition-transform duration-300 ease-in-out"
      />

      {/* Overlay Gradient (opsional, untuk kontras teks) */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>

      {isCreateStory ? (
        // === Varian "Buat Cerita" ===
        <div className="absolute inset-0 flex flex-col justify-end items-center pb-2">
          <button className="w-9 h-9 bg-blue-500 rounded-full border-4 border-base-100 flex items-center justify-center mb-1 text-white">
            <FaPlus size={16} />
          </button>
          <span className="text-white text-xs font-semibold text-center">Buat cerita</span>
        </div>
      ) : (
        // === Varian Cerita Biasa ===
        <>
          {/* Avatar (jika ada) */}
          {avatar && (
            <div className="absolute top-2 left-2 avatar border-2 border-blue-500 rounded-full w-9 h-9 overflow-hidden">
              <Image src={avatar} alt={`${name} avatar`} width={36} height={36} />
            </div>
          )}
          {/* Nama */}
          <span className="absolute bottom-2 left-2 right-2 text-white text-xs font-semibold truncate">
            {name}
          </span>
        </>
      )}
    </Link>
  );
};

export default StoryCard;