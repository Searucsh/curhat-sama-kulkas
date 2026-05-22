# ❄️ Curhat ke Kulkas - Konseling Absurd & Sarkastik Anak Kos

Selamat datang di **Curhat ke Kulkas**, sebuah website konseling absurd, receh, dan sangat menghakimi (judgemental) ala senior/om-om penjaga kosan. Ini adalah tempat terbaik untuk membagikan keluh kesah harianmu pada kulkas pintu satu legendaris yang dinginnya melebihi sikap dia ke kamu.

---

## ✨ Fitur Utama

1. **Sarcastic Chat Bot (Personality & Moods)**
   - Kulkas dibekali pemetaan kata kunci cerdas (tentang *cinta*, *duit*, *skripsi*, *makan*, *sedih*, dsb) dan membalas dengan gaya bahasa santai anak kosan (`gw`, `lu`, `anjir`, `wkwk`).
   - Memiliki 4 Mode Kepribadian dinamis: **Sarkastik (Default)**, **Ngegas/Judul** (respons Caps Lock + bergetar), **Bijak ala Om Kos**, dan **Ngantuk/Mager** (tulisan mengetik lambat dan penuh jeda `...`).

2. **Web Audio API Sound Synthesis**
   - **Tanpa file MP3 eksternal!** Semua efek suara diproduksi langsung dari kode JavaScript menggunakan sintesis Web Audio API secara real-time.
   - *Humming Background:* Suara dengungan rendah kompresor kulkas tua (bisa di-mute/unmute di pojok kanan atas).
   - *Click sound:* Suara double click gerendel magnetik saat pintu dibuka/ditutup.
   - *Psssst Mist sound:* Suara desisan uap dingin (dari sintesis white noise + bandpass filter) saat kulkas membalas chat atau dibuka pintunya.
   - *Talking Blip sound:* Suara blip retro ala 8-bit chiptune yang frekuensinya dinamis menyelaraskan gerakan mulut kulkas saat melafalkan teks.

3. **Interactive 3D Kulkas & Inside Fridge Reveal**
   - Kulkas dirancang 3D menggunakan CSS Perspective. Anda dapat membuka pintunya dengan mengeklik gagang pintu kulkas secara langsung atau menggunakan tombol manual.
   - Saat pintu kulkas terbuka, akan muncul embun partikel dingin yang melayang keluar dan menyingkap isi rak kulkas yang kocak (seperti air mineral di botol sirup Marjan merah, es batu abadi dinasti Ming, telur sebutir penyelamat tanggal tua, atau token listrik yang berbunyi).

4. **Interactive Drag & Drop Stickers**
   - Stiker magnetik kulkas ("INDOMIE IS LIFE", "SUSU GW JGN DIMINUM!", dll) dapat digeser-geser (drag and drop) dengan mouse di desktop maupun touch gestures di perangkat mobile/tablet.

5. **Live LED Info Panel**
   - Panel LCD di bawah kulkas memantau suhu freezer secara fluktuatif (+-0.2°C) serta mendeteksi siklus dinamis kompresor secara berkala (STATUS: AKTIF, DEFROST, atau SIAGA) yang mempengaruhi getaran kulkas.

6. **localStorage Chat Memory**
   - Semua riwayat curhatmu terekam aman di penyimpanan lokal browser. Klik tombol **"Ganti Kulkas"** untuk melakukan reset pabrik (membersihkan memori kulkas).

7. **Curhat Random**
   - Bingung mau curhat apa? Klik tombol **"Curhat Random"** untuk mengetik curhatan kocak acak secara instan.

---

## 📁 Struktur Direktori Proyek

```text
/curhat-ke-kulkas/
├── index.html              # Halaman utama & layout UI responsif
├── assets/
│   ├── css/
│   │   └── style.css       # Animasi wajah, partikel mist, 3D door, & tema Malam Kosan
│   └── sounds/             # (Opsional) Folder untuk aset audio fisik kustom
├── js/
│   ├── main.js             # Entry point, DOM binding, LED interval, & drag stickers
│   ├── kulkas.js           # Database respons, pemetaan kata kunci, & generator curhat
│   └── ui.js               # Web Audio synthesizer, canvas/DOM mist, & localStorage
└── README.md               # Dokumentasi instruksi instalasi & deployment
```

---

## 🚀 Cara Menjalankan Secara Lokal

Karena proyek ini menggunakan Vanilla JS (tanpa framework/bundler rumit) dan Tailwind CSS CDN, cara menjalankannya sangat mudah:

### Opsi A: Langsung Buka File (Tanpa Server)
Double-click file `index.html` untuk membukanya langsung di Google Chrome, Firefox, Microsoft Edge, atau Safari.

> [!IMPORTANT]
> Kebijakan keamanan browser modern memblokir pemutaran audio otomatis (*autoplay*). Oleh karena itu, suara kompresor kulkas akan mati (*muted*) di awal. Klik tombol **MUTED (KLIK SINI)** di pojok kanan atas untuk mengaktifkan Web Audio API.

### Opsi B: Menggunakan Local Development Server (Rekomendasi)
Menjalankan menggunakan server lokal membuat file loading lebih mulus dan andal:
1. Jika menggunakan **VS Code**, install extension **Live Server**, lalu klik tombol **Go Live** di pojok kanan bawah editor.
2. Menggunakan **NodeJS (npm)**:
   ```bash
   npx serve .
   ```
3. Menggunakan **Python**:
   ```bash
   python -m http.server 8000
   ```
   Akses di browser pada alamat `http://localhost:8000/curhat-ke-kulkas/`.

---

## 🌐 Cara Deploy ke GitHub Pages

Jika Anda ingin membagikan tautan website absurd ini kepada teman kosan lainnya, Anda dapat meng-host-nya secara gratis di **GitHub Pages**:

1. **Buat Repository Baru di GitHub:**
   - Masuk ke akun GitHub Anda, pilih **New Repository**.
   - Beri nama repository, misalnya `curhat-ke-kulkas`, lalu pilih opsi **Public**.

2. **Inisialisasi Git di Komputer Anda:**
   Buka terminal/command prompt di direktori folder `/curhat-ke-kulkas/` Anda, lalu jalankan perintah berikut:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Kulkas kosan siap beroperasi"
   ```

3. **Hubungkan dan Push ke GitHub:**
   Ganti `<username-kamu>` dengan nama pengguna GitHub Anda:
   ```bash
   git branch -M main
   git remote add origin https://github.com/<username-kamu>/curhat-ke-kulkas.git
   git push -u origin main
   ```

4. **Aktifkan GitHub Pages:**
   - Buka halaman repositori Anda di GitHub.
   - Klik tab **Settings** di bagian atas kanan.
   - Pada sidebar kiri, gulir ke bawah lalu pilih menu **Pages** (di bawah bagian *Code and automation*).
   - Di bagian **Build and deployment**, ubah Source menjadi **Deploy from a branch**.
   - Pada pilihan Branch di bawahnya, pilih **main** (atau branch utama Anda) dan folder `/ (root)`. Klik **Save**.
   - Tunggu sekitar 1–2 menit, GitHub akan memproses deployment Anda.
   - Muat ulang (*refresh*) halaman Settings > Pages tersebut. Anda akan melihat tautan langsung web Anda di bagian atas:
     `https://<username-kamu>.github.io/curhat-ke-kulkas/`

---

*Selamat bercurhat dengan kulkas kosan! Tetap kuat menghadapi kerasnya hidup kosan, ya bro.* 🧊⚡🍜
