import React, { useState, useRef, useEffect } from "react";
import LogoWhite from "../assets/logo/white.png";
import { useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
  updateProfile,
  onAuthStateChanged,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth } from "../firebaseConfig";
import {
  Mail,
  Lock,
  Brain,
  ArrowRight,
  User,
  Eye,
  EyeOff,
  XCircle,
  Loader2,
  CheckCircle2,
} from "lucide-react";
import ReCAPTCHA from "react-google-recaptcha";
import GoogleLogo from "/src/assets/icons/google.png";
import { PasswordStrength } from "../components/Auth/PasswordStrength";

const googleProvider = new GoogleAuthProvider();

export function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState(""); // Untuk notifikasi sukses
  const [isCaptchaVerified, setIsCaptchaVerified] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const captchaRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkRedirect = async () => {
      try {
        const result = await getRedirectResult(auth);
        if (result?.user) navigate("/dashboard");
      } catch (err) {
        console.error("Redirect Error:", err);
      }
    };
    checkRedirect();

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) navigate("/dashboard");
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleForgotPassword = async () => {
    if (!email) {
      setError("Masukkan email Anda terlebih dahulu di kolom email.");
      return;
    }
    setLoading(true);
    setError("");
    setSuccessMsg("");

    try {
      await sendPasswordResetEmail(auth, email);
      setSuccessMsg(
        "Email pemulihan terkirim! Silakan cek folder Inbox atau Spam Anda."
      );
    } catch (err) {
      console.error("Reset Error:", err.code);
      switch (err.code) {
        case "auth/user-not-found":
          setError("Email tidak terdaftar dalam sistem kami.");
          break;
        case "auth/invalid-email":
          setError("Format email tidak valid.");
          break;
        case "auth/too-many-requests":
          setError("Terlalu banyak permintaan. Coba lagi dalam beberapa saat.");
          break;
        default:
          setError("Gagal mengirim email. Pastikan koneksi internet stabil.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleAuth = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMsg("");

    if (!isCaptchaVerified) {
      setError("Keamanan: Selesaikan tantangan Captcha.");
      return;
    }

    setLoading(true);
    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        if (username.trim().length < 3)
          throw { code: "custom/username-too-short" };
        const userCred = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        await updateProfile(userCred.user, { displayName: username });
      }
      navigate("/dashboard");
    } catch (err) {
      const errorMap = {
        "auth/user-not-found": "Email tidak terdaftar.",
        "auth/wrong-password": "Password yang Anda masukkan salah.",
        "auth/email-already-in-use": "Email ini sudah digunakan akun lain.",
        "custom/username-too-short": "Nama lengkap minimal 3 karakter.",
      };
      setError(errorMap[err.code] || "Terjadi kendala. Periksa koneksi Anda.");
      captchaRef.current?.reset();
      setIsCaptchaVerified(false);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError("");
    setLoading(true);
    try {
      await signInWithPopup(auth, googleProvider);
      navigate("/dashboard");
    } catch (err) {
      if (err.code === "auth/popup-blocked") {
        signInWithRedirect(auth, googleProvider);
      } else {
        setError("Gagal login dengan Google.");
        setLoading(false);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden font-sans bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-4">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-indigo-200/20 rounded-full blur-[100px] -z-10" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-200/20 rounded-full blur-[100px] -z-10" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white/90 backdrop-blur-md rounded-[2.5rem] shadow-2xl p-8 border border-white/50 z-10"
      >
        {/* Header */}
        <div className="text-center mb-6">
          {/* Mengganti Brain Icon dengan Logo Image */}
          <div className="w-16 h-16 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg overflow-hidden">
            <img
              src={LogoWhite}
              alt="MindNest Logo"
              className="w-10 h-10 object-contain"
            />
          </div>
          <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">
            MindNest AI
          </h1>
        </div>

        {/* Tab Switcher */}
        <div className="flex bg-slate-100 p-1 rounded-2xl mb-6">
          <button
            onClick={() => {
              setIsLogin(true);
              setError("");
              setSuccessMsg("");
            }}
            className={`flex-1 py-2 text-sm font-bold rounded-xl transition-all ${
              isLogin ? "bg-white text-indigo-600 shadow-sm" : "text-slate-500"
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => {
              setIsLogin(false);
              setError("");
              setSuccessMsg("");
            }}
            className={`flex-1 py-2 text-sm font-bold rounded-xl transition-all ${
              !isLogin ? "bg-white text-indigo-600 shadow-sm" : "text-slate-500"
            }`}
          >
            Register
          </button>
        </div>

        {/* Alert Messages */}
        <AnimatePresence mode="wait">
          {error && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0 }}
              className="mb-4 p-3 bg-red-50 text-red-600 rounded-xl text-[11px] flex items-center gap-2 border border-red-100 font-medium"
            >
              <XCircle size={14} /> {error}
            </motion.div>
          )}
          {successMsg && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0 }}
              className="mb-4 p-3 bg-emerald-50 text-emerald-600 rounded-xl text-[11px] flex items-center gap-2 border border-emerald-100 font-medium"
            >
              <CheckCircle2 size={14} /> {successMsg}
            </motion.div>
          )}
        </AnimatePresence>

        <form onSubmit={handleAuth} className="space-y-4">
          {!isLogin && (
            <div className="space-y-1">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="John Doe"
                  className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none text-sm"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required={!isLogin}
                />
              </div>
            </div>
          )}

          <div className="space-y-1">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="email"
                placeholder="email@contoh.com"
                className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none text-sm"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex justify-between items-center">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                Password
              </label>
              {isLogin && (
                <button
                  type="button"
                  onClick={handleForgotPassword}
                  className="text-[10px] font-bold text-indigo-600 hover:text-indigo-800 transition-colors uppercase tracking-tight"
                >
                  Lupa Password?
                </button>
              )}
            </div>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className="w-full pl-12 pr-12 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none text-sm"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                tabIndex="-1"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {!isLogin && password && <PasswordStrength password={password} />}
          </div>

          <div className="flex justify-center scale-90 py-1">
            <ReCAPTCHA
              sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
              onChange={(v) => setIsCaptchaVerified(!!v)}
              ref={captchaRef}
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-bold shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all flex items-center justify-center gap-2 disabled:opacity-70"
          >
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <>
                {isLogin ? "Sign In" : "Create Account"}{" "}
                <ArrowRight size={18} />
              </>
            )}
          </motion.button>
        </form>

        <div className="relative my-6 text-center">
          <span className="text-[10px] uppercase text-slate-400 font-bold bg-white px-4 relative z-10">
            Atau masuk dengan
          </span>
          <div className="absolute top-1/2 left-0 w-full border-t border-slate-100"></div>
        </div>

        <button
          onClick={handleGoogleLogin}
          disabled={loading}
          className="w-full flex items-center justify-center gap-3 py-3 border border-slate-200 rounded-2xl font-bold text-slate-700 text-sm hover:bg-slate-50 transition-all"
        >
          <img src={GoogleLogo} alt="Google" className="w-5 h-5" /> Google
          Account
        </button>

        <div className="mt-8 text-center">
          <Link
            to="/"
            className="text-[11px] font-bold text-slate-400 hover:text-indigo-600 transition-colors uppercase tracking-widest"
          >
            ← Kembali ke Beranda
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
