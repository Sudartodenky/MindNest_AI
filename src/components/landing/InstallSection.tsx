import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  DownloadCloud,
  ShieldCheck,
  X,
  Smartphone,
  Info,
  Share,
  MoreVertical,
} from "lucide-react";

export function InstallSection() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [showGuide, setShowGuide] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [deviceType, setDeviceType] = useState("android"); // default

  useEffect(() => {
    const ua = navigator.userAgent;
    const mobileRegex = /android|iphone|ipad|ipod/i;
    setIsMobile(mobileRegex.test(ua));

    if (/iphone|ipad|ipod/i.test(ua)) setDeviceType("ios");

    if (window.matchMedia("(display-mode: standalone)").matches) {
      setIsInstalled(true);
    }

    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener("beforeinstallprompt", handler);
    window.addEventListener("appinstalled", () => {
      setIsInstalled(true);
      setDeferredPrompt(null);
    });

    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  if (!isMobile) return null;

  const handleInstallClick = async () => {
    if (isInstalled) return;

    if (!deferredPrompt) {
      setShowGuide(true); 
    }

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === "accepted") setDeferredPrompt(null);
  };

  return (
    <section className="mt-16 px-4 overflow-hidden pb-20 pt-20">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="max-w-2xl mx-auto relative group"
      >
        <div className="absolute -inset-1 bg-gradient-to-r from-[#8b5cf6] to-[#34d399] rounded-[2rem] blur opacity-20 transition duration-1000"></div>

        <div className="relative bg-white border border-gray-100 rounded-[2rem] p-6 md:p-10 flex flex-col items-center text-center shadow-xl">
          <div className="inline-flex items-center gap-2 bg-[#34d399]/10 px-3 py-1 rounded-full mb-4">
            <Smartphone size={14} className="text-[#34d399]" />
            <span className="text-[10px] font-bold text-[#34d399] uppercase tracking-wider">
              Khusus Pengguna HP
            </span>
          </div>

          <h2 className="text-2xl font-black text-[#1e293b] mb-3 leading-tight">
            {isInstalled
              ? "MindNest Sudah Aktif!"
              : "Bawa MindNest ke Layar HP-mu"}
          </h2>

          <p className="text-gray-500 text-sm mb-8 max-w-xs leading-relaxed">
            {isInstalled
              ? "Sekarang kamu bisa akses jurnal & meditasi langsung dari beranda HP."
              : "Instal aplikasi secara aman. Lebih hemat kuota, lebih ringan, dan privasi lebih terjaga."}
          </p>

          <motion.button
            onClick={handleInstallClick}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`flex items-center gap-4 ${
              isInstalled
                ? "bg-gray-100 text-gray-400"
                : "bg-[#1e293b] text-white"
            } pl-2 pr-8 py-2 rounded-2xl shadow-lg transition-all`}
            disabled={isInstalled}
          >
            <div
              className={`w-12 h-12 ${
                isInstalled ? "bg-gray-200" : "bg-[#34d399]"
              } rounded-xl flex items-center justify-center shadow-inner`}
            >
              <DownloadCloud className="text-white w-6 h-6" />
            </div>
            <div className="text-left">
              <p
                className={`text-[9px] font-bold uppercase tracking-tight mb-1 ${
                  isInstalled ? "text-gray-400" : "text-[#34d399]"
                }`}
              >
                {isInstalled ? "Success" : "One-Click Install"}
              </p>
              <p className="text-lg font-bold leading-none">
                {isInstalled ? "Sudah Terpasang" : "Pasang Sekarang"}
              </p>
            </div>
          </motion.button>

          <div className="mt-6 flex items-center gap-2 text-gray-400">
            <ShieldCheck size={14} className="text-[#34d399]" />
            <span className="text-[10px] font-medium tracking-wide">
              Verified PWA • Aman & Bebas Malware
            </span>
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {showGuide && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowGuide(false)}
              className="absolute inset-0 bg-[#1e293b]/80 backdrop-blur-md"
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative bg-white w-full max-w-sm rounded-[2.5rem] p-8 shadow-2xl text-center"
            >
              <button
                onClick={() => setShowGuide(false)}
                className="absolute top-6 right-6 text-gray-400"
              >
                <X size={20} />
              </button>

              <div className="w-14 h-14 bg-[#8b5cf6]/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Info className="text-[#8b5cf6] w-7 h-7" />
              </div>

              <h3 className="text-xl font-bold text-[#1e293b] mb-2">
                Instalasi Manual
              </h3>
              <p className="text-xs text-gray-400 mb-6">
                Sepertinya browser kamu butuh sedikit bantuan manual:
              </p>

              <div className="space-y-5 text-left text-sm text-gray-600 mb-8">
                {deviceType === "ios" ? (
                  <>
                    <div className="flex gap-4 items-start">
                      <div className="bg-[#8b5cf6] text-white p-1 rounded-md">
                        <Share size={16} />
                      </div>
                      <p>
                        Ketuk tombol <strong>'Share'</strong> di bar bawah
                        Safari.
                      </p>
                    </div>
                    <div className="flex gap-4 items-start">
                      <div className="bg-gray-100 p-1 rounded-md text-gray-600 font-bold text-[10px]">
                        Add
                      </div>
                      <p>
                        Pilih menu <strong>'Add to Home Screen'</strong>.
                      </p>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex gap-4 items-start">
                      <div className="bg-[#1e293b] text-white p-1 rounded-md">
                        <MoreVertical size={16} />
                      </div>
                      <p>
                        Ketuk <strong>titik tiga</strong> di pojok kanan atas
                        browser.
                      </p>
                    </div>
                    <div className="flex gap-4 items-start">
                      <div className="bg-gray-100 p-1 rounded-md text-gray-600 font-bold text-[10px]">
                        App
                      </div>
                      <p>
                        Cari dan pilih <strong>'Instal Aplikasi'</strong> atau{" "}
                        <strong>'Tambahkan ke Layar Utama'</strong>.
                      </p>
                    </div>
                  </>
                )}
              </div>

              <button
                onClick={() => setShowGuide(false)}
                className="w-full py-4 bg-gradient-to-r from-[#8b5cf6] to-[#6366f1] text-white rounded-2xl font-bold shadow-lg"
              >
                Oke, Saya Mengerti
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
