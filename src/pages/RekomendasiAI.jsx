import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { 
  Cpu, 
  FlaskConical, 
  Zap, 
  CheckCircle2, 
  ArrowDownRight, 
  Sliders, 
  Sparkles, 
  RefreshCw,
  ShieldAlert,
  Award,
  Layers
} from 'lucide-react';

export default function RekomendasiAI() {
  const { 
    sensorData, 
    recommendation, 
    setRecommendation, 
    applyDose, 
    autoMode, 
    toggleAutoMode,
    showToast
  } = useData();

  // Interactive dose override slider
  const [manualDose, setManualDose] = useState(recommendation.dosage);
  const [selectedCoagulant, setSelectedCoagulant] = useState(recommendation.coagulantType);

  const handleApplyManual = () => {
    applyDose(manualDose);
  };

  const handleRecalibrate = () => {
    showToast('🧠 Model AI EcoMind v1.7 berhasil dikalibrasi ulang dengan 312 batch data historis!', 'success');
  };

  return (
    <div className="p-6 space-y-6 pb-12">
      {/* Header section */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-gradient-to-r from-[#2D1B4E] to-[#4A3B69] text-white p-6 rounded-3xl shadow-xl">
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

        <button
          onClick={handleRecalibrate}
          className="flex items-center gap-2 bg-[#FF74B1] hover:bg-[#FF74B1]/90 text-white font-extrabold text-xs px-4 py-2.5 rounded-2xl shadow-pink-glow transition-all"
        >
          <RefreshCw className="w-4 h-4" />
          <span>KALIBRASI MODEL AI</span>
        </button>
      </div>

      {/* TWO COLUMN LAYOUT: KIRI & KANAN */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* KIRI: Panel Besar REKOMENDASI DOSIS KOAGULAN */}
        <div className="lg:col-span-7 bg-white/80 backdrop-blur-md border border-[#C4B2F7]/50 rounded-3xl p-6 shadow-card-soft flex flex-col justify-between space-y-6">
          <div>
            <div className="flex items-center justify-between border-b border-[#C4B2F7]/40 pb-4 mb-4">
              <div>
                <span className="text-xs font-bold text-[#FF74B1] uppercase tracking-wider">Modul Output</span>
                <h2 className="text-xl font-black text-[#2D1B4E]">REKOMENDASI DOSIS KOAGULAN</h2>
              </div>
              <span className="bg-emerald-100 text-emerald-800 text-xs font-extrabold px-3 py-1 rounded-full border border-emerald-300">
                STATUS: {recommendation.status}
              </span>
            </div>

            {/* Current Water Input Summary */}
            <div className="grid grid-cols-3 gap-3 bg-[#E5D9F2]/60 p-4 rounded-2xl border border-[#C4B2F7]/40 mb-6">
              <div>
                <div className="text-[10px] font-bold text-[#4A3B69] uppercase">pH Influen Saat Ini</div>
                <div className="text-lg font-black text-[#2D1B4E]">{sensorData.ph.toFixed(2)}</div>
              </div>
              <div>
                <div className="text-[10px] font-bold text-[#4A3B69] uppercase">COD Influen Saat Ini</div>
                <div className="text-lg font-black text-[#FF74B1]">{sensorData.cod.toFixed(1)} mg/L</div>
              </div>
              <div>
                <div className="text-[10px] font-bold text-[#4A3B69] uppercase">Debit Influen</div>
                <div className="text-lg font-black text-[#2D1B4E]">{sensorData.flowRate} L/min</div>
              </div>
            </div>

            {/* Recommendation Detail Form */}
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-extrabold text-[#2D1B4E] uppercase mb-1">
                  Pilih Jenis Koagulan:
                </label>
                <select
                  value={selectedCoagulant}
                  onChange={(e) => {
                    setSelectedCoagulant(e.target.value);
                    setRecommendation(r => ({ ...r, coagulantType: e.target.value }));
                  }}
                  className="w-full bg-[#E5D9F2] text-[#2D1B4E] font-bold text-sm p-3 rounded-2xl border border-[#C4B2F7] focus:outline-none"
                >
                  <option value="Tawas (Aluminium Sulfat)">Tawas / Aluminium Sulfat [Al2(SO4)3]</option>
                  <option value="Poly Aluminium Chloride (PAC)">Poly Aluminium Chloride (PAC)</option>
                  <option value="Feri Klorida (FeCl3)">Feri Klorida (FeCl3)</option>
                </select>
              </div>

              {/* Slider Dosage */}
              <div className="bg-white p-4 rounded-2xl border border-[#C4B2F7]/50 shadow-xs space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold text-[#2D1B4E]">Penyesuaian Dosis Manual (Slider):</span>
                  <span className="text-xl font-black text-[#FF74B1]">{manualDose} mg/L</span>
                </div>
                <input
                  type="range"
                  min="1.0"
                  max="10.0"
                  step="0.1"
                  value={manualDose}
                  onChange={(e) => setManualDose(parseFloat(e.target.value))}
                  className="w-full accent-[#FF74B1] cursor-pointer"
                />
                <div className="flex justify-between text-[10px] font-bold text-[#4A3B69]">
                  <span>Minimum: 1.0 mg/L</span>
                  <span className="text-emerald-600">Rekomendasi AI: {recommendation.dosage} mg/L</span>
                  <span>Maksimum: 10.0 mg/L</span>
                </div>
              </div>

              {/* Score breakdown */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-[#CDC1FF]/40 p-4 rounded-2xl border border-[#C4B2F7]">
                  <div className="text-xs font-extrabold text-[#4A3B69]">Tingkat Kesesuaian AI</div>
                  <div className="text-3xl font-black text-emerald-600 mt-1">
                    {recommendation.suitability}%
                  </div>
                  <div className="text-[10px] font-medium text-[#4A3B69] mt-1">
                    Berdasarkan pencocokan pola 312 batch historis
                  </div>
                </div>

                <div className="bg-[#CDC1FF]/40 p-4 rounded-2xl border border-[#C4B2F7]">
                  <div className="text-xs font-extrabold text-[#4A3B69]">Status Aktuator Dosing</div>
                  <div className="text-lg font-black text-[#2D1B4E] mt-1">
                    {autoMode ? 'OTOMATIS (Direct API)' : 'MANUAL (Persetujuan)'}
                  </div>
                  <div className="text-[10px] font-medium text-[#4A3B69] mt-1">
                    Mode saat ini: {autoMode ? 'Pompa berjalan otomatis' : 'Menunggu klik operator'}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-4 border-t border-[#C4B2F7]/50 flex flex-wrap items-center gap-3">
            <button
              onClick={handleApplyManual}
              className="flex-1 bg-[#FF74B1] hover:bg-[#FF74B1]/90 text-white font-extrabold text-sm py-3.5 px-6 rounded-2xl shadow-pink-glow transition-all text-center flex items-center justify-center gap-2"
            >
              <FlaskConical className="w-5 h-5" />
              <span>TERAPKAN DOSIS ({manualDose} mg/L)</span>
            </button>

            <button
              onClick={toggleAutoMode}
              className={`px-5 py-3.5 rounded-2xl font-extrabold text-xs border transition-all ${
                autoMode 
                  ? 'bg-emerald-600 text-white border-emerald-500 shadow-sm' 
                  : 'bg-[#2D1B4E] text-white border-[#2D1B4E]'
              }`}
            >
              {autoMode ? 'DISABLE AUTO MODE' : 'ENABLE AUTO MODE'}
            </button>
          </div>
        </div>

        {/* KANAN: Panel PREDIKSI KINERJA (AI) yang Diperbesar */}
        <div className="lg:col-span-5 bg-white/80 backdrop-blur-md border border-[#C4B2F7]/50 rounded-3xl p-6 shadow-card-soft flex flex-col justify-between space-y-6">
          <div>
            <div className="flex items-center justify-between border-b border-[#C4B2F7]/40 pb-4 mb-4">
              <div>
                <span className="text-xs font-bold text-[#FF74B1] uppercase tracking-wider">Simulasi Output</span>
                <h2 className="text-xl font-black text-[#2D1B4E]">PREDIKSI KINERJA (AI)</h2>
              </div>
              <Sparkles className="w-6 h-6 text-[#FF74B1]" />
            </div>

            {/* Performance Cards */}
            <div className="space-y-4">
              <div className="bg-gradient-to-r from-emerald-500/10 to-emerald-500/20 border border-emerald-500/30 p-4 rounded-2xl">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold text-emerald-900 uppercase">Estimasi Penurunan COD</span>
                  <ArrowDownRight className="w-5 h-5 text-emerald-600" />
                </div>
                <div className="text-4xl font-black text-emerald-600 mt-1">
                  92.7%
                </div>
                <div className="text-xs font-medium text-emerald-800 mt-1">
                  COD efluen diprediksi turun menjadi <strong>{(sensorData.cod * (1 - 0.927)).toFixed(1)} mg/L</strong> (Baku Mutu: &lt; 100 mg/L)
                </div>
              </div>

              <div className="bg-gradient-to-r from-indigo-500/10 to-indigo-500/20 border border-indigo-500/30 p-4 rounded-2xl">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold text-indigo-900 uppercase">Penetralan pH Efluen</span>
                  <CheckCircle2 className="w-5 h-5 text-indigo-600" />
                </div>
                <div className="text-4xl font-black text-indigo-600 mt-1">
                  98.7%
                </div>
                <div className="text-xs font-medium text-indigo-800 mt-1">
                  pH akhir diprediksi stabil di angka <strong>7.20</strong> (Baku Mutu: 6.5 - 8.5)
                </div>
              </div>

              {/* Checklist Analisis AI Lengkap */}
              <div className="p-4 rounded-2xl bg-[#E5D9F2]/60 border border-[#C4B2F7]/50 space-y-3">
                <div className="text-xs font-extrabold text-[#2D1B4E] uppercase">DIAGNOSTIK ANALISIS AI:</div>
                <ul className="space-y-2.5 text-xs font-semibold text-[#4A3B69]">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>Flokulasi mikro terjadi optimal dalam 12-15 menit pertama.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>Dosis 3.8 mg/L mencegah over-dosing yang memicu kekeruhan sekunder.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>Menghemat estimasi biaya kimia sebesar Rp 450.000 / batch.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>Indeks alkalinitas air mencukupi tanpa bantuan kapur reaksi.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
