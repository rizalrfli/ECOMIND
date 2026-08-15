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
  Legend
} from 'recharts';
import {
  Activity,
  Sliders,
  CheckCircle2,
  XCircle,
  ShieldCheck
} from 'lucide-react';

export default function DataRealTime() {
  const {
    sensorData,
    trendHistory
  } = useData();

  const [visibleParams, setVisibleParams] = useState({
    ph: true,
    cod: true
  });

  const toggleParam = (key) => {
    setVisibleParams(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const monitoringTable = [
    {
      param: 'pH Air (Derajat Keasaman)',
      value: sensorData.ph.toFixed(2),
      standard: '6 – 9',
      status: sensorData.ph >= 6 && sensorData.ph <= 9 ? 'Sesuai' : 'FAIL',
    },
    {
      param: 'COD (Chemical Oxygen Demand)',
      value: `${sensorData.cod.toFixed(1)} mg/L`,
      standard: '< 100 mg/L',
      status: sensorData.cod <= 100 ? 'Sesuai' : 'FAIL',
    }
  ];

  const isAllMeetingStandard = monitoringTable.every(item => item.status === 'Sesuai');

  return (
    <div className="p-4 sm:p-6 space-y-6 pb-12">
      {/* Header section */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-white/80 backdrop-blur-md p-4 sm:p-6 rounded-3xl border border-[#C4B2F7]/50 shadow-card-soft">
        <div>
          <div className="flex items-center gap-2 text-xs font-extrabold text-[#FF74B1] uppercase tracking-wider">
            <Activity className="w-4 h-4" />
            <span>Telemetri & Sensor IoT</span>
          </div>
          <h1 className="text-2xl font-black text-[#2D1B4E] mt-1">
            Data Telemetri Real-Time
          </h1>
        </div>
      </div>

      {/* TOP SECTION: Gauges & Monitoring Real-Time Table */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <GaugeCard
            title="pH Air Influen"
            value={sensorData.ph}
            unit=""
            min={0}
            max={14}
            safeRange={[6, 9]}
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

        {/* RIGHT SECTION: Monitoring Real-Time Card */}
        <div className="lg:col-span-5 bg-white/80 backdrop-blur-md border border-[#C4B2F7]/50 rounded-3xl p-6 shadow-card-soft flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-extrabold text-[#2D1B4E]">MONITORING REAL-TIME</h2>
              <span className="text-[11px] font-bold text-[#4A3B69] bg-[#E5D9F2] px-3 py-1 rounded-xl">
                2 Sensor Aktif
              </span>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-[#C4B2F7]/60 text-[#4A3B69] font-extrabold uppercase text-[10px]">
                    <th className="py-2 px-1">PARAMETER</th>
                    <th className="py-2 px-1">NILAI</th>
                    <th className="py-2 px-1">BAKU MUTU</th>
                    <th className="py-2 px-1 text-center">STATUS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E5D9F2]">
                  {monitoringTable.map((row, idx) => (
                    <tr key={idx} className="hover:bg-[#E5D9F2]/30 transition-colors">
                      <td className="py-3 px-1 font-bold text-[#2D1B4E]">{row.param}</td>
                      <td className="py-3 px-1 font-black text-[#FF74B1]">{row.value}</td>
                      <td className="py-3 px-1 text-[#4A3B69] font-semibold">{row.standard}</td>
                      <td className="py-3 px-1 text-center">
                        {row.status === 'Sesuai' ? (
                          <span className="inline-flex items-center gap-1 text-emerald-700 bg-emerald-100 font-extrabold px-2.5 py-0.5 rounded-full text-[11px]">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Sesuai
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-red-700 bg-red-100 font-extrabold px-2.5 py-0.5 rounded-full text-[11px]">
                            <XCircle className="w-3.5 h-3.5 text-red-600" /> Alert
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Evaluasi Baku Mutu Banner */}
          <div className={`mt-5 p-4 rounded-2xl border flex items-center gap-3.5 shadow-xs ${isAllMeetingStandard
            ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-900'
            : 'bg-amber-500/10 border-amber-500/30 text-amber-900'
            }`}>
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-white shrink-0 ${isAllMeetingStandard ? 'bg-emerald-500' : 'bg-amber-500'
              }`}>
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="text-[10px] uppercase tracking-wider font-extrabold opacity-80">
                Status Keseluruhan
              </div>
              <div className="text-sm font-black tracking-tight mt-0.5">
                {isAllMeetingStandard ? 'MEMENUHI BAKU MUTU AMAN' : 'PERLU PERHATIAN PARAMETER'}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM SECTION: Full Width Extended Line Chart */}
      <div className="bg-[#7257CD] text-white rounded-3xl p-6 shadow-xl flex flex-col justify-between">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
          <h2 className="text-lg font-black text-white uppercase tracking-wide">
            TREN PARAMETER
          </h2>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-xs font-extrabold text-white/90">
              <button
                onClick={() => toggleParam('ph')}
                className={`px-3 py-1 rounded-xl text-xs font-extrabold border transition-all ${visibleParams.ph ? 'bg-[#FF74B1] text-white border-[#FF74B1]' : 'bg-[#5C42B3] text-white/70 border-[#8C74DE]'}`}
              >
                pH
              </button>
              <button
                onClick={() => toggleParam('cod')}
                className={`px-3 py-1 rounded-xl text-xs font-extrabold border transition-all ${visibleParams.cod ? 'bg-[#EAE2FC] text-[#2D1B4E] border-[#EAE2FC]' : 'bg-[#5C42B3] text-white/70 border-[#8C74DE]'}`}
              >
                COD(mg/L)
              </button>
            </div>

            <select className="bg-[#5C42B3] text-white text-xs font-bold px-3 py-1.5 rounded-xl border border-[#8C74DE] focus:outline-none cursor-pointer">
              <option value="24h">24 Jam Terakhir</option>
              <option value="6h">6 Jam Terakhir</option>
              <option value="1h">1 Jam Terakhir</option>
            </select>
          </div>
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

        {/* Full-width Line Chart */}
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={trendHistory} margin={{ top: 10, right: 20, left: -20, bottom: 15 }}>
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

              {visibleParams.ph && (
                <Line
                  type="monotone"
                  dataKey="ph"
                  name="pH"
                  stroke="#FF74B1"
                  strokeWidth={3}
                  dot={{ r: 4, fill: '#FF74B1', strokeWidth: 0 }}
                />
              )}
              {visibleParams.cod && (
                <Line
                  type="monotone"
                  dataKey="cod"
                  name="COD(mg/L)"
                  stroke="#EAE2FC"
                  strokeWidth={3}
                  dot={{ r: 4, fill: '#EAE2FC', strokeWidth: 0 }}
                />
              )}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
