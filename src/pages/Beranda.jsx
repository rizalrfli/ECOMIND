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
  Bell
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
    { day: 'Sen', tawas: 28.5 },
    { day: 'Sel', tawas: 31.0 },
    { day: 'Rab', tawas: 26.8 },
    { day: 'Kam', tawas: 29.4 },
    { day: 'Jum', tawas: 32.1 },
    { day: 'Sab', tawas: 27.5 },
    { day: 'Min', tawas: 29.8 },
  ];

  // Monitoring table rows
  const monitoringTable = [
    {
      param: 'pH Air (Derajat Keasaman)',
      value: `${sensorData.ph.toFixed(2)}`,
      standard: '6.5 - 8.5',
      status: sensorData.ph >= 6.5 && sensorData.ph <= 8.5 ? 'OK' : 'FAIL',
      unit: ''
    },
    {
      param: 'COD (Chemical Oxygen Demand)',
      value: `${sensorData.cod.toFixed(1)} mg/L`,
      standard: '< 100 mg/L',
      status: sensorData.cod <= 100 ? 'OK' : 'FAIL',
      unit: 'mg/L'
    }
  ];

  const isAllMeetingStandard = monitoringTable.every(item => item.status === 'OK');

  return (
    <div className="p-6 space-y-6 pb-12">
      {/* Page Title & Hero Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-gradient-to-r from-[#CDC1FF] via-[#E5D9F2] to-white p-6 rounded-3xl border border-white/80 shadow-card-soft">
        <div>
          <div className="flex items-center gap-2 text-xs font-extrabold text-[#FF74B1] uppercase tracking-wider">
            <Sparkles className="w-4 h-4" />
            <span>AI-Powered Coagulant Optimizer</span>
          </div>
          <h1 className="text-2xl font-black text-[#2D1B4E] mt-1">
            Dashboard Utama EcoMind AI
          </h1>
          <p className="text-sm font-medium text-[#4A3B69] mt-0.5">
            Ringkasan pemantauan real-time dan rekomendasi penentuan dosis koagulan otomatis.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={toggleAutoMode}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl font-extrabold text-xs shadow-md transition-all ${autoMode
              ? 'bg-gradient-to-r from-[#FF74B1] to-[#FF9ECA] text-white shadow-pink-glow'
              : 'bg-white text-[#2D1B4E] border border-[#C4B2F7]'
              }`}
          >
            <Zap className={`w-4 h-4 ${autoMode ? 'fill-white' : 'text-[#FF74B1]'}`} />
            <span>MODE AUTO: {autoMode ? 'AKTIF' : 'NON-AKTIF'}</span>
          </button>

          <button
            onClick={() => applyDose()}
            className="flex items-center gap-2 bg-[#2D1B4E] hover:bg-[#4A3B69] text-white px-5 py-2.5 rounded-2xl font-extrabold text-xs shadow-md transition-all"
          >
            <FlaskConical className="w-4 h-4 text-[#FF74B1]" />
            <span>TERAPKAN DOSIS ({recommendation.dosage} mg/L)</span>
          </button>
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
            safeRange={[6.5, 8.5]}
            warningRange={[5.5, 9.5]}
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
              TERAPKAN DOSIS NOW
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
        <div className="lg:col-span-7 bg-white/80 backdrop-blur-md border border-[#C4B2F7]/50 rounded-3xl p-6 shadow-card-soft">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            <div>
              <h2 className="text-base font-extrabold text-[#2D1B4E] flex items-center gap-2">
                <Sliders className="w-4 h-4 text-[#FF74B1]" />
                TREN PARAMETER REAL-TIME
              </h2>
              <p className="text-xs text-[#4A3B69]">Grafik pergerakan pH dan COD (Sumbu X: Waktu, Sumbu Y: Nilai)</p>
            </div>

            <select
              value={timeFilter}
              onChange={(e) => setTimeFilter(e.target.value)}
              className="bg-[#E5D9F2] text-[#2D1B4E] text-xs font-bold px-3 py-1.5 rounded-xl border border-[#C4B2F7] focus:outline-none cursor-pointer"
            >
              <option value="1h">1 Jam Terakhir</option>
              <option value="6h">6 Jam Terakhir</option>
              <option value="24h">24 Jam Terakhir</option>
            </select>
          </div>

          {/* Line Chart */}
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trendHistory} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5D9F2" />
                <XAxis dataKey="time" stroke="#4A3B69" fontSize={10} tickLine={false} />
                <YAxis yAxisId="left" stroke="#FF74B1" fontSize={10} domain={[0, 14]} tickLine={false} />
                <YAxis yAxisId="right" orientation="right" stroke="#2D1B4E" fontSize={10} domain={[0, 300]} tickLine={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#2D1B4E', borderRadius: '12px', color: '#fff', border: 'none' }}
                />
                <Line yAxisId="left" type="monotone" dataKey="ph" name="pH Air" stroke="#FF74B1" strokeWidth={3} dot={false} />
                <Line yAxisId="right" type="monotone" dataKey="cod" name="COD (mg/L)" stroke="#2D1B4E" strokeWidth={2.5} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="flex items-center justify-center gap-6 text-xs font-bold text-[#4A3B69] mt-2 pt-2 border-t border-[#C4B2F7]/30">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#FF74B1]"></span>
              <span>pH (Skala 0-14)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#2D1B4E]"></span>
              <span>COD mg/L (Limit: 100 mg/L)</span>
            </div>
          </div>
        </div>

        {/* Grid Tengah Kanan: Tabel MONITORING REAL-TIME & Header Label */}
        <div className="lg:col-span-5 bg-white/80 backdrop-blur-md border border-[#C4B2F7]/50 rounded-3xl p-6 shadow-card-soft flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-extrabold text-[#2D1B4E]">MONITORING REAL-TIME</h2>
              <span className="text-[11px] font-bold text-[#4A3B69] bg-[#E5D9F2] px-2.5 py-1 rounded-lg">
                5 Sensor Aktif
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
                        {row.status === 'OK' ? (
                          <span className="inline-flex items-center gap-1 text-emerald-700 bg-emerald-100 font-extrabold px-2 py-0.5 rounded-full">
                            <CheckCircle2 className="w-3 h-3 text-emerald-600" /> OK
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
            <span className="text-xs font-bold bg-white px-3 py-1 rounded-xl shadow-xs">
              {isAllMeetingStandard ? 'Pass (100%)' : 'Check Warning'}
            </span>
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
                  <span>Flokulasi optimal tercapai pada pH 7.20</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>Penghematan koagulan 17% dibanding dosis konvensional</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>Risiko endapan lumpur sekunder dalam batas aman</span>
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

        {/* Grid Bawah Kanan: Panel RINGKASAN PENGGUNAAN KOAGULAN (Mini Bar Chart 7 Hari) */}
        <div className="lg:col-span-4 bg-white/80 backdrop-blur-md border border-[#C4B2F7]/50 rounded-3xl p-6 shadow-card-soft flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-base font-extrabold text-[#2D1B4E] flex items-center gap-2">
                <FlaskConical className="w-4 h-4 text-[#FF74B1]" />
                PENGGUNAAN KOAGULAN
              </h2>
              <span className="text-[10px] font-extrabold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-md">
                7 Hari Terakhir
              </span>
            </div>
            <p className="text-xs text-[#4A3B69] mb-3">Total Konsumsi Tawas: 205.2 kg (Rata-rata 29.3 kg/hari)</p>

            <div className="h-40 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={barData} margin={{ top: 10, right: 0, left: -25, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5D9F2" />
                  <XAxis dataKey="day" stroke="#4A3B69" fontSize={10} tickLine={false} />
                  <YAxis stroke="#4A3B69" fontSize={10} tickLine={false} />
                  <Tooltip contentStyle={{ backgroundColor: '#2D1B4E', borderRadius: '10px', color: '#fff' }} />
                  <Bar dataKey="tawas" name="Tawas (kg)" fill="#FF74B1" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
