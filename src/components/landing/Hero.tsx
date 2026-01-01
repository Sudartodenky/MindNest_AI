import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Zap, ShieldCheck, Cpu, Sparkles } from "lucide-react";
import dashboardImg from "/src/assets/images/dashboard.png";

export function Hero() {
  return (
    <section className="pt-28 md:pt-36 pb-20 md:pb-20 px-4 overflow-x-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex-1 text-center lg:text-left z-10"
          >
            <h1 className="text-4xl sm:text-6xl lg:text-8xl font-black mb-6 md:mb-8 text-[#1e293b] leading-[1.1] tracking-tight">
              MindNest AI <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#9E8CF2] via-[#6366f1] to-[#34d399]">
                Reset Mental <br className="hidden sm:block" /> Secara Presisi
              </span>
            </h1>

            <p className="text-lg md:text-xl text-gray-500 mb-8 md:mb-12 leading-relaxed max-w-xl mx-auto lg:mx-0">
              Gunakan teknologi AI untuk mendeteksi tingkat kelelahan kognitif
              dan dapatkan intervensi mental instan. Dirancang untuk
              produktivitas tanpa burnout.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-12 md:mb-16">
              <Link to="/login" className="w-full sm:w-auto">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full sm:w-auto bg-[#1e293b] text-white text-base md:text-lg font-bold px-8 md:px-10 py-4 md:py-5 rounded-2xl md:rounded-3xl shadow-xl shadow-gray-200 flex items-center justify-center gap-2"
                >
                  Coba Sekarang <ArrowRight className="w-5 h-5" />
                </motion.button>
              </Link>

              <a href="#features" className="w-full sm:w-auto">
                <button className="w-full sm:w-auto bg-white text-gray-600 text-base md:text-lg font-semibold px-8 md:px-10 py-4 md:py-5 rounded-2xl md:rounded-3xl border border-gray-100 shadow-sm hover:bg-gray-50 transition-colors">
                  Pelajari Teknologi
                </button>
              </a>
            </div>

            <div className="grid grid-cols-3 gap-4 md:gap-12 pt-8 border-t border-gray-100 max-w-sm mx-auto lg:mx-0">
              {[
                {
                  label: "Analisis AI",
                  value: "Real-time",
                  icon: <Cpu className="w-4 h-4 mb-1 text-[#8b5cf6]" />,
                },
                {
                  label: "Privasi",
                  value: "Aman",
                  icon: <ShieldCheck className="w-4 h-4 mb-1 text-[#34d399]" />,
                },
                {
                  label: "Respon",
                  value: "Instant",
                  icon: <Zap className="w-4 h-4 mb-1 text-yellow-500" />,
                },
              ].map((stat, i) => (
                <div
                  key={i}
                  className="flex flex-col items-center lg:items-start"
                >
                  {stat.icon}
                  <div className="text-sm md:text-xl font-bold text-[#1e293b]">
                    {stat.value}
                  </div>
                  <div className="text-[8px] md:text-[10px] text-gray-400 font-bold uppercase tracking-widest text-center lg:text-left">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="flex-1 relative w-full"
          >
            <div className="absolute -inset-4 md:-inset-10 bg-gradient-to-tr from-[#8b5cf6]/20 to-[#34d399]/20 blur-[60px] md:blur-[100px] rounded-full" />

            <div className="relative transform rotate-0 lg:rotate-2 hover:rotate-0 transition-transform duration-700">
              <div className="bg-white p-2 md:p-4 rounded-[1.5rem] md:rounded-[2.5rem] shadow-2xl border border-white/50">
                <div className="overflow-hidden rounded-[1rem] md:rounded-[2rem]">
                  <img
                    src={dashboardImg}
                    alt="MindNest Dashboard"
                    className="w-full h-auto block select-none pointer-events-none"
                    onContextMenu={(e) => e.preventDefault()}
                    draggable="false"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
