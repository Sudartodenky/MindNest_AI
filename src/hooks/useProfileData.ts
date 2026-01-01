import { useState, useEffect } from "react";
import { auth, db } from "../firebaseConfig";
import { doc, onSnapshot } from "firebase/firestore";
import { updateProfile, signOut } from "firebase/auth";
import Swal from "sweetalert2";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";

const CLOUDINARY_UPLOAD_URL = `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`;
const MOOD_LABELS: Record<number, string> = { 1: "Marah", 2: "Sedih", 3: "Biasa", 4: "Baik", 5: "Senang" };

export function useProfileLogic() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [rawUserData, setRawUserData] = useState<any>(null);
  const [uploading, setUploading] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => localStorage.getItem("theme") === "dark");

  useEffect(() => {
    const unsubscribeAuth = auth.onAuthStateChanged((currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        const unsubscribeFirestore = onSnapshot(doc(db, "users", currentUser.uid), (docSnap) => {
          if (docSnap.exists()) setRawUserData(docSnap.data());
          setLoading(false);
        });
        return () => unsubscribeFirestore();
      }
      setLoading(false);
    });
    return () => unsubscribeAuth();
  }, []);

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;
    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);

    try {
      const res = await fetch(CLOUDINARY_UPLOAD_URL, { method: "POST", body: formData });
      const data = await res.json();
      if (data.secure_url) {
        await updateProfile(user, { photoURL: data.secure_url });
        setUser({ ...user, photoURL: data.secure_url });
      }
    } catch (err) {
      Swal.fire("Error", "Gagal mengunggah gambar", "error");
    } finally { setUploading(false); }
  };

  const generateExport = (format: string) => {
    const displayName = user.displayName || "MindUser";
    const moodHistory = rawUserData?.moodHistory || [];
    const fileName = `MindNest_Report_${displayName.replace(/\s+/g, "_")}`;

    if (format === "pdf") {
      const docPDF = new jsPDF();
      autoTable(docPDF, {
        head: [["Tanggal", "Mood", "Catatan"]],
        body: moodHistory.map((m: any) => [m.date, MOOD_LABELS[m.mood] || m.mood, m.note]),
      });
      docPDF.save(`${fileName}.pdf`);
    } else if (format === "excel") {
      const ws = XLSX.utils.json_to_sheet(moodHistory);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Mood");
      XLSX.writeFile(wb, `${fileName}.xlsx`);
    }
  };

  return {
    user, loading, rawUserData, uploading, isDarkMode,
    toggleDarkMode, handleAvatarUpload, generateExport,
    logout: () => signOut(auth)
  };
}