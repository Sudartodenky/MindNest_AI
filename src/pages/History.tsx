import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebaseConfig";
import { doc, onSnapshot } from "firebase/firestore";
import { motion, AnimatePresence } from "framer-motion";
import { GlassCard } from "../components/ui/GlassCard";
import {
  ArrowLeft,
  Calendar as CalendarIcon,
  Search,
  MessageSquareQuote,
  Laugh,
  Smile,
  Meh,
  Frown,
  Angry,
  Filter,
} from "lucide-react";

const MOOD_CONFIG: Record<
  number,
  { icon: JSX.Element; color: string; bg: string }
> = {
  5: {
    icon: <Laugh />,
    color: "text-amber-500",
    bg: "bg-amber-50 dark:bg-amber-900/20",
  },
  4: {
    icon: <Smile />,
    color: "text-emerald-500",
    bg: "bg-emerald-50 dark:bg-emerald-900/20",
  },
  3: {
    icon: <Meh />,
    color: "text-blue-500",
    bg: "bg-blue-50 dark:bg-blue-900/20",
  },
  2: {
    icon: <Frown />,
    color: "text-indigo-500",
    bg: "bg-indigo-50 dark:bg-indigo-900/20",
  },
  1: {
    icon: <Angry />,
    color: "text-rose-500",
    bg: "bg-rose-50 dark:bg-rose-900/20",
  },
};

export function History() {
  const navigate = useNavigate();
  const [moodHistory, setMoodHistory] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubAuth = auth.onAuthStateChanged((user) => {
      if (user) {
        const userDocRef = doc(db, "users", user.uid);
        return onSnapshot(userDocRef, (docSnap) => {
          if (docSnap.exists()) {
            const data = docSnap.data();
            const sortedHistory = (data.moodHistory || []).sort(
              (a: any, b: any) => b.timestamp - a.timestamp
            );
            setMoodHistory(sortedHistory);
          }
          setLoading(false);
        });
      }
    });
    return unsubAuth;
  }, []);

  const filteredHistory = moodHistory.filter(
    (item) =>
      item.note?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.date.includes(searchTerm)
  );

  const getMoodData = (score: number) => {
    return (
      MOOD_CONFIG[score] || {
        icon: <Meh />,
        color: "text-slate-400",
        bg: "bg-slate-50",
      }
    );
  };

  return (
    <div className="min-h-screen bg-[#F8FAFF] dark:bg-[#020617] pb-24 md:pb-12 transition-colors duration-500 font-sans">
      <div className="max-w-4xl mx-auto px-5 pt-8">
        {/* --- HEADER --- */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate(-1)}
              className="p-3 bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all"
              title="Kembali"
            >
              <ArrowLeft size={20} />
            </motion.button>
            <div>
              <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                Riwayat Jurnal
              </h2>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                {filteredHistory.length} Total Entri
              </p>
            </div>
          </div>
        </div>

        {/* --- SEARCH & FILTER BAR --- */}
        <div className="relative mb-12">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 flex items-center gap-2 pointer-events-none border-r pr-3 border-slate-100 dark:border-slate-800">
            <Search size={18} />
          </div>
          <input
            type="text"
            placeholder="Cari berdasarkan perasaan atau tanggal..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-16 pr-5 py-5 bg-white dark:bg-slate-900/50 rounded-[2rem] border-none shadow-sm focus:ring-2 focus:ring-indigo-500 dark:text-white outline-none transition-all placeholder:text-slate-400 text-sm"
          />
        </div>

        {/* --- TIMELINE --- */}
        <div className="relative space-y-10 before:absolute before:inset-0 before:left-[19px] md:before:left-1/2 before:-translate-x-px before:h-full before:w-0.5 before:bg-gradient-to-b before:from-indigo-200 before:via-slate-200 before:to-transparent dark:before:from-indigo-900/50 dark:before:via-slate-800 dark:before:to-transparent">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 text-slate-400 gap-4">
              <div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
              <p className="text-xs font-bold uppercase tracking-widest">
                Menyusun Kenangan...
              </p>
            </div>
          ) : (
            <AnimatePresence mode="popLayout">
              {filteredHistory.length > 0 ? (
                filteredHistory.map((item, index) => {
                  const mood = getMoodData(item.mood);
                  return (
                    <motion.div
                      key={item.timestamp || index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ delay: index * 0.05 }}
                      className="relative flex items-start md:justify-between md:odd:flex-row-reverse group"
                    >
                      {/* Dot/Icon Timeline */}
                      <div className="absolute left-0 md:left-1/2 md:-ml-5 flex items-center justify-center w-10 h-10 rounded-full border-4 border-[#F8FAFF] dark:border-[#020617] bg-white dark:bg-slate-900 z-10 shadow-md transition-transform group-hover:scale-110">
                        <div className={`${mood.color}`}>
                          {React.cloneElement(mood.icon, { size: 18 })}
                        </div>
                      </div>

                      {/* Card Konten */}
                      <GlassCard className="ml-14 md:ml-0 w-full md:w-[44%] p-6 bg-white/70 dark:bg-slate-900/70 border-none shadow-sm hover:shadow-xl hover:bg-white dark:hover:bg-slate-900 transition-all duration-300">
                        <div className="flex flex-wrap items-center justify-between gap-2 mb-5">
                          <div className="flex flex-col">
                            <span className="text-[10px] font-black text-indigo-500 dark:text-indigo-400 uppercase tracking-widest">
                              {new Date(item.date).toLocaleDateString("id-ID", {
                                weekday: "long",
                              })}
                            </span>
                            <div className="flex items-center gap-1.5 text-slate-900 dark:text-white mt-1">
                              <CalendarIcon size={14} className="opacity-50" />
                              <span className="text-sm font-black italic">
                                {new Date(item.date).toLocaleDateString(
                                  "id-ID",
                                  {
                                    day: "numeric",
                                    month: "long",
                                    year: "numeric",
                                  }
                                )}
                              </span>
                            </div>
                          </div>
                          <div
                            className={`text-[9px] font-black px-3 py-1.5 rounded-xl ${mood.bg} ${mood.color} border border-current/10 shadow-inner`}
                          >
                            SCORE: {item.mood}/5
                          </div>
                        </div>

                        <div className="relative bg-slate-50/80 dark:bg-slate-800/40 p-4 rounded-[1.5rem] border border-slate-100 dark:border-slate-700/50">
                          <MessageSquareQuote
                            className="absolute -top-2 -left-2 text-indigo-200 dark:text-indigo-900"
                            size={24}
                          />
                          <p className="text-[13px] md:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
                            {item.note
                              ? `"${item.note}"`
                              : "Hening adalah jawaban. Tidak ada catatan untuk hari ini."}
                          </p>
                        </div>
                      </GlassCard>
                    </motion.div>
                  );
                })
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-20 flex flex-col items-center gap-4"
                >
                  <div className="p-5 bg-slate-100 dark:bg-slate-900 rounded-full">
                    <Filter size={32} className="text-slate-300" />
                  </div>
                  <p className="text-slate-400 font-bold tracking-tight">
                    Jurnal tidak ditemukan dalam memori.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          )}
        </div>
      </div>
    </div>
  );
}
