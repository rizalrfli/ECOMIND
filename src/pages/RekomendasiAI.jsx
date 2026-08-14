import React from 'react';
import { useData } from '../context/DataContext';
import {
  Brain,
  Play,
  Settings,
  CheckCircle2,
  Cpu
} from 'lucide-react';

export default function RekomendasiAI() {
  const {
    recommendation,
    applyDose,
    autoMode,
    toggleAutoMode,
    showToast
  } = useData();

  const handleApplyDose = () => {
    applyDose(recommendation.dosage);
  };

  const handleSettings = () => {
    showToast('⚙️ Pengaturan AI: Ambang batas & konfigurasi model inferensi v1.7', 'info');
  };

  return (
    <div className="p-4 sm:p-6 space-y-6 pb-12">
      {/* Header section */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-gradient-to-r from-[#2D1B4E] to-[#4A3B69] text-white p-4 sm:p-6 rounded-3xl shadow-xl">
        <div>
          <div className="flex items-center gap-2 text-xs font-black text-[#FF74B1] uppercase tracking-wider">
            <Cpu className="w-4 h-4" />
            <span>AI Decision Support Engine</span>
          </div>
          <h1 className="text-2xl font-black text-white mt-1">
            Engine Rekomendasi Dosis AI
          </h1>
          <p className="text-sm font-medium text-white/80">
            Perhitungan dosis koagulan berbasis Jaringan Syaraf Tiruan (Deep Neural Net v1.7).
          </p>
        </div>
      </div>

      {/* TWO COLUMN MAIN CONTENT */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* KIRI: PANEL REKOMENDASI DOSIS KOAGULAN */}
        <div className="lg:col-span-7 bg-white/80 backdrop-blur-md border border-[#C4B2F7]/50 rounded-3xl p-6 md:p-8 shadow-card-soft flex flex-col justify-between space-y-6">
          <div>
            {/* Header with Brain Icon */}
            <div className="flex items-center gap-3 justify-center mb-6">
              <div className="w-12 h-12 rounded-2xl bg-[#E5D9F2] flex items-center justify-center text-[#2D1B4E] shadow-xs border border-[#C4B2F7]/60">
                <Brain className="w-7 h-7 text-[#FF74B1]" />
              </div>
              <h2 className="text-xl font-black text-[#2D1B4E] tracking-tight uppercase">
                REKOMENDASI DOSIS KOAGULAN
              </h2>
            </div>

            {/* Content Sections */}
            <div className="space-y-4 text-center">
              {/* Section 1: Jenis Koagulan */}
              <div className="bg-[#E5D9F2]/60 p-5 rounded-2xl border border-[#C4B2F7]/40 transition-all hover:border-[#C4B2F7]">
                <div className="text-base font-extrabold text-[#4A3B69]">
                  Jenis Koagulan
                </div>
                <div className="text-2xl font-black text-[#2D1B4E] mt-1">
                  Tawas
                </div>
              </div>

              {/* Section 2: Dosis Rekomendasi */}
              <div className="bg-[#E5D9F2]/60 p-5 rounded-2xl border border-[#C4B2F7]/40 transition-all hover:border-[#C4B2F7]">
                <div className="text-base font-extrabold text-[#4A3B69]">
                  Dosis Rekomendasi
                </div>
                <div className="text-3xl font-black text-[#2D1B4E] mt-1">
                  {recommendation.dosage} <span className="text-lg font-bold text-[#4A3B69]">mg/L</span>
                </div>
              </div>

              {/* Section 3: Ketersesuaian */}
              <div className="bg-[#E5D9F2]/60 p-5 rounded-2xl border border-[#C4B2F7]/40 transition-all hover:border-[#C4B2F7]">
                <div className="text-base font-extrabold text-[#4A3B69]">
                  Ketersesuaian
                </div>
                <div className="text-3xl font-black text-[#2D1B4E] mt-1">
                  92,7 %
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3 pt-4">
            {/* TERAPKAN DOSIS Button */}
            <button
              onClick={handleApplyDose}
              className="w-full bg-[#CDC1FF] hover:bg-[#B8A7FF] text-[#2D1B4E] font-black text-lg py-4 px-6 rounded-2xl shadow-md transition-all flex items-center justify-center gap-3 border border-[#C4B2F7]"
            >
              <Play className="w-6 h-6 fill-[#2D1B4E] text-[#2D1B4E]" />
              <span>TERAPKAN DOSIS</span>
            </button>

            {/* Bottom Controls Row: MODE AUTO & SETTINGS */}
            <div className="flex items-center gap-3">
              <button
                onClick={toggleAutoMode}
                className={`flex-1 font-black text-base py-3.5 px-6 rounded-2xl border shadow-xs transition-all ${autoMode
                    ? 'bg-[#CDC1FF] text-[#2D1B4E] border-[#C4B2F7]'
                    : 'bg-white text-[#2D1B4E] border-[#C4B2F7]'
                  }`}
              >
                MODE AUTO
              </button>

              <button
                onClick={handleSettings}
                className="p-3.5 bg-[#CDC1FF] text-[#2D1B4E] hover:bg-[#B8A7FF] rounded-2xl border border-[#C4B2F7] shadow-xs transition-all flex items-center justify-center shrink-0"
                title="Pengaturan Model AI"
              >
                <Settings className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>

        {/* KANAN: PREDIKSI KINERJA & ANALISIS AI */}
        <div className="lg:col-span-5 space-y-6 flex flex-col justify-between">
          {/* Card Upper: PREDIKSI KINERJA (AI) */}
          <div className="bg-white/80 backdrop-blur-md border border-[#C4B2F7]/50 rounded-3xl p-6 shadow-card-soft space-y-4">
            <h2 className="text-lg font-black text-[#2D1B4E] text-center uppercase tracking-wide">
              PREDIKSI KINERJA (AI)
            </h2>

            <div className="space-y-3">
              {/* Box 1: Penurunan COD */}
              <div className="bg-[#E5D9F2]/60 border border-[#C4B2F7]/40 p-4 rounded-2xl text-center space-y-1">
                <div className="text-base font-extrabold text-[#2D1B4E]">Penurunan COD</div>
                <div className="text-3xl font-black text-[#2D1B4E]">92,7 %</div>
                <div className="text-sm font-semibold text-[#4A3B69]">(Prediksi)</div>
              </div>

              {/* Box 2: Penetralan pH */}
              <div className="bg-[#E5D9F2]/60 border border-[#C4B2F7]/40 p-4 rounded-2xl text-center space-y-1">
                <div className="text-base font-extrabold text-[#2D1B4E]">Penetralan pH</div>
                <div className="text-3xl font-black text-[#2D1B4E]">98,7 %</div>
                <div className="text-sm font-semibold text-[#4A3B69]">(Prediksi)</div>
              </div>
            </div>
          </div>

          {/* Card Lower: ANALISIS AI */}
          <div className="bg-white/80 backdrop-blur-md border border-[#C4B2F7]/50 rounded-3xl p-6 shadow-card-soft flex-1 flex flex-col justify-start space-y-4">
            <div className="flex items-center justify-between border-b border-[#E5D9F2] pb-3">
              <h2 className="text-lg font-black text-[#2D1B4E] uppercase tracking-wide">
                ANALISIS AI
              </h2>
              <Brain className="w-7 h-7 text-[#FF74B1]" />
            </div>
            <ul className="space-y-3 text-sm font-bold text-[#2D1B4E] pt-1">
              <li className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center text-white shrink-0 shadow-xs">
                  <CheckCircle2 className="w-4 h-4 text-white fill-emerald-500" />
                </div>
                <span className="text-[#2D1B4E]">pH berada pada rentang normal</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center text-white shrink-0 shadow-xs">
                  <CheckCircle2 className="w-4 h-4 text-white fill-emerald-500" />
                </div>
                <span className="text-[#2D1B4E]">COD dalam kondisi baik</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center text-white shrink-0 shadow-xs">
                  <CheckCircle2 className="w-4 h-4 text-white fill-emerald-500" />
                </div>
                <span className="text-[#2D1B4E]">Dosis koagulan optimal untuk efisiensi tinggi</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center text-white shrink-0 shadow-xs">
                  <CheckCircle2 className="w-4 h-4 text-white fill-emerald-500" />
                </div>
                <span className="text-[#2D1B4E]">Sistem berjalan stabil</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
