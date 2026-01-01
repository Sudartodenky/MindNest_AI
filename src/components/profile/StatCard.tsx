interface StatCardProps {
  icon: string;
  label: string;
  value: string | number;
  colorClass: string;
}

export const StatCard = ({ icon, label, value, colorClass }: StatCardProps) => (
  <div
    className={`${colorClass} px-4 py-2 rounded-2xl flex items-center gap-2 border transition-all duration-300 shadow-sm`}
  >
    <img src={icon} className="w-4 h-4 object-contain" alt={label} />
    <span className="text-xs font-black tracking-tight">
      {value} {label}
    </span>
  </div>
);
