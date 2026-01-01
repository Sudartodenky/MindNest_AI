import { useState } from "react";
import {
  MessageSquare,
  Plus,
  Trash2,
  X,
  Clock,
  Edit2,
  Check,
} from "lucide-react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

export function Sidebar({
  isOpen,
  setIsOpen,
  activeChat,
  setActiveChat,
  history,
  onDelete,
  onRename,
}) {
  const [editingId, setEditingId] = useState(null);
  const [tempTitle, setTempTitle] = useState("");

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const isToday =
      date.getDate() === now.getDate() &&
      date.getMonth() === now.getMonth() &&
      date.getFullYear() === now.getFullYear();

    if (isToday) {
      return date
        .toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" })
        .replace(":", ".");
    } else {
      return (
        date.toLocaleDateString("id-ID", { day: "numeric", month: "short" }) +
        ` ${date.getHours().toString().padStart(2, "0")}.${date
          .getMinutes()
          .toString()
          .padStart(2, "0")}`
      );
    }
  };

  const groupHistory = () => {
    const groups = {
      "Hari Ini": [],
      Kemarin: [],
      "7 Hari Terakhir": [],
      Lama: [],
    };
    const now = new Date();
    history.forEach((chat) => {
      const chatDate = new Date(chat.createdAt || chat.id);
      const diffInDays = Math.floor((now - chatDate) / (1000 * 60 * 60 * 24));
      if (diffInDays === 0) groups["Hari Ini"].push(chat);
      else if (diffInDays === 1) groups["Kemarin"].push(chat);
      else if (diffInDays < 7) groups["7 Hari Terakhir"].push(chat);
      else groups["Lama"].push(chat);
    });
    return groups;
  };

  const handleDeleteConfirm = (id) => {
    MySwal.fire({
      title: "Hapus Jurnal?",
      text: "Pikiran ini akan hilang selamanya.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#9E8CF2",
      cancelButtonColor: "#334155",
      confirmButtonText: "Hapus",
      background: "#1A1C21",
      color: "#fff",
      customClass: { popup: "rounded-3xl" },
    }).then((result) => {
      if (result.isConfirmed) onDelete(id);
    });
  };

  const startEditing = (chat) => {
    setEditingId(chat.id);
    setTempTitle(chat.title);
  };

  const submitRename = (id) => {
    if (tempTitle.trim()) onRename(id, tempTitle);
    setEditingId(null);
  };

  const groups = groupHistory();

  return (
    <aside
      className={`fixed md:relative inset-y-0 left-0 z-[50] bg-[#1A1C21] transition-all duration-300 flex flex-col overflow-hidden ${
        isOpen ? "w-80" : "w-0 md:w-0"
      }`}
    >
      <div className="p-6 flex flex-col h-full min-w-[20rem]">
        <button
          onClick={() => {
            setActiveChat(null);
            setIsOpen(false);
          }}
          className="flex items-center justify-center gap-3 bg-[#9E8CF2] text-white py-4 rounded-2xl mb-8 font-bold shadow-lg shadow-[#9E8CF2]/20 transition-all active:scale-95"
        >
          <Plus size={20} /> Jurnal Baru
        </button>

        <div className="flex-1 overflow-y-auto space-y-6 pr-2 custom-scrollbar">
          {Object.entries(groups).map(
            ([label, items]) =>
              items.length > 0 && (
                <div key={label}>
                  <p className="text-[10px] uppercase tracking-widest text-gray-500 font-bold px-4 mb-3">
                    {label}
                  </p>
                  <div className="space-y-1">
                    {items.map((chat) => (
                      <div key={chat.id} className="group relative px-2">
                        <button
                          onClick={() => {
                            if (editingId !== chat.id) {
                              setActiveChat(chat);
                              setIsOpen(false);
                            }
                          }}
                          className={`w-full text-left p-4 rounded-2xl flex items-start gap-3 transition-all ${
                            activeChat?.id === chat.id
                              ? "bg-white/10 text-white"
                              : "text-gray-400 hover:bg-white/5"
                          }`}
                        >
                          <MessageSquare
                            size={16}
                            className={`mt-1 flex-shrink-0 ${
                              activeChat?.id === chat.id
                                ? "text-[#9E8CF2]"
                                : "opacity-40"
                            }`}
                          />
                          <div className="flex flex-col min-w-0 flex-1 pr-6">
                            {editingId === chat.id ? (
                              <input
                                autoFocus
                                className="bg-transparent border-b border-[#9E8CF2] outline-none text-sm text-white w-full"
                                value={tempTitle}
                                onChange={(e) => setTempTitle(e.target.value)}
                                onBlur={() => submitRename(chat.id)}
                                onKeyDown={(e) =>
                                  e.key === "Enter" && submitRename(chat.id)
                                }
                              />
                            ) : (
                              <>
                                <span className="truncate text-sm font-medium pr-4">
                                  {chat.title}
                                </span>
                                <span className="text-[10px] opacity-40 mt-1 flex items-center gap-1 font-normal italic">
                                  <Clock size={10} />{" "}
                                  {formatDate(chat.createdAt || chat.id)}
                                </span>
                              </>
                            )}
                          </div>
                        </button>

                        {/* Hover Actions: Muncul hanya saat baris di-hover */}
                        <div
                          className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all duration-200 
                                    bg-gradient-to-l from-[#1A1C21] via-[#1A1C21] to-transparent pl-8 h-full rounded-r-2xl"
                        >
                          {editingId === chat.id ? (
                            <button
                              onClick={() => submitRename(chat.id)}
                              className="p-2 text-emerald-400"
                            >
                              <Check size={16} />
                            </button>
                          ) : (
                            <>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  startEditing(chat);
                                }}
                                className="p-2 text-gray-500 hover:text-white transition-colors"
                              >
                                <Edit2 size={14} />
                              </button>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleDeleteConfirm(chat.id);
                                }}
                                className="p-2 text-gray-500 hover:text-red-400 transition-colors"
                              >
                                <Trash2 size={14} />
                              </button>
                            </>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )
          )}
        </div>
      </div>
    </aside>
  );
}
