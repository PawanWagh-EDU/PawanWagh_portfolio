import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const LoadingScreen = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(false), 2800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden"
          style={{ background: "linear-gradient(135deg, hsl(240 10% 3%), hsl(240 10% 6%), hsl(240 10% 3%))" }}
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          {/* Particles */}
          {Array.from({ length: 30 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full"
              style={{ background: "hsl(72 100% 50% / 0.6)" }}
              initial={{
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                opacity: 0,
              }}
              animate={{
                x: [Math.random() * window.innerWidth, Math.random() * window.innerWidth],
                y: [Math.random() * window.innerHeight, Math.random() * window.innerHeight],
                opacity: [0, 0.8, 0],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}

          {/* Glow orbs */}
          <motion.div
            className="absolute w-64 h-64 rounded-full"
            style={{ background: "radial-gradient(circle, hsl(72 100% 50% / 0.1), transparent)" }}
            animate={{ x: [-100, 100], y: [-50, 50] }}
            transition={{ duration: 4, repeat: Infinity, repeatType: "reverse" }}
          />

          {/* Text */}
          <motion.div
            className="text-center z-10"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.p
              className="text-muted-foreground text-sm tracking-widest uppercase mb-3 font-inter"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              Welcome to
            </motion.p>
            <motion.h1
              className="font-sora text-4xl md:text-5xl font-extrabold neon-text"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              Pawan Workspace
            </motion.h1>
            <motion.div
              className="mt-6 h-0.5 mx-auto rounded-full"
              style={{ background: "hsl(72 100% 50%)" }}
              initial={{ width: 0 }}
              animate={{ width: 120 }}
              transition={{ delay: 0.8, duration: 1.2, ease: "easeInOut" }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
