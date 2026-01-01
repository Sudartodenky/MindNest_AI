import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";
import {
  TrendingUp,
  Calendar,
  Clock,
  Star,
  Brain,
  Zap,
  ChevronRight,
} from "lucide-react";

import { useReport } from "../hooks/useReport";
import { StatCard } from "../components/report/StatCard";

export function Report() {
  const { loading, data, stats } = useReport();
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const checkDark = () =>
      setIsDarkMode(document.documentElement.classList.contains("dark"));
    checkDark();
    const observer = new MutationObserver(checkDark);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => observer.disconnect();
  }, []);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8FAFF] dark:bg-slate-950 transition-colors duration-500">
        <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );

  return (
    <div className="min-h-screen pb-24 bg-[#F8FAFF] dark:bg-[#020617] transition-colors duration-500">
      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <h1 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
              Analisis MindNest
            </h1>
            <p className="text-slate-500 dark:text-slate-400 font-medium mt-1">
              Data berdasarkan {stats.totalJournals} aktivitas jurnal
              terakhirmu.
            </p>
          </div>
          <Link
            to="/history"
            className="inline-flex items-center gap-2 text-sm font-bold text-indigo-600 dark:text-indigo-400 hover:underline"
          >
            Lihat Riwayat Lengkap <ChevronRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <StatCard
            label="Rata-rata Mood"
            value={stats.avgMood || 0}
            icon={<Star size={16} className="text-amber-500 fill-amber-500" />}
            bg="bg-white dark:bg-slate-900"
            border="border-white dark:border-slate-800"
            delay={0}
          />
          <StatCard
            label="Total Jurnal"
            value={stats.totalJournals}
            icon={<Calendar size={16} className="text-blue-500" />}
            bg="bg-white dark:bg-slate-900"
            border="border-white dark:border-slate-800"
            delay={0.1}
          />
          <StatCard
            label="Detoks (Menit)"
            value={stats.totalDetox}
            icon={<Clock size={16} className="text-indigo-500" />}
            bg="bg-white dark:bg-slate-900"
            border="border-white dark:border-slate-800"
            delay={0.2}
          />
          <StatCard
            label="Total Detoks"
            value={stats.totalDetox}
            icon={<Clock size={16} className="text-indigo-500" />}
            bg="bg-white dark:bg-slate-900"
            border="border-white dark:border-slate-800"
            delay={0.2}
          />
          <StatCard
            label="Mood Dominan"
            value={stats.mostCommonMood}
            icon={<TrendingUp size={16} className="text-emerald-500" />}
            bg="bg-white dark:bg-slate-900"
            border="border-white dark:border-slate-800"
            delay={0.3}
          />
          <StatCard
            label="Sesi Tenang"
            value={`${stats.totalDetoxSessions || 0} Sesi`}
            icon={<Zap size={16} className="text-amber-500" />}
            bg="bg-white dark:bg-slate-900"
            border="border-white dark:border-slate-800"
            delay={0.4}
          />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-[2.5rem] border border-white dark:border-slate-800 shadow-sm transition-all overflow-hidden">
            <h3 className="font-bold text-slate-800 dark:text-slate-100 mb-6 flex items-center gap-2">
              <TrendingUp size={18} className="text-indigo-500" /> Tren 7 Hari
            </h3>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    stroke={isDarkMode ? "#334155" : "#f1f5f9"}
                  />
                  <XAxis
                    dataKey="name"
                    axisLine={false}
                    tickLine={false}
                    tick={{
                      fontSize: 12,
                      fill: isDarkMode ? "#64748b" : "#94a3b8",
                    }}
                  />
                  <YAxis domain={[0, 5]} hide />
                  <Tooltip
                    contentStyle={{
                      borderRadius: "20px",
                      border: "none",
                      backgroundColor: isDarkMode ? "#1e293b" : "#ffffff",
                      boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
                    }}
                    itemStyle={{ color: isDarkMode ? "#f8fafc" : "#1e293b" }}
                    labelStyle={{
                      color: "#94a3b8",
                      fontSize: "10px",
                      marginBottom: "4px",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="mood"
                    stroke="#6366f1"
                    strokeWidth={4}
                    dot={{
                      r: 5,
                      fill: "#6366f1",
                      strokeWidth: 2,
                      stroke: isDarkMode ? "#0f172a" : "#fff",
                    }}
                    activeDot={{ r: 8, strokeWidth: 0 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Grafik Aktivitas (Bar Chart) */}
          <div className="bg-white dark:bg-slate-900 p-6 rounded-[2.5rem] border border-white dark:border-slate-800 shadow-sm transition-all overflow-hidden">
            <h3 className="font-bold text-slate-800 dark:text-slate-100 mb-6 flex items-center gap-2">
              <Zap size={18} className="text-amber-500" /> Intensitas Emosi
            </h3>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    stroke={isDarkMode ? "#334155" : "#f1f5f9"}
                  />
                  <XAxis
                    dataKey="name"
                    axisLine={false}
                    tickLine={false}
                    tick={{
                      fontSize: 12,
                      fill: isDarkMode ? "#64748b" : "#94a3b8",
                    }}
                  />
                  <Tooltip
                    cursor={{
                      fill: isDarkMode ? "#334155" : "#f8fafc",
                      radius: 10,
                    }}
                    contentStyle={{
                      borderRadius: "20px",
                      border: "none",
                      backgroundColor: isDarkMode ? "#1e293b" : "#ffffff",
                    }}
                  />
                  <Bar
                    dataKey="mood"
                    fill="#fbbf24"
                    radius={[10, 10, 10, 10]}
                    barSize={16}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* AI Insight Card - Sinkron dengan useReport */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-indigo-600 to-violet-700 dark:from-indigo-500 dark:to-purple-900 p-8 rounded-[3rem] text-white shadow-xl relative overflow-hidden"
        >
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-4">
              <div className="p-2 bg-white/20 rounded-xl backdrop-blur-md">
                <Brain size={22} />
              </div>
              <span className="font-black uppercase tracking-[0.2em] text-[10px] text-indigo-100">
                AI Mind Insight
              </span>
            </div>

            <h2 className="text-2xl md:text-3xl font-black mb-4 tracking-tight leading-tight">
              {stats.totalJournals > 0
                ? `Kamu cenderung merasa ${stats.mostCommonMood}`
                : "Belum ada data cukup"}
            </h2>

            <p className="text-indigo-50/90 text-lg leading-relaxed font-medium italic">
              {stats.insightMessage ||
                "Mulai tulis jurnal hari ini untuk mendapatkan analisis mendalam dari AI."}
            </p>
          </div>

          {/* Decorative Elements */}
          <div className="absolute -bottom-10 -right-10 p-4 opacity-10 rotate-12">
            <Brain size={240} />
          </div>
          <div className="absolute top-10 right-10 w-24 h-24 bg-white/5 rounded-full blur-3xl" />
        </motion.div>
      </div>
    </div>
  );
}
