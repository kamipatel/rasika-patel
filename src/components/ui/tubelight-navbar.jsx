import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function NavBar({ items, className, activeTab, onTabChange }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      className={cn(
        "fixed top-0 left-1/2 -translate-x-1/2 z-50 pt-8", // Always at top, more top padding
        className
      )}
    >
      <div className="flex items-center gap-6 bg-[var(--card)]/90 border border-[var(--border)] backdrop-blur-2xl py-3 px-3 rounded-full shadow-[0_10px_40px_rgba(0,0,0,0.5)]">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.name;

          return (
            <a
              key={item.name}
              href={item.url}
              onClick={(e) => {
                if (onTabChange) onTabChange(item.name);
              }}
              className={cn(
                "relative cursor-pointer text-[17px] font-bold px-8 py-4 rounded-full transition-colors duration-300",
                "text-[var(--text-mid)] hover:text-[var(--text-light)]",
                isActive && "bg-[var(--accent-bg)] text-[var(--accent)] font-black shadow-[0_0_20px_var(--accent-glow)]"
              )}
            >
              <span className="hidden md:inline">{item.name}</span>
              <span className="md:hidden">
                <Icon size={20} strokeWidth={2.5} />
              </span>
              {isActive && (
                <motion.div
                  layoutId="lamp"
                  className="absolute inset-0 w-full bg-[var(--accent)]/10 rounded-full -z-10"
                  initial={false}
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 25,
                  }}
                >
                  <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-10 h-1 bg-[var(--accent)] rounded-t-full">
                    <div className="absolute w-14 h-6 bg-[var(--accent)]/30 rounded-full blur-md -top-2 -left-2" />
                    <div className="absolute w-10 h-6 bg-[var(--accent)]/30 rounded-full blur-md -top-1" />
                    <div className="absolute w-5 h-5 bg-[var(--accent)]/30 rounded-full blur-sm top-0 left-2" />
                  </div>
                </motion.div>
              )}
            </a>
          );
        })}
      </div>
    </div>
  );
}
