import { motion } from "framer-motion";
import { User } from "lucide-react";

export const ProfileCard = ({ profile, daysSinceJoin }: any) => (
  <motion.div
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-gradient-to-br from-[#9E8CF2] to-[#84D1C7] dark:from-[#7c69da] dark:to-[#5ba89e] rounded-[2.5rem] p-8 shadow-2xl shadow-indigo-200/50 dark:shadow-none mb-8 text-white relative overflow-hidden"
  >
    {/* Efek Cahaya Dekoratif */}
    <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl pointer-events-none" />
    <div className="absolute bottom-0 left-0 w-40 h-40 bg-black/5 rounded-full -ml-20 -mb-20 blur-2xl pointer-events-none" />

    <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
      {/* Photo Frame */}
      <div className="w-28 h-28 bg-white/20 backdrop-blur-xl rounded-[2.2rem] flex items-center justify-center border border-white/40 shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-500">
        <User className="w-14 h-14 text-white drop-shadow-md" />
      </div>

      <div className="text-center md:text-left flex-1">
        <h1 className="text-4xl font-black mb-1 tracking-tighter drop-shadow-sm">
          {profile.name}
        </h1>
        <p className="text-white/80 font-bold text-sm mb-6 tracking-wide uppercase text-[10px]">
          Pejuang Ketenangan • Sejak {daysSinceJoin} Hari Lalu
        </p>

        {/* Badges */}
        <div className="flex flex-wrap gap-2 justify-center md:justify-start">
          <Badge icon="🔥" label={`${profile.streak} Hari Streak`} />
          <Badge icon="📝" label={`${profile.totalJournals} Jurnal`} />
          <Badge
            icon="🧘"
            label={`${profile.totalDetoxMinutes} Menit Rileks`}
          />
        </div>
      </div>
    </div>
  </motion.div>
);

const Badge = ({ icon, label }: { icon: string; label: string }) => (
  <div className="bg-white/10 hover:bg-white/20 backdrop-blur-md px-4 py-2 rounded-xl border border-white/20 flex items-center gap-2 transition-colors cursor-default">
    <span className="text-[11px] font-black uppercase tracking-wider">
      {icon} {label}
    </span>
  </div>
);
