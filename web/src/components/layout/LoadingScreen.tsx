"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Logo } from "@/components/ui/Logo";

export function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-black"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-center"
          >
            <Logo size="lg" priority />
            <motion.div
              className="mt-8 h-px bg-gold"
              initial={{ width: 0 }}
              animate={{ width: 200 }}
              transition={{ duration: 1.2, delay: 0.4, ease: "easeOut" }}
            />
            <p className="mt-5 text-xs uppercase tracking-[0.4em] text-muted pl-[0.4em]">
              Creative Agency
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
