import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { GlassCard } from "../ui/GlassCard";

export function TrendChart({ data }) {
  const hasData = data && data.length > 0;

  const displayData = hasData
    ? data.slice(-7).map((item) => ({
        ...item,
        displayDate: new Date(item.date).toLocaleDateString("id-ID", {
          weekday: "short",
        }),
      }))
    : [
        { displayDate: "Sen", mood: 3 },
        { displayDate: "Sel", mood: 4 },
        { displayDate: "Rab", mood: 2 },
        { displayDate: "Kam", mood: 5 },
      ];

  return (
    <GlassCard className="relative overflow-hidden border-none shadow-2xl bg-white/70 dark:bg-slate-900/70 transition-colors duration-500">
      {/* CHART */}
      <div className="h-[280px] w-full relative">
        {!hasData && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/40 dark:bg-slate-900/40 backdrop-blur z-10 rounded-3xl">
            <p className="text-indigo-600 dark:text-indigo-400 font-bold bg-white dark:bg-slate-800 px-6 py-3 rounded-2xl shadow-xl">
              ✨ Mulai catat mood pertamamu!
            </p>
          </div>
        )}

        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={displayData}
            margin={{ top: 20, right: 20, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorMood" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#6366f1" stopOpacity={0.45} />
                <stop offset="100%" stopColor="#6366f1" stopOpacity={0.05} />
              </linearGradient>
            </defs>

            <CartesianGrid
              strokeDasharray="4 4"
              vertical={false}
              stroke="currentColor"
              className="text-slate-200 dark:text-slate-700"
            />

            <XAxis
              dataKey="displayDate"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "currentColor", fontSize: 12, fontWeight: 600 }}
              className="text-slate-500 dark:text-slate-400"
              dy={10}
            />

            <YAxis
              domain={[0, 5]}
              ticks={[1, 2, 3, 4, 5]}
              axisLine={false}
              tickLine={false}
              tick={{ fill: "currentColor", fontSize: 11 }}
              className="text-slate-400 dark:text-slate-500"
            />

            <Tooltip
              content={<CustomTooltip />}
              cursor={{ stroke: "#6366f1", strokeWidth: 2 }}
            />

            <Area
              type="monotone"
              dataKey="mood"
              stroke="#6366f1"
              strokeWidth={4}
              fill="url(#colorMood)"
              dot={{
                r: 6,
                fill: "#6366f1",
                strokeWidth: 3,
                className: "stroke-white dark:stroke-slate-900",
              }}
              activeDot={{ r: 9 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </GlassCard>
  );
}

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const item = payload[0].payload;
    return (
      <div className="bg-slate-900 dark:bg-slate-800 border border-slate-800 dark:border-slate-700 px-4 py-3 rounded-2xl shadow-2xl">
        <p className="text-slate-300 text-xs mb-1">
          {item.date || item.displayDate}
        </p>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-indigo-400 rounded-full" />
          <p className="text-white text-sm font-black">
            Mood: {payload[0].value} / 5
          </p>
        </div>
      </div>
    );
  }
  return null;
};
