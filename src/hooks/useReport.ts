import { useState, useEffect } from "react";
import { auth, db } from "../firebaseConfig";
import { doc, onSnapshot } from "firebase/firestore";

const MOOD_LABELS: Record<number, string> = {
  1: "Marah",
  2: "Sedih",
  3: "Biasa",
  4: "Baik",
  5: "Senang",
};

export function useReport() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any[]>([]);
  const [stats, setStats] = useState({
    avgMood: 0,
    totalJournals: 0,
    totalDetox: "0m 0s",
    totalDetoxSessions: 0,
    mostCommonMood: "-",
    insightMessage: "",
  });

  useEffect(() => {
    const unsubscribeAuth = auth.onAuthStateChanged((user) => {
      if (user) {
        const userDocRef = doc(db, "users", user.uid);
        const unsubscribeFirestore = onSnapshot(userDocRef, (docSnap) => {
          if (docSnap.exists()) {
            const userData = docSnap.data();
            const history = userData.moodHistory || [];
            const detoxHistory = userData.detoxHistory || [];
            
            const chartData = history.slice(-7).map((item: any) => ({
              name: item.date?.split("-")[2] || "00",
              mood: item.mood,
              fullDate: item.date,
            }));
            setData(chartData);

            const totalSeconds = userData.totalDetoxSeconds || 0;
            const m = Math.floor(totalSeconds / 60);
            const s = totalSeconds % 60;
            const detoxFormatted = `${m}m ${s}s`;

            if (history.length > 0) {
              const totalMood = history.reduce((acc: number, curr: any) => acc + curr.mood, 0);
              const avg = (totalMood / history.length).toFixed(1);

              const counts = history.reduce((acc: any, curr: any) => {
                acc[curr.mood] = (acc[curr.mood] || 0) + 1;
                return acc;
              }, {});
              
              const mostCommon = Object.keys(counts).reduce((a, b) =>
                counts[a] > counts[b] ? a : b
              );

              const consistency = Math.min((history.length / 7) * 100, 100).toFixed(0);
              const commonMoodText = MOOD_LABELS[parseInt(mostCommon)];

              let aiText = "";
              if (parseFloat(avg) >= 4) {
                aiText = `Luar biasa! Skor mood rata-ratamu (${avg}) menunjukkan stabilitas emosi yang sangat positif. Konsistensi jurnal ${consistency}% kamu adalah bukti kepedulianmu pada diri sendiri.`;
              } else if (parseFloat(avg) >= 3) {
                aiText = `Mood-mu cukup stabil di angka ${avg}. Dengan tingkat konsistensi ${consistency}%, kamu sudah berada di jalur yang benar. Coba tambahkan sesi detoks digital untuk mencapai skor 'Baik'.`;
              } else {
                aiText = `Minggu ini terlihat agak menantang bagimu. Tingkat konsistensi ${consistency}% menunjukkan kamu sedang berusaha. Jangan lupa ambil jeda sejenak untuk menyeimbangkan pikiranmu.`;
              }

              setStats({
                avgMood: parseFloat(avg),
                totalJournals: history.length,
                totalDetox: detoxFormatted,
                totalDetoxSessions: detoxHistory.length,
                mostCommonMood: commonMoodText,
                insightMessage: aiText,
              });
            } else {
              setStats((prev) => ({ ...prev, totalDetox: detoxFormatted }));
            }
          }
          setLoading(false);
        });
        return () => unsubscribeFirestore();
      }
    });
    return () => unsubscribeAuth();
  }, []);

  return { loading, data, stats };
}