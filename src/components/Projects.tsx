'use client';

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

const projects = [
  {
    num: "01",
    name: "Erudition Elite",
    desc: "Developed a modern, fully responsive corporate website for Erudition Infinite, showcasing its educational programs, professional training services, and company profile with an intuitive user experience.",
    tech: ["MongoDB", "Express", "React", "Node.js"],
    url: "https://www.eruditioninfinite.com/",
  },
  {
    num: "02",
    name: "Ticket Management System",
    desc: "End-to-end ticket management application for tracking and resolving support requests.",
    tech: ["MongoDB", "Express", "React", "Node.js"],
    url: "https://www.kontechindustriesticketcrm.live/login",
  },
  {
    num: "03",
    name: "Sp-Arts ERP",
    desc: "Developed a comprehensive ERP system for SP Art Hub to streamline student admissions, batch management, attendance, fee tracking, staff administration, and overall institute operations through a responsive and user-friendly dashboard.",
    tech: ["MongoDB", "Express", "React", "Node.js"],
    url: "https://sp-art-erp.vercel.app/",
  },
  {
    num: "04",
    name: "KHM Infra",
    desc: "Developed a modern, responsive corporate website for KHM Infra, showcasing the company's engineering services, projects, expertise, and commitment to sustainable infrastructure solutions.",
    tech: ["MongoDB", "Express", "React", "Node.js"],
    url: "https://khm-five.vercel.app/",
  },
];

const SectionUnderline = () => (
  <motion.div
    className="mt-[10px] h-[3px] rounded-full"
    style={{ width: 60, background: "hsl(72 100% 50%)" }}
    initial={{ scaleX: 0, transformOrigin: "left" }}
    whileInView={{ scaleX: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, ease: "easeOut" }}
  />
);

const Projects = () => {
  const [mounted, setMounted] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    let scrollTriggerInstance: any = null;

    const initGSAP = async () => {
      const gsapModule = await import("gsap");
      const stModule = await import("gsap/ScrollTrigger");
      const ScrollTrigger = stModule.ScrollTrigger;
      gsapModule.gsap.registerPlugin(ScrollTrigger);

      if (!trackRef.current || !sectionRef.current) return;

      const totalWidth = trackRef.current.scrollWidth - window.innerWidth;

      scrollTriggerInstance = gsapModule.gsap.to(trackRef.current, {
        x: -totalWidth,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          pin: true,
          scrub: 1.5,
          start: "top top",
          end: () => `+=${totalWidth}`,
          invalidateOnRefresh: true,
        },
      });
    };

    initGSAP();

    return () => {
      if (scrollTriggerInstance) {
        const st = scrollTriggerInstance.scrollTrigger;
        if (st) st.kill();
      }
    };
  }, [mounted]);

  if (!mounted) return null;

  return (
    <section id="projects" ref={sectionRef} className="relative overflow-hidden" style={{ background: "#0a0a0a" }}>
      <div className="h-screen flex flex-col justify-center">
        <div className="max-w-6xl mx-auto w-full px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="section-heading text-left text-white">Projects</h2>
            <SectionUnderline />
          </motion.div>
        </div>

        <div ref={trackRef} className="flex gap-8 pl-[10vw] pr-[10vw] items-center" style={{ width: "fit-content" }}>
          {projects.map((project) => (
            <motion.div
              key={project.num}
              className="project-card glass-card p-6 md:p-8 flex-shrink-0 relative overflow-hidden group flex flex-col"
              style={{ width: "100%", maxWidth: "400px", height: "450px" }}
              whileHover={{ scale: 1.03, rotateY: 2 }}
              transition={{ duration: 0.3 }}
            >
              <span
                className="absolute -top-4 -right-2 font-sora font-extrabold text-[120px] leading-none select-none"
                style={{ color: "hsl(72 100% 50% / 0.05)" }}
              >
                {project.num}
              </span>
              <div className="relative z-10 flex flex-col flex-1">
                <h3 className="font-sora font-semibold text-[22px] text-foreground mb-3">
                  {project.name}
                </h3>
                <p className="text-muted-foreground text-base font-inter mb-6 leading-relaxed flex-1">
                  {project.desc}
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tech.map((t) => (
                    <span key={t} className="pill-tag text-xs">
                      {t}
                    </span>
                  ))}
                </div>
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-neon-outline text-xs py-2 px-4 inline-flex items-center gap-2"
                >
                  <ExternalLink size={14} /> View Project
                </a>
              </div>
            </motion.div>
          ))}

          {/* View All Card - Smaller */}
          <motion.a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="project-card glass-card p-6 flex-shrink-0 flex flex-col items-center justify-center group"
            style={{ width: "250px", minHeight: "250px" }}
            whileHover={{ scale: 1.05 }}
          >
            <span className="neon-text font-sora font-bold text-lg mb-3">View All Projects</span>
            <div className="btn-neon-outline text-xs py-2 px-4 inline-flex items-center gap-2">
              <ExternalLink size={14} /> GitHub
            </div>
          </motion.a>
        </div>
      </div>
    </section>
  );
};

export default Projects;
