import React, { createContext, useContext, useState, useEffect } from 'react';

const DataContext = createContext();

export const useData = () => useContext(DataContext);

export const DataProvider = ({ children }) => {
  // Real-time sensor state
  const [sensorData, setSensorData] = useState({
    ph: 7.2,
    cod: 85.4,
    tss: 142,
    turbidity: 18.5,
    flowRate: 45.2,
    lastUpdate: new Date()
  });

  const [isLiveStreaming, setIsLiveStreaming] = useState(true);
  const [isAnomalyActive, setIsAnomalyActive] = useState(false);
  const [autoMode, setAutoMode] = useState(true);

  // Recommendation State
  const [recommendation, setRecommendation] = useState({
    coagulantType: 'Tawas (Aluminium Sulfat)',
    dosage: 3.8,
    unit: 'mg/L',
    suitability: 92.7,
    codReduction: 92.7,
    phNeutralization: 98.7,
    status: 'OPTIMAL'
  });

  // Notifications State
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'OUTPUT',
      batchId: 312,
      title: 'Kualitas efluen kembali normal',
      description: 'Penurunan COD mencapai 92.7% dan pH stabil di angka 7.20 setelah penginjeksian Tawas 3.8 mg/L.',
      timestamp: '10:00 WIB',
      date: '17 Agt 2028',
      status: 'success',
      read: false
    },
    {
      id: 2,
      type: 'INPUT',
      batchId: 312,
      title: 'Kenaikan COD Terdeteksi pada Influen',
      description: 'Nilai COD influen terdeteksi naik menjadi 185 mg/L. AI merekomendasikan penyesuaian dosis koagulan.',
      timestamp: '09:45 WIB',
      date: '17 Agt 2028',
      status: 'warning',
      read: false
    },
    {
      id: 3,
      type: 'OUTPUT',
      batchId: 311,
      title: 'Siklus Batch 311 Selesai',
      description: 'Pengolahan 1,500 L limbah berhasil diselesaikan dalam waktu 45 menit.',
      timestamp: '09:15 WIB',
      date: '17 Agt 2028',
      status: 'success',
      read: true
    },
    {
      id: 4,
      type: 'INPUT',
      batchId: 311,
      title: 'Pemeriksaan Sensor pH Kalibrasi Rutin',
      description: 'Sensor pH-01 telah selesai terkalibrasi otomatis oleh modul Edge Server.',
      timestamp: '08:00 WIB',
      date: '17 Agt 2028',
      status: 'info',
      read: true
    },
    {
      id: 5,
      type: 'OUTPUT',
      batchId: 310,
      title: 'Dosis Koagulan Otomatis Diterapkan',
      description: 'Pompa aktuator menginjeksikan 4.1 mg/L Tawas berdasarkan rekomendasi AI v1.7.',
      timestamp: '07:30 WIB',
      date: '17 Agt 2028',
      status: 'success',
      read: true
    }
  ]);

  // Toast feedback state
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg, type = 'success') => {
    setToastMessage({ message: msg, type });
    setTimeout(() => setToastMessage(null), 4000);
  };

  // Trend history data matching user reference image dataset
  const [trendHistory, setTrendHistory] = useState([
    { time: '09:00', ph: 7.0, cod: 30 },
    { time: '13:00', ph: 7.1, cod: 26 },
    { time: '17:00', ph: 7.0, cod: 27 },
    { time: '21:00', ph: 7.0, cod: 22 },
    { time: '01:00', ph: 7.0, cod: 23 },
    { time: '05:00', ph: 7.1, cod: 30 },
    { time: '09:00', ph: 7.3, cod: 110 },
    { time: '10:00', ph: 7.2, cod: 23 }
  ]);

  // Historical Batches
  const [batches, setBatches] = useState([
    {
      id: 'BATCH 312',
      date: '17 Agt 2028 - 09:30',
      volume: 1500,
      dose: '3.8 mg/L',
      phBefore: 9.4,
      phAfter: 7.2,
      codBefore: 420,
      codAfter: 48,
      duration: 45,
      status: 'Memenuhi Baku Mutu',
      efficiency: '92.7%'
    },
    {
      id: 'BATCH 311',
      date: '17 Agt 2028 - 08:15',
      volume: 1450,
      dose: '4.1 mg/L',
      phBefore: 9.8,
      phAfter: 7.3,
      codBefore: 450,
      codAfter: 52,
      duration: 50,
      status: 'Memenuhi Baku Mutu',
      efficiency: '91.5%'
    },
    {
      id: 'BATCH 310',
      date: '16 Agt 2028 - 23:00',
      volume: 1600,
      dose: '3.6 mg/L',
      phBefore: 8.9,
      phAfter: 7.1,
      codBefore: 390,
      codAfter: 42,
      duration: 42,
      status: 'Memenuhi Baku Mutu',
      efficiency: '93.2%'
    },
    {
      id: 'BATCH 309',
      date: '16 Agt 2028 - 18:30',
      volume: 1550,
      dose: '4.5 mg/L',
      phBefore: 10.2,
      phAfter: 7.5,
      codBefore: 510,
      codAfter: 68,
      duration: 55,
      status: 'Memenuhi Baku Mutu',
      efficiency: '89.8%'
    },
    {
      id: 'BATCH 308',
      date: '16 Agt 2028 - 14:00',
      volume: 1400,
      dose: '3.5 mg/L',
      phBefore: 8.7,
      phAfter: 7.0,
      codBefore: 370,
      codAfter: 38,
      duration: 40,
      status: 'Memenuhi Baku Mutu',
      efficiency: '94.1%'
    }
  ]);

  // System Settings
  const [settings, setSettings] = useState({
    theme: 'lavender',
    soundNotifications: true,
    autoSaveInterval: 30,
    language: 'id',
    timezone: 'WIB (UTC+7)',
    mqttUrl: 'wss://mqtt.ecomind-ai.id:8084/mqtt',
    wifiSSID: 'EcoMind_Industrial_IoT_5G',
    operatorName: 'Ir. Ahmad Zulkarnain',
    operatorRole: 'Kepala Operator Pengolahan Limbah',
    aiModelVersion: 'v1.7 (Deep neural net trained on 312 batches)'
  });

  // Simulated Sensor Live Updates
  useEffect(() => {
    if (!isLiveStreaming) return;

    const interval = setInterval(() => {
      setSensorData(prev => {
        let newPh, newCod, newTss, newTurb;
        
        if (isAnomalyActive) {
          // Anomaly state: pH drops low or COD spikes high
          newPh = +(5.2 + (Math.random() * 0.4 - 0.2)).toFixed(2);
          newCod = +(165.0 + (Math.random() * 15 - 7.5)).toFixed(1);
          newTss = +(280 + Math.random() * 20).toFixed(0);
          newTurb = +(38.0 + Math.random() * 5).toFixed(1);
        } else {
          // Normal slight fluctuations
          newPh = +(Math.min(8.5, Math.max(6.5, prev.ph + (Math.random() * 0.1 - 0.05)))).toFixed(2);
          newCod = +(Math.min(120, Math.max(60, prev.cod + (Math.random() * 2 - 1)))).toFixed(1);
          newTss = +(Math.min(200, Math.max(100, prev.tss + (Math.random() * 4 - 2)))).toFixed(0);
          newTurb = +(Math.min(30, Math.max(10, prev.turbidity + (Math.random() * 0.6 - 0.3)))).toFixed(1);
        }

        const now = new Date();

        // Update recommendation based on sensor data
        let recDosage = 3.8;
        if (newCod > 120 || newPh < 6.5 || newPh > 8.5) {
          recDosage = +((newCod / 22) + Math.abs(7.2 - newPh) * 0.8).toFixed(1);
        }

        setRecommendation(r => ({
          ...r,
          dosage: recDosage,
          suitability: +(90 + Math.random() * 4).toFixed(1),
          status: newCod > 100 || newPh < 6.5 || newPh > 8.5 ? 'WARNING' : 'OPTIMAL'
        }));

        return {
          ph: newPh,
          cod: newCod,
          tss: newTss,
          turbidity: newTurb,
          flowRate: +(45.0 + (Math.random() * 1.5 - 0.75)).toFixed(1),
          lastUpdate: now
        };
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [isLiveStreaming, isAnomalyActive]);

  // Actions
  const applyDose = (customDose = null) => {
    const doseVal = customDose || recommendation.dosage;
    showToast(`Dosis koagulant ${doseVal} ${recommendation.unit} (${recommendation.coagulantType}) berhasil diterapkan ke aktuator pompa!`, 'success');

    // Create log notification
    const newNotif = {
      id: Date.now(),
      type: 'OUTPUT',
      batchId: 313,
      title: 'Manual Injection Dosis Koagulan',
      description: `Operator menerapkan dosis ${doseVal} ${recommendation.unit} secara manual.`,
      timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) + ' WIB',
      date: 'Hari ini',
      status: 'success',
      read: false
    };

    setNotifications(prev => [newNotif, ...prev]);
  };

  const toggleAutoMode = () => {
    setAutoMode(prev => {
      const next = !prev;
      showToast(`Mode Penentuan Dosis diubah ke: ${next ? 'OTOMATIS (AI Direct Control)' : 'MANUAL (Operator Approval)'}`, 'info');
      return next;
    });
  };

  const toggleAnomaly = () => {
    setIsAnomalyActive(prev => {
      const next = !prev;
      if (next) {
        showToast('⚠️ Uji Anomali Aktif: pH & COD disimulasikan melebihi batas normal!', 'warning');
        // Add warning notification
        setNotifications(n => [{
          id: Date.now(),
          type: 'INPUT',
          batchId: 313,
          title: 'PERINGATAN: Anomali Parameter Limbah',
          description: 'pH terdeteksi 5.20 (Asam) & COD 165.0 mg/L (Melewati Baku Mutu 100 mg/L).',
          timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) + ' WIB',
          date: 'Hari ini',
          status: 'warning',
          read: false
        }, ...n]);
      } else {
        showToast('✅ Simulasi kembali ke kondisi NORMAL', 'success');
      }
      return next;
    });
  };

  const markNotificationRead = (id) => {
    setNotifications(n => n.map(item => item.id === id ? { ...item, read: true } : item));
  };

  const markAllNotificationsRead = () => {
    setNotifications(n => n.map(item => ({ ...item, read: true })));
    showToast('Semua notifikasi telah ditandai dibaca.', 'info');
  };

  const deleteNotification = (id) => {
    setNotifications(n => n.filter(item => item.id !== id));
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const toggleMobileMenu = () => setIsMobileMenuOpen(prev => !prev);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <DataContext.Provider value={{
      sensorData,
      isLiveStreaming,
      setIsLiveStreaming,
      isAnomalyActive,
      toggleAnomaly,
      autoMode,
      toggleAutoMode,
      recommendation,
      setRecommendation,
      applyDose,
      trendHistory,
      notifications,
      unreadCount,
      markNotificationRead,
      markAllNotificationsRead,
      deleteNotification,
      batches,
      settings,
      setSettings,
      toastMessage,
      showToast,
      isMobileMenuOpen,
      setIsMobileMenuOpen,
      toggleMobileMenu,
      closeMobileMenu
    }}>
      {children}
    </DataContext.Provider>
  );
};
