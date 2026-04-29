'use client';

import { motion } from "framer-motion";
import HeroBackground from "./HeroBackground";
import { MapPin } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden" style={{ background: "#0a0a0a" }}>
      <HeroBackground />

      <motion.div
        className="relative z-10 text-center px-6"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 2.8, duration: 0.8, ease: "easeOut" }}
      >
        <motion.p
          className="text-muted-foreground text-sm tracking-widest uppercase mb-4 font-inter"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3 }}
        >
          👋 Hi, I'm
        </motion.p>

        <motion.h1
          className="font-sora font-extrabold text-white mb-4"
          style={{ fontSize: "clamp(40px, 8vw, 64px)" }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3.1, duration: 0.6 }}
        >
          Pawan B Wagh
        </motion.h1>

        <motion.p
          className="text-xl md:text-2xl text-foreground/80 font-inter mb-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3.3 }}
        >
          Full Stack Developer
        </motion.p>

        <motion.p
          className="text-muted-foreground text-sm font-inter mb-10 flex items-center justify-center gap-1"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3.4 }}
        >
          <MapPin size={14} /> Pune, India
        </motion.p>

        <motion.div
          className="flex flex-wrap justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3.6 }}
        >
          <button
            className="btn-neon-filled"
            onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
          >
            View Work
          </button>
          <button
            className="btn-neon-outline"
            onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
          >
            Let's Connect
          </button>
          <a
            href="https://drive.google.com/file/d/1qJOntW7swk0Kpmz4zRRE-x_Ikp2QNlsp/view?usp=drivesdk"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-neon-outline"
          >
            View CV
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
