'use client';

import { motion } from "framer-motion";

const skillCategories = [
  {
    title: "Languages",
    skills: ["Java", "JavaScript", "HTML5", "CSS3", "SQL"],
  },
  {
    title: "Frameworks",
    skills: ["Next.js", "Spring Boot", "Tailwind CSS", "Bootstrap", "JQuery", "Hibernate/JPA"],
  },
  {
    title: "Tools",
    skills: ["GitHub", "MySQL", "Postman", "Sendgrid", "Railway", "Supabase", "Cursor", "Stitch"],
  },
];

const SectionUnderline = () => (
  <motion.div
    className="mt-[10px] h-[3px] rounded-full"
    style={{ width: 60, background: "hsl(72 100% 50%)" }}
    initial={{ scaleX: 0 }}
    whileInView={{ scaleX: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, ease: "easeOut" }}
    layout
  />
);

const About = () => {
  return (
    <section id="about" className="py-24 px-6" style={{ background: "#0f0f0f" }}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="section-heading text-left text-white">About</h2>
          <SectionUnderline />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-foreground/80 leading-relaxed text-base font-inter mb-4">
              I'm a Full Stack Developer working at <strong className="text-foreground font-semibold">Al Mawa International Pvt Ltd</strong>, building production-ready web applications end-to-end — from UI/UX design to backend architecture and deployment.
            </p>
            <p className="text-foreground/80 leading-relaxed text-base font-inter">
              Currently pursuing my B.Tech in Computer Engineering at D.Y. Patil University, I specialize in crafting clean, scalable solutions using modern frameworks and AI-assisted development tools.
            </p>
          </motion.div>

          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {skillCategories.map((cat) => (
              <div key={cat.title}>
                <h3 className="text-sm font-semibold neon-text uppercase tracking-wider mb-3 font-sora">
                  {cat.title}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {cat.skills.map((skill) => (
                    <span key={skill} className="pill-tag">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
