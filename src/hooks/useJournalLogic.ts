import { useState, useEffect } from "react";

export function useJournalLogic() {
  const [entry, setEntry] = useState("");
  const [activeChat, setActiveChat] = useState<any>(null);
  const [journalHistory, setJournalHistory] = useState<any[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("journalHistory") || "[]");
    setJournalHistory(saved);
  }, []);

  const saveToLocal = (data: any[]) => {
    setJournalHistory(data);
    localStorage.setItem("journalHistory", JSON.stringify(data));
  };

  const handleSend = async () => {
    if (!entry.trim() || isGenerating) return;
    const userMsg = entry;
    setEntry("");
    setIsGenerating(true);

    const newUserMessage = { role: "user", content: userMsg, timestamp: new Date().toISOString() };
    
    try {
      const response = await fetch(import.meta.env.VITE_N8N_JOURNAL_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          journalEntry: userMsg,      // <-- GANTI 'message' JADI 'journalEntry'
          chatId: activeChat?.id || Date.now(),
          history: activeChat?.messages || []
    }),
      });

      const data = await response.json();
      const aiResponse = data.output || data.response || data.text || "Gemini tidak merespon.";

      if (activeChat) {
        const updated = {
          ...activeChat,
          messages: [...activeChat.messages, newUserMessage, { role: "ai", content: aiResponse, timestamp: new Date().toISOString() }]
        };
        saveToLocal(journalHistory.map(h => h.id === activeChat.id ? updated : h));
        setActiveChat(updated);
      } else {
        const newChat = {
          id: Date.now(),
          title: userMsg.slice(0, 30),
          createdAt: new Date().toISOString(),
          messages: [newUserMessage, { role: "ai", content: aiResponse, timestamp: new Date().toISOString() }]
        };
        saveToLocal([newChat, ...journalHistory]);
        setActiveChat(newChat);
      }
    } catch (error) {
      alert("Gagal koneksi AI.");
    } finally {
      setIsGenerating(false);
    }
  };

  const deleteChat = (id: number) => {
    const filtered = journalHistory.filter(h => h.id !== id);
    saveToLocal(filtered);
    if (activeChat?.id === id) setActiveChat(null);
  };

  const renameChat = (id: number, newTitle: string) => {
    const updated = journalHistory.map(h => h.id === id ? { ...h, title: newTitle } : h);
    saveToLocal(updated);
    if (activeChat?.id === id) setActiveChat({ ...activeChat, title: newTitle });
  };

  return { entry, setEntry, activeChat, setActiveChat, journalHistory, isGenerating, handleSend, deleteChat, renameChat };
}