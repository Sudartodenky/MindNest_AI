import { motion } from "framer-motion";
import {
  Moon,
  Sun,
  Bell,
  Shield,
  Download,
  ChevronRight,
  LogOut,
} from "lucide-react";
import Swal from "sweetalert2";

interface TabSettingsProps {
  isDarkMode: boolean;
  onToggleDark: () => void;
  onDailyReminder: () => void;
  onExport: (format: "pdf" | "excel" | "json") => void;
  onLogout: () => void;
}

export function TabSettings({
  isDarkMode,
  onToggleDark,
  onDailyReminder,
  onExport,
  onLogout,
}: TabSettingsProps) {
  const handleExportClick = async () => {
    const { value: format } = await Swal.fire({
      title: "Export Data",
      text: "Pilih format dokumen laporan jurnalmu",
      background: isDarkMode ? "#0f172a" : "#fff", // Warna slate-900
      color: isDarkMode ? "#f8fafc" : "#0f172a",
      showConfirmButton: false,
      showCancelButton: true,
      cancelButtonText: "Batal",
      html: `
        <div class="grid grid-cols-1 gap-3 mt-4">
          <button id="pdf-btn" class="flex items-center gap-4 p-4 rounded-2xl border dark:border-slate-700 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all text-left">
            <div class="w-10 h-10 bg-red-100 dark:bg-red-900/30 rounded-xl flex items-center justify-center text-red-600 text-md text-base">PDF</div>
            <div><div class="font-bold text-sm dark:text-white">PDF Document</div><div class="text-xs text-slate-400">Cocok untuk cetak/arsip</div></div>
          </button>
          <button id="excel-btn" class="flex items-center gap-4 p-4 rounded-2xl border dark:border-slate-700 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-all text-left">
            <div class="w-10 h-10 bg-emerald-100 dark:bg-emerald-900/30 rounded-xl flex items-center justify-center text-emerald-600 text-base">XLS</div>
            <div><div class="font-bold text-sm dark:text-white">Excel Sheet</div><div class="text-xs text-slate-400">Olah data di spreadsheet</div></div>
          </button>
          <button id="json-btn" class="flex items-center gap-4 p-4 rounded-2xl border dark:border-slate-700 hover:bg-amber-50 dark:hover:bg-amber-900/20 transition-all text-left">
            <div class="w-10 h-10 bg-amber-100 dark:bg-amber-900/30 rounded-xl flex items-center justify-center text-amber-600 text-base">JSON</div>
            <div><div class="font-bold text-sm dark:text-white">Raw Data</div><div class="text-xs text-slate-400">Data mentah (Developer)</div></div>
          </button>
        </div>
      `,
      didOpen: () => {
        document.getElementById("pdf-btn")?.addEventListener("click", () => {
          onExport("pdf");
          Swal.close();
        });
        document.getElementById("excel-btn")?.addEventListener("click", () => {
          onExport("excel");
          Swal.close();
        });
        document.getElementById("json-btn")?.addEventListener("click", () => {
          onExport("json");
          Swal.close();
        });
      },
    });
  };

  const showPrivacy = () => {
    Swal.fire({
      title: "Privasi & Keamanan",
      icon: "shield",
      background: isDarkMode ? "#1e293b" : "#fff",
      color: isDarkMode ? "#fff" : "#000",
      confirmButtonColor: "#6366f1",
      html: `
        <div class="text-left text-sm space-y-4 opacity-80">
          <p><b>1. Enkripsi End-to-End:</b> Jurnal Anda disimpan secara pribadi di Firebase Cloud Storage dengan aturan keamanan yang ketat.</p>
          <p><b>2. Kendali Data:</b> Anda dapat menghapus atau mengekspor seluruh data Anda kapan saja tanpa hambatan.</p>
          <p><b>3. Anonimitas:</b> MindNest tidak menjual data kesehatan mental Anda kepada pihak ketiga atau pengiklan.</p>
        </div>
      `,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="space-y-4"
    >
      <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-white dark:border-slate-800 shadow-sm overflow-hidden transition-all">
        {/* Toggle Dark Mode Button */}
        <button
          onClick={onToggleDark}
          className="w-full flex items-center justify-between p-6 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors border-b border-slate-50 dark:border-slate-800 group"
        >
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-indigo-50 dark:bg-indigo-900/30 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
              {isDarkMode ? (
                <Sun size={18} className="text-amber-400" />
              ) : (
                <Moon size={18} className="text-indigo-500" />
              )}
            </div>
            <span className="font-bold text-slate-700 dark:text-slate-200 text-sm">
              Tampilan: {isDarkMode ? "Mode Gelap" : "Mode Terang"}
            </span>
          </div>
          {/* Toggle UI */}
          <div
            className={`w-12 h-6 rounded-full p-1 transition-all duration-300 ${
              isDarkMode ? "bg-indigo-500" : "bg-slate-200"
            }`}
          >
            <div
              className={`w-4 h-4 bg-white rounded-full shadow-sm transform transition-all duration-300 ${
                isDarkMode ? "translate-x-6" : "translate-x-0"
              }`}
            />
          </div>
        </button>

        {/* Settings Buttons */}
        <SettingsButton
          icon={<Bell size={18} className="text-amber-500" />}
          bg="bg-amber-50 dark:bg-amber-900/20"
          label="Daily Reminders"
          onClick={onDailyReminder}
        />
        <SettingsButton
          icon={<Shield size={18} className="text-blue-500" />}
          bg="bg-blue-50 dark:bg-blue-900/20"
          label="Data Privacy"
          onClick={showPrivacy}
        />
        <SettingsButton
          icon={<Download size={18} className="text-indigo-500" />}
          bg="bg-indigo-50 dark:bg-indigo-900/20"
          label="Export My Data"
          onClick={handleExportClick}
          isLast
        />
      </div>

      {/* Logout Button */}
      <button
        onClick={onLogout}
        className="w-full py-5 rounded-[2.5rem] bg-red-50 dark:bg-red-900/10 text-red-500 dark:text-red-400 font-black text-[10px] uppercase tracking-[0.2em] hover:bg-red-100 dark:hover:bg-red-900/20 transition-all flex items-center justify-center gap-2 border border-transparent dark:border-red-900/20"
      >
        <LogOut size={16} /> Logout Account
      </button>
    </motion.div>
  );
}

function SettingsButton({ icon, label, onClick, bg, isLast = false }: any) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center justify-between p-6 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors group ${
        !isLast ? "border-b dark:border-slate-800" : ""
      }`}
    >
      <div className="flex items-center gap-4">
        <div
          className={`w-10 h-10 ${bg} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform`}
        >
          {icon}
        </div>
        <span className="font-bold text-slate-700 dark:text-slate-200 text-sm">
          {label}
        </span>
      </div>
      <ChevronRight size={18} className="text-slate-300" />
    </button>
  );
}
