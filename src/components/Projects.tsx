import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

const projects = [
  {
    num: "01",
    name: "Ramberio Ecommerce",
    desc: "A full-featured ecommerce platform with product catalog, cart, and checkout functionality.",
    tech: ["React.js", "Spring Boot"],
  },
  {
    num: "02",
    name: "Ticket Management System",
    desc: "End-to-end ticket management application for tracking and resolving support requests.",
    tech: ["MongoDB", "Express", "React", "Node.js"],
  },
  {
    num: "03",
    name: "Erudition Elite Learning",
    desc: "An online learning platform with courses, quizzes, and progress tracking.",
    tech: ["MongoDB", "Express", "React", "Node.js"],
  },
  {
    num: "04",
    name: "Pearl Crew Showcase",
    desc: "A team portfolio and showcase platform with dynamic profiles and project displays.",
    tech: ["MongoDB", "Express", "React", "Node.js"],
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
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
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
  }, []);

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
              className="project-card glass-card p-8 flex-shrink-0 relative overflow-hidden group"
              style={{ width: "400px", minHeight: "350px" }}
              whileHover={{ scale: 1.03, rotateY: 2 }}
              transition={{ duration: 0.3 }}
            >
              <span
                className="absolute -top-4 -right-2 font-sora font-extrabold text-[120px] leading-none select-none"
                style={{ color: "hsl(72 100% 50% / 0.05)" }}
              >
                {project.num}
              </span>
              <div className="relative z-10">
                <h3 className="font-sora font-semibold text-[22px] text-foreground mb-3">
                  {project.name}
                </h3>
                <p className="text-muted-foreground text-base font-inter mb-6 leading-relaxed">
                  {project.desc}
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tech.map((t) => (
                    <span key={t} className="pill-tag text-xs">
                      {t}
                    </span>
                  ))}
                </div>
                <a href="#" className="btn-neon-outline text-xs py-2 px-4 inline-flex items-center gap-2">
                  <ExternalLink size={14} /> GitHub
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
