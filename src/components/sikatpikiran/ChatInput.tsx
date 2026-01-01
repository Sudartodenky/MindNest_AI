import { Send, Wand2 } from "lucide-react";

export function ChatInput({ entry, setEntry, onSend, loading }) {
  return (
    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-[#F8F9FB] dark:from-[#020617] via-[#F8F9FB] dark:via-[#020617] to-transparent transition-colors duration-500">
      <div className="max-w-3xl mx-auto flex gap-2 bg-white dark:bg-[#1E293B] rounded-2xl shadow-2xl border border-purple-50 dark:border-slate-800 p-2 transition-all">
        <textarea
          rows={1}
          value={entry}
          onChange={(e) => setEntry(e.target.value)}
          onKeyDown={(e) =>
            e.key === "Enter" && !e.shiftKey && (e.preventDefault(), onSend())
          }
          placeholder="Lanjutkan pikiranmu..."
          className="flex-1 p-3 text-sm outline-none resize-none bg-transparent text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-slate-500"
        />
        <button
          onClick={onSend}
          disabled={!entry.trim() || loading}
          className="bg-[#9E8CF2] text-white p-3 rounded-xl hover:bg-[#8A76E5] transition-colors disabled:opacity-50 active:scale-95"
        >
          {loading ? (
            <Wand2 className="animate-spin w-5 h-5" />
          ) : (
            <Send size={18} />
          )}
        </button>
      </div>
    </div>
  );
}
