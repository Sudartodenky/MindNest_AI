import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";
import traspacLogo from "/src/assets/icons/traspac.png";

export function FooterCTA() {
  return (
    <section className="relative mt-20 md:mt-40 pb-20 px-4 overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-gradient-to-br from-[#9E8CF2]/10 via-[#34d399]/5 to-transparent blur-[120px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl mx-auto text-center relative z-10"
      >
        <h2 className="text-4xl md:text-6xl font-black mb-6 text-[#1e293b] leading-tight tracking-tight">
          Siap Membersihkan <br className="hidden md:block" />
          <span className="text-[#8b5cf6]">Pikiranmu?</span>
        </h2>

        <p className="text-gray-500 mb-12 text-base md:text-xl max-w-2xl mx-auto leading-relaxed">
          Gak perlu nunggu nanti. Yuk, gabung bareng ribuan teman lainnya yang
          sudah mulai duluan perjalanan mental yang lebih asik dan sehat.
        </p>

        <div className="flex flex-col items-center gap-6">
          <Link to="/login" className="w-full sm:w-auto">
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="w-full sm:w-auto bg-gradient-to-r from-[#8b5cf6] to-[#7c3aed] text-white px-10 md:px-14 py-4 md:py-6 rounded-2xl md:rounded-[2rem] shadow-2xl shadow-[#8b5cf6]/30 hover:shadow-[#8b5cf6]/50 transition-all font-bold text-lg md:text-2xl flex items-center justify-center gap-3"
            >
              Mulai Sekarang Gratis <ArrowRight className="w-6 h-6" />
            </motion.button>
          </Link>
        </div>
      </motion.div>

      <div className="mt-10 text-center border-t border-gray-100 pt-10">
        <p className="text-[10px] md:text-xs text-gray-400 font-medium tracking-wide">
          © 2026 MindNest AI • Dibuat untuk Traspac 2026
        </p>
      </div>
    </section>
  );
}
