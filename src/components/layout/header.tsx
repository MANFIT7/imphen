import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaSearch, FaHome, FaUserFriends, FaImages, FaStore, FaUsers, FaBell, FaFacebookMessenger, FaBars } from 'react-icons/fa'; // Contoh ikon
import ThemeToggle from '../shared/theme-toggle'; // Impor tombol tema

// Definisikan tipe Props untuk Header
interface HeaderProps {
  onMenuToggle: () => void; // Fungsi untuk toggle sidebar mobile
}

const Header: React.FC<HeaderProps> = ({ onMenuToggle }) => {
  const facebookGroupUrl = "https://web.facebook.com/groups/programmerhandal";
  const shopeeMarketplaceUrl = "https://shopee.co.id/imphnen?categoryId=100639&entryPoint=ShopByPDP&itemId=27181096346"; // Tambahkan URL Shopee
  const facebookMediaUrl = "https://web.facebook.com/groups/programmerhandal/media"; // Tambah URL Media

  return (
    <header className="navbar fixed top-0 left-0 right-0 z-50 bg-base-100 shadow-md h-16">
      {/* Bagian Kiri: Logo & Tombol Menu Mobile */}
      <div className="navbar-start">
        {/* Tombol Hamburger - Tambah warna teks */}
        <button
          onClick={onMenuToggle}
          className="btn btn-ghost btn-circle lg:hidden mr-1 text-base-content/80 hover:text-base-content"
          aria-label="Toggle menu"
        >
          <FaBars size={20} />
        </button>

        <Link href="/" className="btn btn-ghost normal-case text-xl px-1 md:px-2">
          {/* Path diperbarui ke root */}
          <Image src="/logo-v1.png" alt="Imphen Logo" width={40} height={40} />
        </Link>
        <div className="form-control ml-2 hidden md:flex">
          <div className="input-group">
            <input type="text" placeholder="Cari di Imphen" className="input input-bordered input-sm" />
            <button className="btn btn-square btn-sm">
              <FaSearch />
            </button>
          </div>
        </div>
      </div>

      {/* Bagian Tengah: Navigasi Utama - Disesuaikan */}
      <div className="navbar-center hidden lg:flex">
        {/* Menggunakan flex dan gap untuk spacing, menghapus menu */}
        <div className="flex items-center gap-1">
          {/* Beranda */}
          <Link
            href="/"
            className="btn btn-ghost px-6 py-2 rounded-lg tooltip tooltip-bottom hover:bg-base-300 text-base-content"
            data-tip="Beranda"
          >
            <FaHome size={22} /> {/* Ukuran ikon dikurangi */}
          </Link>

          {/* Teman (Grup FB) */}
          <a
            href={facebookGroupUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-ghost px-6 py-2 rounded-lg tooltip tooltip-bottom hover:bg-base-300 text-base-content"
            data-tip="Teman (Grup)"
          >
            <FaUserFriends size={22} />
          </a>

          {/* Media (Grup FB Media) */}
          <a
            href={facebookMediaUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-ghost px-6 py-2 rounded-lg tooltip tooltip-bottom hover:bg-base-300 text-base-content"
            data-tip="Media"
          >
            <FaImages size={22} />
          </a>

          {/* Marketplace (arahkeun ke Shopee) */}
          <a
            href={shopeeMarketplaceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-ghost px-6 py-2 rounded-lg tooltip tooltip-bottom hover:bg-base-300 text-base-content"
            data-tip="Marketplace (Shopee)"
          >
            <FaStore size={22} />
          </a>

          {/* Grup (Grup FB) */}
          <a
            href={facebookGroupUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-ghost px-6 py-2 rounded-lg tooltip tooltip-bottom hover:bg-base-300 text-base-content"
            data-tip="Grup Programmer Handal"
          >
            <FaUsers size={22} />
          </a>
        </div>
      </div>

      {/* Bagian Kanan: Aksi & Profil */}
      <div className="navbar-end">
        {/* Tombol Tema */}
        <ThemeToggle />

        {/* Tombol Messenger - Tambah warna teks */}
        <button className="btn btn-ghost btn-circle text-base-content/80 hover:text-base-content">
          <div className="indicator">
            <FaFacebookMessenger size={20} />
            {/* Badge biarkan warna primary */}
            <span className="badge badge-xs badge-primary indicator-item"></span>
          </div>
        </button>

        {/* Tombol Bell - Tambah warna teks */}
        <button className="btn btn-ghost btn-circle text-base-content/80 hover:text-base-content">
          <div className="indicator">
            <FaBell size={20} />
            {/* Badge biarkan warna error */}
            <span className="badge badge-xs badge-error indicator-item"></span>
          </div>
        </button>

        {/* Dropdown Avatar */}
        <div className="dropdown dropdown-end ml-2">
          {/* Tambah warna teks pada label trigger */}
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar text-base-content/80 hover:text-base-content">
            <div className="w-10 rounded-full">
              <Image src="/logo-v1.png" alt="User Avatar" width={40} height={40} />
            </div>
          </label>
          <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
            <li>
              <a className="justify-between text-base-content hover:bg-base-200">
                Profil
                <span className="badge badge-neutral text-neutral-content">Baru</span>
              </a>
            </li>
            <li>
              <a className="text-base-content hover:bg-base-200">Pengaturan</a>
            </li>
            <li>
              <a className="text-base-content hover:bg-base-200">Keluar</a>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header; 