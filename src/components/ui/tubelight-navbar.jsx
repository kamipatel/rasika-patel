import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

export function NavBar({ items, className, activeTab, onTabChange }) {
  const [isMobile, setIsMobile] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) setIsOpen(false);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <>
      <div
        className={cn(
          "fixed top-0 left-0 right-0 z-[100] pt-6 md:pt-8 px-4",
          className
        )}
      >
        {/* Desktop / Tablet Nav */}
        <div className="hidden md:flex items-center justify-center gap-3 bg-[var(--card)]/80 border border-[var(--border)] backdrop-blur-2xl py-2.5 px-3 rounded-full shadow-[0_10px_40px_rgba(0,0,0,0.5)] max-w-fit mx-auto">
          {items.map((item) => {
            const isActive = activeTab === item.name;
            return (
              <a
                key={item.name}
                href={item.url}
                onClick={() => onTabChange?.(item.name)}
                className={cn(
                  "relative cursor-pointer text-[16px] font-bold px-7 py-3.5 rounded-full transition-all duration-300",
                  "text-[var(--text-mid)] hover:text-[var(--text-light)]",
                  isActive && "text-[var(--accent)] font-black"
                )}
              >
                <span className="relative z-10">{item.name}</span>
                {isActive && (
                  <motion.div
                    layoutId="lamp"
                    className="absolute inset-0 w-full bg-[var(--accent)]/10 rounded-full z-0"
                    initial={false}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  >
                    <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-8 h-1 bg-[var(--accent)] rounded-t-full shadow-[0_0_15px_var(--accent)]" />
                  </motion.div>
                )}
              </a>
            );
          })}
        </div>

        {/* Mobile Hamburger Trigger */}
        <div className="md:hidden flex justify-end">
          <button
            onClick={toggleMenu}
            className="p-4 rounded-full bg-[var(--card)]/90 border border-[var(--border)] backdrop-blur-xl text-[var(--accent)] shadow-2xl active:scale-95 transition-transform"
            aria-label="Toggle Menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(20px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            className="fixed inset-0 z-[90] bg-black/60 flex items-center justify-center"
          >
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 10, opacity: 0 }}
              className="flex flex-col items-center gap-8"
            >
              {items.map((item, i) => {
                const Icon = item.icon;
                const isActive = activeTab === item.name;
                return (
                  <motion.a
                    key={item.name}
                    href={item.url}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    onClick={() => {
                      setIsOpen(false);
                      onTabChange?.(item.name);
                    }}
                    className={cn(
                      "flex items-center gap-4 text-3xl font-bold tracking-tight py-4 px-8 rounded-2xl transition-all",
                      isActive ? "text-[var(--accent)]" : "text-[var(--text-light)]"
                    )}
                  >
                    <Icon size={28} className={isActive ? "text-[var(--accent)]" : "opacity-50"} />
                    {item.name}
                  </motion.a>
                );
              })}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
