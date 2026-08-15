import React, { useState, useRef } from 'react';
import { useData } from '../context/DataContext';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from 'recharts';
import {
  History,
  FlaskConical,
  TrendingUp,
  Calendar,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  Droplets,
  X,
  Sliders,
  Leaf,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

export default function RiwayatData() {
  const { batches, showToast } = useData();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBatch, setSelectedBatch] = useState(null);

  const scrollContainerRef = useRef(null);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -360, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 360, behavior: 'smooth' });
    }
  };

  // Daily usage data for top section bar chart (Total 29.8 kg, average 4.26 kg/day)
  const usageHistory = [
    { date: '11 Agt', kg: 5.0 },
    { date: '12 Agt', kg: 4.0 },
    { date: '13 Agt', kg: 6.4 },
    { date: '14 Agt', kg: 5.0 },
    { date: '15 Agt', kg: 5.0 },
    { date: '16 Agt', kg: 4.0 },
    { date: '17 Agt', kg: 4.4 }
  ];

  const filteredBatches = batches.filter(b =>
    b.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    b.date.toLowerCase().includes(searchQuery.toLowerCase()) ||
    b.status.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-4 sm:p-6 space-y-6 pb-12">
      {/* Header section */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-white/80 backdrop-blur-md p-4 sm:p-6 rounded-3xl border border-[#C4B2F7]/50 shadow-card-soft">
        <div>
          <div className="flex items-center gap-2 text-xs font-extrabold text-[#FF74B1] uppercase tracking-wider">
            <History className="w-4 h-4" />
            <span>Arsip Log & Audit Trail</span>
          </div>
          <h1 className="text-2xl font-black text-[#2D1B4E] mt-1">
            Riwayat Data Pengolahan Limbah
          </h1>
          <p className="text-base font-medium text-[#4A3B69]">
            Rekam jejak historis konsumsi koagulan, parameter limbah, dan performa pengolahan batch.
          </p>
        </div>
      </div>

      {/* TOP SECTION: Wide Card RINGKASAN PENGGUNAAN KOAGULAN */}
      <div className="bg-white/80 backdrop-blur-md border border-[#C4B2F7]/50 rounded-3xl p-6 shadow-card-soft">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#E5D9F2] flex items-center justify-center text-[#2D1B4E] border border-[#C4B2F7]/60">
              <FlaskConical className="w-5 h-5 text-[#FF74B1]" />
            </div>
            <div>
              <h2 className="text-lg font-black text-[#2D1B4E] uppercase tracking-tight">RINGKASAN PENGGUNAAN KOAGULAN</h2>
              <p className="text-xs text-[#4A3B69]">Statistik efisiensi dan akumulasi penggunaan bahan kimia harian</p>
            </div>
          </div>

          <span className="text-xs font-extrabold bg-[#E5D9F2] text-[#2D1B4E] px-3 py-1.5 rounded-xl border border-[#C4B2F7]/60 flex items-center gap-1 cursor-pointer">
            7 Hari Terakhir ▼
          </span>
        </div>

        {/* 2 Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {/* Box 1: Total Penggunaan */}
          <div className="bg-[#E5D9F2]/60 p-4 rounded-2xl border border-[#C4B2F7]/40 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center text-indigo-600 shrink-0 border border-indigo-200">
                <FlaskConical className="w-6 h-6 text-indigo-600 fill-indigo-200" />
              </div>
              <div>
                <div className="text-xs font-bold text-[#4A3B69]">Total Penggunaan</div>
                <div className="text-2xl font-black text-[#2D1B4E] mt-0.5">
                  29.8 <span className="text-sm font-bold text-[#4A3B69]">kg</span>
                </div>
              </div>
            </div>

            <div className="text-right bg-white/70 px-3 py-1.5 rounded-xl border border-[#C4B2F7]/40">
              <span className="block text-[10px] font-bold text-[#4A3B69]">Rata-rata</span>
              <span className="block text-xs font-black text-[#2D1B4E]">4.26 kg/Hari</span>
            </div>
          </div>

          {/* Box 2: Efisiensi Penggunaan */}
          <div className="bg-[#E5D9F2]/60 p-4 rounded-2xl border border-[#C4B2F7]/40 flex items-center justify-between relative overflow-hidden">
            <div>
              <div className="text-xs font-bold text-[#4A3B69]">Efisiensi Penggunaan</div>
              <div className="flex items-baseline gap-2 mt-0.5">
                <span className="text-2xl font-black text-[#2D1B4E]">17%</span>
                <span className="text-xs font-semibold text-[#4A3B69]">
                  Lebih hemat dibanding 7 hari sebelumnya
                </span>
              </div>
            </div>

            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-500 shrink-0 border border-emerald-200 ml-2">
              <Leaf className="w-6 h-6 text-emerald-500 fill-emerald-400" />
            </div>
          </div>
        </div>

        {/* Daily usage Bar Chart */}
        <div className="h-56 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={usageHistory} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5D9F2" />
              <XAxis dataKey="date" stroke="#4A3B69" fontSize={11} tickLine={false} />
              <YAxis stroke="#4A3B69" fontSize={11} tickLine={false} />
              <Tooltip contentStyle={{ backgroundColor: '#2D1B4E', borderRadius: '12px', color: '#fff' }} />
              <Bar dataKey="kg" name="Penggunaan Tawas (kg)" fill="#FF74B1" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* BOTTOM SECTION: Search Bar & Horizontal Single-Row Carousel Batch */}
      <div className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h2 className="text-lg font-extrabold text-[#2D1B4E] flex items-center gap-2">
            <Calendar className="w-5 h-5 text-[#FF74B1]" />
            LOG BATCH PENGOLAHAN
          </h2>

          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3.5 top-3 text-[#4A3B69]" />
              <input
                type="text"
                placeholder="Cari Batch ID atau Tanggal..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 bg-white text-xs font-bold text-[#2D1B4E] rounded-xl border border-[#C4B2F7] focus:outline-none w-64"
              />
            </div>

            {/* Navigation Slider Buttons */}
            <div className="flex items-center gap-1.5">
              <button
                onClick={scrollLeft}
                className="p-2 rounded-xl bg-[#E5D9F2] text-[#2D1B4E] hover:bg-[#CDC1FF] border border-[#C4B2F7] transition-all shadow-xs"
                title="Geser Kiri"
              >
                <ChevronLeft className="w-4.5 h-4.5" />
              </button>
              <button
                onClick={scrollRight}
                className="p-2 rounded-xl bg-[#E5D9F2] text-[#2D1B4E] hover:bg-[#CDC1FF] border border-[#C4B2F7] transition-all shadow-xs"
                title="Geser Kanan"
              >
                <ChevronRight className="w-4.5 h-4.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Horizontal Single Row Card List Slider */}
        <div 
          ref={scrollContainerRef}
          className="flex items-stretch gap-6 overflow-x-auto scrollbar-none scroll-smooth pb-4 pt-1"
        >
          {filteredBatches.map((batch) => (
            <div 
              key={batch.id} 
              className="w-[320px] sm:w-[350px] shrink-0 bg-white/80 backdrop-blur-md border border-[#C4B2F7]/50 rounded-3xl p-5 shadow-card-soft hover:shadow-purple-glow transition-all flex flex-col justify-between space-y-4"
            >
              <div>
                <div className="flex items-center justify-between border-b border-[#E5D9F2] pb-3 mb-3">
                  <span className="font-black text-base text-[#2D1B4E]">{batch.id}</span>
                  <span className="text-[10px] font-extrabold bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded-full border border-emerald-300">
                    {batch.status}
                  </span>
                </div>

                <div className="space-y-2 text-xs font-semibold text-[#4A3B69]">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5 text-[#4A3B69]/70">
                      <Clock className="w-3.5 h-3.5 text-[#FF74B1]" /> Waktu:
                    </span>
                    <span className="font-extrabold text-[#2D1B4E]">{batch.date}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5 text-[#4A3B69]/70">
                      <Droplets className="w-3.5 h-3.5 text-indigo-500" /> Volume Limbah:
                    </span>
                    <span className="font-extrabold text-[#2D1B4E]">{batch.volume} L</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5 text-[#4A3B69]/70">
                      <FlaskConical className="w-3.5 h-3.5 text-amber-500" /> Dosis Koagulan:
                    </span>
                    <span className="font-black text-[#FF74B1]">{batch.dose}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5 text-[#4A3B69]/70">
                      <Sliders className="w-3.5 h-3.5 text-emerald-500" /> Perubahan pH:
                    </span>
                    <span className="font-extrabold text-[#2D1B4E]">
                      {batch.phBefore} &rarr; <span className="text-emerald-600">{batch.phAfter}</span>
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5 text-[#4A3B69]/70">
                      <Clock className="w-3.5 h-3.5 text-[#2D1B4E]" /> Lama Proses:
                    </span>
                    <span className="font-extrabold text-[#2D1B4E]">{batch.duration} Menit</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setSelectedBatch(batch)}
                className="w-full bg-[#E5D9F2] hover:bg-[#FF74B1] hover:text-white text-[#2D1B4E] font-extrabold text-xs py-2.5 rounded-xl border border-[#C4B2F7] transition-all text-center"
              >
                Lihat Detail Process
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* MODAL DETAIL BATCH HISTORIS */}
      {selectedBatch && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-5 shadow-2xl border border-[#C4B2F7] animate-scaleIn">
            <div className="flex items-center justify-between border-b border-[#E5D9F2] pb-4">
              <div>
                <span className="text-xs font-bold text-[#FF74B1] uppercase">Detail Record Batch</span>
                <h3 className="text-xl font-black text-[#2D1B4E]">{selectedBatch.id}</h3>
              </div>
              <button
                onClick={() => setSelectedBatch(null)}
                className="p-1 rounded-full hover:bg-slate-100 text-slate-500"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3 bg-[#E5D9F2]/50 p-3 rounded-2xl">
                <div>
                  <div className="text-[10px] font-bold text-[#4A3B69] uppercase">Waktu Pengolahan</div>
                  <div className="font-extrabold text-[#2D1B4E] mt-0.5">{selectedBatch.date}</div>
                </div>
                <div>
                  <div className="text-[10px] font-bold text-[#4A3B69] uppercase">Volume Total</div>
                  <div className="font-extrabold text-[#2D1B4E] mt-0.5">{selectedBatch.volume} L</div>
                </div>
                <div>
                  <div className="text-[10px] font-bold text-[#4A3B69] uppercase">Dosis Diterapkan</div>
                  <div className="font-black text-[#FF74B1] mt-0.5">{selectedBatch.dose}</div>
                </div>
                <div>
                  <div className="text-[10px] font-bold text-[#4A3B69] uppercase">Efisiensi Reduksi</div>
                  <div className="font-extrabold text-emerald-600 mt-0.5">{selectedBatch.efficiency}</div>
                </div>
              </div>

              <div className="space-y-2 border-t border-b border-[#E5D9F2] py-3">
                <div className="font-extrabold text-[#2D1B4E]">Rincian Kualitas Influen & Effluen:</div>
                <div className="flex justify-between font-semibold text-[#4A3B69]">
                  <span>COD Influen: <strong>{selectedBatch.codBefore} mg/L</strong></span>
                  <span>COD Efluen: <strong className="text-emerald-600">{selectedBatch.codAfter} mg/L</strong></span>
                </div>
                <div className="flex justify-between font-semibold text-[#4A3B69]">
                  <span>pH Awal: <strong>{selectedBatch.phBefore}</strong></span>
                  <span>pH Akhir: <strong className="text-emerald-600">{selectedBatch.phAfter}</strong></span>
                </div>
              </div>

              <div className="bg-emerald-50 border border-emerald-200 p-3 rounded-xl text-emerald-800 text-xs font-bold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Batch ini dinyatakan 100% MEMENUHI BAKU MUTU Pengolahan Limbah Industri.</span>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setSelectedBatch(null)}
                className="bg-[#2D1B4E] text-white px-5 py-2.5 rounded-xl text-xs font-extrabold"
              >
                Tutup Window
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
