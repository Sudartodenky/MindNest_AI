import React from "react";
import { PenLine, Save, Laugh, Smile, Meh, Frown, Angry } from "lucide-react";
import { GlassCard } from "../ui/GlassCard";

const MOODS = [
  {
    label: "Senang",
    value: 5,
    color: "text-amber-500",
    bg: "bg-amber-50",
    icon: <Laugh size={28} />,
  },
  {
    label: "Baik",
    value: 4,
    color: "text-emerald-500",
    bg: "bg-emerald-50",
    icon: <Smile size={28} />,
  },
  {
    label: "Biasa",
    value: 3,
    color: "text-blue-500",
    bg: "bg-blue-50",
    icon: <Meh size={28} />,
  },
  {
    label: "Sedih",
    value: 2,
    color: "text-indigo-500",
    bg: "bg-indigo-50",
    icon: <Frown size={28} />,
  },
  {
    label: "Marah",
    value: 1,
    color: "text-rose-500",
    bg: "bg-rose-50",
    icon: <Angry size={28} />,
  },
];

export function MoodPicker({
  selectedMood,
  setSelectedMood,
  moodNote,
  setMoodNote,
  onSave,
  isSaving,
}) {
  return (
    <GlassCard className="p-5 md:p-8 overflow-hidden bg-white/70 dark:bg-slate-900/70 transition-colors duration-500">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <PenLine className="text-indigo-600 dark:text-indigo-400" size={20} />{" "}
          Mood Tracker
        </h3>
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-5 gap-3 mb-6">
        {MOODS.map((m) => (
          <button
            key={m.value}
            disabled={isSaving}
            onClick={() => setSelectedMood(m.value)}
            className={`p-3 md:p-4 rounded-3xl border-2 transition-all duration-300 flex flex-col items-center gap-2
              ${
                selectedMood === m.value
                  ? `border-indigo-500 ${m.bg} dark:bg-indigo-900/20 scale-105 shadow-md`
                  : "border-transparent bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700"
              }
            `}
          >
            <div
              className={`${
                selectedMood === m.value
                  ? m.color
                  : "text-slate-400 dark:text-slate-500"
              } transition-colors`}
            >
              {React.cloneElement(m.icon, { size: 24 })}
            </div>
            <span
              className={`text-[10px] md:text-[11px] font-bold ${
                selectedMood === m.value
                  ? "text-indigo-700 dark:text-indigo-300"
                  : "text-slate-500 dark:text-slate-400"
              }`}
            >
              {m.label}
            </span>
          </button>
        ))}
      </div>

      <textarea
        value={moodNote}
        onChange={(e) => setMoodNote(e.target.value)}
        placeholder="Apa yang ada di pikiranmu saat ini?"
        className="w-full p-4 md:p-5 bg-slate-50 dark:bg-slate-800/50 rounded-3xl border-2 border-slate-100 dark:border-slate-700 focus:border-indigo-200 dark:focus:border-indigo-500 focus:bg-white dark:focus:bg-slate-800 outline-none min-h-[100px] text-sm text-slate-800 dark:text-slate-200 transition-all resize-none"
      />

      <button
        onClick={() => onSave(selectedMood, moodNote)}
        disabled={isSaving || !selectedMood}
        className="mt-4 w-full sm:w-auto bg-indigo-600 dark:bg-indigo-500 text-white px-10 py-4 rounded-2xl font-bold hover:bg-indigo-700 dark:hover:bg-indigo-400 shadow-lg disabled:bg-slate-300 dark:disabled:bg-slate-700 transition-all active:scale-95"
      >
        {isSaving ? "Menyimpan..." : "Simpan Jurnal"}
      </button>
    </GlassCard>
  );
}
