import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Sun, Moon } from "lucide-react";
import { motion } from "framer-motion";
import traspacLogo from "/src/assets/icons/traspac.png";

import { useDarkMode } from "../hooks/useDarkMode";
import { navItems } from "../components/navbar/navData";
import { NavLogo } from "../components/navbar/NavLogo";

export function Navbar() {
  const location = useLocation();
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  return (
    <>
      <nav className="hidden md:block sticky top-0 z-50 bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl border-b border-white/40 dark:border-slate-800/50 shadow-sm transition-colors duration-300">
        <div className="mx-auto max-w-7xl px-2 lg:px-6">
          <div className="flex items-center justify-between h-20">
            <div className="flex-shrink-0 scale-90 lg:scale-100 origin-left">
              <NavLogo />
            </div>

            <div className="flex items-center gap-0.5 lg:gap-2 mx-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                return (
                  <Link key={item.path} to={item.path}>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`flex items-center gap-1.5 lg:gap-2 px-2 lg:px-4 py-2 rounded-xl transition-all ${
                        isActive
                          ? "bg-gradient-to-r from-[#9E8CF2] to-[#C7B9FF] text-white shadow-md"
                          : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                      }`}
                    >
                      <Icon className="w-4 h-4 shrink-0" />
                      <span className="text-[11px] lg:text-sm font-semibold whitespace-nowrap tracking-tight lg:tracking-normal">
                        {item.label}
                      </span>
                    </motion.div>
                  </Link>
                );
              })}
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-2 lg:gap-4 shrink-0">
              <motion.button
                whileTap={{ rotate: 15, scale: 0.9 }}
                onClick={toggleDarkMode}
                className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-yellow-400 border border-slate-200 dark:border-slate-700"
              >
                {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
              </motion.button>

              <div className="flex items-center px-2 lg:px-4 py-1.5 bg-white/80 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-xl shadow-sm group">
                <img
                  src={traspacLogo}
                  alt="Traspac 2026"
                  className="h-6 lg:h-8 w-auto object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </nav>

      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-2xl border-t border-slate-100 dark:border-slate-800 pb-safe shadow-2xl">
        <div className="grid grid-cols-5 gap-1 px-2 py-3">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className="flex justify-center"
              >
                <motion.div
                  whileTap={{ scale: 0.85 }}
                  className={`flex flex-col items-center justify-center w-full h-12 rounded-xl ${
                    isActive
                      ? "text-[#8B5CF6]"
                      : "text-slate-400 dark:text-slate-500"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-[10px] font-bold mt-1 uppercase tracking-tighter">
                    {item.label.split(" ")[0]}
                  </span>
                </motion.div>
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
}
