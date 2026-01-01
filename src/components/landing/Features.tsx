import { motion } from "framer-motion";
import { Heart, Brain, Clock, BookOpen, Sparkles } from "lucide-react";

const features = [
  {
    title: "Mood Tracker Visual",
    desc: "Pantau fluktuasi emosional secara presisi melalui kalender interaktif berbasis data harian.",
    icon: Heart,
    color: "from-[#ec4899] to-[#f472b6]",
  },
  {
    title: "Predictive Insights",
    desc: "Algoritma AI canggih yang mampu memprediksi dan memitigasi potensi kelelahan mental (burnout).",
    icon: Brain,
    color: "from-[#8b5cf6] to-[#a78bfa]",
  },
  {
    title: "Digital Detox Timer",
    desc: "Mode fokus tingkat tinggi yang dipadukan dengan teknik pernapasan terpandu untuk restorasi mental.",
    icon: Clock,
    color: "from-[#10b981] to-[#34d399]",
  },
  {
    title: "Refleksi Terpandu",
    desc: "Prompt jurnal personal yang dipersonalisasi khusus berdasarkan tantangan unik harian Anda.",
    icon: BookOpen,
    color: "from-[#facc15] to-[#fde047]",
  },
];

export function Features() {
  return (
    <section id="features" className="mt-20 md:mt-32 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 md:mb-20">
          <h2 className="text-3xl md:text-5xl font-black text-[#1e293b] tracking-tight">
            Ruang Aman Digital Anda
          </h2>
          <p className="text-gray-500 mt-4 md:mt-6 text-lg max-w-2xl mx-auto">
            Dirancang dengan pendekatan berbasis data untuk memastikan
            kejernihan pikiran Anda tetap terjaga.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {features.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
              className="group bg-white/70 backdrop-blur-md p-8 rounded-[2.5rem] border border-white shadow-xl shadow-gray-200/50 hover:shadow-2xl hover:bg-white transition-all duration-300"
            >
              <div
                className={`w-16 h-16 bg-gradient-to-br ${f.color} rounded-2xl flex items-center justify-center mb-8 shadow-lg text-white transform group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300`}
              >
                <f.icon size={28} />
              </div>

              <h3 className="text-xl md:text-2xl font-black text-[#1e293b] mb-4 group-hover:text-[#8b5cf6] transition-colors">
                {f.title}
              </h3>

              <p className="text-gray-500 text-base leading-relaxed">
                {f.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
