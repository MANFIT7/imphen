import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaGift, FaSearch, FaEllipsisH } from 'react-icons/fa';

const RightSidebar: React.FC = () => {
  // Ganti semua avatar kontak menjadi logo imphen
  const logoPath = "/logo-v1.png";
  const contacts = [
    { name: "Rizky Alam", online: true, avatar: logoPath },
    { name: "NekoFi", online: true, avatar: logoPath },
    { name: "Maulana Sodiqin", online: false, avatar: logoPath },
    { name: "Andika NP", online: true, avatar: logoPath },
    { name: "Anif Yuliansyah", online: false, avatar: logoPath },
    { name: "Naufal Azmi", online: true, avatar: logoPath },
    { name: "Muhammadalif Ramadhan", online: true, avatar: logoPath },
    { name: "Othea Glew", online: false, avatar: logoPath },
    { name: "Anka Tama", online: true, avatar: logoPath },
    { name: "Jun Tralala", online: false, avatar: logoPath },
    { name: "Fathin Halim", online: true, avatar: logoPath },
    { name: "Fahim Ardani", online: false, avatar: logoPath },
    { name: "Muhammad Zakir Ramadhan", online: true, avatar: logoPath },
    { name: "Ariq Khoiri", online: true, avatar: logoPath },
    { name: "Muhamad Zidna Fadla", online: false, avatar: logoPath },
    { name: "Ega Gofur", online: true, avatar: logoPath },
    { name: "Muhammad Cikadap", online: false, avatar: logoPath },
    { name: "M Azharil Naufal", online: true, avatar: logoPath },
    { name: "Ahmad Habibi", online: true, avatar: logoPath },
    { name: "Taufik Hidayat", online: false, avatar: logoPath },
    { name: "Hafid Nur", online: true, avatar: logoPath },
    { name: "Bima Priambodo", online: false, avatar: logoPath },
  ];

  return (
    <aside className="hidden xl:block w-72 p-4 sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto bg-base-100">
      {/* Bagian Sponsor */}
      <div className="mb-4">
        <h2 className="text-sm font-semibold text-base-content/80 mb-2">Bersponsor</h2>
        <Link href="#" className="flex items-center space-x-2 p-2 rounded-lg hover:bg-base-300">
          <Image src="/sponsor-placeholder.png" alt="Sponsor" width={100} height={70} className="rounded-lg object-cover" />
          <div>
            <p className="text-sm font-semibold text-base-content">Judul Sponsor</p>
            <p className="text-xs text-base-content/70">website-sponsor.com</p>
          </div>
        </Link>
      </div>

      <div className="divider"></div>

      {/* Bagian Ulang Tahun */}
      <div className="my-4">
        <h2 className="text-sm font-semibold text-base-content/80 mb-2">Ulang Tahun</h2>
        <Link href="#" className="flex items-center space-x-3 p-2">
          <FaGift className="w-8 h-8 text-pink-500 flex-shrink-0" />
          <p className="text-sm text-base-content">
            Teman Anda ada yang berulang tahun pada <strong>29 Des 2023</strong>.
          </p>
        </Link>
      </div>

      <div className="divider"></div>

      {/* Bagian Kontak */}
      <div className="my-4">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-sm font-semibold text-base-content/80">Kontak Admin Dan Moderator</h2>
          <div className="flex space-x-1">
            <button className="btn btn-ghost btn-circle btn-xs text-base-content/70 hover:text-base-content"><FaSearch /></button>
            <button className="btn btn-ghost btn-circle btn-xs text-base-content/70 hover:text-base-content"><FaEllipsisH /></button>
          </div>
        </div>
        <ul className="space-y-2">
          {contacts.map((contact, index) => (
            <li key={index}>
              <Link href="#" className="flex items-center space-x-3 p-1.5 rounded-lg hover:bg-base-300">
                <div className="avatar relative">
                  <div className="w-7 rounded-full">
                    <Image src={contact.avatar} alt={contact.name} width={28} height={28} />
                  </div>
                  {contact.online && (
                    <span className="absolute bottom-0 right-0 block h-2 w-2 rounded-full bg-green-500 ring-2 ring-white"></span>
                  )}
                </div>
                <span className="text-sm font-medium truncate text-base-content" title={contact.name}>{contact.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default RightSidebar; 