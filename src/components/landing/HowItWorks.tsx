import { motion } from "framer-motion";
import { BookOpen, Brain, Zap } from "lucide-react";

const steps = [
  {
    step: 1,
    title: "Jurnal Harian",
    desc: "Tuliskan pikiranmu secara bebas dalam 5 menit. Sederhana seperti bercerita.",
    icon: BookOpen,
    color: "text-[#8b5cf6]",
  },
  {
    step: 2,
    title: "Analisis AI",
    desc: "Teknologi kami mendeteksi pola emosi dan tingkat kelelahan kognitif secara instan.",
    icon: Brain,
    color: "text-[#a78bfa]",
  },
  {
    step: 3,
    title: "Aksi Personal",
    desc: "Dapatkan panduan reset mental dan latihan yang disesuaikan dengan kondisi psikologismu.",
    icon: Zap,
    color: "text-[#34d399]",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="md:mt-32 px-4 md:px-6">
      <div className="max-w-7xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-5xl font-black text-[#1e293b] mb-4 md:mb-6 tracking-tight">
            Bagaimana <span className="text-[#8b5cf6]">MindNest</span> Bekerja
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto mb-16 md:mb-20">
            Hanya butuh tiga langkah sederhana untuk menjaga kesehatan mentalmu
            tetap prima setiap hari.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 relative">
          {steps.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.2 }}
              whileHover={{ y: -10 }}
              className="bg-white/80 backdrop-blur-sm p-8 pt-14 rounded-[2.5rem] shadow-xl shadow-gray-200/50 border border-white relative text-center md:text-left group transition-all duration-300 hover:shadow-2xl hover:bg-white"
            >
              <div className="absolute top-0 left-1/2 md:left-12 -translate-x-1/2 md:-translate-x-0 -translate-y-1/2 w-16 h-16 rounded-3xl bg-[#9E8CF2] flex items-center justify-center shadow-lg shadow-[#9E8CF2]/30 font-black text-2xl text-white transform transition-transform group-hover:rotate-6">
                {item.step}
              </div>

              <div
                className={`${item.color} mb-6 flex justify-center md:justify-start`}
              >
                <item.icon className="w-10 h-10 opacity-80" />
              </div>

              <h3 className="text-2xl font-black text-[#1e293b] mb-4">
                {item.title}
              </h3>

              <p className="text-gray-500 leading-relaxed text-base">
                {item.desc}
              </p>

              {idx < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-[2px] bg-gradient-to-r from-gray-100 to-transparent" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
