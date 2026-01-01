import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import logoWhite from "/src/assets/logo/white.png";
import logoBlack from "/src/assets/logo/black.png";

export const NavLogo = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains("dark"));

    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains("dark"));
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  return (
    <Link
      to="/dashboard"
      className="flex items-center gap-3 group outline-none focus:ring-2 focus:ring-[#9E8CF2] rounded-xl transition-all"
    >
      <div className="relative w-10 h-10 bg-[#9E8CF2] rounded-xl flex items-center justify-center shadow-lg shadow-indigo-200/50 dark:shadow-none overflow-hidden transition-all duration-300 group-hover:rotate-6 group-hover:scale-110">
        <img
          src={isDark ? logoWhite : logoBlack} // Gunakan white agar stand out di bg ungu, atau sesuaikan jika perlu logoBlack
          alt="Mind Logo"
          className="w-7 h-7 object-contain"
          draggable="false"
          onContextMenu={(e) => e.preventDefault()}
        />
        <div className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
      </div>

      {/* Branding Teks */}
      <div className="hidden sm:flex items-center text-xl font-black tracking-tighter">
        <span className="text-slate-900 dark:text-white transition-colors duration-300">
          Mind
        </span>
        <span className="bg-gradient-to-br from-[#9E8CF2] via-[#8B76F0] to-[#7A62EE] bg-clip-text text-transparent">
          Nest
        </span>
        <span className="bg-gradient-to-br from-[#9E8CF2] to-[#C7B9FF] bg-clip-text text-transparent ml-1.5 opacity-80 font-extrabold text-lg">
          AI
        </span>
      </div>
    </Link>
  );
};
