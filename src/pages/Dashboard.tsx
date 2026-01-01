import React, { useState, useEffect } from "react";
import { auth, db } from "../firebaseConfig";
import { doc, setDoc, onSnapshot } from "firebase/firestore";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import { MoodPicker } from "../components/dashboard/MoodPicker";
import { TrendChart } from "../components/dashboard/TrendChart";
import { InsightCard } from "../components/dashboard/InsightCard";
import { GlassCard } from "../components/ui/GlassCard";
import {
  Flame,
  Sparkles,
  BarChart3,
  CalendarDays,
  ArrowRight,
  PenLine,
} from "lucide-react";

export function Dashboard() {
  const [user, setUser] = useState<any>(null);
  const [userName, setUserName] = useState("Teman");
  const [selectedMood, setSelectedMood] = useState<number | null>(null);
  const [moodNote, setMoodNote] = useState("");
  const [moodHistory, setMoodHistory] = useState<any[]>([]);
  const [streak, setStreak] = useState(0);
  const [isSaving, setIsSaving] = useState(false);

  const averageMood =
    moodHistory.length > 0
      ? (
          moodHistory.reduce((acc, curr) => acc + curr.mood, 0) /
          moodHistory.length
        ).toFixed(1)
      : 0;

  const todayDateISO = new Date().toISOString().split("T")[0];

  useEffect(() => {
    const unsubAuth = auth.onAuthStateChanged((currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        setUserName(currentUser.displayName?.split(" ")[0] || "User");
        const userDocRef = doc(db, "users", currentUser.uid);

        return onSnapshot(userDocRef, (docSnap) => {
          if (docSnap.exists()) {
            const data = docSnap.data();
            const history = data.moodHistory || [];
            setMoodHistory(history);
            setStreak(data.streak || 0);

            const today = history.find((m: any) => m.date === todayDateISO);
            if (today) {
              setSelectedMood(today.mood);
              setMoodNote(today.note || "");
            }
          }
        });
      }
    });
    return unsubAuth;
  }, [todayDateISO]);

  const handleSave = async (mood: number, note: string) => {
    if (!user || mood === null) return;
    setIsSaving(true);

    const entry = {
      date: todayDateISO,
      mood,
      note,
      timestamp: new Date().getTime(),
    };

    const realHistory = moodHistory.filter((h) => h.timestamp);
    const newHistory = realHistory.some((m) => m.date === todayDateISO)
      ? realHistory.map((m) => (m.date === todayDateISO ? entry : m))
      : [...realHistory, entry];

    try {
      await setDoc(
        doc(db, "users", user.uid),
        {
          moodHistory: newHistory,
          streak: newHistory.length > streak ? streak + 1 : streak,
        },
        { merge: true }
      );

    } catch (err) {
      console.error("Error saving:", err);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFF] dark:bg-[#020617] pb-24 md:pb-12 font-sans overflow-x-hidden transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 md:pt-10">
        {/* --- HEADER --- */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-4 md:mb-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-left"
          >
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
                Halo, {userName}!
              </h1>
            </div>
            <p className="text-slate-500 dark:text-slate-400 font-medium text-sm sm:text-base md:text-lg">
              Sudahkah kamu bernapas dengan lega hari ini?
            </p>
          </motion.div>

          {/* Streak Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center gap-4 bg-white dark:bg-slate-900 px-6 md:px-8 py-4 md:py-5 rounded-[2rem] shadow-xl shadow-indigo-100/50 dark:shadow-none border border-white dark:border-slate-800"
          >
            <div className="bg-orange-500 p-2.5 md:p-3 rounded-2xl shadow-lg shadow-orange-200 dark:shadow-orange-900/20">
              <Flame className="w-6 h-6 md:w-7 md:h-7 text-white fill-white" />
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">
                Streak
              </p>
              <p className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white leading-none">
                {streak}{" "}
                <span className="text-xs font-bold text-slate-400 tracking-normal">
                  Hari
                </span>
              </p>
            </div>
          </motion.div>
        </header>

        {/* --- MAIN GRID --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8">
          <div className="lg:col-span-8 space-y-6 md:space-y-8 order-1">
            <MoodPicker
              selectedMood={selectedMood}
              setSelectedMood={setSelectedMood}
              moodNote={moodNote}
              setMoodNote={setMoodNote}
              onSave={handleSave}
              isSaving={isSaving}
            />

            <GlassCard className="p-5 md:p-8 bg-white/70 dark:bg-slate-900/70 border-none">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
                <h3 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <BarChart3
                    className="text-indigo-600 dark:text-indigo-400"
                    size={20}
                  />{" "}
                  Tren Emosi
                </h3>
              </div>
              <div className="h-[250px] sm:h-[300px] w-full min-w-0 overflow-hidden">
                <TrendChart data={moodHistory} />
              </div>
            </GlassCard>

            <div className="mt-10 mb-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-indigo-100 dark:bg-indigo-900/50 rounded-xl">
                    <PenLine
                      className="text-indigo-600 dark:text-indigo-400"
                      size={20}
                    />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                    Jurnal Terakhir
                  </h3>
                </div>

                <Link
                  to="/history"
                  className="group flex items-center gap-2 text-sm font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 transition-colors"
                >
                  Lihat Semua
                  <ArrowRight
                    size={16}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {moodHistory.length > 0 ? (
                  moodHistory
                    .slice(-2)
                    .reverse()
                    .map((item, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <GlassCard className="p-5 bg-white/60 dark:bg-slate-900/60 border-none shadow-sm hover:shadow-md transition-all group relative overflow-hidden text-left">
                          <div
                            className={`absolute top-0 left-0 w-1 h-full ${
                              item.mood >= 4
                                ? "bg-emerald-400"
                                : item.mood <= 2
                                ? "bg-rose-400"
                                : "bg-blue-400"
                            }`}
                          />

                          <div className="flex justify-between items-start mb-3">
                            <div className="flex flex-col">
                              <span className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">
                                {new Date(item.date).toLocaleDateString(
                                  "id-ID",
                                  {
                                    weekday: "long",
                                  }
                                )}
                              </span>
                              <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
                                {new Date(item.date).toLocaleDateString(
                                  "id-ID",
                                  {
                                    day: "numeric",
                                    month: "short",
                                    year: "numeric",
                                  }
                                )}
                              </span>
                            </div>
                            <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-full text-[11px] font-black text-slate-700 dark:text-slate-300">
                              <Sparkles size={12} className="text-indigo-500" />
                              Skor: {item.mood}
                            </div>
                          </div>

                          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-2 italic">
                            {item.note
                              ? `"${item.note}"`
                              : "Kamu tidak menulis catatan hari ini, tapi perasaanmu tetap berharga."}
                          </p>
                        </GlassCard>
                      </motion.div>
                    ))
                ) : (
                  <div className="col-span-full py-10 text-center border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-[2rem]">
                    <p className="text-slate-400 dark:text-slate-500 font-medium">
                      Belum ada jurnal yang tersimpan.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 space-y-6 md:space-y-8 order-2">
            <InsightCard selectedMood={selectedMood} />

            <div className="grid grid-cols-2 gap-4">
              <GlassCard className="p-4 md:p-6 flex flex-col gap-2 border-l-4 border-l-indigo-500 bg-white/70 dark:bg-slate-900/70 text-left">
                <CalendarDays className="text-indigo-500" size={18} />
                <p className="text-[9px] font-black text-slate-400 dark:text-slate-500 uppercase">
                  Total Log
                </p>
                <p className="text-xl md:text-2xl font-black text-slate-900 dark:text-white">
                  {moodHistory.length}
                </p>
              </GlassCard>

              <GlassCard className="p-4 md:p-6 flex flex-col gap-2 border-l-4 border-l-emerald-500 bg-white/70 dark:bg-slate-900/70 text-left">
                <Sparkles className="text-emerald-500" size={18} />
                <p className="text-[9px] font-black text-slate-400 dark:text-slate-500 uppercase">
                  Avg Mood
                </p>
                <p className="text-xl md:text-2xl font-black text-slate-900 dark:text-white">
                  {averageMood}
                </p>
              </GlassCard>
            </div>

            <motion.div
              whileHover={{ scale: 1.01 }}
              className="bg-indigo-950 dark:bg-indigo-900 rounded-[2.5rem] p-6 md:p-8 text-white relative overflow-hidden shadow-2xl transition-colors duration-500 text-left"
            >
              <div className="relative z-10">
                <p className="text-indigo-300 font-bold text-[10px] mb-1 uppercase tracking-widest">
                  Rekomendasi
                </p>
                <p className="text-lg md:text-xl font-extrabold mb-6 leading-tight">
                  Latih fokusmu dengan Digital Detox.
                </p>
                <Link
                  to="/digital-detox"
                  className="flex items-center justify-center gap-2 bg-white text-indigo-900 px-6 py-3 rounded-2xl font-bold text-sm hover:bg-indigo-50 transition-all group"
                >
                  Mulai Detox{" "}
                  <ArrowRight
                    size={18}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </Link>
              </div>
              <Sparkles className="absolute -right-6 -bottom-6 w-32 h-32 text-white/10 rotate-12" />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
