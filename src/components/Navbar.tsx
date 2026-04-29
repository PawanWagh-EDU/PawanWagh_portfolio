'use client';

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const NAV_ITEMS = ["About", "Experience", "Projects", "Services", "Contact"];

const Navbar = () => {
  const [mounted, setMounted] = useState(false);
  const [active, setActive] = useState("");
  const [scrollProgress, setScrollProgress] = useState(0);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress((window.scrollY / totalHeight) * 100);
      setScrolled(window.scrollY > 50);

      const sections = NAV_ITEMS.map((item) => document.getElementById(item.toLowerCase()));
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.getBoundingClientRect().top <= 150) {
          setActive(NAV_ITEMS[i]);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [mounted]);

  const scrollTo = (id: string) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
  };

  if (!mounted) return null;

  return (
    <>
      {/* Progress bar */}
      <div className="fixed top-0 left-0 w-full h-[3px] z-[100]">
        <motion.div
          className="h-full"
          style={{ width: `${scrollProgress}%`, background: "hsl(72 100% 50%)" }}
        />
      </div>

      <motion.nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          scrolled ? "py-3" : "py-5"
        }`}
        style={{
          background: scrolled ? "hsl(240 10% 4% / 0.8)" : "transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          borderBottom: scrolled ? "1px solid hsl(240 6% 20% / 0.3)" : "none",
        }}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ delay: 2.8, duration: 0.6 }}
      >
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-center">
          <div className="hidden md:flex items-center gap-8">
            {NAV_ITEMS.map((item) => (
              <button
                key={item}
                onClick={() => scrollTo(item)}
                className="relative text-sm font-inter font-medium transition-all duration-300 cursor-none group"
                style={{
                  color: active === item ? "hsl(72 100% 50%)" : "hsl(0 0% 70%)",
                }}
              >
                <span className="inline-block transition-transform duration-300 group-hover:-translate-y-[2px] group-hover:text-neon">
                  {item}
                </span>
                {/* Hover underline */}
                <span
                  className="absolute -bottom-1 left-0 h-[2px] bg-neon transition-all duration-300 origin-left"
                  style={{
                    width: active === item ? "100%" : undefined,
                  }}
                />
                <style>{`
                  button:hover > span:last-child {
                    width: 100% !important;
                  }
                  button:not(:hover) > span:last-child {
                    width: ${active === item ? "100%" : "0%"};
                  }
                `}</style>
                {/* Active glow blink */}
                {active === item && (
                  <motion.span
                    className="absolute -bottom-1 left-0 right-0 h-[2px] rounded-full"
                    style={{ background: "hsl(72 100% 50%)" }}
                    animate={{ opacity: [0.4, 1, 0.4] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      </motion.nav>
    </>
  );
};

export default Navbar;
