import { motion } from "framer-motion";
import trophyIcon from "../../assets/icons/trophy.png";

interface TabAchievementsProps {
  totalJournals: number;
  totalDetoxMinutes: number;
  streak: number;
}

export function TabAchievements({
  totalJournals,
  totalDetoxMinutes,
  streak,
}: TabAchievementsProps) {
  const achievements = [
    {
      id: 1,
      title: "Langkah Awal",
      desc: "Tulis jurnal perasaan pertamamu",
      target: 1,
      current: totalJournals,
    },
    {
      id: 2,
      title: "Master Ketenangan",
      desc: "Capai total 100 menit Digital Detox",
      target: 100,
      current: totalDetoxMinutes,
    },
    {
      id: 3,
      title: "Jiwa yang Konsisten",
      desc: "Pertahankan streak selama 7 hari",
      target: 7,
      current: streak,
    },
    {
      id: 4,
      title: "Penulis Setia",
      desc: "Berhasil menulis total 10 jurnal",
      target: 10,
      current: totalJournals,
    },
    {
      id: 5,
      title: "Detoks Pemula",
      desc: "Lakukan Digital Detox selama 30 menit",
      target: 30,
      current: totalDetoxMinutes,
    },
    {
      id: 6,
      title: "Pakar Refleksi",
      desc: "Tulis total 50 jurnal kesehatan mental",
      target: 50,
      current: totalJournals,
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="grid grid-cols-1 md:grid-cols-2 gap-4"
    >
      {achievements.map((ach) => {
        const isUnlocked = ach.current >= ach.target;
        const progress = Math.min((ach.current / ach.target) * 100, 100);

        return (
          <motion.div
            key={ach.id}
            whileHover={{ y: -2 }}
            className={`p-6 rounded-[2.5rem] border transition-all duration-500 ${
              isUnlocked
                ? "bg-white dark:bg-slate-900 border-indigo-100 dark:border-slate-800 shadow-sm"
                : "bg-slate-50/50 dark:bg-slate-800/20 border-slate-100 dark:border-slate-800/50 grayscale opacity-60 dark:opacity-40"
            }`}
          >
            <div className="flex items-center gap-4">
              <div
                className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-colors ${
                  isUnlocked
                    ? "bg-indigo-50 dark:bg-indigo-900/30 ring-1 ring-indigo-100 dark:ring-indigo-500/20"
                    : "bg-slate-100 dark:bg-slate-800"
                }`}
              >
                <img
                  src={trophyIcon}
                  className={`w-8 h-8 ${
                    !isUnlocked ? "opacity-30" : "animate-pulse"
                  }`}
                  alt="ach-icon"
                />
              </div>

              <div className="flex-1">
                <div className="flex justify-between items-center mb-1">
                  <h4 className="font-bold text-slate-800 dark:text-slate-100 text-sm">
                    {ach.title}
                  </h4>
                  <span
                    className={`text-[10px] font-black ${
                      isUnlocked ? "text-indigo-500" : "text-slate-400"
                    }`}
                  >
                    {isUnlocked ? "SELESAI" : `${Math.round(progress)}%`}
                  </span>
                </div>
                <p className="text-[10px] text-slate-400 dark:text-slate-500 font-medium mb-3">
                  {ach.desc}
                </p>

                {/* Progress Bar */}
                <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 1.5, ease: "circOut" }}
                    className={`h-full rounded-full ${
                      isUnlocked
                        ? "bg-gradient-to-r from-indigo-500 to-violet-500"
                        : "bg-slate-300 dark:bg-slate-600"
                    }`}
                  />
                </div>

                {/* Info Target Kecil */}
                {!isUnlocked && (
                  <p className="text-[9px] text-slate-400 mt-1 text-right italic">
                    {ach.current} / {ach.target}
                  </p>
                )}
              </div>
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
