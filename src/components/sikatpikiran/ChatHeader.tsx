import { Menu } from "lucide-react";

export function ChatHeader({ toggleSidebar, isSidebarOpen, activeTitle }) {
  return (
    <header className="h-20 w-full bg-white dark:bg-[#0B0F1A] border-b border-gray-50 dark:border-slate-800 shrink-0 transition-colors duration-500">
      <div className="max-w-7xl mx-auto h-full flex items-center px-4 justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={toggleSidebar}
            className="p-3 rounded-2xl transition-colors text-gray-600 dark:text-slate-400 hover:bg-gray-100 dark:hover:bg-slate-800"
          >
            <Menu size={20} />
          </button>

          <div className="flex flex-col">
            <h1 className="text-lg font-bold text-gray-800 dark:text-white leading-none tracking-tight transition-colors">
              {activeTitle || "Sikat Pikiran"}
            </h1>
            <span className="text-[10px] text-[#9E8CF2] font-black uppercase tracking-[0.2em] mt-1">
              MindNest AI
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
