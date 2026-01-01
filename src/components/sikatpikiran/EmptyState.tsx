import { motion } from "framer-motion";
import { Send, Wand2 } from "lucide-react";
import aiLogoBlack from "../../assets/logo/black.png";
import aiLogoWhite from "../../assets/logo/white.png";

export function EmptyState({ entry, setEntry, onSend, loading }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-xl text-center"
    >
      {/* Container Logo dengan Toggle Dark/Light */}
      <div className="w-20 h-20 bg-[#F3F0FF] dark:bg-[#9E8CF2]/10 rounded-[2rem] flex items-center justify-center mx-auto mb-8 shadow-sm transition-colors overflow-hidden">
        <img
          src={aiLogoBlack}
          alt="MindNest Logo"
          className="w-22 h-22 object-contain dark:hidden"
        />
        <img
          src={aiLogoWhite}
          alt="MindNest Logo"
          className="w-22 h-22 object-contain hidden dark:block"
        />
      </div>

      <h1 className="text-4xl font-black text-gray-900 dark:text-white mb-4 tracking-tight transition-colors">
        Lagi mikirin apa?
      </h1>
      <p className="text-gray-500 dark:text-slate-400 mb-10 text-lg transition-colors">
        Tuliskan bebanmu, biarkan MindNest membantumu menjernihkannya.
      </p>

      {/* Card Input Utama */}
      <div className="bg-white dark:bg-[#161B26] p-2 rounded-[2rem] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] dark:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] border border-gray-100 dark:border-slate-800 transition-all duration-500">
        <textarea
          value={entry}
          onChange={(e) => setEntry(e.target.value)}
          placeholder="Tuangkan di sini..."
          className="w-full h-40 p-6 outline-none text-lg resize-none bg-transparent text-gray-800 dark:text-slate-200 placeholder-gray-400 dark:placeholder-slate-500"
        />
        <div className="flex justify-end p-2">
          <button
            onClick={onSend}
            disabled={!entry.trim() || loading}
            className="bg-[#9E8CF2] text-white px-8 py-4 rounded-[1.5rem] flex items-center gap-3 font-bold shadow-lg hover:shadow-[#9E8CF2]/40 transition-all disabled:opacity-50 active:scale-95"
          >
            {loading ? <Wand2 className="animate-spin" /> : <Send size={20} />}
            Sikat Sekarang
          </button>
        </div>
      </div>
    </motion.div>
  );
}
