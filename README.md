# 📖 Al-Qur'an Digital dengan Tajwid Berwarna & Murottal Syaikh Misyari Rasyid

Aplikasi web **Al-Qur'an Digital Modern** yang dirancang khusus untuk kenyamanan membaca, mempelajari hukum tajwid secara visual, dan mendengarkan lantunan murottal merdu oleh **Syaikh Mishary Rashid Alafasy** dengan sinkronisasi sorotan ayat otomatis (*follow-along audio reading*).

---

## ✨ Fitur Unggulan

### 1. 🎨 Tajwid Lengkap Berwarna (*Color-coded Tajweed*)
- Menggunakan skema warna standar Mushaf Tajwid Internasional dan Kemenag RI:
  - **Ghunnah Musyaddadah** (`Hijau Zamrud #059669`): Nun & Mim bertasydid (2 harakat).
  - **Ikhfa Haqiqi** (`Ungu #9333ea`): Samar-samar dengung 2 harakat.
  - **Ikhfa Syafawi** (`Pink / Magenta #db2777`): Mim sukun bertemu Ba (2 harakat).
  - **Idgham Bighunnah** (`Teal / Hijau Laut #0d9488`): Melebur berdengung 2 harakat.
  - **Idgham Bilaghunnah** (`Hijau Olive #65a30d`): Melebur tanpa dengung.
  - **Idgham Syafawi / Mimi** (`Hijau Segar #16a34a`): Mim sukun bertemu Mim.
  - **Iqlab** (`Biru Tosca / Cyan #0891b2`): Nun sukun/tanwin berubah jadi bunyi Mim di bibir.
  - **Qalqalah** (`Biru Elektrik #2563eb`): Huruf Ba, Jim, Dal, Tha, Qaf memantul jelas (Sughra/Kubra).
  - **Mad Wajib Muttashil** (`Merah Terang #dc2626`): Panjang wajib 4–5 harakat.
  - **Mad Jaiz Munfashil & 'Aridh Lissukun** (`Oranye Hangat #ea580c`): Panjang 2, 4, atau 5 harakat.
  - **Mad Lazim** (`Merah Marun #991b1b`): Panjang wajib 6 harakat penuh.
  - **Mad Thobi'i / Asli** (`Biru Langit #0284c7`): Panjang 2 harakat (1 alif).
  - **Hamzah Wasal & Huruf Gugur / Silent** (`Abu-abu #94a3b8`): Dileburkan / tidak dilafalkan.
- **Interaktif**: Sentuh / klik huruf berwarna apa pun untuk memunculkan kartu popover yang menjelaskan nama hukum, panjang ketukan harakat, cara membacanya, dan contohnya.
- **Panel Panduan Tajwid**: Drawer khusus berisi penjelasan ke-16 kaidah tajwid secara terperinci.
- **Sakelar Mode Polos**: Tajwid berwarna dapat diaktifkan atau dinonaktifkan sewaktu-waktu.

---

### 2. 🎧 Murottal Syaikh Misyari Rasyid & Sinkronisasi ("Mengikuti Bacaannya")
- Suara lantunan resmi jernih 128kbps dari qari internasional ternama **Syaikh Mishary Rashid Alafasy**.
- **Fitur Sinkronisasi Ayat (Follow-along Sync)**:
  - Ketika audio berputar, kartu ayat yang sedang dilantunkan otomatis disorot (*highlight*) dengan efek *glow* hijau zamrud/emas dan animasi bar equalizer `Misyari Membaca 🎵`.
  - **Auto-Scroll Halus**: Layar secara otomatis bergeser lembut ke tengah ayat yang sedang dibaca tanpa perlu di-scroll manual.
  - **Auto-Play Next**: Berlanjut otomatis dari ayat ke ayat hingga akhir surah.
  - **Repeat Ayah (Ulangi Ayat)**: Tombol pengulangan ayat per ayat, sangat cocok untuk hafalan (*tahfidz*) dan perbaikan tajwid (*tahsin*).
  - **Pengatur Kecepatan Audio**: Pilihan 0.75x (Tartil lambat untuk belajar), 1.0x (Normal), 1.25x, dan 1.5x.
  - **Putar Langsung dari Ayat Mana Saja**: Setiap ayat memiliki tombol putar audio mandiri.

---

### 3. 🇮🇩 Terjemahan Resmi & Transliterasi Latin
- Terjemahan bahasa Indonesia lengkap ayat demi ayat sesuai standar resmi **Kementerian Agama Republik Indonesia (Kemenag RI)**.
- Transliterasi Latin (ejaan fonetik bacaan) untuk memudahkan bagi yang sedang memperlancar bacaan.
- Masing-masing dapat diaktifkan / disembunyikan melalui tombol **Pengaturan Bacaan**.

---

### 4. 📚 Navigasi 114 Surah & Pencarian Instan
- Daftar 114 Surah lengkap (Al-Fatihah hingga An-Nas) dengan nama Arab, transliterasi Latin, arti surah, jumlah ayat, dan jenis wahyu (Makkiyah / Madaniyah).
- Pencarian instan berdasarkan nama surah, terjemahan, atau nomor surah.
- Filter cepat: **Semua**, **Makkiyah**, **Madaniyah**, dan **Surah Pilihan** (Al-Fatihah, Al-Kahf, Yasin, Ar-Rahman, Al-Waqi'ah, Al-Mulk, An-Naba, Juz 30).
- Fitur **Lompat ke Ayat**: Pilih langsung nomor ayat untuk meluncur ke ayat tersebut seketika.

---

### 5. 🔖 Penanda Bacaan & Kenyamanan Pengguna
- **Terakhir Dibaca (Last Read)**: Otomatis tersimpan di memori browser (*localStorage*) sehingga Anda dapat melanjutkan tilawah kapan pun.
- **Bookmark Ayat**: Simpan ayat-ayat favorit dengan sekali klik.
- **Salin Ayat**: Tombol salin teks Arab beserta terjemahan ke clipboard.
- **Pengatur Ukuran Font**: Slider pembesar ukuran font teks Arab (20px – 44px) dan terjemahan.
- **Mode Gelap / Terang (Dark & Light Mode)**: Tema hijau zamrud islami (*Emerald & Gold*) yang elegan dan ramah di mata untuk membaca siang maupun malam.
- **Offline Ready**: Dilengkapi data bawaan (*pre-cached*) untuk surah-surah populer dan penyimpanan otomatis (*browser caching*) saat surah baru dibuka.

---

## 🚀 Cara Menjalankan Aplikasi

Aplikasi ini dibuat murni menggunakan teknologi web modern (**HTML5**, **Tailwind CSS**, **Vanilla JavaScript**) tanpa dependensi build rumit sehingga dapat langsung dijalankan:

### Opsi 1: Buka Langsung di Browser
Klik dua kali file `index.html` di file manager Anda, atau klik kanan lalu pilih **Open With Google Chrome / Safari / Edge / Firefox**.

### Opsi 2: Jalankan via Local Server (Rekomendasi)
Buka terminal di folder project ini dan jalankan:
```bash
# Menggunakan Python 3:
python3 -m http.server 3000

# Atau menggunakan Node / npx:
npx serve .
```
Lalu buka peramban dan akses:
```
http://localhost:3000
```

---

## 📁 Struktur Berkas

```
quran digital/
├── index.html            # File utama aplikasi antarmuka web
├── README.md             # Panduan dan dokumentasi aplikasi
├── css/
│   ├── style.css         # Gaya tampilan modern, font islami, tema dark/light, animasi
│   └── tajweed.css       # Sistem pewarnaan 16 kaidah hukum tajwid, tooltip, dan filter
└── js/
    ├── surah-list.js     # Katalog metadata lengkap 114 Surah Al-Qur'an
    ├── precached-data.js # Data pra-muat offline untuk surah-surah pilihan
    ├── tajweed-parser.js # Mesin regex parser tajwid beranotasi ke elemen HTML berwarna
    ├── audio-player.js   # Audio engine murottal Syaikh Misyari Rasyid & sinkronisasi scroll
    └── app.js            # Pengontrol aplikasi, pencarian, bookmark, dan pengaturan
```

