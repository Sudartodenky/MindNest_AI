import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
} from "react";
import { Howl } from "howler";
import { auth, db } from "../firebaseConfig";
import { doc, updateDoc, increment, arrayUnion } from "firebase/firestore";

const DetoxContext = createContext<any>(null);

export function DetoxProvider({ children }: { children: React.ReactNode }) {
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300);
  const [initialTime, setInitialTime] = useState(300); // Simpan waktu awal untuk kalkulasi

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const soundRef = useRef<Howl | null>(null);

  const [activeSound, setActiveSound] = useState({
    id: "rain",
    name: "Hujan Tenang",
    url: "",
  });

  // Fungsi untuk menyimpan sesi ke Firebase
  const saveDetoxSession = async (secondsCompleted: number) => {
    const user = auth.currentUser;
    if (!user || secondsCompleted <= 0) return;

    try {
      const userDocRef = doc(db, "users", user.uid);
      await updateDoc(userDocRef, {
        totalDetoxSeconds: increment(secondsCompleted),
        detoxHistory: arrayUnion({
          date: new Date().toISOString(),
          duration: secondsCompleted,
        }),
      });
      console.log("Sesi detoks berhasil disimpan!");
    } catch (error) {
      console.error("Gagal menyimpan sesi detoks:", error);
    }
  };

  // Logic Timer
  useEffect(() => {
    if (isActive && !isPaused && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    if (timeLeft <= 0 && isActive) {
      const sessionDuration = initialTime;
      saveDetoxSession(sessionDuration);

      setIsActive(false);
      soundRef.current?.stop();
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isActive, isPaused, timeLeft]);

  // Logic Audio
  useEffect(() => {
    const currentSrc = (soundRef.current as any)?._src;

    if (isActive && !isPaused && activeSound.url) {
      if (!soundRef.current || currentSrc !== activeSound.url) {
        soundRef.current?.stop();
        soundRef.current = new Howl({
          src: [activeSound.url],
          loop: true,
          volume: 0.5,
          html5: true,
        });
        soundRef.current.play();
      } else if (!soundRef.current.playing()) {
        soundRef.current.play();
      }
    } else {
      if (soundRef.current?.playing()) {
        soundRef.current.pause();
      }
    }

    if (!isActive && timeLeft === initialTime) {
      soundRef.current?.stop();
    }
  }, [isActive, isPaused, activeSound]);

  const stopDetox = () => {
    const secondsDone = initialTime - timeLeft;
    if (secondsDone > 0) saveDetoxSession(secondsDone);

    setIsActive(false);
    setIsPaused(false);
    setTimeLeft(300);
    setInitialTime(300);
    soundRef.current?.stop();
  };

  const startDetox = (seconds: number) => {
    setInitialTime(seconds);
    setTimeLeft(seconds);
    setIsActive(true);
    setIsPaused(false);
  };

  return (
    <DetoxContext.Provider
      value={{
        isActive,
        setIsActive,
        isPaused,
        setIsPaused,
        timeLeft,
        setTimeLeft,
        activeSound,
        setActiveSound,
        stopDetox,
        startDetox,
      }}
    >
      {children}
    </DetoxContext.Provider>
  );
}

export const useDetox = () => {
  const context = useContext(DetoxContext);
  if (!context) throw new Error("useDetox must be used within a DetoxProvider");
  return context;
};
