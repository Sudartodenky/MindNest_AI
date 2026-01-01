import { motion } from "framer-motion";
import { ShieldCheck, BarChart3, Microscope, Zap } from "lucide-react";

const impactData = [
  {
    title: "Metodologi CBT",
    desc: "Mengintegrasikan teknik Cognitive Behavioral Therapy untuk restrukturisasi pola pikir negatif.",
    icon: Microscope,
    color: "text-blue-500",
    bg: "bg-blue-50",
  },
  {
    title: "Sentimen Analisis",
    desc: "Algoritma NLP (Natural Language Processing) dengan akurasi tinggi dalam mendeteksi stres.",
    icon: Zap,
    color: "text-purple-500",
    bg: "bg-purple-50",
  },
  {
    title: "Privasi Terjamin",
    desc: "Enkripsi end-to-end pada setiap entri jurnal untuk menjaga kerahasiaan data pengguna.",
    icon: ShieldCheck,
    color: "text-emerald-500",
    bg: "bg-emerald-50",
  },
  {
    title: "Hasil Terukur",
    desc: "85% pengguna melaporkan peningkatan kejernihan mental setelah penggunaan rutin selama 14 hari.",
    icon: BarChart3,
    color: "text-orange-500",
    bg: "bg-orange-50",
  },
];

export function ScientificImpact() {
  return (
    <section className="md:mt-32 px-4 mb-20">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 md:mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-black text-[#1e293b] mb-6 tracking-tight"
          >
            Sains di Balik <span className="text-[#8b5cf6]">MindNest</span>
          </motion.h2>
          <p className="text-gray-500 text-lg max-w-3xl mx-auto leading-relaxed">
            Kami menggabungkan prinsip psikologi klinis dengan kecerdasan buatan
            untuk memberikan intervensi mental yang presisi, aman, dan
            tervalidasi.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {impactData.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group p-8 rounded-[2.5rem] bg-white border border-gray-100 shadow-xl shadow-gray-200/40 hover:shadow-2xl hover:border-[#9E8CF2]/30 transition-all duration-300"
            >
              <div
                className={`w-14 h-14 ${item.bg} ${item.color} rounded-2xl flex items-center justify-center mb-6 transform group-hover:scale-110 group-hover:rotate-3 transition-transform`}
              >
                <item.icon size={28} />
              </div>

              <h3 className="text-xl font-black text-[#1e293b] mb-4">
                {item.title}
              </h3>

              <p className="text-gray-500 text-sm md:text-base leading-relaxed">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
