import React, { useState } from 'react';
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
  Download, 
  CheckCircle2, 
  Clock, 
  Droplets,
  X,
  Sliders
} from 'lucide-react';

export default function RiwayatData() {
  const { batches, showToast } = useData();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBatch, setSelectedBatch] = useState(null);

  // Daily usage data for top section bar chart
  const usageHistory = [
    { date: '11 Agt', kg: 28.5, efficiency: 16.2 },
    { date: '12 Agt', kg: 31.0, efficiency: 17.5 },
    { date: '13 Agt', kg: 26.8, efficiency: 16.8 },
    { date: '14 Agt', kg: 29.4, efficiency: 18.0 },
    { date: '15 Agt', kg: 32.1, efficiency: 15.9 },
    { date: '16 Agt', kg: 27.5, efficiency: 17.2 },
    { date: '17 Agt', kg: 29.8, efficiency: 17.0 }
  ];

  const filteredBatches = batches.filter(b => 
    b.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    b.date.toLowerCase().includes(searchQuery.toLowerCase()) ||
    b.status.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleExportCSV = () => {
    showToast('📄 Data riwayat batch berhasil diekspor ke file CSV!', 'success');
  };

  return (
    <div className="p-6 space-y-6 pb-12">
      {/* Header section */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-white/80 backdrop-blur-md p-6 rounded-3xl border border-[#C4B2F7]/50 shadow-card-soft">
        <div>
          <div className="flex items-center gap-2 text-xs font-extrabold text-[#FF74B1] uppercase tracking-wider">
            <History className="w-4 h-4" />
            <span>Arsip Log & Audit Trail</span>
          </div>
          <h1 className="text-2xl font-black text-[#2D1B4E] mt-1">
            Riwayat Data Pengolahan Limbah
          </h1>
          <p className="text-sm font-medium text-[#4A3B69]">
            Rekam jejak historis konsumsi koagulan, parameter limbah, dan performa pengolahan batch.
          </p>
        </div>

        <button
          onClick={handleExportCSV}
          className="flex items-center gap-2 bg-[#2D1B4E] hover:bg-[#4A3B69] text-white font-extrabold text-xs px-4 py-2.5 rounded-2xl shadow-md transition-all"
        >
          <Download className="w-4 h-4 text-[#FF74B1]" />
          <span>EKSPOR DATA CSV</span>
        </button>
      </div>

      {/* TOP SECTION: Wide Card RINGKASAN PENGGUNAAN KOAGULAN */}
      <div className="bg-white/80 backdrop-blur-md border border-[#C4B2F7]/50 rounded-3xl p-6 shadow-card-soft">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#FF74B1] to-[#FF9ECA] flex items-center justify-center text-white shadow-pink-glow">
              <FlaskConical className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg font-extrabold text-[#2D1B4E]">RINGKASAN PENGGUNAAN KOAGULAN</h2>
              <p className="text-xs text-[#4A3B69]">Statistik efisiensi dan akumulasi penggunaan bahan kimia harian</p>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="bg-[#E5D9F2]/70 px-4 py-2.5 rounded-2xl border border-[#C4B2F7]/40 text-center">
              <div className="text-[10px] font-bold text-[#4A3B69] uppercase">Total Penggunaan</div>
              <div className="text-xl font-black text-[#2D1B4E] mt-0.5">29.8 kg</div>
            </div>

            <div className="bg-emerald-50 px-4 py-2.5 rounded-2xl border border-emerald-200 text-center">
              <div className="text-[10px] font-bold text-emerald-800 uppercase">Efisiensi Rata-Rata</div>
              <div className="text-xl font-black text-emerald-600 mt-0.5 flex items-center justify-center gap-1">
                <TrendingUp className="w-4 h-4" />
                <span>+17.0%</span>
              </div>
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

      {/* BOTTOM SECTION: Search Bar & Grid Cards List Batch */}
      <div className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h2 className="text-lg font-extrabold text-[#2D1B4E] flex items-center gap-2">
            <Calendar className="w-5 h-5 text-[#FF74B1]" />
            ARシップ LOG BATCH PENGOLAHAN
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
          </div>
        </div>

        {/* Grid Card List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBatches.map((batch) => (
            <div key={batch.id} className="bg-white/80 backdrop-blur-md border border-[#C4B2F7]/50 rounded-3xl p-5 shadow-card-soft hover:shadow-purple-glow transition-all flex flex-col justify-between space-y-4">
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
                    <span className="font-extrabold text-[#2D1B4E]">{batch.volume} Litrik</span>
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
