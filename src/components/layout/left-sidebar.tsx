import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  HiUserGroup, HiClock, HiShoppingBag, HiCalendar, HiFlag, HiChevronDown, HiPhotograph,
  HiInformationCircle
} from 'react-icons/hi';
import clsx from 'clsx';

// Definisikan tipe Props untuk LeftSidebar
interface LeftSidebarProps {
  isOpenOnMobile: boolean; // State dari parent
}

const LeftSidebar: React.FC<LeftSidebarProps> = ({ isOpenOnMobile }) => {
  const userName = "Imphen";
  const profileImageUrl = "/logo-v1.png";
  const facebookGroupUrl = "https://web.facebook.com/groups/programmerhandal";
  const shopeeMarketplaceUrl = "https://shopee.co.id/imphnen?categoryId=100639&entryPoint=ShopByPDP&itemId=27181096346";
  const discordGroupUrl = "https://discord.gg/SQkpyFBASF";
  const facebookPageUrl = "https://web.facebook.com/profile.php?id=61555355507836";
  const facebookEventsUrl = "https://web.facebook.com/groups/programmerhandal/events";
  const facebookMediaUrl = "https://web.facebook.com/groups/programmerhandal/media";
  const facebookAnnouncementsUrl = "https://web.facebook.com/groups/programmerhandal/announcements";
  const facebookMembersUrl = "https://web.facebook.com/groups/programmerhandal/members";
  const facebookAboutUrl = "https://web.facebook.com/groups/programmerhandal/about";

  const menuItems = [
    { icon: HiUserGroup, label: "Member", href: facebookMembersUrl },
    { icon: HiClock, label: "Kenangan", href: facebookAnnouncementsUrl },
    { icon: HiInformationCircle, label: "About", href: facebookAboutUrl },
    { icon: HiUserGroup, label: "Grup", href: facebookGroupUrl },
    { icon: HiShoppingBag, label: "Marketplace", href: shopeeMarketplaceUrl },
    { icon: HiPhotograph, label: "Media", href: facebookMediaUrl },
    { icon: HiCalendar, label: "Acara", href: facebookEventsUrl },
    { icon: HiFlag, label: "Halaman", href: facebookPageUrl },
  ];

  const shortcuts = [
    { name: "Grup Discord", image: "/discord.jpg", href: discordGroupUrl },
  ];

  return (
    <aside
      className={clsx(
        "fixed top-16 left-0 z-40 w-72 xl:w-80 p-4 h-[calc(100vh-4rem)] overflow-y-auto bg-base-100 transition-transform duration-300 ease-in-out",
        // Tampilkan di layar besar
        "lg:sticky lg:translate-x-0 lg:block",
        // Kondisi untuk mobile:
        isOpenOnMobile ? "translate-x-0" : "-translate-x-full", // Tampilkan/sembunyikan dari kiri
        "lg:-translate-x-0" // Pastikan tidak terpengaruh translate di layar besar
      )}
      aria-label="Sidebar"
    >
      <nav>
        <ul className="space-y-2">
          {/* Profil User (diubah menjadi tautan eksternal) */}
          <li>
            <a 
              href="https://web.facebook.com/profile.php?id=61555355507836" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center space-x-3 p-2 rounded-lg hover:bg-base-300"
            >
              <div className="avatar">
                <div className="w-8 rounded-full">
                  <Image src={profileImageUrl} alt="User Avatar" width={32} height={32} />
                </div>
              </div>
              <span className="font-semibold text-sm text-base-content">{userName}</span>
            </a>
          </li>

          {/* Menu Utama */}
          {menuItems.map((item, index) => {
            const isExternal = item.href.startsWith('http');
            const commonClasses = "flex items-center space-x-3 p-2 rounded-lg hover:bg-base-300 text-base-content";

            return (
              <li key={index}>
                {isExternal ? (
                  <a href={item.href} target="_blank" rel="noopener noreferrer" className={commonClasses}>
                    <item.icon className="w-6 h-6 flex-shrink-0" />
                    <span className="text-sm font-medium">{item.label}</span>
                  </a>
                ) : (
                  <Link href={item.href} className={commonClasses}>
                    <item.icon className="w-6 h-6 flex-shrink-0" />
                    <span className="text-sm font-medium">{item.label}</span>
                  </Link>
                )}
              </li>
            );
          })}

          {/* Lihat selengkapnya */}
          <li>
            <button className="flex items-center space-x-3 p-2 rounded-lg hover:bg-base-300 w-full text-left text-base-content">
              <div className="w-6 h-6 bg-base-300 rounded-full flex items-center justify-center">
                <HiChevronDown className="h-4 w-4" />
              </div>
              <span className="text-sm font-medium">Lihat selengkapnya</span>
            </button>
          </li>
        </ul>
      </nav>

      <div className="divider"></div>

      {/* Pintasan Anda */}
      <div className="space-y-2 mt-4">
        <h2 className="text-xs font-semibold text-base-content/80 px-2">Pintasan Anda</h2>
        <ul className="space-y-1">
          {shortcuts.map((shortcut, index) => {
            const isExternal = shortcut.href.startsWith('http');
            const commonClasses = "flex items-center space-x-3 p-2 rounded-lg hover:bg-base-300 text-base-content";

            return (
              <li key={index}>
                {isExternal ? (
                  <a href={shortcut.href} target="_blank" rel="noopener noreferrer" className={commonClasses}>
                    <div className="avatar">
                      <div className="w-7 rounded-lg">
                        <Image src={shortcut.image} alt={shortcut.name} width={28} height={28} />
                      </div>
                    </div>
                    <span className="text-sm font-medium">{shortcut.name}</span>
                  </a>
                ) : (
                  <Link href={shortcut.href} className={commonClasses}>
                    <div className="avatar">
                      <div className="w-7 rounded-lg">
                        <Image src={shortcut.image} alt={shortcut.name} width={28} height={28} />
                      </div>
                    </div>
                    <span className="text-sm font-medium">{shortcut.name}</span>
                  </Link>
                )}
              </li>
            );
          })}
        </ul>
      </div>

      {/* Footer Sidebar */}
      <footer className="mt-auto pt-4 text-xs text-base-content/60 px-2">
        <div className="flex flex-wrap gap-x-2 gap-y-0.5">
          <Link href="/privacy" className="hover:underline">Privasi</Link>
          <span>·</span>
          <Link href="/terms" className="hover:underline">Ketentuan</Link>
          <span>·</span>
          <Link href="/ads" className="hover:underline">Iklan</Link>
          <span>·</span>
          <Link href="/cookies" className="hover:underline">Cookie</Link>
          <span>·</span>
          <Link href="/more" className="hover:underline">Lainnya</Link>
          <span>·</span>
          <span>Imphen © 2025</span>
        </div>
      </footer>
    </aside>
  );
};

export default LeftSidebar; 