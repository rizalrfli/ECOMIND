import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { DataProvider } from './context/DataContext';
import Sidebar from './components/layout/Sidebar';
import Header from './components/layout/Header';

import Beranda from './pages/Beranda';
import DataRealTime from './pages/DataRealTime';
import RekomendasiAI from './pages/RekomendasiAI';
import RiwayatData from './pages/RiwayatData';
import Notifikasi from './pages/Notifikasi';
import Pengaturan from './pages/Pengaturan';
import TentangSistem from './pages/TentangSistem';

export default function App() {
  return (
    <DataProvider>
      <Router>
        <div className="flex min-h-screen bg-[#F2EAFA]">
          {/* Fixed Left Sidebar */}
          <Sidebar />

          {/* Main Workspace Area */}
          <div className="flex-1 flex flex-col min-w-0">
            {/* Header Bar */}
            <Header />

            {/* Dynamic Page Content */}
            <main className="flex-1 overflow-y-auto">
              <Routes>
                <Route path="/" element={<Navigate to="/beranda" replace />} />
                <Route path="/beranda" element={<Beranda />} />
                <Route path="/data-real-time" element={<DataRealTime />} />
                <Route path="/rekomendasi-ai" element={<RekomendasiAI />} />
                <Route path="/riwayat-data" element={<RiwayatData />} />
                <Route path="/notifikasi" element={<Notifikasi />} />
                <Route path="/pengaturan" element={<Pengaturan />} />
                <Route path="/tentang-sistem" element={<TentangSistem />} />
                <Route path="*" element={<Navigate to="/beranda" replace />} />
              </Routes>
            </main>
          </div>
        </div>
      </Router>
    </DataProvider>
  );
}
