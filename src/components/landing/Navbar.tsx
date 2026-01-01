import { motion } from "framer-motion";
import traspacLogo from "/src/assets/icons/traspac.png";
import brainLogo from "/src/assets/logo/white.png";

export function Navbar() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-4 md:px-6 py-3 md:py-4 max-w-7xl mx-4 sm:mx-6 lg:mx-auto mt-4 rounded-2xl md:rounded-3xl bg-white/50 backdrop-blur-md border border-white/20 shadow-sm"
    >
      <div className="flex items-center gap-2 md:gap-3">
        <div className="w-8 h-8 md:w-10 md:h-10 bg-[#9E8CF2] rounded-lg md:rounded-xl flex items-center justify-center shadow-lg overflow-hidden shrink-0">
          <img
            src={brainLogo}
            alt="Mind Logo"
            className="w-5 h-5 md:w-7 md:h-7 object-contain"
            draggable="false"
          />
        </div>

        <span className="text-lg md:text-2xl font-bold flex items-center leading-none">
          <span className="text-black">Mind</span>

          <span className="bg-gradient-to-r from-[#9E8CF2] to-[#C7B9FF] bg-clip-text text-transparent">
            Nest
          </span>

          <span className="bg-gradient-to-r from-[#9E8CF2] to-[#C7B9FF] bg-clip-text text-transparent ml-1">
            AI
          </span>
        </span>
      </div>

      <div className="flex items-center gap-2 bg-white/70 px-2 md:px-3 py-1 md:py-1.5 rounded-lg md:rounded-xl shadow-sm border border-gray-100 shrink-0">
        <img
          src={traspacLogo}
          alt="Traspac 2026"
          className="h-3 md:h-5 w-auto object-contain"
        />
      </div>
    </motion.header>
  );
}
