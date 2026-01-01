
<img width="658" height="379" alt="image-removebg-preview (67)" src="https://github.com/user-attachments/assets/5ff6ee92-fe62-41ba-ba94-0139a90f0e1d" />

Link Akses Langsung -> https://mindnestai-phi.vercel.app/

🌿 MindNest AI - Sikat Pikiran

MindNest AI adalah aplikasi jurnal berbasis AI yang dirancang untuk membantu pengguna mengelola kesehatan mental melalui fitur "Sikat Pikiran". Aplikasi ini memungkinkan pengguna untuk menuangkan beban pikiran dan mendapatkan respon yang menenangkan serta reflektif dari AI.

✨ Fitur Utama

-Sikat Pikiran (AI Journaling): Fitur chat interaktif untuk refleksi diri yang didukung oleh Google Gemini API melalui n8n.

-Mood Tracker Dashboard: Visualisasi pola mood harian menggunakan grafik interaktif untuk memantau kesejahteraan emosional.

-Smart History Sidebar: Pengorganisasian riwayat jurnal yang rapi (Hari Ini, Kemarin, 7 Hari Terakhir) dengan fitur rename dan delete.

-Responsive UI: Tampilan yang dioptimalkan untuk perangkat mobile maupun desktop dengan dukungan Dark Mode.

-Secure Authentication: Sistem login aman menggunakan Firebase Authentication.

<img width="651" height="383" alt="Screenshot_2026-01-01_120512__1_-removebg-preview" src="https://github.com/user-attachments/assets/38139f1c-21de-4558-a014-22971cbe1477" />

🚀 Kenapa MindNest?

Kadang kita cuma butuh tempat buat ngomong tanpa di-judge. Fitur Sikat Pikiran di sini didesain buat itu. AI-nya bakal ngerespon curhatan kamu biar kamu merasa lebih tenang dan dapat perspektif baru.

💡 Apa yang beda dari yang lain?

-Banyak aplikasi jurnal atau chatbot di luar sana, tapi MindNest punya pendekatan yang beda:

-Bukan Sekadar Chatbot: Di saat AI lain cuma jawab pertanyaan, MindNest difokuskan buat Reflective Journaling. AI di sini bertindak sebagai pendengar yang validasi perasaan kamu, bukan cuma kasih jawaban kaku.

-Automation-Driven (n8n): Arsitektur kita unik karena pakai n8n sebagai orkestrator. Ini bikin proses data lebih transparan dan fleksibel dibanding aplikasi yang langsung "tembak" API ke AI.

-Visualisasi Mood yang Real-time: Kita gak cuma simpan teks, tapi juga bantu kamu liat pola emosi lewat dashboard yang simpel dan gampang dipahami, jadi kamu tau kapan waktu tersulit atau terbaik kamu dalam seminggu.

-Privasi yang Terkontrol: Dengan Firebase Auth, semua curhatan kamu aman dan cuma kamu yang bisa akses riwayatnya. Kamu punya kontrol penuh buat hapus atau ubah judul jurnalmu kapan aja.

<img width="653" height="382" alt="image-removebg-preview (68)" src="https://github.com/user-attachments/assets/6ed7b97e-a2f6-4d4c-87b3-3828f6345383" />

🛠️ Stack yang Dipakai

-React + Vite: Biar kenceng pas di-build.

-Tailwind CSS: Buat UI yang clean dan modern.

-Firebase: Handle login user sama database.

-n8n Workflow: Engine utamanya buat hubungin frontend ke AI.

-Google Gemini: Otak AI-nya.

⚙️ Cara Setup (Lokal)

Clone & Install:

-git clone https://github.com/Sudartodenky/MindNest_AI.git

-npm install

Environment Variable:

-Untuk file .env.localnya saya berikan didalam folder zipnya.

Run:

-npm run dev

🧠 Alur Kerjanya (How it works)

Gak cuma frontend doang, aplikasinya pake n8n buat jembatan:

-User kirim curhatan ke Webhook n8n.

-n8n lempar datanya ke Gemini-1.5-preview buat diproses.

-Responnya dikirim balik ke chat bubble user.

Note: Proyek ini masih pake Free Tier buat API-nya, jadi kalau responnya agak lambat atau kena limit, itu karena emang lagi di kuota gratisan.
