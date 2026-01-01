import { motion } from "framer-motion";
import { useEffect, useState } from "react";

// Import logo dari folder assets
import logoWhite from "../assets/logo/white.png";
import logoBlack from "../assets/logo/black.png";

export function LoadingScreen() {
  const [theme] = useState(() => localStorage.getItem("theme") || "light");

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#F8FAFF] dark:bg-slate-950 transition-colors duration-500">
      <div className="relative flex items-center justify-center">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="absolute w-40 h-40 bg-indigo-200 dark:bg-indigo-600/20 rounded-full blur-[40px]"
        />

        {/* Spinner */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          className="w-20 h-20 border-[3px] border-t-indigo-600 border-indigo-100 dark:border-slate-800 dark:border-t-indigo-500 rounded-full z-10"
        />

        {/* Logo Image Replacement */}
        <div className="absolute z-10 w-10 h-10 flex items-center justify-center">
          <img 
            src={theme === "dark" ? logoWhite : logoBlack} 
            alt="MindNest Logo" 
            className="w-full h-full object-contain"
          />
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-10 text-center z-10"
      >
        <h2 className="text-indigo-900 dark:text-slate-100 font-black text-2xl tracking-tight">
          MindNest AI
        </h2>
        <motion.div className="flex flex-col items-center gap-1 mt-2">
          <motion.p
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-slate-500 dark:text-slate-400 text-sm font-medium"
          >
            Menyiapkan ruang tenangmu
          </motion.p>
          <div className="flex gap-1">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                transition={{ repeat: Infinity, duration: 1, delay: i * 0.2 }}
                className="w-1 h-1 bg-indigo-500 rounded-full"
              />
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}