import React from 'react';
import { ShieldCheck, AlertCircle, AlertTriangle } from 'lucide-react';

export default function GaugeCard({
  title,
  value,
  unit = '',
  min = 0,
  max = 14,
  safeRange = [6, 9],
  warningRange = [5, 10],
  customRanges = null // optional override ranges for COD e.g. safe < 100, warning < 200, danger >= 200
}) {
  // Determine status (Aman, Sedang, Bahaya)
  let status = 'Aman';
  let statusColor = '#4ADE80'; // Green
  let statusBg = 'bg-emerald-100 text-emerald-800 border-emerald-300';
  let Icon = ShieldCheck;

  if (customRanges) {
    if (value <= customRanges.safe) {
      status = 'Aman';
      statusColor = '#4ADE80';
      statusBg = 'bg-emerald-100 text-emerald-800 border-emerald-300';
      Icon = ShieldCheck;
    } else if (value <= customRanges.warning) {
      status = 'Sedang';
      statusColor = '#FACC15';
      statusBg = 'bg-amber-100 text-amber-800 border-amber-300';
      Icon = AlertTriangle;
    } else {
      status = 'Bahaya';
      statusColor = '#F87171';
      statusBg = 'bg-red-100 text-red-800 border-red-300';
      Icon = AlertCircle;
    }
  } else {
    if (value >= safeRange[0] && value <= safeRange[1]) {
      status = 'Aman';
      statusColor = '#4ADE80';
      statusBg = 'bg-emerald-100 text-emerald-800 border-emerald-300';
      Icon = ShieldCheck;
    } else if (value >= warningRange[0] && value <= warningRange[1]) {
      status = 'Sedang';
      statusColor = '#FACC15';
      statusBg = 'bg-amber-100 text-amber-800 border-amber-300';
      Icon = AlertTriangle;
    } else {
      status = 'Bahaya';
      statusColor = '#F87171';
      statusBg = 'bg-red-100 text-red-800 border-red-300';
      Icon = AlertCircle;
    }
  }

  // Calculate needle angle (-90deg to +90deg)
  const clampedVal = Math.max(min, Math.min(max, value));
  const percentage = (clampedVal - min) / (max - min);
  const angle = -90 + percentage * 180;

  return (
    <div className="bg-white/80 backdrop-blur-md border border-[#C4B2F7]/50 rounded-2xl p-5 shadow-card-soft flex flex-col justify-between relative overflow-hidden">
      {/* Title & Status Badge */}
      <div className="flex items-center justify-between mb-2">
        <div>
          <span className="text-xs font-bold text-[#4A3B69] uppercase tracking-wider">Parameter</span>
          <h3 className="text-lg font-extrabold text-[#2D1B4E]">{title}</h3>
        </div>
        <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-extrabold shadow-xs ${statusBg}`}>
          <Icon className="w-3.5 h-3.5 shrink-0" />
          <span>{status}</span>
        </div>
      </div>

      {/* SVG Semicircle Gauge Visual */}
      <div className="relative flex flex-col items-center justify-center my-1">
        <svg viewBox="0 0 200 105" className="w-48 h-26 overflow-visible">
          <defs>
            <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#F87171" />
              <stop offset="35%" stopColor="#FACC15" />
              <stop offset="50%" stopColor="#4ADE80" />
              <stop offset="65%" stopColor="#4ADE80" />
              <stop offset="85%" stopColor="#FACC15" />
              <stop offset="100%" stopColor="#F87171" />
            </linearGradient>
            <linearGradient id="codGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#4ADE80" />
              <stop offset="40%" stopColor="#4ADE80" />
              <stop offset="70%" stopColor="#FACC15" />
              <stop offset="100%" stopColor="#F87171" />
            </linearGradient>
          </defs>

          {/* Background Track Arc */}
          <path
            d="M 25 90 A 75 75 0 0 1 175 90"
            fill="none"
            stroke="#E5D9F2"
            strokeWidth="16"
            strokeLinecap="round"
          />

          {/* Colored Range Arc */}
          <path
            d="M 25 90 A 75 75 0 0 1 175 90"
            fill="none"
            stroke={`url(#${customRanges ? 'codGradient' : 'gaugeGradient'})`}
            strokeWidth="16"
            strokeLinecap="round"
          />

          {/* Needle Pin Base */}
          <circle cx="100" cy="90" r="6" fill="#2D1B4E" />
          <circle cx="100" cy="90" r="3" fill="#FF74B1" />

          {/* Needle Arrow */}
          <g transform={`rotate(${angle}, 100, 90)`}>
            <polygon
              points="98,90 102,90 100,24"
              fill="#2D1B4E"
              className="transition-all duration-700 ease-out"
            />
          </g>
        </svg>

        {/* Big Centered Value Display (positioned cleanly below the pin without overlapping) */}
        <div className="text-center mt-2">
          <span className="text-3xl font-black text-[#2D1B4E] tracking-tight">
            {typeof value === 'number' ? value.toFixed(1) : value}
          </span>
          <span className="text-xs font-bold text-[#4A3B69] ml-1">{unit}</span>
        </div>
      </div>

      {/* Range min/max labels */}
      <div className="flex justify-between text-[11px] font-bold text-[#4A3B69]/70 px-4 mt-1 border-t border-[#C4B2F7]/30 pt-2">
        <span>Min: {min}</span>
        <span>Baku Mutu: {customRanges ? `< ${customRanges.safe}` : `${safeRange[0]} - ${safeRange[1]}`}</span>
        <span>Max: {max}</span>
      </div>

      {/* Color Status Legend */}
      <div className="grid grid-cols-3 gap-1 text-[10px] font-bold text-center mt-2 pt-2 border-t border-[#C4B2F7]/40">
        <div className="flex items-center justify-center gap-1 text-emerald-700 bg-emerald-50 py-1 rounded-md">
          <span className="w-2 h-2 rounded-full bg-[#4ADE80]"></span>
          <span>Aman</span>
        </div>
        <div className="flex items-center justify-center gap-1 text-amber-700 bg-amber-50 py-1 rounded-md">
          <span className="w-2 h-2 rounded-full bg-[#FACC15]"></span>
          <span>Sedang</span>
        </div>
        <div className="flex items-center justify-center gap-1 text-red-700 bg-red-50 py-1 rounded-md">
          <span className="w-2 h-2 rounded-full bg-[#F87171]"></span>
          <span>Bahaya</span>
        </div>
      </div>
    </div>
  );
}
