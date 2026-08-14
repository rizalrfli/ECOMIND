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
      standard: '6.5 – 8.5',
      status: sensorData.ph >= 6.5 && sensorData.ph <= 8.5 ? 'Sesuai' : 'FAIL',
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
          <p className="text-sm font-medium text-[#4A3B69]">
            Pemantauan langsung kualitas air limbah dari 5 titik sensor IoT industri.
          </p>
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
            safeRange={[6.5, 8.5]}
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
          <div className={`mt-5 p-4 rounded-2xl border flex items-center gap-3.5 shadow-xs ${
            isAllMeetingStandard 
              ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-900' 
              : 'bg-amber-500/10 border-amber-500/30 text-amber-900'
          }`}>
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-white shrink-0 ${
              isAllMeetingStandard ? 'bg-emerald-500' : 'bg-amber-500'
            }`}>
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="text-[10px] uppercase tracking-wider font-extrabold opacity-80">
                Evaluasi Baku Mutu
              </div>
              <div className="text-sm font-black tracking-tight mt-0.5">
                {isAllMeetingStandard ? 'MEMENUHI BAKU MUTU AMAN' : 'PERLU PERHATIAN PARAMETER'}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM SECTION: Full Width Extended Line Chart */}
      <div className="bg-white/80 backdrop-blur-md border border-[#C4B2F7]/50 rounded-3xl p-6 shadow-card-soft">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-lg font-extrabold text-[#2D1B4E] flex items-center gap-2">
              <Sliders className="w-5 h-5 text-[#FF74B1]" />
              GRAFIK TREN PARAMETER LENGKAP (FULL WIDTH)
            </h2>
            <p className="text-xs text-[#4A3B69]">
              Visualisasi kontinu riwayat sensor untuk deteksi pola lonjakan limbah industri.
            </p>
          </div>

          {/* Toggle buttons for chart lines */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-bold text-[#4A3B69]">Tampilkan Series:</span>
            <button
              onClick={() => toggleParam('ph')}
              className={`px-3 py-1 rounded-xl text-xs font-extrabold border transition-all ${visibleParams.ph ? 'bg-[#FF74B1] text-white border-[#FF74B1]' : 'bg-[#E5D9F2] text-[#4A3B69]'
                }`}
            >
              pH Air
            </button>
            <button
              onClick={() => toggleParam('cod')}
              className={`px-3 py-1 rounded-xl text-xs font-extrabold border transition-all ${visibleParams.cod ? 'bg-[#2D1B4E] text-white border-[#2D1B4E]' : 'bg-[#E5D9F2] text-[#4A3B69]'
                }`}
            >
              COD (mg/L)
            </button>
          </div>
        </div>

        {/* Full-width Line Chart */}
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={trendHistory} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5D9F2" />
              <XAxis dataKey="time" stroke="#4A3B69" fontSize={11} tickLine={false} />
              <YAxis yAxisId="left" stroke="#FF74B1" fontSize={11} domain={[0, 14]} tickLine={false} />
              <YAxis yAxisId="right" orientation="right" stroke="#2D1B4E" fontSize={11} domain={[0, 400]} tickLine={false} />
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
              <Legend wrapperStyle={{ paddingTop: '10px' }} />

              {visibleParams.ph && (
                <Line yAxisId="left" type="monotone" dataKey="ph" name="pH Air" stroke="#FF74B1" strokeWidth={3} dot={{ r: 3 }} />
              )}
              {visibleParams.cod && (
                <Line yAxisId="right" type="monotone" dataKey="cod" name="COD (mg/L)" stroke="#2D1B4E" strokeWidth={2.5} dot={{ r: 3 }} />
              )}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
