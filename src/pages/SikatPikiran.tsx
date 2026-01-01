import { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Sidebar } from "../components/sikatpikiran/Sidebar";
import { ChatHeader } from "../components/sikatpikiran/ChatHeader";
import { ChatMessages } from "../components/sikatpikiran/ChatMessages";
import { ChatInput } from "../components/sikatpikiran/ChatInput";
import { EmptyState } from "../components/sikatpikiran/EmptyState";
import { useJournalLogic } from "../hooks/useJournalLogic";

export function SikatPikiran() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const {
    entry,
    setEntry,
    activeChat,
    setActiveChat,
    journalHistory,
    isGenerating,
    renameChat,
    handleSend,
    deleteChat,
  } = useJournalLogic();

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [activeChat?.messages, isGenerating]);

  return (
    <div className="flex h-[calc(100vh-64px)] w-full bg-[#F3F4F6] dark:bg-[#020617] overflow-hidden relative transition-colors duration-500">
      <Sidebar
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
        activeChat={activeChat}
        setActiveChat={setActiveChat}
        history={journalHistory}
        onDelete={deleteChat}
        onRename={renameChat}
      />

      <main className="flex-1 flex flex-col min-w-0 relative overflow-hidden transition-all duration-300">
        <ChatHeader
          toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
          isSidebarOpen={isSidebarOpen}
          activeTitle={activeChat?.title}
        />

        <div
          ref={scrollRef}
          className="flex-1 overflow-y-auto bg-white dark:bg-[#0B0F1A] flex flex-col transition-colors duration-500"
        >
          <div className="w-full max-w-7xl mx-auto flex-1 flex flex-col px-4 md:px-8">
            {!activeChat ? (
              <div className="flex-1 flex items-center justify-center py-12">
                <EmptyState
                  entry={entry}
                  setEntry={setEntry}
                  onSend={handleSend}
                  loading={isGenerating}
                />
              </div>
            ) : (
              <div className="py-8">
                <ChatMessages
                  messages={activeChat.messages}
                  isGenerating={isGenerating}
                />
              </div>
            )}
          </div>
        </div>

        {activeChat && (
          <div className="p-4 md:p-6 bg-white dark:bg-[#0B0F1A] border-t border-gray-50 dark:border-slate-800 transition-colors duration-500">
            <div className="max-w-7xl mx-auto">
              <ChatInput
                entry={entry}
                setEntry={setEntry}
                onSend={handleSend}
                loading={isGenerating}
              />
            </div>
          </div>
        )}
      </main>

      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsSidebarOpen(false)}
            className="fixed inset-0 bg-black/40 dark:bg-black/60 backdrop-blur-sm z-[45] md:hidden"
          />
        )}
      </AnimatePresence>
    </div>
  );
}
