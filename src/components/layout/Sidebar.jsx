import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Brain, 
  Home, 
  Activity, 
  Cpu, 
  History, 
  Bell, 
  Settings, 
  Info, 
  CheckCircle2, 
  Database,
  Zap,
  X
} from 'lucide-react';
import { useData } from '../../context/DataContext';

export default function Sidebar() {
  const { unreadCount, isMobileMenuOpen, closeMobileMenu } = useData();

  const navItems = [
    { path: '/beranda', label: 'Beranda', icon: Home },
    { path: '/data-real-time', label: 'Data Real-Time', icon: Activity },
    { path: '/rekomendasi-ai', label: 'Rekomendasi AI', icon: Cpu },
    { path: '/riwayat-data', label: 'Riwayat Data', icon: History },
    { 
      path: '/notifikasi', 
      label: 'Notifikasi', 
      icon: Bell, 
      badge: unreadCount > 0 ? unreadCount : null 
    },
    { path: '/pengaturan', label: 'Pengaturan', icon: Settings },
    { path: '/tentang-sistem', label: 'Tentang Sistem', icon: Info },
  ];

  const sidebarContent = (
    <aside className="w-72 bg-[#CDC1FF]/95 backdrop-blur-xl border-r border-[#C4B2F7] flex flex-col h-full shrink-0 select-none overflow-y-auto">
      {/* Brand Header */}
      <div className="p-6 border-b border-[#C4B2F7]/50 bg-gradient-to-br from-[#CDC1FF] to-[#E5D9F2] flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-[#FF74B1] to-[#FF9ECA] flex items-center justify-center text-white shadow-pink-glow">
            <Brain className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h1 className="font-extrabold text-xl text-[#2D1B4E] tracking-tight leading-none">
              EcoMind <span className="text-[#FF74B1]">AI</span>
            </h1>
            <p className="text-[11px] font-semibold text-[#4A3B69] mt-1 leading-tight">
              Sistem Cerdas Penentuan Dosis Koagulan
            </p>
          </div>
        </div>

        {/* Close button for mobile drawer */}
        <button
          onClick={closeMobileMenu}
          className="lg:hidden p-2 rounded-xl text-[#2D1B4E] hover:bg-white/50 transition-colors"
          title="Tutup Menu"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-4 py-5 space-y-1.5">
        <div className="px-3 pb-2 text-[10px] font-extrabold tracking-wider uppercase text-[#4A3B69]/70">
          Navigasi Utama
        </div>
        {navItems.map((item) => {
          const IconComponent = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={closeMobileMenu}
              className={({ isActive }) =>
                `flex items-center justify-between px-4 py-3 rounded-xl font-bold text-sm transition-all duration-200 ${
                  isActive
                    ? 'bg-[#FF74B1] text-white shadow-pink-glow transform translate-x-1'
                    : 'text-[#2D1B4E] hover:bg-white/60 hover:text-[#FF74B1]'
                }`
              }
            >
              <div className="flex items-center gap-3">
                <IconComponent className="w-5 h-5 shrink-0" />
                <span>{item.label}</span>
              </div>
              {item.badge && (
                <span className="bg-red-500 text-white text-xs font-black px-2 py-0.5 rounded-full border border-white">
                  {item.badge}
                </span>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* Bottom Status Panel */}
      <div className="p-4 m-4 rounded-2xl bg-white/70 backdrop-blur-md border border-white/80 space-y-3.5 shadow-sm">
        {/* System Health */}
        <div className="flex items-center justify-between bg-emerald-500/10 border border-emerald-500/30 p-2.5 rounded-xl">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <div>
              <div className="text-xs font-extrabold text-emerald-800 leading-none">NORMAL</div>
              <div className="text-[10px] text-emerald-700 mt-0.5">Sistem Berjalan Baik</div>
            </div>
          </div>
          <span className="w-2 h-2 rounded-full bg-emerald-500 online-pulse"></span>
        </div>

        {/* EcoData Indonesia Info Card */}
        <div className="space-y-2 pt-1 border-t border-[#C4B2F7]/40">
          <div className="flex items-center justify-between text-xs font-extrabold text-[#2D1B4E]">
            <div className="flex items-center gap-1.5">
              <Database className="w-3.5 h-3.5 text-[#FF74B1]" />
              <span>EcoData Indonesia</span>
            </div>
            <span className="text-[10px] bg-[#FF74B1]/10 text-[#FF74B1] font-bold px-1.5 py-0.5 rounded">v1.7</span>
          </div>

          <div className="grid grid-cols-2 gap-1.5 text-[11px] text-[#4A3B69]">
            <div className="bg-[#E5D9F2]/70 p-2 rounded-lg">
              <div className="text-[9px] text-[#4A3B69]/70 font-semibold uppercase">Dataset Terkumpul</div>
              <div className="font-extrabold text-[#2D1B4E]">312 Batch</div>
            </div>
            <div className="bg-[#E5D9F2]/70 p-2 rounded-lg">
              <div className="text-[9px] text-[#4A3B69]/70 font-semibold uppercase">Learning Status</div>
              <div className="font-extrabold text-emerald-700 flex items-center gap-1">
                <Zap className="w-3 h-3 text-amber-500 fill-amber-500" />
                <span>Aktif</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );

  return (
    <>
      {/* Desktop Permanent Left Sidebar */}
      <div className="hidden lg:block h-screen sticky top-0 shrink-0">
        {sidebarContent}
      </div>

      {/* Mobile Slide-over Drawer Overlay */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          {/* Dark Backdrop Shadow */}
          <div 
            className="fixed inset-0 bg-[#1E0F38]/60 backdrop-blur-sm transition-opacity"
            onClick={closeMobileMenu}
          />
          {/* Drawer content */}
          <div className="relative z-10 h-full">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
}
