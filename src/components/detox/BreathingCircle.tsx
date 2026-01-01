import { motion, AnimatePresence } from "framer-motion";

interface Props {
  phase: "inhale" | "hold" | "exhale";
  timeLeft: string;
  isActive: boolean;
  isPaused: boolean;
  onTimerClick: () => void;
}

export const BreathingCircle = ({
  phase,
  timeLeft,
  isActive,
  isPaused,
  onTimerClick,
}: Props) => {
  const getBreathText = () => {
    if (!isActive) return "Mulai perjalanan tenangmu";
    if (isPaused) return "Sesi Terhenti Sejenak";
    if (phase === "inhale") return "Tarik Napas Dalam-dalam";
    if (phase === "hold") return "Tahan Napas Anda";
    return "Hembuskan Perlahan";
  };

  return (
    <div
      onClick={onTimerClick}
      className="relative w-72 h-72 md:w-80 md:h-80 flex flex-col items-center justify-center cursor-pointer group"
    >
      {isActive && !isPaused && (
        <>
          <motion.div
            initial={{ scale: 1, opacity: 0.5 }}
            animate={{ scale: 1.5, opacity: 0 }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
            className="absolute inset-0 rounded-full border-2 border-indigo-500/30 dark:border-indigo-400/20"
          />
          <motion.div
            initial={{ scale: 1, opacity: 0.3 }}
            animate={{ scale: 1.8, opacity: 0 }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeOut",
              delay: 0.5,
            }}
            className="absolute inset-0 rounded-full border-2 border-indigo-500/20 dark:border-indigo-400/10"
          />
        </>
      )}

      <motion.div
        animate={{
          scale:
            !isActive || isPaused
              ? 1
              : phase === "inhale" || phase === "hold"
              ? 1.2
              : 0.9,
          borderColor:
            isActive && !isPaused
              ? "rgba(99, 102, 241, 0.5)" 
              : "rgba(148, 163, 184, 0.2)", 
        }}
        transition={{ duration: 4, ease: "easeInOut" }}
        className="absolute inset-0 border-[12px] rounded-full shadow-lg dark:shadow-indigo-500/5"
      />

      <motion.div
        animate={{
          scale:
            !isActive || isPaused
              ? 1
              : phase === "inhale" || phase === "hold"
              ? 1.1
              : 0.95,
          backgroundColor:
            isActive && !isPaused
              ? "rgba(255, 255, 255, 0.6)"
              : "rgba(255, 255, 255, 0.3)",
        }}
        transition={{ duration: 4, ease: "easeInOut" }}
        className="absolute inset-4 bg-white/40 dark:bg-slate-800/40 backdrop-blur-xl rounded-full shadow-inner border border-white/40 dark:border-white/10"
      />

      <div className="relative z-10 text-center select-none">
        <AnimatePresence mode="wait">
          <motion.p
            key={getBreathText()}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            className="text-[10px] font-black uppercase tracking-[0.2em] mb-2 text-slate-500 dark:text-"
          >
            {getBreathText()}
          </motion.p>
        </AnimatePresence>

        <motion.h2
          animate={{
            scale: isActive && !isPaused ? [1, 1.05, 1] : 1,
          }}
          transition={{ duration: 2, repeat: Infinity }}
          className={`text-7xl md:text-8xl font-black tracking-tighter transition-colors ${
            isActive && !isPaused
              ? "text-slate-800 dark:text-white"
              : "text-slate-400 dark:text-slate-200"
          }`}
        >
          {timeLeft}
        </motion.h2>

        <p className="mt-4 text-[9px] font-bold text-slate-400 dark:text-slate-800 uppercase tracking-widest opacity-40 group-hover:opacity-100 transition-opacity">
          {isActive
            ? isPaused
              ? "Tap to Resume"
              : "Tap to Pause"
            : "Ready to begin"}
        </p>
      </div>
    </div>
  );
};
