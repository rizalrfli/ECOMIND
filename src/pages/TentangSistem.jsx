import React from 'react';
import {
  Info,
  Wifi,
  Cpu,
  Zap,
  Activity,
  CheckCircle2,
  ArrowRight,
  Database,
  Sliders,
  ShieldCheck,
  FlaskConical,
  Brain
} from 'lucide-react';

export default function TentangSistem() {
  const steps = [
    {
      num: '1',
      title: 'SENSOR IoT',
      desc: 'Mengukur parameter kualitas air influen (pH & COD) secara berkala.',
      icon: Activity,
      color: 'from-pink-500 to-rose-500'
    },
    {
      num: '2',
      title: 'KONEKSI',
      desc: 'Data telemetri dikirimkan secara secure via protokol Wi-Fi & MQTT secara real-time',
      icon: Wifi,
      color: 'from-indigo-500 to-blue-500'
    },
    {
      num: '3',
      title: 'EDGE & SERVER',
      desc: 'Data diterima, disimpan dan divalidasi pada server/edge device',
      icon: Database,
      color: 'from-purple-500 to-indigo-600'
    },
    {
      num: '4',
      title: 'DSS ENGINE',
      desc: 'Analisis data menggunakan aturan pakar dan model AI untuk menentukan dosis koagulan optimal',
      icon: Brain,
      color: 'from-fuchsia-600 to-pink-600'
    },
    {
      num: '5',
      title: 'AKTUATOR',
      desc: 'Rekomendasi dijalankan melalui pompa dosing atau tindakan operator',
      icon: Zap,
      color: 'from-amber-500 to-orange-500'
    },
    {
      num: '6',
      title: 'MONITORING',
      desc: 'Hasil tindakan dan kondisi sistem dimonitor secara real-time di dashboard',
      icon: ShieldCheck,
      color: 'from-emerald-500 to-teal-500'
    }
  ];

  return (
    <div className="p-4 sm:p-6 space-y-6 pb-12">
      {/* Header section */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-white/80 backdrop-blur-md p-4 sm:p-6 rounded-3xl border border-[#C4B2F7]/50 shadow-card-soft">
        <div>
          <div className="flex items-center gap-2 text-xs font-extrabold text-[#FF74B1] uppercase tracking-wider">
            <Info className="w-4 h-4" />
            <span>Arsitektur & Sistem Informasi</span>
          </div>
          <h1 className="text-2xl font-black text-[#2D1B4E] mt-1">
            Tentang EcoMind AI
          </h1>
          <p className="text-base font-medium text-[#4A3B69]">
            Sistem Cerdas Penentuan Dosis Koagulan untuk Efisiensi Pengolahan Limbah Industri.
          </p>
        </div>
      </div>

      {/* Info Banner Section */}
      <div className="bg-gradient-to-r from-[#CDC1FF] via-[#E5D9F2] to-white p-6 rounded-3xl border border-white/80 shadow-card-soft space-y-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-[#FF74B1] flex items-center justify-center text-white shadow-pink-glow">
            <Brain className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-lg font-black text-[#2D1B4E]">Misi Utama EcoMind AI</h2>
            <div className="text-xs font-bold text-[#FF74B1]">Sustainability & AI Automation</div>
          </div>
        </div>
        <p className="text-sm font-medium text-[#4A3B69] leading-relaxed">
          EcoMind AI mengintegrasikan sensor telemetri IoT industri dengan model Decision Support System (DSS) berbasis Machine Learning.
          Sistem ini dirancang untuk menghilangkan ketergantungan pada *Jar Test* manual yang memakan waktu, mengurangi pemborosan bahan kimia koagulan hingga 20%, dan menjamin 100% efluen limbah memenuhi Baku Mutu Lingkungan Hidup secara konsisten.
        </p>
      </div>

      {/* Architecture Flow Section (6 Cards Pipeline) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-extrabold text-[#2D1B4E] flex items-center gap-2">
            <Sliders className="w-5 h-5 text-[#FF74B1]" />
            ALUR KERJA ARSITEKTUR IOT & AI ENGINE
          </h2>
          <span className="text-xs font-bold bg-[#E5D9F2] text-[#4A3B69] px-3 py-1 rounded-xl">
            6 Tahap End-to-End
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={step.num}
                className="bg-white/80 backdrop-blur-md border border-[#C4B2F7]/50 rounded-3xl p-6 shadow-card-soft hover:shadow-purple-glow transition-all flex flex-col justify-between space-y-4 group relative overflow-hidden"
              >
                <div className="flex items-center justify-between">
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${step.color} text-white flex items-center justify-center shadow-md group-hover:scale-110 transition-transform`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-2xl font-black text-[#4A3B69]/30 group-hover:text-[#FF74B1] transition-colors">
                    0{step.num}
                  </span>
                </div>

                <div>
                  <h3 className="text-base font-extrabold text-[#2D1B4E] group-hover:text-[#FF74B1] transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-xs font-medium text-[#4A3B69] mt-1 leading-relaxed">
                    {step.desc}
                  </p>
                </div>

                <div className="pt-2 border-t border-[#E5D9F2] flex items-center text-[10px] font-extrabold text-[#FF74B1]">
                  <span>TAHAP {step.num} / 6</span>
                  {idx < 5 && <ArrowRight className="w-3.5 h-3.5 ml-auto text-[#4A3B69]/40" />}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
