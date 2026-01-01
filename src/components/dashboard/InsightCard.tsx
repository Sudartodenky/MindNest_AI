import React from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Brain, ChevronRight, Sparkles, Coffee, Sun } from "lucide-react";
import { GlassCard } from "../ui/GlassCard";

interface InsightCardProps {
selectedMood: number | null;
}

export function InsightCard({ selectedMood }: InsightCardProps) {
const getInsightContent = () => {
if (!selectedMood) {
    return {
    text: "Bagaimana perasaanmu hari ini? Pilih mood di samping untuk mendapatkan insight harian.",
    icon: <Sparkles className="w-6 h-6" />,
    color: "from-slate-500 to-slate-700",
    };
}
if (selectedMood >= 4) {
    return {
    text: "Energimu sedang di puncak! Waktu terbaik untuk mencoba hal baru atau menyelesaikan tugas berat.",
    icon: <Sun className="w-6 h-6" />,
    color: "from-indigo-600 to-violet-700",
    };
}
if (selectedMood <= 2) {
    return {
    text: "Kamu sudah berjuang keras. Ambil napas, matikan layar, dan berikan dirimu waktu untuk tenang.",
    icon: <Coffee className="w-6 h-6" />,
    color: "from-rose-500 to-orange-600",
    };
}
return {
    text: "Hari yang stabil. Gunakan waktu ini untuk merapikan rencana mingguanmu agar lebih teratur.",
    icon: <Brain className="w-6 h-6" />,
    color: "from-blue-600 to-indigo-700",
};
};

const content = getInsightContent();

return (
<GlassCard className={`bg-gradient-to-br ${content.color} text-white border-none shadow-xl transition-all duration-500`}>
    <h3 className="text-xl font-black mb-4 flex items-center gap-3">
    {content.icon} Mind Insight
    </h3>
    
    <div className="min-h-[100px]">
    <AnimatePresence mode="wait">
        <motion.p
        key={selectedMood}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        className="text-indigo-50 text-base leading-relaxed mb-8 font-medium"
        >
        {content.text}
        </motion.p>
    </AnimatePresence>
    </div>

    <Link
    to="/sikat-pikiran"
    className="flex items-center justify-between w-full bg-white/20 hover:bg-white/30 p-4 rounded-2xl transition-all group backdrop-blur-md border border-white/10 font-bold"
    >
    <span>Bicara dengan AI</span>
    <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
    </Link>
</GlassCard>
);
}