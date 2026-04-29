'use client';

import { motion } from "framer-motion";
import { GraduationCap, MapPin, Calendar } from "lucide-react";

const education = [
  {
    degree: "B.Tech in Computer Engineering",
    institution: "D.Y. Patil University",
    location: "Pune, India",
    period: "2022 — 2026",
  },
  {
    degree: "HSC — Science",
    institution: "R. R. Shinde Jr College",
    location: "Pune, India",
    period: "2019 — 2021",
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

const Education = () => {
  return (
    <section className="py-24 px-6" style={{ background: "#0f0f0f" }}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="section-heading text-left text-white">Education</h2>
          <SectionUnderline />
        </motion.div>

        <div className="flex flex-col gap-6 max-w-4xl mx-auto">
          {education.map((edu, i) => (
            <motion.div
              key={edu.degree}
              className="glass-card p-8"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
            >
              <GraduationCap className="neon-text mb-4" size={28} />
              <h3 className="font-sora font-semibold text-[22px] text-foreground mb-1">
                {edu.degree}
              </h3>
              <p className="neon-text font-inter font-medium mb-3">{edu.institution}</p>
              <div className="text-muted-foreground text-sm font-inter space-y-1">
                <p className="flex items-center gap-2"><MapPin size={14} /> {edu.location}</p>
                <p className="flex items-center gap-2"><Calendar size={14} /> {edu.period}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;
