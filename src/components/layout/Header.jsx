import React, { useState, useEffect } from 'react';
import { Wifi, Clock, Calendar, AlertTriangle, Play, Pause, Bell, CheckCircle2, ShieldCheck } from 'lucide-react';
import { useData } from '../../context/DataContext';
import { Link } from 'react-router-dom';

export default function Header() {
  const { 
    isLiveStreaming, 
    setIsLiveStreaming, 
    isAnomalyActive, 
    toggleAnomaly, 
    unreadCount, 
    toastMessage 
  } = useData();

  const [timeStr, setTimeStr] = useState('');
  const [dateStr, setDateStr] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      const seconds = String(now.getSeconds()).padStart(2, '0');
      setTimeStr(`${hours}:${minutes}:${seconds} WIB`);

      const options = { day: 'numeric', month: 'Long', year: 'numeric' };
      // Format example: 17 Agustus 2028
      const formattedDate = now.toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      });
      setDateStr(formattedDate);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className={`fixed top-4 right-4 z-50 flex items-center gap-3 px-5 py-3.5 rounded-xl shadow-2xl transition-all transform animate-bounce ${
          toastMessage.type === 'warning' 
            ? 'bg-amber-500 text-white border border-amber-300' 
            : toastMessage.type === 'info'
            ? 'bg-indigo-600 text-white border border-indigo-300'
            : 'bg-emerald-600 text-white border border-emerald-300'
        }`}>
          {toastMessage.type === 'warning' ? <AlertTriangle className="w-5 h-5 shrink-0" /> : <CheckCircle2 className="w-5 h-5 shrink-0" />}
          <span className="text-sm font-semibold tracking-wide">{toastMessage.message}</span>
        </div>
      )}

      {/* Main Header Bar */}
      <header className="sticky top-0 z-30 bg-[#F2EAFA]/90 backdrop-blur-md border-b border-[#C4B2F7]/40 px-6 py-3.5 flex flex-wrap items-center justify-between gap-4">
        {/* Title / Breadcrumb preview */}
        <div className="flex items-center gap-3">
          <span className="text-xs uppercase tracking-widest font-bold text-[#FF74B1] bg-[#FF74B1]/10 px-3 py-1 rounded-full border border-[#FF74B1]/30">
            Real-Time DSS Dashboard
          </span>
          <span className="hidden md:inline text-xs text-[#4A3B69] font-medium">
            Pengolahan Limbah Industri EcoMind AI
          </span>
        </div>

        {/* Header Right Items */}
        <div className="flex items-center gap-4 flex-wrap">
          {/* Simulation Tools (Play/Pause & Anomaly Injector) */}
          <div className="flex items-center gap-2 bg-[#CDC1FF]/40 border border-[#C4B2F7] rounded-xl p-1">
            <button
              onClick={() => setIsLiveStreaming(!isLiveStreaming)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                isLiveStreaming 
                  ? 'bg-emerald-500 text-white shadow-sm' 
                  : 'bg-slate-300 text-slate-700 hover:bg-slate-400'
              }`}
              title="Pause/Play Live Sensor Stream"
            >
              {isLiveStreaming ? (
                <>
                  <Pause className="w-3.5 h-3.5" />
                  <span>Live Data</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5" />
                  <span>Paused</span>
                </>
              )}
            </button>

            <button
              onClick={toggleAnomaly}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                isAnomalyActive 
                  ? 'bg-red-500 text-white animate-pulse shadow-md' 
                  : 'bg-amber-100 text-amber-800 hover:bg-amber-200 border border-amber-300'
              }`}
              title="Uji Anomali Nilai pH & COD"
            >
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>{isAnomalyActive ? 'Anomali Aktif!' : 'Uji Anomali'}</span>
            </button>
          </div>

          {/* Online Status Indicator */}
          <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-800 px-3.5 py-1.5 rounded-xl text-xs font-bold shadow-sm">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 online-pulse inline-block"></span>
            <Wifi className="w-3.5 h-3.5 text-emerald-600" />
            <span className="tracking-wide uppercase">SISTEM ONLINE</span>
          </div>

          {/* Time & Date Display */}
          <div className="flex items-center gap-3 bg-white/80 border border-[#C4B2F7]/60 px-4 py-1.5 rounded-xl shadow-xs">
            <div className="flex items-center gap-1.5 text-xs font-bold text-[#2D1B4E]">
              <Clock className="w-3.5 h-3.5 text-[#FF74B1]" />
              <span className="font-mono tracking-tight">{timeStr || '10:00:00 WIB'}</span>
            </div>
            <div className="h-3 w-px bg-[#C4B2F7]"></div>
            <div className="flex items-center gap-1.5 text-xs font-medium text-[#4A3B69]">
              <Calendar className="w-3.5 h-3.5 text-[#4A3B69]" />
              <span>{dateStr || '17 Agustus 2028'}</span>
            </div>
          </div>

          {/* Notification Quick Access */}
          <Link
            to="/notifikasi"
            className="relative p-2 rounded-xl bg-white/80 border border-[#C4B2F7]/60 text-[#2D1B4E] hover:bg-[#FF74B1] hover:text-white transition-all shadow-xs"
            title="Notifikasi Sistem"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center border border-white animate-pulse">
                {unreadCount}
              </span>
            )}
          </Link>
        </div>
      </header>
    </>
  );
}
