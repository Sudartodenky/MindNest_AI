import React from "react";
import { motion } from "framer-motion";
import { CheckCircle, XCircle } from "lucide-react";

export const PasswordStrength = ({ password }) => {
  const requirements = [
    { met: password.length >= 8, text: "Minimal 8 karakter" },
    { met: /[A-Z]/.test(password), text: "Huruf Kapital (A-Z)" },
    { met: /[0-9]/.test(password), text: "Satu Angka (0-9)" },
    { met: /[!@#$%^&*]/.test(password), text: "Simbol (!@#$%)" },
  ];

  const metCount = requirements.filter((r) => r.met).length;
  const strengthPercentage = (metCount / requirements.length) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      className="mt-3 p-3 bg-slate-50 border border-slate-100 rounded-xl overflow-hidden"
    >
      <div className="flex justify-between items-center mb-2">
        <p className="text-[10px] font-bold text-slate-500 uppercase">
          Keamanan: {strengthPercentage}%
        </p>
      </div>
      <div className="flex gap-1 mb-3">
        {[1, 2, 3, 4].map((step) => (
          <div
            key={step}
            className={`h-1 flex-1 rounded-full transition-all duration-500 ${
              metCount >= step
                ? metCount <= 2 ? "bg-red-400" : metCount === 3 ? "bg-yellow-400" : "bg-emerald-500"
                : "bg-slate-200"
            }`}
          />
        ))}
      </div>
      <div className="grid grid-cols-2 gap-x-2 gap-y-1">
        {requirements.map((req, i) => (
          <div key={i} className={`flex items-center text-[10px] ${req.met ? "text-emerald-600" : "text-slate-400"}`}>
            {req.met ? <CheckCircle size={10} className="mr-1" /> : <XCircle size={10} className="mr-1 text-slate-300" />}
            {req.text}
          </div>
        ))}
      </div>
    </motion.div>
  );
};