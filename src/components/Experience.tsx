import { motion } from "framer-motion";
import { Briefcase, MapPin, Calendar } from "lucide-react";

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

const Experience = () => {
  return (
    <section id="experience" className="py-24 px-6" style={{ background: "#121212" }}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="section-heading text-left text-white">Experience</h2>
          <SectionUnderline />
        </motion.div>

        <motion.div
          className="glass-card p-8 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-6">
            <div>
              <h3 className="font-sora font-semibold text-[22px] text-foreground">
                Full Stack Developer
              </h3>
              <p className="neon-text font-inter font-medium flex items-center gap-2 mt-1">
                <Briefcase size={16} /> Al Mawa International Pvt Ltd
              </p>
            </div>
            <div className="mt-3 md:mt-0 text-muted-foreground text-sm font-inter space-y-1">
              <p className="flex items-center gap-2"><Calendar size={14} /> April 2026 — Present</p>
              <p className="flex items-center gap-2"><MapPin size={14} /> Pune, India</p>
            </div>
          </div>

          <ul className="space-y-3 text-foreground/80 font-inter text-base">
            {[
              "Develop full-stack web applications handling UI/UX design, frontend, backend, database integration, and deployment",
              "Collaborate directly with clients to gather requirements and deliver production-ready solutions from scratch",
              "Accelerate development using AI-assisted tools — Codex, Claude, Figma, Antigravity, ChatGPT, Cursor, Stitch",
              "Build and integrate responsive user interfaces using modern design tools and frameworks",
            ].map((point, i) => (
              <motion.li
                key={i}
                className="flex gap-3"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * i }}
              >
                <span className="neon-text mt-1.5 shrink-0">▸</span>
                {point}
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;
