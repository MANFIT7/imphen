'use client'; // Jadikan client component untuk state

import { useState } from 'react'; // Impor useState
import CreatePost from "@/components/feed/create-post";
import PostCard from "@/components/feed/post-card";
import StoriesReel from "@/components/feed/stories-reel";
import Header from "@/components/layout/header";
import LeftSidebar from "@/components/layout/left-sidebar";
import RightSidebar from "@/components/layout/right-sidebar";

// Definisikan tipe data post jika perlu (opsional tapi bagus)
interface PostData {
  id: string; // Ganti ke string untuk mengakomodasi timestamp
  authorName: string;
  authorAvatar: string;
  postTime: string;
  postContent: string;
  postImage?: string;
  likeCount: number;
  commentCount: number;
  shareCount: number;
}

// Konten untuk post Imphen OS
const imphenOsContent = `
IMPHNEN OS (BASED)

Operating System Berbasis Fesnuk
Tujuan dibuatkan project gajelas ini ya karena buat memfasilitasi para member malas ngoding yang bukannya ngoding tapi malah buka fesnuk, ya daripad bolak bali ngoding fesnuk, ngoding fesnuk, ya langsung fesnuk aja gaperlu ngoding,

FITUR
Live images (gaperlu ribet ngurusin installasi linux, trus ngehapus windows kalian) tinggal bikin bootable pakai rufus (ingat pake mode DD jangan mode ISO)
Konek Wifi EZ (kali linux senggol ni boss)
langsung buka fesnuk tanpa ba bi bu
cuman bisa buka fesnuk
fesnuk doang jir yang bisa

Cara buat
download ISO nya di sini
ImphnenOs.iso
kemudian buat bootable menggunakan rufus / ventoy ingat untuk rufus pakai mode DD jangan ISO
atau pakai qemu (kalau pro dan rajin ngoding)
qemu-system-x86_64 -cdrom lokasi/iso/nya.iso -boot d -m 2048

setelah boot akan keluar grub, klik enter ae (masih WIP JIR jadi belum pakai custom grub masih bawaan arch btw linuk)
nanti setelah boot akan keluar network manager (layar kao warna biru) untuk navigasi menggunakan arrow atas bawah kiri kanan kotak x segitiga enter, untuk user wifi masuk dahulu ke "Activate a connection" buat konek wingfi nyah, udah itu klik exit, langsung buka fesnuk.

buat keluarnya klik tombol power hehe.

KONTRIBUSI
buat korang yang pengen juga bantu kami (abodin doang sih), bisa bantu (plis) dengan cara
pakai arch btw linux
have some common sense
menyukai dedek lembut
bisa pakai git (opsional)
masih normal (opsional)

HOW-TO
install dulu archiso
sudo pacman -S archiso
sudah tuh clone ni repo
git clone https://github.com/shigure/ImphnenOs.git
kemudian modif atau apalah bebas yang penting jangan sampe kernel panic

buat iso
sudo mkarchiso -v -w /lokasi/workdir/bebas/tapi/kalau/udah/hapus -o /lokasi/iso/nya.iso /lokasi/repo/ImphnenOs/releng
nanti buat jalankannya pakai run_archiso
run_archiso -i /lokasi/iso/nya.iso
begituwj auk ah

File penting
airootfs = folder root live iso nya, jadi kesono edit something something
packages.x86_64 = package yang di install (masukin filenya yang mau dipasang)
profiledef.sh = file penting anjenggg, kalau misalnya menambahkan file ke airootfs wajib menambahkan file_permission
file_permissions=(
  ["/etc/shadow"]="0:0:400"
  ["/root"]="0:0:750"
  ["/root/.automated_script.sh"]="0:0:755"
  ["/root/.gnupg"]="0:0:700"
  ["/root/.fesnuk"]="0:0:777"
  ["/root/wp.jpg"]="0:0:777"
  ["/usr/local/bin/choose-mirror"]="0:0:755"
  ["/usr/local/bin/dfwm"]="0:0:755"
  ["/usr/local/bin/st"]="0:0:755"
  ["/usr/local/bin/Installation_guide"]="0:0:755"
  ["/usr/local/bin/livecd-sound"]="0:0:755"
)
airootfs/root = lokasi root directory pas boot dia homo directorynya disini, ada file penting kek .fesnuk buat auto run aplikasi (malas setting systemd) just strapping some shit lately,
airootfs/etc = sama kek /etc di linux kao, bisa ae copas dari linux mu biar cepet
airootfs/usr/local/bin = buat nyimpen binary aplication kalau nambah gitu, jangan lupa tambahin file_permission di profiledef.sh
airootfs/root/wp.jpg = boneka abodin

TODO
bikin custom neofetch
bikin calamares installer (biar bisa install ni linuj jelek bin ampas)
bikin windows manager (dinfwm, tapi ya nanti implementasi Hyprland \"kalau gak malas\")
bikin webpage
bikin repo server (uhh, biar repo yang di aur tinggal comot, ada beberapa package penting kek visual-studio-code (bukan oss-code), waydroid(buat native android app), proton-GE (gayming), terabox, dll)
idk, pukulin atmint
`;

// Data post awal
const initialPostsData: PostData[] = [
  {
    id: '1',
    authorName: "Imphen Admin",
    authorAvatar: "/logo-v1.png",
    postTime: "2 jam yang lalu",
    postContent: "IMPHEN ini tempat belajar pemrograman yang menyenangkan dan interaktif. Kami menyediakan berbagai tutorial, latihan, dan proyek yang dirancang untuk membantu Anda belajar dengan cara yang menyenangkan.",
    postImage: "/background.jpg",
    likeCount: 30,
    commentCount: 7,
    shareCount: 3,
  },
  {
    id: '2',
    authorName: "Imphen OS Dev",
    authorAvatar: "/logo-v1.png",
    postTime: "1 hari yang lalu",
    postContent: imphenOsContent,
    postImage: "/background.jpg",
    likeCount: 55,
    commentCount: 12,
    shareCount: 8,
  },
  {
    id: '3',
    authorName: "Imphen Admin",
    authorAvatar: "/logo-v1.png",
    postTime: "3 hari yang lalu",
    postContent: "Jangan lupa ikuti update terbaru dari Imphen ya! Selalu ada hal baru untuk dipelajari.",
    likeCount: 18,
    commentCount: 4,
    shareCount: 1,
  },
];

export default function HomePage() {
  // State untuk mengontrol visibilitas sidebar mobile
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  // State untuk daftar post
  const [posts, setPosts] = useState<PostData[]>(initialPostsData);

  // Fungsi untuk toggle sidebar
  const toggleMobileSidebar = () => {
    setIsMobileSidebarOpen(!isMobileSidebarOpen);
  };

  // Fungsi untuk menambahkan post baru
  const handleAddPost = (text: string) => {
    const newPost: PostData = {
      id: Date.now().toString(), // ID unik sederhana
      authorName: "Imphen", // Nama user saat ini (ubah jika perlu)
      authorAvatar: "/logo-v1.png", // Avatar user saat ini
      postTime: "Baru Saja",
      postContent: text,
      // postImage: undefined, // Tidak ada gambar untuk post teks sederhana
      likeCount: 0,
      commentCount: 0,
      shareCount: 0,
    };
    // Tambahkan post baru di awal array (tampil paling atas)
    setPosts([newPost, ...posts]);
  };

  return (
    <div className="flex flex-col min-h-screen bg-base-200">
      {/* Berikan fungsi toggle ke Header */}
      <Header onMenuToggle={toggleMobileSidebar} />

      <main className="flex flex-1 pt-16">
        {/* Berikan state isOpen ke LeftSidebar */}
        <LeftSidebar isOpenOnMobile={isMobileSidebarOpen} />

        <div className="flex-1 min-w-0 max-w-2xl mx-auto py-4 px-2 sm:px-4 lg:mx-0 xl:ml-[20rem] xl:mr-[18rem]"> {/* Adjust margin for large screen sidebars */}
          {/* Area Konten Utama */}
          <StoriesReel />
          <CreatePost onAddPost={handleAddPost} />
          {/* Render Post Cards dari state `posts` */}
          <div className="space-y-4 mt-4">
            {posts.map((post) => (
              <PostCard key={post.id} {...post} />
            ))}
          </div>
        </div>

        <RightSidebar />
      </main>

      {/* Overlay untuk menutup sidebar saat diklik (opsional tapi bagus) */}
      {isMobileSidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/30 lg:hidden"
          onClick={toggleMobileSidebar}
          aria-hidden="true"
        ></div>
      )}
    </div>
  );
}
