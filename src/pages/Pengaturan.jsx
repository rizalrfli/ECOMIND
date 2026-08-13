import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { 
  Laptop, 
  Globe, 
  Clock, 
  User, 
  ShieldCheck, 
  ChevronRight, 
  Sliders, 
  Volume2, 
  Database, 
  Wifi, 
  Lock, 
  CheckCircle2,
  X
} from 'lucide-react';

export default function Pengaturan() {
  const { settings, setSettings, showToast } = useData();
  const [activeModal, setActiveModal] = useState(null);

  const menuItems = [
    {
      id: 'system',
      icon: Laptop,
      title: 'Sistem',
      subtitle: 'Tampilan, Suara, Penyimpanan, & Auto-Save Interval',
      color: 'bg-indigo-500'
    },
    {
      id: 'network',
      icon: Globe,
      title: 'Jaringan & Internet',
      subtitle: 'Status Wi-Fi IoT, Broker MQTT, VPN & Server Proxy',
      color: 'bg-emerald-500'
    },
    {
      id: 'time',
      icon: Clock,
      title: 'Waktu & Bahasa',
      subtitle: 'Zona Waktu (WIB/WITA/WIT), Format Jam, Bahasa Antarmuka',
      color: 'bg-amber-500'
    },
    {
      id: 'account',
      icon: User,
      title: 'Akun Operator',
      subtitle: 'Profil Pengguna, Peran Kepala Operator, Opsi Masuk',
      color: 'bg-pink-500'
    },
    {
      id: 'security',
      icon: ShieldCheck,
      title: 'Privasi & Keamanan',
      subtitle: 'Enkripsi Model AI, Antivirus, Logging Akses Audit Trail',
      color: 'bg-purple-600'
    }
  ];

  return (
    <div className="p-6 space-y-6 pb-12">
      {/* Header section */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-white/80 backdrop-blur-md p-6 rounded-3xl border border-[#C4B2F7]/50 shadow-card-soft">
        <div>
          <div className="flex items-center gap-2 text-xs font-extrabold text-[#FF74B1] uppercase tracking-wider">
            <Sliders className="w-4 h-4" />
            <span>Konfigurasi & Preferences</span>
          </div>
          <h1 className="text-2xl font-black text-[#2D1B4E] mt-1">
            Pengaturan Sistem EcoMind
          </h1>
          <p className="text-sm font-medium text-[#4A3B69]">
            Kelola parameter sistem, integrasi jaringan IoT, profil akun, dan keamanan.
          </p>
        </div>
      </div>

      {/* Menu List */}
      <div className="space-y-4">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.id}
              onClick={() => setActiveModal(item.id)}
              className="bg-white/80 backdrop-blur-md border border-[#C4B2F7]/50 hover:border-[#FF74B1] rounded-3xl p-5 shadow-card-soft hover:shadow-purple-glow transition-all cursor-pointer flex items-center justify-between group"
            >
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-2xl ${item.color} flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-[#2D1B4E] group-hover:text-[#FF74B1] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs font-medium text-[#4A3B69]">
                    {item.subtitle}
                  </p>
                </div>
              </div>

              <div className="p-2 rounded-full bg-[#E5D9F2]/60 group-hover:bg-[#FF74B1] group-hover:text-white text-[#2D1B4E] transition-all">
                <ChevronRight className="w-5 h-5" />
              </div>
            </div>
          );
        })}
      </div>

      {/* MODAL CONFIG DIALOG */}
      {activeModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-5 shadow-2xl border border-[#C4B2F7] animate-scaleIn">
            <div className="flex items-center justify-between border-b border-[#E5D9F2] pb-4">
              <h3 className="text-lg font-black text-[#2D1B4E] uppercase">
                Pengaturan {activeModal}
              </h3>
              <button
                onClick={() => setActiveModal(null)}
                className="p-1 rounded-full hover:bg-slate-100 text-slate-500"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Contents based on activeModal */}
            <div className="space-y-4 text-xs font-semibold text-[#4A3B69]">
              {activeModal === 'system' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-[#E5D9F2]/50 rounded-2xl">
                    <span>Notifikasi Suara Alert</span>
                    <input
                      type="checkbox"
                      checked={settings.soundNotifications}
                      onChange={(e) => setSettings({ ...settings, soundNotifications: e.target.checked })}
                      className="w-4 h-4 accent-[#FF74B1] cursor-pointer"
                    />
                  </div>

                  <div>
                    <label className="block text-[#2D1B4E] font-bold mb-1">Interval Auto-Save Log (Detik):</label>
                    <input
                      type="number"
                      value={settings.autoSaveInterval}
                      onChange={(e) => setSettings({ ...settings, autoSaveInterval: Number(e.target.value) })}
                      className="w-full bg-[#E5D9F2] text-[#2D1B4E] font-bold p-2.5 rounded-xl border border-[#C4B2F7]"
                    />
                  </div>
                </div>
              )}

              {activeModal === 'network' && (
                <div className="space-y-3">
                  <div>
                    <label className="block text-[#2D1B4E] font-bold mb-1">Broker MQTT URL:</label>
                    <input
                      type="text"
                      value={settings.mqttUrl}
                      onChange={(e) => setSettings({ ...settings, mqttUrl: e.target.value })}
                      className="w-full bg-[#E5D9F2] text-[#2D1B4E] font-bold p-2.5 rounded-xl border border-[#C4B2F7]"
                    />
                  </div>

                  <div>
                    <label className="block text-[#2D1B4E] font-bold mb-1">Wi-Fi Access Point IoT:</label>
                    <input
                      type="text"
                      value={settings.wifiSSID}
                      onChange={(e) => setSettings({ ...settings, wifiSSID: e.target.value })}
                      className="w-full bg-[#E5D9F2] text-[#2D1B4E] font-bold p-2.5 rounded-xl border border-[#C4B2F7]"
                    />
                  </div>
                </div>
              )}

              {activeModal === 'time' && (
                <div className="space-y-3">
                  <div>
                    <label className="block text-[#2D1B4E] font-bold mb-1">Zona Waktu Sistem:</label>
                    <select
                      value={settings.timezone}
                      onChange={(e) => setSettings({ ...settings, timezone: e.target.value })}
                      className="w-full bg-[#E5D9F2] text-[#2D1B4E] font-bold p-2.5 rounded-xl border border-[#C4B2F7]"
                    >
                      <option value="WIB (UTC+7)">WIB (Waktu Indonesia Barat - UTC+7)</option>
                      <option value="WITA (UTC+8)">WITA (Waktu Indonesia Tengah - UTC+8)</option>
                      <option value="WIT (UTC+9)">WIT (Waktu Indonesia Timur - UTC+9)</option>
                    </select>
                  </div>
                </div>
              )}

              {activeModal === 'account' && (
                <div className="space-y-3">
                  <div>
                    <label className="block text-[#2D1B4E] font-bold mb-1">Nama Operator:</label>
                    <input
                      type="text"
                      value={settings.operatorName}
                      onChange={(e) => setSettings({ ...settings, operatorName: e.target.value })}
                      className="w-full bg-[#E5D9F2] text-[#2D1B4E] font-bold p-2.5 rounded-xl border border-[#C4B2F7]"
                    />
                  </div>
                  <div>
                    <label className="block text-[#2D1B4E] font-bold mb-1">Jabatan / Peran:</label>
                    <input
                      type="text"
                      value={settings.operatorRole}
                      onChange={(e) => setSettings({ ...settings, operatorRole: e.target.value })}
                      className="w-full bg-[#E5D9F2] text-[#2D1B4E] font-bold p-2.5 rounded-xl border border-[#C4B2F7]"
                    />
                  </div>
                </div>
              )}

              {activeModal === 'security' && (
                <div className="space-y-3">
                  <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                    <span>Enkripsi Model AI AES-256 Aktif & Terlindungi.</span>
                  </div>
                  <div className="text-xs">Versi AI Model: {settings.aiModelVersion}</div>
                </div>
              )}
            </div>

            <div className="pt-3 border-t border-[#E5D9F2] flex justify-end gap-2">
              <button
                onClick={() => {
                  showToast('Pengaturan berhasil disimpan!', 'success');
                  setActiveModal(null);
                }}
                className="bg-[#FF74B1] text-white px-5 py-2.5 rounded-xl text-xs font-extrabold shadow-pink-glow"
              >
                Simpan Perubahan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
