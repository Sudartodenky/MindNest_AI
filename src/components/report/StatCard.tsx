import { motion } from "framer-motion";
import { ReactNode } from "react";

interface StatCardProps {
  label: string;
  value: string | number;
  icon: ReactNode;
  bg: string;
  border: string;
  delay: number;
}

export function StatCard({
  label,
  value,
  icon,
  bg,
  border,
  delay,
}: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      className={`${bg} ${border} p-5 rounded-[2rem] border shadow-sm transition-all duration-500`}
    >
      <div className="flex items-center gap-2 mb-3 text-slate-500 dark:text-slate-400">
        <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800/50">
          {icon}
        </div>
        <span className="text-[10px] font-black uppercase tracking-widest">
          {label}
        </span>
      </div>
      <div className="text-2xl font-black text-slate-900 dark:text-white transition-colors">
        {value}
      </div>
    </motion.div>
  );
}
