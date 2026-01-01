import { useState, useEffect, useRef } from "react";
import { User, Camera, Edit3, Check, X, Loader2 } from "lucide-react";
import { auth, db } from "../firebaseConfig";
import { doc, onSnapshot, updateDoc } from "firebase/firestore";
import { updateProfile, signOut } from "firebase/auth";
import Swal from "sweetalert2";
import { AnimatePresence, motion } from "framer-motion";

import { generateExport } from "../utils/exportHelpers";
import { StatCard } from "../components/profile/StatCard";
import { TabOverview } from "../components/profile/TabOverview";
import { TabAchievements } from "../components/profile/TabAchievements";
import { TabSettings } from "../components/profile/TabSettings";

import flameIcon from "../assets/icons/flame.png";
import journalIcon from "../assets/icons/journal.png";
import detoxIcon from "../assets/icons/detox.png";

export function Profile() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const [isUpdatingName, setIsUpdatingName] = useState(false);
  const [isUploadingPhoto, setIsUploadingPhoto] = useState(false);

  const [isDarkMode, setIsDarkMode] = useState(
    () => localStorage.getItem("theme") === "dark"
  );
  const [activeTab, setActiveTab] = useState<
    "Ringkasan" | "Prestasi" | "Setelan"
  >("Ringkasan");
  const [rawUserData, setRawUserData] = useState<any>(null);

  const totalSeconds = rawUserData?.totalDetoxSeconds || 0;
  const totalMinutes = Math.floor(totalSeconds / 60);
  const remainingSeconds = totalSeconds % 60;

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isEditingName, setIsEditingName] = useState(false);
  const [tempName, setTempName] = useState("");

  const CLOUDINARY_UPLOAD_PRESET = import.meta.env
    .VITE_CLOUDINARY_UPLOAD_PRESET;
  const CLOUDINARY_CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;

  useEffect(() => {
    const root = window.document.documentElement;
    isDarkMode ? root.classList.add("dark") : root.classList.remove("dark");
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");
  }, [isDarkMode]);

  useEffect(() => {
    const unsubscribeAuth = auth.onAuthStateChanged((currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        setTempName(currentUser.displayName || "");
        onSnapshot(doc(db, "users", currentUser.uid), (docSnap) => {
          if (docSnap.exists()) setRawUserData(docSnap.data());
          setLoading(false);
        });
      } else setLoading(false);
    });
    return () => unsubscribeAuth();
  }, []);

  const handleUpdateName = async () => {
    if (!tempName.trim() || tempName === user.displayName) {
      setIsEditingName(false);
      return;
    }

    setIsUpdatingName(true);
    try {
      await updateProfile(auth.currentUser!, { displayName: tempName });
      await updateDoc(doc(db, "users", user.uid), { displayName: tempName });
      setIsEditingName(false);
      Swal.fire({
        icon: "success",
        title: "Nama Diperbarui",
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
      });
    } catch (error) {
      Swal.fire("Error", "Gagal memperbarui nama", "error");
    } finally {
      setIsUpdatingName(false);
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      Swal.fire("Gagal", "Ukuran file terlalu besar (Max 5MB)", "error");
      return;
    }

    setIsUploadingPhoto(true);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
        { method: "POST", body: formData }
      );

      const data = await response.json();

      if (data.secure_url) {
        await updateProfile(auth.currentUser!, { photoURL: data.secure_url });
        await updateDoc(doc(db, "users", user.uid), {
          photoURL: data.secure_url,
        });

        Swal.fire({
          icon: "success",
          title: "Foto Berhasil Diganti",
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
        });
      }
    } catch (error) {
      console.error("Upload Error:", error);
      Swal.fire("Error", "Gagal mengunggah foto ke Cloudinary", "error");
    } finally {
      setIsUploadingPhoto(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleLogout = async () => {
    const res = await Swal.fire({
      title: "Logout?",
      text: "Kamu akan keluar dari sesi ini.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#f43f5e",
      cancelButtonColor: "#64748b",
      confirmButtonText: "Ya, Keluar",
      background: isDarkMode ? "#1e293b" : "#fff",
      color: isDarkMode ? "#fff" : "#000",
    });
    if (res.isConfirmed) await signOut(auth);
  };

  if (loading) return null;
  if (!user) return null;

  return (
    <div className="min-h-screen pb-24 bg-[#F8FAFF] dark:bg-[#020617] transition-colors duration-500">
      <div className="max-w-4xl mx-auto px-6 py-10">
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          accept="image/*"
          onChange={handleFileChange}
        />

        {/* Profile Header Card */}
        <div className="bg-white dark:bg-slate-900 rounded-[3rem] p-8 md:p-10 shadow-xl shadow-indigo-100/30 dark:shadow-none border border-white dark:border-slate-800 mb-8 relative overflow-hidden">
          <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
            {/* Avatar Container */}
            <div className="relative group">
              <div className="w-32 h-32 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden border-4 border-white dark:border-slate-700 shadow-2xl transition-transform duration-500 group-hover:scale-105">
                {user.photoURL ? (
                  <img
                    src={user.photoURL}
                    className="w-full h-full object-cover"
                    alt="Profile"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-300 dark:text-slate-600">
                    <User size={64} />
                  </div>
                )}
                {isUploadingPhoto && (
                  <div className="absolute inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center">
                    <Loader2 className="animate-spin text-white" />
                  </div>
                )}
              </div>
              <button
                onClick={() => fileInputRef.current?.click()}
                disabled={isUploadingPhoto}
                className="absolute -bottom-2 -right-2 p-3 bg-indigo-600 text-white rounded-2xl shadow-lg hover:bg-indigo-700 transition-all active:scale-90 disabled:opacity-50"
              >
                <Camera size={18} />
              </button>
            </div>

            <div className="flex-1 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-3">
                {isEditingName ? (
                  <div className="flex items-center gap-2 bg-slate-50 dark:bg-slate-800 p-1 rounded-2xl border border-indigo-100 dark:border-indigo-900">
                    <input
                      autoFocus
                      disabled={isUpdatingName}
                      className="bg-transparent px-4 py-1.5 text-xl font-bold text-slate-900 dark:text-white outline-none w-full max-w-[200px] disabled:opacity-50"
                      value={tempName}
                      onChange={(e) => setTempName(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleUpdateName()}
                    />
                    {isUpdatingName ? (
                      <div className="px-3">
                        <Loader2
                          size={20}
                          className="animate-spin text-indigo-500"
                        />
                      </div>
                    ) : (
                      <>
                        <button
                          onClick={handleUpdateName}
                          className="p-2 text-emerald-500 hover:bg-emerald-50 dark:hover:bg-emerald-500/10 rounded-xl transition-colors"
                        >
                          <Check size={20} />
                        </button>
                        <button
                          onClick={() => {
                            setIsEditingName(false);
                            setTempName(user.displayName);
                          }}
                          className="p-2 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/10 rounded-xl transition-colors"
                        >
                          <X size={20} />
                        </button>
                      </>
                    )}
                  </div>
                ) : (
                  <>
                    <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                      {user.displayName || "MindNest User"}
                    </h1>
                    <button
                      onClick={() => setIsEditingName(true)}
                      className="p-2 text-slate-400 hover:text-indigo-500 transition-colors"
                    >
                      <Edit3 size={18} />
                    </button>
                  </>
                )}
              </div>

              <p className="text-slate-400 dark:text-slate-500 font-medium text-sm mt-1">
                {user.email}
              </p>

              {/* Stats Grid */}
              <div className="flex flex-wrap gap-3 mt-6 justify-center md:justify-start">
                <StatCard
                  icon={flameIcon}
                  label="Streak"
                  value={rawUserData?.streak || 0}
                  colorClass="bg-orange-50 dark:bg-orange-950/30 text-orange-600 dark:text-orange-400 border-orange-100/50 dark:border-orange-900/20"
                />
                <StatCard
                  icon={journalIcon}
                  label="Jurnal"
                  value={rawUserData?.moodHistory?.length || 0}
                  colorClass="bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400 border-blue-100/50 dark:border-blue-900/20"
                />
                <StatCard
                  icon={detoxIcon}
                  label="Detoks"
                  value={`${totalMinutes}m ${remainingSeconds}s`}
                  colorClass="bg-indigo-50 dark:bg-indigo-950/30 text-indigo-600 dark:text-indigo-400 border-indigo-100/50 dark:border-indigo-900/20"
                />
              </div>
            </div>
          </div>
          <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-full -mr-16 -mt-16 blur-3xl" />
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-2 mb-8 bg-white/60 dark:bg-slate-900/60 p-2 rounded-[2.2rem] backdrop-blur-xl border border-white dark:border-slate-800 shadow-sm transition-all">
          {(["Ringkasan", "Prestasi", "Setelan"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-3.5 rounded-[1.4rem] text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-300 ${
                activeTab === tab
                  ? "bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-lg shadow-indigo-100/50 dark:shadow-none ring-1 ring-black/5"
                  : "text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === "Ringkasan" && (
            <TabOverview
              totalJournals={rawUserData?.moodHistory?.length || 0}
            />
          )}
          {activeTab === "Prestasi" && (
            <TabAchievements
              totalJournals={rawUserData?.moodHistory?.length || 0}
              totalDetoxMinutes={totalMinutes}
              streak={rawUserData?.streak || 0}
            />
          )}
          {activeTab === "Setelan" && (
            <TabSettings
              isDarkMode={isDarkMode}
              onToggleDark={() => setIsDarkMode(!isDarkMode)}
              onDailyReminder={() =>
                Swal.fire({
                  title: "Reminder",
                  text: "Fitur ini akan segera hadir!",
                  icon: "info",
                  confirmButtonColor: "#6366f1",
                })
              }
              onPrivacy={() =>
                Swal.fire({
                  title: "Privasi",
                  text: "Data Anda dienkripsi secara aman.",
                  icon: "success",
                  confirmButtonColor: "#6366f1",
                })
              }
              onExport={(format) =>
                generateExport(format, rawUserData, user.displayName)
              }
              onLogout={handleLogout}
            />
          )}
        </motion.div>
      </div>
    </div>
  );
}
