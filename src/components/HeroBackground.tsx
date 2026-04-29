'use client';

import { useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";

const HeroBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const particlesRef = useRef<Array<{ x: number; y: number; vx: number; vy: number; size: number }>>([]);
  const animFrameRef = useRef<number>(0);

  const initParticles = useCallback((width: number, height: number) => {
    particlesRef.current = Array.from({ length: 60 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      size: Math.random() * 2 + 1,
    }));
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      if (particlesRef.current.length === 0) {
        initParticles(canvas.width, canvas.height);
      }
    };
    resize();
    window.addEventListener("resize", resize);

    const handleMouse = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", handleMouse);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const particles = particlesRef.current;

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = "hsla(72, 100%, 50%, 0.4)";
        ctx.fill();
      });

      // Connect nearby particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 150) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `hsla(72, 100%, 50%, ${0.15 * (1 - dist / 150)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      animFrameRef.current = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouse);
      cancelAnimationFrame(animFrameRef.current);
    };
  }, [initParticles]);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0" style={{
        background: "radial-gradient(ellipse at 20% 50%, hsl(72 100% 50% / 0.05) 0%, transparent 50%), radial-gradient(ellipse at 80% 20%, hsl(260 100% 50% / 0.05) 0%, transparent 50%), hsl(240 10% 4%)"
      }} />

      {/* Particle canvas */}
      <canvas ref={canvasRef} className="absolute inset-0" />

      {/* Glow orbs */}
      <motion.div
        className="absolute w-96 h-96 rounded-full animate-glow-pulse"
        style={{
          background: "radial-gradient(circle, hsl(72 100% 50% / 0.08), transparent)",
          top: "10%", left: "10%",
        }}
        animate={{ x: [0, 50, 0], y: [0, 30, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute w-72 h-72 rounded-full animate-glow-pulse"
        style={{
          background: "radial-gradient(circle, hsl(260 80% 60% / 0.06), transparent)",
          bottom: "20%", right: "15%",
        }}
        animate={{ x: [0, -40, 0], y: [0, -20, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />

      {/* Floating shapes */}
      <motion.div
        className="absolute w-16 h-16 border border-neon/10 rounded-full"
        style={{ top: "20%", right: "20%" }}
        animate={{ y: [-20, 20], rotate: [0, 360] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute w-12 h-12 border border-neon/10"
        style={{ bottom: "30%", left: "15%", transform: "rotate(45deg)" }}
        animate={{ y: [20, -20], rotate: [45, 405] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute"
        style={{
          top: "60%", right: "30%",
          width: 0, height: 0,
          borderLeft: "12px solid transparent",
          borderRight: "12px solid transparent",
          borderBottom: "20px solid hsl(72 100% 50% / 0.1)",
        }}
        animate={{ y: [-15, 15], rotate: [0, 180] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
};

export default HeroBackground;
