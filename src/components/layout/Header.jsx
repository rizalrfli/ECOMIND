import React, { useState, useEffect } from 'react';
import { Wifi, Clock, Calendar, AlertTriangle, Bell, CheckCircle2, Menu } from 'lucide-react';
import { useData } from '../../context/DataContext';
import { Link } from 'react-router-dom';

export default function Header() {
  const { 
    unreadCount, 
    toastMessage,
    toggleMobileMenu
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
        <div className={`fixed top-4 right-4 z-50 flex items-center gap-3 px-4 py-3 rounded-xl shadow-2xl transition-all transform animate-bounce text-xs sm:text-sm ${
          toastMessage.type === 'warning' 
            ? 'bg-amber-500 text-white border border-amber-300' 
            : toastMessage.type === 'info'
            ? 'bg-indigo-600 text-white border border-indigo-300'
            : 'bg-emerald-600 text-white border border-emerald-300'
        }`}>
          {toastMessage.type === 'warning' ? <AlertTriangle className="w-5 h-5 shrink-0" /> : <CheckCircle2 className="w-5 h-5 shrink-0" />}
          <span className="font-semibold tracking-wide">{toastMessage.message}</span>
        </div>
      )}

      {/* Main Header Bar */}
      <header className="sticky top-0 z-30 bg-[#F2EAFA]/90 backdrop-blur-md border-b border-[#C4B2F7]/40 px-4 py-3 sm:px-6 sm:py-3.5 flex items-center justify-between gap-3">
        {/* Left Section: Mobile Menu Button & Breadcrumb */}
        <div className="flex items-center gap-3">
          {/* Hamburger Menu Toggle (Mobile Only) */}
          <button
            onClick={toggleMobileMenu}
            className="lg:hidden p-2 rounded-xl bg-white/80 border border-[#C4B2F7]/60 text-[#2D1B4E] hover:bg-[#FF74B1] hover:text-white transition-all shadow-xs shrink-0"
            title="Buka Navigasi Menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          <span className="text-[10px] sm:text-xs uppercase tracking-widest font-bold text-[#FF74B1] bg-[#FF74B1]/10 px-2.5 py-1 rounded-full border border-[#FF74B1]/30">
            DSS Dashboard
          </span>
          <span className="hidden md:inline text-xs text-[#4A3B69] font-medium">
            Pengolahan Limbah Industri EcoMind AI
          </span>
        </div>

        {/* Header Right Items */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Online Status Indicator (Simplified on tiny mobile screens) */}
          <div className="flex items-center gap-1.5 bg-emerald-50 border border-emerald-200 text-emerald-800 px-2.5 py-1 sm:px-3.5 sm:py-1.5 rounded-xl text-[11px] sm:text-xs font-bold shadow-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-500 online-pulse inline-block"></span>
            <Wifi className="w-3.5 h-3.5 text-emerald-600 hidden sm:inline" />
            <span className="tracking-wide uppercase">ONLINE</span>
          </div>

          {/* Time & Date Display */}
          <div className="flex items-center gap-2 sm:gap-3 bg-white/80 border border-[#C4B2F7]/60 px-3 py-1 sm:px-4 sm:py-1.5 rounded-xl shadow-xs">
            <div className="flex items-center gap-1 text-[11px] sm:text-xs font-bold text-[#2D1B4E]">
              <Clock className="w-3.5 h-3.5 text-[#FF74B1]" />
              <span className="font-mono tracking-tight">{timeStr || '10:00 WIB'}</span>
            </div>
            <div className="hidden sm:block h-3 w-px bg-[#C4B2F7]"></div>
            <div className="hidden sm:flex items-center gap-1.5 text-xs font-medium text-[#4A3B69]">
              <Calendar className="w-3.5 h-3.5 text-[#4A3B69]" />
              <span>{dateStr || '17 Agus 2028'}</span>
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
