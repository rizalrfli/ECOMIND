import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import GaugeCard from '../components/charts/GaugeCard';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  BarChart,
  Bar
} from 'recharts';
import {
  Sparkles,
  CheckCircle2,
  XCircle,
  ArrowDownRight,
  Clock,
  Sliders,
  Zap,
  FlaskConical,
  ChevronRight,
  Info,
  ShieldCheck,
  Bell,
  Leaf
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Beranda() {
  const {
    sensorData,
    recommendation,
    applyDose,
    autoMode,
    toggleAutoMode,
    trendHistory,
    notifications,
    batches
  } = useData();

  const [timeFilter, setTimeFilter] = useState('24h');

  // Mini bar data for past 7 days coagulant consumption
  const barData = [
    { day: '11 Agus', tawas: 5.0 },
    { day: '12 Agus', tawas: 4.0 },
    { day: '13 Agus', tawas: 6.4 },
    { day: '14 Agus', tawas: 5.0 },
    { day: '15 Agus', tawas: 5.0 },
    { day: '16 Agus', tawas: 4.0 },
    { day: '17 Agus', tawas: 4.4 },
  ];

  // Monitoring table rows
  const monitoringTable = [
    {
      param: 'pH Air (Derajat Keasaman)',
      value: `${sensorData.ph.toFixed(2)}`,
      standard: '6 - 9',
      status: sensorData.ph >= 6 && sensorData.ph <= 9 ? 'Sesuai' : 'FAIL',
      unit: ''
    },
    {
      param: 'COD (Chemical Oxygen Demand)',
      value: `${sensorData.cod.toFixed(1)} mg/L`,
      standard: '< 100 mg/L',
      status: sensorData.cod <= 100 ? 'Sesuai' : 'FAIL',
      unit: 'mg/L'
    }
  ];

  const isAllMeetingStandard = monitoringTable.every(item => item.status === 'Sesuai');

  return (
    <div className="p-4 sm:p-6 space-y-6 pb-12">
      {/* Page Title & Hero Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-gradient-to-r from-[#CDC1FF] via-[#E5D9F2] to-white p-4 sm:p-6 rounded-3xl border border-white/80 shadow-card-soft">
        <div>
          <div className="flex items-center gap-2 text-xs font-extrabold text-[#FF74B1] uppercase tracking-wider">
            <Sparkles className="w-4 h-4" />
            <span>AI-Powered Coagulant Optimizer</span>
          </div>
          <h1 className="text-2xl font-black text-[#2D1B4E] mt-1">
            Dashboard Utama EcoMind AI
          </h1>
          <p className="text-base font-medium text-[#4A3B69] mt-0.5">
            Ringkasan pemantauan real-time dan rekomendasi penentuan dosis koagulan otomatis.
          </p>
        </div>
      </div>

      {/* GRID SECTION 1: TOP ROW (Kiri Atas & Kanan Atas) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Grid Kiri Atas: Gauge Chart pH & COD */}
        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <GaugeCard
            title="pH Air Influen"
            value={sensorData.ph}
            unit=""
            min={0}
            max={14}
            safeRange={[6, 9]}
            warningRange={[5, 10]}
          />
          <GaugeCard
            title="COD Influen"
            value={sensorData.cod}
            unit="mg/L"
            min={0}
            max={500}
            customRanges={{ safe: 100, warning: 200, danger: 500 }}
          />
        </div>

        {/* Grid Kanan Atas: Panel Rekomendasi Dosis Koagulan */}
        <div className="lg:col-span-5 bg-gradient-to-br from-[#2D1B4E] to-[#4A3B69] text-white rounded-3xl p-6 shadow-xl flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 transform translate-x-4 -translate-y-4 w-32 h-32 bg-[#FF74B1]/20 rounded-full blur-2xl pointer-events-none"></div>

          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-black uppercase tracking-widest text-[#FF74B1] bg-[#FF74B1]/20 px-3 py-1 rounded-full border border-[#FF74B1]/40">
                REKOMENDASI DOSIS AI
              </span>
              <span className="text-xs font-semibold text-emerald-400 flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                Optimum Score: {recommendation.suitability}%
              </span>
            </div>

            <div className="space-y-4">
              <div>
                <div className="text-xs text-white/70 font-medium">Jenis Koagulan Utama:</div>
                <div className="text-xl font-black text-white mt-0.5 flex items-center gap-2">
                  <FlaskConical className="w-5 h-5 text-[#FF74B1]" />
                  <span>{recommendation.coagulantType}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 bg-white/10 p-4 rounded-2xl border border-white/10 backdrop-blur-sm">
                <div>
                  <div className="text-[11px] text-white/70 font-semibold uppercase">Dosis Optimal</div>
                  <div className="text-3xl font-black text-[#FF74B1] mt-0.5">
                    {recommendation.dosage} <span className="text-xs font-bold text-white/80">mg/L</span>
                  </div>
                </div>

                <div>
                  <div className="text-[11px] text-white/70 font-semibold uppercase">Tingkat Kesesuaian</div>
                  <div className="text-3xl font-black text-emerald-400 mt-0.5">
                    {recommendation.suitability}<span className="text-xs font-bold text-white/80">%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-5 mt-4 border-t border-white/15 flex items-center gap-3">
            <button
              onClick={() => applyDose()}
              className="flex-1 bg-[#FF74B1] hover:bg-[#FF74B1]/90 text-white font-extrabold text-xs py-3 px-4 rounded-xl shadow-pink-glow transition-all text-center"
            >
              TERAPKAN DOSIS
            </button>

            <button
              onClick={toggleAutoMode}
              className={`px-4 py-3 rounded-xl font-extrabold text-xs border transition-all ${autoMode
                ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300'
                : 'bg-white/10 border-white/30 text-white hover:bg-white/20'
                }`}
            >
              {autoMode ? 'MODE AUTO ON' : 'MODE AUTO OFF'}
            </button>
          </div>
        </div>
      </div>

      {/* GRID SECTION 2: MIDDLE ROW (Tengah Kiri & Tengah Kanan) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Grid Tengah Kiri: Line Chart TREN PARAMETER */}
        <div className="lg:col-span-7 bg-[#7257CD] text-white rounded-3xl p-6 shadow-xl flex flex-col justify-between">
          <div className="flex items-center justify-between gap-3 mb-2">
            <h2 className="text-lg font-black text-white uppercase tracking-wide">
              TREN PARAMETER
            </h2>

            <select
              value={timeFilter}
              onChange={(e) => setTimeFilter(e.target.value)}
              className="bg-[#5C42B3] text-white text-xs font-bold px-3 py-1.5 rounded-xl border border-[#8C74DE] focus:outline-none cursor-pointer"
            >
              <option value="24h">24 Jam Terakhir</option>
              <option value="6h">6 Jam Terakhir</option>
              <option value="1h">1 Jam Terakhir</option>
            </select>
          </div>

          {/* Centered Legend Header */}
          <div className="flex items-center justify-center gap-6 text-xs font-extrabold my-2 text-white/90">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#FF74B1]"></span>
              <span>pH</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#EAE2FC]"></span>
              <span>COD(mg/L)</span>
            </div>
          </div>

          {/* Line Chart */}
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trendHistory} margin={{ top: 10, right: 10, left: -20, bottom: 15 }}>
                <CartesianGrid strokeDasharray="0" stroke="rgba(255, 255, 255, 0.15)" vertical={false} />
                <XAxis
                  dataKey="time"
                  stroke="#EAE2FC"
                  fontSize={11}
                  tickLine={false}
                  dy={5}
                  label={{ value: 'Waktu', position: 'insideBottom', offset: -10, fill: '#EAE2FC', fontSize: 11, fontWeight: 'bold' }}
                />
                <YAxis
                  stroke="#EAE2FC"
                  fontSize={11}
                  domain={[0, 120]}
                  ticks={[20, 40, 60, 80, 100, 120]}
                  tickLine={false}
                />
                <Tooltip
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-[#1E232A] text-white px-3.5 py-2 rounded-xl shadow-2xl border border-gray-700/50 text-center font-sans relative">
                          <div className="text-xs font-black mb-1 tracking-wider text-white">
                            {label}
                          </div>
                          <div className="space-y-0.5 text-xs font-semibold text-gray-200">
                            {payload.map((entry, index) => {
                              const isPh = entry.dataKey === 'ph' || entry.name.toLowerCase().includes('ph');
                              const labelText = isPh ? 'pH' : 'COD(mg/L)';
                              return (
                                <div key={`item-${index}`} className="leading-tight">
                                  <span>{labelText}: {entry.value}</span>
                                </div>
                              );
                            })}
                          </div>
                          <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-[#1E232A]"></div>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="ph"
                  name="pH"
                  stroke="#FF74B1"
                  strokeWidth={3}
                  dot={{ r: 4, fill: '#FF74B1', strokeWidth: 0 }}
                />
                <Line
                  type="monotone"
                  dataKey="cod"
                  name="COD(mg/L)"
                  stroke="#EAE2FC"
                  strokeWidth={3}
                  dot={{ r: 4, fill: '#EAE2FC', strokeWidth: 0 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Grid Tengah Kanan: Tabel MONITORING REAL-TIME & Header Label */}
        <div className="lg:col-span-5 bg-white/80 backdrop-blur-md border border-[#C4B2F7]/50 rounded-3xl p-6 shadow-card-soft flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-extrabold text-[#2D1B4E]">MONITORING REAL-TIME</h2>
              <span className="text-[11px] font-bold text-[#4A3B69] bg-[#E5D9F2] px-2.5 py-1 rounded-lg">
                2 Sensor Aktif
              </span>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-[#C4B2F7] text-[#4A3B69] font-extrabold uppercase text-[10px]">
                    <th className="py-2 px-2">Parameter</th>
                    <th className="py-2 px-2">Nilai</th>
                    <th className="py-2 px-2">Baku Mutu</th>
                    <th className="py-2 px-2 text-center">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E5D9F2]">
                  {monitoringTable.map((row, idx) => (
                    <tr key={idx} className="hover:bg-[#E5D9F2]/40 transition-colors">
                      <td className="py-2.5 px-2 font-bold text-[#2D1B4E]">{row.param}</td>
                      <td className="py-2.5 px-2 font-black text-[#FF74B1]">{row.value}</td>
                      <td className="py-2.5 px-2 text-[#4A3B69] font-semibold">{row.standard}</td>
                      <td className="py-2.5 px-2 text-center">
                        {row.status === 'Sesuai' ? (
                          <span className="inline-flex items-center gap-1 text-emerald-700 bg-emerald-100 font-extrabold px-2 py-0.5 rounded-full">
                            <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Sesuai
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-red-700 bg-red-100 font-extrabold px-2 py-0.5 rounded-full">
                            <XCircle className="w-3 h-3 text-red-600" /> ALERT
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Prominent Large Label: MEMENUHI BAKU MUTU */}
          <div className={`mt-4 p-4 rounded-2xl border flex items-center justify-between shadow-xs ${isAllMeetingStandard
            ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-900'
            : 'bg-amber-500/10 border-amber-500/40 text-amber-900'
            }`}>
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-white ${isAllMeetingStandard ? 'bg-emerald-500' : 'bg-amber-500'
                }`}>
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-wider font-extrabold opacity-80">Evaluasi Baku Mutu</div>
                <div className="text-base font-black tracking-tight">
                  {isAllMeetingStandard ? 'MEMENUHI BAKU MUTU AMAN' : 'PERLU PERHATIAN PARAMETER'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* GRID SECTION 3: BOTTOM ROW (Bawah Kiri, Bawah Tengah, Bawah Kanan) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Grid Bawah Kiri: Panel PREDIKSI KINERJA (AI) */}
        <div className="lg:col-span-4 bg-white/80 backdrop-blur-md border border-[#C4B2F7]/50 rounded-3xl p-6 shadow-card-soft flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-base font-extrabold text-[#2D1B4E] flex items-center gap-2">
                <Zap className="w-4 h-4 text-[#FF74B1]" />
                PREDIKSI KINERJA (AI)
              </h2>
              <span className="text-[10px] font-bold bg-[#FF74B1]/10 text-[#FF74B1] px-2 py-0.5 rounded-md">
                EcoMind AI v1.7
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 my-3">
              <div className="bg-[#E5D9F2]/60 p-3 rounded-2xl border border-[#C4B2F7]/40">
                <div className="text-[10px] font-bold text-[#4A3B69] uppercase">Penurunan COD</div>
                <div className="text-2xl font-black text-emerald-600 mt-1 flex items-baseline gap-1">
                  <span>92.7%</span>
                  <ArrowDownRight className="w-4 h-4 text-emerald-600" />
                </div>
              </div>

              <div className="bg-[#E5D9F2]/60 p-3 rounded-2xl border border-[#C4B2F7]/40">
                <div className="text-[10px] font-bold text-[#4A3B69] uppercase">Penetralan pH</div>
                <div className="text-2xl font-black text-[#2D1B4E] mt-1">
                  98.7%
                </div>
              </div>
            </div>

            {/* Checklist Analisis AI */}
            <div className="space-y-2 mt-4">
              <div className="text-xs font-extrabold text-[#2D1B4E] uppercase tracking-wider">ANALISIS AI:</div>
              <ul className="space-y-2 text-xs font-semibold text-[#4A3B69]">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>pH berada pada rentang normal</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>COD dalam kondisi baik</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>Dosis koagulan optimal untuk efisiensi tinggi</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>Sistem berjalan stabil</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Grid Bawah Tengah: Panel NOTIFIKASI Ringkas (3 log terakhir) */}
        <div className="lg:col-span-4 bg-white/80 backdrop-blur-md border border-[#C4B2F7]/50 rounded-3xl p-6 shadow-card-soft flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-extrabold text-[#2D1B4E] flex items-center gap-2">
                <Bell className="w-4 h-4 text-[#FF74B1]" />
                NOTIFIKASI TERKINI
              </h2>
              <Link to="/notifikasi" className="text-xs font-bold text-[#FF74B1] hover:underline flex items-center gap-1">
                Lihat Semua <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="space-y-3">
              {notifications.slice(0, 3).map((item) => (
                <div key={item.id} className="p-3 rounded-2xl bg-[#E5D9F2]/50 border border-[#C4B2F7]/40 hover:bg-[#E5D9F2] transition-colors">
                  <div className="flex items-center justify-between">
                    <span className={`text-[9px] font-black px-2 py-0.5 rounded-full ${item.type === 'INPUT' ? 'bg-indigo-100 text-indigo-800' : 'bg-emerald-100 text-emerald-800'
                      }`}>
                      {item.type} BATCH #{item.batchId}
                    </span>
                    <span className="text-[10px] text-[#4A3B69] font-medium">{item.timestamp}</span>
                  </div>
                  <h4 className="text-xs font-extrabold text-[#2D1B4E] mt-1 line-clamp-1">{item.title}</h4>
                  <p className="text-[11px] text-[#4A3B69] mt-0.5 line-clamp-1">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Grid Bawah Kanan: Panel RINGKASAN PENGGUNAAN KOAGULAN */}
        <div className="lg:col-span-4 bg-white/80 backdrop-blur-md border border-[#C4B2F7]/50 rounded-3xl p-6 shadow-card-soft flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-black text-[#2D1B4E] uppercase tracking-wide flex items-center gap-2">
                <FlaskConical className="w-4 h-4 text-[#FF74B1]" />
                RINGKASAN PENGGUNAAN KOAGULAN
              </h2>
              <span className="text-[10px] font-extrabold bg-[#E5D9F2] text-[#2D1B4E] px-2.5 py-1 rounded-lg border border-[#C4B2F7]/60 flex items-center gap-1 cursor-pointer">
                7 Hari Terakhir
              </span>
            </div>

            {/* 2 Summary Cards */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              {/* Box 1: Total Penggunaan */}
              <div className="bg-[#E5D9F2]/60 p-3 rounded-2xl border border-[#C4B2F7]/40 flex flex-col justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-600 shrink-0">
                    <FlaskConical className="w-4 h-4 text-indigo-600 fill-indigo-200" />
                  </div>
                  <span className="text-[10px] font-bold text-[#4A3B69]">Total Penggunaan</span>
                </div>
                <div className="mt-2 flex items-baseline justify-between">
                  <span className="text-xl font-black text-[#2D1B4E]">29.8 <span className="text-xs font-bold text-[#4A3B69]">kg</span></span>
                  <div className="text-right">
                    <span className="block text-[8px] font-semibold text-[#4A3B69]">Rata-rata</span>
                    <span className="block text-[10px] font-extrabold text-[#2D1B4E]">4.26 kg/Hari</span>
                  </div>
                </div>
              </div>

              {/* Box 2: Efisiensi Penggunaan */}
              <div className="bg-[#E5D9F2]/60 p-3 rounded-2xl border border-[#C4B2F7]/40 relative overflow-hidden flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-[#4A3B69]">Efisiensi Penggunaan</span>
                  <Leaf className="w-5 h-5 text-emerald-500 fill-emerald-400 shrink-0" />
                </div>
                <div className="mt-2">
                  <span className="text-xl font-black text-[#2D1B4E]">17%</span>
                  <p className="text-[9px] font-semibold text-[#4A3B69] leading-tight mt-0.5">
                    Lebih hemat dibanding 7 hari sebelumnya
                  </p>
                </div>
              </div>
            </div>

            {/* Bar Chart */}
            <div className="h-44 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={barData} margin={{ top: 10, right: 0, left: -25, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5D9F2" />
                  <XAxis dataKey="day" stroke="#4A3B69" fontSize={9} tickLine={false} interval={0} />
                  <YAxis stroke="#4A3B69" fontSize={9} tickLine={false} domain={[0, 6]} ticks={[0, 2, 4, 6]} />
                  <Tooltip contentStyle={{ backgroundColor: '#2D1B4E', borderRadius: '10px', color: '#fff', fontSize: '11px' }} />
                  <Bar dataKey="tawas" name="Penggunaan (kg)" fill="#FF74B1" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
