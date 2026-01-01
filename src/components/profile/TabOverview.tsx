import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import brainIcon from "../../assets/icons/brain.png";
import trophyIcon from "../../assets/icons/trophy.png";

interface TabOverviewProps {
  totalJournals: number;
}
export function TabOverview({ totalJournals }: TabOverviewProps) {
  return (
    <motion.div /* ... props ... */ className="space-y-6">
      {/* Insight Card */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-[2.5rem] border border-white dark:border-slate-800 shadow-sm flex items-start gap-5 transition-all">
        <div className="w-14 h-14 bg-indigo-50 dark:bg-indigo-900/30 rounded-2xl flex items-center justify-center shrink-0 transition-colors">
          <img src={brainIcon} className="w-8 h-8" alt="brain" />
        </div>
        <div>
          <h3 className="font-bold text-slate-800 dark:text-slate-100 mb-1">
            Mind Insight
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed transition-colors">
            Kamu telah menyelesaikan {totalJournals} jurnal. Konsistensi menjaga
            kesehatan mental meningkatkan fokusmu.
          </p>
        </div>
      </div>

      {/* Challenge Card (Gradient) */}
      <div className="bg-gradient-to-br from-indigo-500 to-violet-600 dark:from-indigo-600 dark:to-violet-800 p-8 rounded-[2.5rem] text-white relative overflow-hidden shadow-lg">
        <div className="relative z-10">
          <h3 className="text-xl font-bold mb-2">Daily Challenge</h3>
          <p className="text-indigo-100 text-sm mb-6 opacity-90">
            Catat 1 hal yang membuatmu bersyukur hari ini untuk membuka badge
            baru.
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-white text-indigo-600 px-6 py-3 rounded-full font-bold text-xs hover:shadow-lg active:scale-95 transition-all group"
          >
            Mulai Sekarang{" "}
            <ArrowRight
              size={14}
              className="group-hover:translate-x-1 transition-transform"
            />
          </Link>
        </div>
        <img
          src={trophyIcon}
          className="absolute -right-4 -bottom-4 w-32 h-32 opacity-20 rotate-12 pointer-events-none"
          alt="trophy"
        />
      </div>
    </motion.div>
  );
}
