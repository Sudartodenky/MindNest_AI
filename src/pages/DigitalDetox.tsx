import { useState, useEffect } from "react";
import { Volume2, Upload, XCircle } from "lucide-react";
import { Howler } from "howler";
import { useDetox } from "../context/DetoxContext";
import { BreathingCircle } from "../components/detox/BreathingCircle";

import rainSound from "../assets/sounds/rain.mp3";
import forestSound from "../assets/sounds/forest.mp3";
import zenSound from "../assets/sounds/zen.mp3";

const DEFAULT_SOUNDS = [
  { id: "rain", name: "Hujan Tenang", url: rainSound },
  { id: "forest", name: "Hutan Pinus", url: forestSound },
  { id: "zen", name: "Zen Bell", url: zenSound },
];

export function DigitalDetox() {
  const {
    isActive,
    setIsActive,
    isPaused,
    setIsPaused,
    startDetox,
    timeLeft,
    setTimeLeft,
    activeSound,
    setActiveSound,
    stopDetox,
  } = useDetox();

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  };

  const [customTime, setCustomTime] = useState(formatTime(timeLeft));
  const [userSound, setUserSound] = useState<any>(null);
  const [isEditingName, setIsEditingName] = useState(false);

  useEffect(() => {
    if (isActive) {
      setCustomTime(formatTime(timeLeft));
    }
  }, [timeLeft, isActive]);

  useEffect(() => {
    const saved = localStorage.getItem("detox_custom_sound");
    if (saved) {
      const parsed = JSON.parse(saved);
      setUserSound(parsed);
      if (!isActive && activeSound.url === "") setActiveSound(parsed);
    } else {
      if (activeSound.url === "") setActiveSound(DEFAULT_SOUNDS[0]);
    }
  }, []);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const newSound = {
        id: "custom",
        name: file.name.replace(/\.[^/.]+$/, ""),
        url: event.target?.result as string,
      };
      setUserSound(newSound);
      localStorage.setItem("detox_custom_sound", JSON.stringify(newSound));
      if (!isActive) setActiveSound(newSound);
    };
    reader.readAsDataURL(file);
  };

  const handleToggleSesi = () => {
    if (Howler.ctx && Howler.ctx.state === "suspended") Howler.ctx.resume();

    if (!isActive) {
      const [m, s] = customTime.split(":").map(Number);
      const totalSeconds = m * 60 + (s || 0);
      startDetox(totalSeconds);
    } else {
      setIsPaused(!isPaused);
    }
  };

  const handleCustomTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.replace(/\D/g, "");
    if (val.length > 4) val = val.slice(0, 4);

    let formatted = val;
    if (val.length >= 3) {
      formatted =
        val.slice(0, val.length - 2) + ":" + val.slice(val.length - 2);
    }

    setCustomTime(formatted);

    if (formatted.includes(":")) {
      const [m, s] = formatted.split(":").map(Number);
      const totalSeconds = m * 60 + (s || 0);
      // Update Context agar UI BreathingCircle ikut berubah saat ngetik
      setTimeLeft(totalSeconds);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFF] dark:bg-[#0f172a] flex flex-col items-center pb-20">
      <div className="w-full max-w-2xl px-6 py-8">
        <header className="text-center mb-10">
          <h1 className="text-4xl font-black text-slate-800 dark:text-white">
            Digital Detox
          </h1>
          <p className="opacity-50 text-sm mt-2 text-slate-600 dark:text-slate-400">
            {isActive
              ? isPaused
                ? "Sesi di-pause"
                : "Bernapaslah..."
              : "Klik lingkaran untuk mulai"}
          </p>
        </header>

        <div className="flex justify-center mb-12">
          <BreathingCircle
            phase={isActive && !isPaused ? "inhale" : "stay"}
            timeLeft={formatTime(timeLeft)}
            isActive={isActive}
            isPaused={isPaused}
            onTimerClick={handleToggleSesi}
          />
        </div>

        {!isActive && (
          <div className="mb-10 text-center">
            <input
              value={customTime}
              onChange={handleCustomTimeChange}
              className="bg-transparent border-b-2 border-indigo-500 text-5xl font-black text-center w-40 text-slate-800 dark:text-white focus:outline-none"
            />
          </div>
        )}

        {/* SOUND SELECTOR */}
        <div
          className={`relative bg-white dark:bg-slate-800/50 rounded-[2.5rem] p-6 shadow-xl transition-all ${
            isActive ? "opacity-50" : ""
          }`}
        >
          {isActive && (
            <div className="absolute inset-0 z-10 cursor-not-allowed" />
          )}

          <div className="flex items-center gap-2 mb-4 opacity-60 text-slate-800 dark:text-white">
            <Volume2 size={16} />
            <span className="text-xs font-bold uppercase">
              Pilih Suara Latar
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {DEFAULT_SOUNDS.map((s) => (
              <button
                key={s.id}
                onClick={() => setActiveSound(s)}
                className={`py-3 rounded-xl text-xs font-bold transition-all ${
                  activeSound.id === s.id
                    ? "bg-indigo-600 text-white shadow-lg"
                    : "bg-white dark:bg-slate-700 text-slate-600 dark:text-slate-300 shadow-sm"
                }`}
              >
                {s.name}
              </button>
            ))}

            <div
              className={`py-3 px-4 rounded-xl flex items-center justify-between shadow-sm transition-all ${
                activeSound.id === "custom"
                  ? "bg-purple-600 text-white"
                  : "bg-white dark:bg-slate-700 text-slate-600 dark:text-slate-300"
              }`}
            >
              {userSound ? (
                <div className="flex items-center justify-between w-full overflow-hidden">
                  {isEditingName ? (
                    <input
                      autoFocus
                      className="bg-transparent border-b border-white/50 w-full outline-none text-xs"
                      value={userSound.name}
                      onChange={(e) => {
                        const updated = { ...userSound, name: e.target.value };
                        setUserSound(updated);
                        setActiveSound(updated);
                        localStorage.setItem(
                          "detox_custom_sound",
                          JSON.stringify(updated)
                        );
                      }}
                      onBlur={() => setIsEditingName(false)}
                    />
                  ) : (
                    <span
                      onClick={() => {
                        setActiveSound(userSound);
                        setIsEditingName(true);
                      }}
                      className="truncate cursor-pointer text-xs font-bold"
                    >
                      {userSound.name}
                    </span>
                  )}
                  <button
                    onClick={() => {
                      setUserSound(null);
                      localStorage.removeItem("detox_custom_sound");
                      setActiveSound(DEFAULT_SOUNDS[0]);
                    }}
                  >
                    <XCircle
                      size={14}
                      className="ml-2 opacity-60 hover:opacity-100"
                    />
                  </button>
                </div>
              ) : (
                <label className="flex items-center gap-2 cursor-pointer text-xs font-bold w-full justify-center">
                  <Upload size={14} /> Upload MP3
                  <input
                    type="file"
                    accept="audio/*"
                    hidden
                    onChange={handleFileUpload}
                  />
                </label>
              )}
            </div>
          </div>
        </div>

        <div className="mt-10">
          <button
            onClick={handleToggleSesi}
            className={`w-full py-6 rounded-[2.5rem] font-black text-xl shadow-xl transition-all active:scale-95 ${
              isActive
                ? "bg-amber-500 hover:bg-amber-600"
                : "bg-indigo-600 hover:bg-indigo-700"
            } text-white`}
          >
            {!isActive ? "MULAI SESI" : isPaused ? "LANJUTKAN" : "PAUSE"}
          </button>

          {isActive && (
            <div className="flex justify-center">
              <button
                onClick={stopDetox}
                className="mt-6 flex items-center gap-2 px-5 py-2.5 rounded-full bg-red-500/10 text-red-600 border border-red-500/20 text-xs font-bold uppercase tracking-wider hover:bg-red-500 hover:text-white transition-all"
              >
                Akhiri & Reset
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
