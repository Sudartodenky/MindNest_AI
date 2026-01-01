import { User } from "lucide-react";
import { motion } from "framer-motion";
import { auth } from "../../firebaseConfig";
import aiLogoBlack from "../../assets/logo/black.png";
import aiLogoWhite from "../../assets/logo/white.png"; // Tambahkan import logo putih

export function ChatMessages({ messages, isGenerating }) {
  const userPhoto = auth.currentUser?.photoURL;

  return (
    <div className="space-y-6 pb-32">
      {messages.map((msg, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`flex gap-3 md:gap-4 ${
            msg.role === "user" ? "flex-row-reverse" : "flex-row"
          }`}
        >
          {/* Avatar Container */}
          <div
            className={`w-8 h-8 md:w-10 md:h-10 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-sm transition-all overflow-hidden
            ${
              msg.role === "user"
                ? "bg-[#9E8CF2]"
                : "bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700"
            }`}
          >
            {msg.role === "user" ? (
              userPhoto ? (
                <img
                  src={userPhoto}
                  alt="User"
                  className="w-full h-full object-cover"
                />
              ) : (
                <User size={18} className="text-white" />
              )
            ) : (
              <>
                <img
                  src={aiLogoBlack}
                  alt="AI MindNest"
                  className="w-6 h-6 md:w-7 md:h-7 object-contain dark:hidden"
                />
                <img
                  src={aiLogoWhite}
                  alt="AI MindNest"
                  className="w-6 h-6 md:w-7 md:h-7 object-contain hidden dark:block"
                />
              </>
            )}
          </div>

          {/* Bubble Chat */}
          <div
            className={`p-4 md:p-5 rounded-2xl text-sm md:text-base leading-relaxed max-w-[85%] md:max-w-[75%] shadow-sm transition-all
            ${
              msg.role === "user"
                ? "bg-[#9E8CF2] text-white rounded-tr-none"
                : "bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 text-gray-700 dark:text-slate-200 rounded-tl-none"
            }`}
          >
            {msg.content}
          </div>
        </motion.div>
      ))}

      {/* Loading State */}
      {isGenerating && (
        <div className="flex gap-4">
          <div className="w-10 h-10 rounded-2xl bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 flex items-center justify-center animate-pulse overflow-hidden">
            <img
              src={aiLogoBlack}
              alt="Thinking"
              className="w-6 h-6 object-contain dark:hidden opacity-50"
            />
            <img
              src={aiLogoWhite}
              alt="Thinking"
              className="w-6 h-6 object-contain hidden dark:block opacity-50"
            />
          </div>
          <div className="flex gap-1 items-center bg-white dark:bg-slate-800 p-4 rounded-2xl border border-gray-100 dark:border-slate-700 shadow-sm transition-colors">
            <span className="w-1.5 h-1.5 bg-gray-300 dark:bg-slate-600 rounded-full animate-bounce" />
            <span className="w-1.5 h-1.5 bg-gray-300 dark:bg-slate-600 rounded-full animate-bounce [animation-delay:0.2s]" />
            <span className="w-1.5 h-1.5 bg-gray-300 dark:bg-slate-600 rounded-full animate-bounce [animation-delay:0.4s]" />
          </div>
        </div>
      )}
    </div>
  );
}
