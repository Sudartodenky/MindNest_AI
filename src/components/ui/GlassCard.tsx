import React from "react";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
}

export function GlassCard({ children, className = "" }: GlassCardProps) {
  return (
    <div
      className={`
        bg-white/70 
        backdrop-blur-xl 
        border border-white/40 
        rounded-[2.5rem] 
        p-6 
        shadow-[0_8px_32px_0_rgba(31,38,135,0.07)] 
        ${className}
      `}
    >
      {children}
    </div>
  );
}