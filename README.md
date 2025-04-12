# Ingin Menjadi Programmer Handal, Namun Enggan Ngoding (IMPHEN)

Platform media sosial sederhana yang dibuat dengan Next.js dan Tailwind CSS, terinspirasi dari Facebook.

## Deskripsi

Project ini adalah aplikasi web media sosial yang menampilkan fitur-fitur dasar seperti feed berita, stories, pembuatan post, dan layout responsif dengan sidebar. Dibangun menggunakan teknologi web modern untuk pembelajaran dan eksplorasi.

## Teknologi yang Digunakan

*   **Framework:** [Next.js](https://nextjs.org/) (App Router)
*   **Bahasa:** [TypeScript](https://www.typescriptlang.org/)
*   **Styling:** [Tailwind CSS](https://tailwindcss.com/) & [DaisyUI](https://daisyui.com/)
*   **Manajemen Tema:** [next-themes](https://github.com/pacocoursey/next-themes)
*   **Package Manager/Runtime:** [Bun](https://bun.sh/)

## Memulai

Untuk menjalankan proyek ini secara lokal:

1.  **Clone repository:**
    ```bash
    git clone <URL_REPOSITORY_ANDA>
    cd <NAMA_FOLDER_PROYEK>
    ```

2.  **Install dependencies:**
    ```bash
    bun install
    ```

3.  **Run development server:**
    ```bash
    bun run dev
    ```

Buka [http://localhost:3000](http://localhost:3000) di browser Anda untuk melihat hasilnya.

## Fitur Utama

*   Layout responsif dengan Header, Left Sidebar, dan Right Sidebar.
*   Tampilan Stories Reel yang dapat di-scroll secara horizontal.
*   Kemampuan untuk membuat post teks sederhana.
*   Feed menampilkan daftar post.
*   Dukungan tema Light/Dark/System.

## Struktur Folder (Ringkasan)

```
.
├── public/             # Aset statis
├── src/
│   ├── app/            # Rute aplikasi (App Router)
│   │   ├── layout.tsx  # Layout utama
│   │   ├── page.tsx    # Halaman utama (feed)
│   │   └── globals.css # Gaya global
│   ├── components/     # Komponen React UI
│   │   ├── feed/       # Komponen terkait feed (post, stories)
│   │   ├── layout/     # Komponen layout (header, sidebar)
│   │   └── providers/  # Komponen Provider (e.g., ThemeProvider)
│   └── ...
├── next.config.mjs     # Konfigurasi Next.js
├── package.json
├── bun.lockb
├── tailwind.config.ts
└── tsconfig.json
```

## Deployment

Cara termudah untuk mendeploy aplikasi Next.js Anda adalah menggunakan [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) dari pembuat Next.js.

Lihat [dokumentasi deployment Next.js](https://nextjs.org/docs/app/building-your-application/deploying) untuk detail lebih lanjut.
