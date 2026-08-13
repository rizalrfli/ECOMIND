# Spesifikasi UI/UX Dashboard EcoMind AI untuk React.js

Dokumen ini berisi spesifikasi komponen dan tata letak (layout) untuk membangun dashboard **EcoMind AI - Sistem Cerdas Penentuan Dosis Koagulan** menggunakan framework **React.js**. Dokumen ini dirancang agar mudah diimplementasikan, baik menggunakan styling custom, Tailwind CSS, maupun UI framework seperti Ant Design (merujuk pada *antigravity/antd*).

---

## 1. Arsitektur Global & Layout Dasar

Aplikasi ini menggunakan layout klasik **Dashboard** yang terdiri dari tiga bagian utama:
1. **Sidebar (Kiri):** Navigasi utama dan informasi status sistem.
2. **Header (Atas Kanan):** Indikator status online, waktu real-time, dan tanggal.
3. **Main Content (Tengah ke Kanan):** Area konten dinamis berdasarkan rute navigasi.

### Skema Warna (Color Palette)
- **Primary Background:** Ungu Terang / Lavender (misal: `#E5D9F2` atau `#F3E8FF`)
- **Card Background:** Ungu Sedang (misal: `#CDC1FF` atau `#B19CD9`)
- **Active Navigation / Accent:** Merah Muda / Pink (misal: `#FF74B1`)
- **Success/Aman:** Hijau (misal: `#4ade80`)
- **Warning/Sedang:** Kuning (misal: `#facc15`)
- **Danger/Bahaya:** Merah (misal: `#f87171`)
- **Text:** Hitam & Abu-abu gelap.

---

## 2. Komponen Global (Shared Components)

### 2.1 Header Component (`<Header />`)
Berada di pojok kanan atas layar.
- **Indikator Sistem:** Lingkaran hijau + Teks "SISTEM ONLINE"
- **Ikon Koneksi:** Ikon Wi-Fi.
- **Jam & Tanggal:** `10:00:00 WIB` (Real-time update dengan `setInterval`) dan `17 Agustus 2028`.

### 2.2 Sidebar Component (`<Sidebar />`)
Tetap (Fixed) di sebelah kiri.
- **Logo & Judul:** Ikon Otak + "EcoMind AI", Subjudul "Sistem Cerdas Penentuan Dosis Koagulan".
- **Menu Navigasi (React Router `<NavLink>`):**
  - 🏠 Beranda
  - 📊 Data Real-Time
  - 🧠 Rekomendasi AI
  - 🕒 Riwayat Data
  - 🔔 Notifikasi (Dilengkapi Badge angka, misal: '5' warna merah)
  - ⚙️ Pengaturan
  - ℹ️ Tentang Sistem
- **Status Panel (Bawah Navigasi):**
  - **Status Sistem:** Ikon Centang Hijau, "NORMAL", "Sistem Berjalan Baik".
  - **EcoData Indonesia:** 
    - Dataset Terkumpul: `312 Batch`
    - Model AI: `v1.7`
    - Learning Status: `Aktif`

---

## 3. Rincian Halaman (Pages / Routes)

### Halaman 1: Beranda (`/beranda`)
Halaman ini adalah dashboard utama yang menampilkan ringkasan dari semua modul (Grid Layout).
- **Grid Kiri Atas:** Gauge Chart untuk `pH` dan `COD`. Dilengkapi legenda warna (Aman, Sedang, Bahaya).
- **Grid Kanan Atas:** Panel "Rekomendasi Dosis Koagulan" (Jenis: Tawas, Dosis: 3.8 mg/L, Kesesuaian: 92.7%). Tombol: "TERAPKAN DOSIS" dan "MODE AUTO".
- **Grid Tengah Kiri:** Line Chart "TREN PARAMETER" (Sumbu X: Waktu, Sumbu Y: Nilai, Line 1: pH, Line 2: COD). Dropdown filter waktu (contoh: 24 Jam Terakhir).
- **Grid Tengah Kanan:** Tabel "MONITORING REAL-TIME". Kolom: Parameter, Nilai, Baku Mutu, Status (dengan ikon centang/silang). Label besar: "MEMENUHI BAKU MUTU".
- **Grid Bawah Kiri:** Panel "PREDIKSI KINERJA (AI)". Angka prediksi penurunan COD dan penetralan pH. Serta daftar ceklis "ANALISIS AI".
- **Grid Bawah Tengah:** Panel "NOTIFIKASI" ringkas (3 log terakhir).
- **Grid Bawah Kanan:** Panel "RINGKASAN PENGGUNAAN KOAGULAN" dengan Bar Chart mini 7 hari terakhir.

### Halaman 2: Data Real-Time (`/data-real-time`)
Fokus pada pemantauan sensor saat ini.
- **Top Section:** Gauge pH & COD (sama seperti di Beranda).
- **Right Section:** Tabel Monitoring Real-Time.
- **Bottom Section:** Grafik "TREN PARAMETER" yang lebih besar dan melebar penuh (Full Width Line Chart).

### Halaman 3: Rekomendasi AI (`/rekomendasi-ai`)
Fokus pada engine kecerdasan buatan dan outputnya.
- **Kiri:** Panel besar "REKOMENDASI DOSIS KOAGULAN" (Tawas, Dosis, Kesesuaian, dan Tombol Aksi).
- **Kanan:** Panel "PREDIKSI KINERJA (AI)" yang diperbesar, menampilkan persentase Penurunan COD (92.7%) dan Penetralan pH (98.7%), serta ceklis "ANALISIS AI".

### Halaman 4: Riwayat Data (`/riwayat-data`)
Menampilkan data historis penggunaan dan pemrosesan.
- **Atas:** Panel "RINGKASAN PENGGUNAAN KOAGULAN" lebar. Berisi Ikon Erlenmeyer, Total Penggunaan (29.8 kg), Efisiensi (17%), dan Bar Chart penggunaan harian (Sumbu X: Tanggal, Sumbu Y: kg).
- **Bawah:** Carousel/Grid Card List untuk Batch historis (contoh: BATCH 312, BATCH 311, BATCH 310). Tiap card menampilkan Tanggal, Volume Limbah, Dosis, pH, Lama Proses, dan tombol "Lihat Detail".

### Halaman 5: Notifikasi (`/notifikasi`)
Halaman log/pemberitahuan penuh.
- Berisi daftar list item/card memanjang ke bawah.
- **Komponen Card Notifikasi:**
  - Label Tipe: `INPUT` atau `OUTPUT` dengan nomor Batch (misal: 312).
  - Waktu: `10:00`, `09:15`, dll.
  - Ikon Status: Warning (Segitiga Kuning) atau Success (Centang Hijau).
  - Judul Log: (Contoh: "Kualitas efluen kembali normal").
  - Deskripsi: Detail dari event tersebut.

### Halaman 6: Pengaturan (`/pengaturan`)
Menu list untuk konfigurasi sistem.
- Terdiri dari baris-baris menu (List Item) yang bisa di-klik (ikon panah '>'):
  - 💻 **Sistem:** Tampilan, Suara, Penyimpanan, dll.
  - 🌐 **Jaringan & Internet:** Wi-Fi, VPN, Proxy.
  - 🌍 **Waktu & Bahasa:** Tanggal, Waktu, Bahasa.
  - 👤 **Akun:** Profil, Opsi Masuk.
  - 🛡️ **Privasi & Keamanan:** Antivirus, Enkripsi.

### Halaman 7: Tentang Sistem (`/tentang-sistem`)
Visualisasi arsitektur sistem IoT & AI.
- Berisi kumpulan Card/Box yang menggambarkan *flow* (alur kerja):
  1. **SENSOR IoT:** Mengukur kualitas air.
  2. **KONEKSI:** Data dikirim via Wi-Fi/MQTT.
  3. **EDGE & SERVER:** Data divalidasi.
  4. **DSS ENGINE:** Analisis AI untuk dosis optimal.
  5. **AKTUATOR:** Pompa dosing berjalan.
  6. **MONITORING:** Dashboard real-time.
- Terdapat *Banner Info* di bagian bawah (atau atas) yang menjelaskan tujuan sistem secara singkat.

---

## 4. Rekomendasi Library React & "Antigravity" Implementasi

Jika menggunakan framework UI (seperti **Ant Design / antd** yang sering diasosiasikan dalam ekosistem React perusahaan), berikut pemetaan komponennya:

1. **Layout & Sidebar:** Gunakan `<Layout>`, `<Sider>`, dan `<Menu>` dari `antd`.
2. **Cards:** Gunakan `<Card>` dari `antd` dengan kustomisasi border-radius dan background color.
3. **Charts:** Sangat disarankan menggunakan **Recharts** atau **Chart.js (react-chartjs-2)**.
   - *Gauges:* Bisa menggunakan library seperti `react-gauge-chart`.
   - *Line Chart & Bar Chart:* Gunakan `<LineChart>` dan `<BarChart>` dari Recharts.
4. **Tables:** Gunakan `<Table>` dari `antd` (untuk fitur Monitoring Real-Time).
5. **Icons:** Gunakan `@ant-design/icons`, `lucide-react`, atau `react-icons` (seperti FontAwesome).
6. **State Management:** `React Context` atau `Zustand` untuk mengelola data sensor yang masuk secara real-time.

## 5. Struktur Folder yang Disarankan

```text
src/
 ┣ assets/              # Gambar, Logo (1.png - 8.png referensi desain)
 ┣ components/          # Komponen reusable
 ┃ ┣ layout/
 ┃ ┃ ┣ Sidebar.jsx      # Menu Navigasi kiri
 ┃ ┃ ┗ Header.jsx       # Top bar info
 ┃ ┣ charts/
 ┃ ┃ ┣ GaugeChart.jsx
 ┃ ┃ ┣ TrendChart.jsx
 ┃ ┃ ┗ BarChart.jsx
 ┃ ┗ ui/                # Button, Card, Badge custom
 ┣ pages/
 ┃ ┣ Beranda.jsx
 ┃ ┣ DataRealTime.jsx
 ┃ ┣ RekomendasiAI.jsx
 ┃ ┣ RiwayatData.jsx
 ┃ ┣ Notifikasi.jsx
 ┃ ┣ Pengaturan.jsx
 ┃ ┗ TentangSistem.jsx
 ┣ App.jsx              # Routing dengan React Router
 ┗ index.css            # Global CSS / Tailwind (Definisi warna primary/secondary)
```
