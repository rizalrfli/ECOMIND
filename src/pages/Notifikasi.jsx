import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { 
  Bell, 
  CheckCircle2, 
  AlertTriangle, 
  Info, 
  Trash2, 
  CheckCheck, 
  Filter, 
  Calendar,
  Layers,
  ArrowRightLeft
} from 'lucide-react';

export default function Notifikasi() {
  const { 
    notifications, 
    unreadCount, 
    markNotificationRead, 
    markAllNotificationsRead, 
    deleteNotification 
  } = useData();

  const [activeTab, setActiveTab] = useState('ALL');

  const filteredNotifications = notifications.filter(item => {
    if (activeTab === 'INPUT') return item.type === 'INPUT';
    if (activeTab === 'OUTPUT') return item.type === 'OUTPUT';
    if (activeTab === 'WARNING') return item.status === 'warning';
    return true;
  });

  return (
    <div className="p-4 sm:p-6 space-y-6 pb-12">
      {/* Header section */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-white/80 backdrop-blur-md p-4 sm:p-6 rounded-3xl border border-[#C4B2F7]/50 shadow-card-soft">
        <div>
          <div className="flex items-center gap-2 text-xs font-extrabold text-[#FF74B1] uppercase tracking-wider">
            <Bell className="w-4 h-4" />
            <span>Pemberitahuan & Audit System</span>
          </div>
          <h1 className="text-2xl font-black text-[#2D1B4E] mt-1">
            Log Notifikasi Sistem
          </h1>
          <p className="text-base font-medium text-[#4A3B69]">
            Daftar lengkap riwayat masukan sensor, output rekomendasi AI, dan event sistem.
          </p>
        </div>

        {unreadCount > 0 && (
          <button
            onClick={markAllNotificationsRead}
            className="flex items-center gap-2 bg-[#FF74B1] hover:bg-[#FF74B1]/90 text-white font-extrabold text-xs px-4 py-2.5 rounded-2xl shadow-pink-glow transition-all"
          >
            <CheckCheck className="w-4 h-4" />
            <span>TANDAI SEMUA DIBACA ({unreadCount})</span>
          </button>
        )}
      </div>

      {/* Tabs Filter Bar */}
      <div className="flex items-center gap-2 border-b border-[#C4B2F7] pb-3 overflow-x-auto">
        <button
          onClick={() => setActiveTab('ALL')}
          className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all whitespace-nowrap ${
            activeTab === 'ALL' ? 'bg-[#2D1B4E] text-white shadow-sm' : 'bg-[#E5D9F2] text-[#4A3B69] hover:bg-[#CDC1FF]'
          }`}
        >
          Semua Notifikasi ({notifications.length})
        </button>

        <button
          onClick={() => setActiveTab('WARNING')}
          className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all whitespace-nowrap ${
            activeTab === 'WARNING' ? 'bg-amber-500 text-white shadow-sm' : 'bg-[#E5D9F2] text-[#4A3B69] hover:bg-[#CDC1FF]'
          }`}
        >
          Warning & Alert ({notifications.filter(n => n.status === 'warning').length})
        </button>

        <button
          onClick={() => setActiveTab('INPUT')}
          className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all whitespace-nowrap ${
            activeTab === 'INPUT' ? 'bg-indigo-600 text-white shadow-sm' : 'bg-[#E5D9F2] text-[#4A3B69] hover:bg-[#CDC1FF]'
          }`}
        >
          Event Input ({notifications.filter(n => n.type === 'INPUT').length})
        </button>

        <button
          onClick={() => setActiveTab('OUTPUT')}
          className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all whitespace-nowrap ${
            activeTab === 'OUTPUT' ? 'bg-emerald-600 text-white shadow-sm' : 'bg-[#E5D9F2] text-[#4A3B69] hover:bg-[#CDC1FF]'
          }`}
        >
          Event Output ({notifications.filter(n => n.type === 'OUTPUT').length})
        </button>
      </div>

      {/* Notification Cards List */}
      <div className="space-y-4">
        {filteredNotifications.length === 0 ? (
          <div className="text-center py-16 bg-white/50 rounded-3xl border border-[#C4B2F7]/50 text-[#4A3B69]">
            <Bell className="w-12 h-12 mx-auto text-[#C4B2F7] mb-3" />
            <div className="text-base font-extrabold">Tidak Ada Notifikasi</div>
            <div className="text-xs">Tidak ditemukan log notifikasi dalam kategori ini.</div>
          </div>
        ) : (
          filteredNotifications.map((item) => (
            <div
              key={item.id}
              onClick={() => markNotificationRead(item.id)}
              className={`p-5 rounded-3xl border transition-all cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-card-soft ${
                !item.read 
                  ? 'bg-white border-[#FF74B1] shadow-pink-glow/20 border-l-8' 
                  : 'bg-white/70 border-[#C4B2F7]/60 opacity-90'
              }`}
            >
              <div className="flex items-start gap-4">
                {/* Status Icon */}
                <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 text-white ${
                  item.status === 'warning'
                    ? 'bg-amber-500 shadow-amber-200'
                    : item.status === 'success'
                    ? 'bg-emerald-500 shadow-emerald-200'
                    : 'bg-indigo-500 shadow-indigo-200'
                }`}>
                  {item.status === 'warning' ? (
                    <AlertTriangle className="w-5 h-5" />
                  ) : item.status === 'success' ? (
                    <CheckCircle2 className="w-5 h-5" />
                  ) : (
                    <Info className="w-5 h-5" />
                  )}
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className={`text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase ${
                      item.type === 'INPUT' ? 'bg-indigo-100 text-indigo-800' : 'bg-emerald-100 text-emerald-800'
                    }`}>
                      {item.type} BATCH #{item.batchId}
                    </span>
                    <span className="text-xs font-bold text-[#4A3B69]">
                      {item.timestamp} &bull; {item.date}
                    </span>
                    {!item.read && (
                      <span className="bg-red-500 text-white text-[9px] font-black px-2 py-0.5 rounded-full">
                        BARU
                      </span>
                    )}
                  </div>

                  <h3 className="text-base font-extrabold text-[#2D1B4E]">
                    {item.title}
                  </h3>
                  <p className="text-xs font-medium text-[#4A3B69] leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>

              {/* Card Actions */}
              <div className="flex items-center gap-2 shrink-0 border-t md:border-t-0 pt-2 md:pt-0">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteNotification(item.id);
                  }}
                  className="p-2 rounded-xl text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                  title="Hapus Notifikasi"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
