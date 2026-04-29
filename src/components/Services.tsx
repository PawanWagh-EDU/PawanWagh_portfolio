'use client';

import { motion } from "framer-motion";
import { Code2, Bot, Plug, Globe } from "lucide-react";

const services = [
  { icon: Code2, title: "Full Stack Web Apps", tech: "Next.js, Spring Boot, React, MySQL" },
  { icon: Bot, title: "AI Chatbots & Automation", tech: "Gemini API, Claude API, Python, Node.js" },
  { icon: Plug, title: "API Integrations", tech: "REST APIs, OAuth, Webhooks, Postman" },
  { icon: Globe, title: "Business Websites", tech: "Tailwind CSS, Figma, SEO, Vercel, Hostinger" },
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

const Services = () => {
  return (
    <section id="services" className="py-24 px-6" style={{ background: "#121212" }}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="section-heading text-left text-white">What I Offer</h2>
          <SectionUnderline />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              className="glass-card p-8 group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.02 }}
            >
              <service.icon className="neon-text mb-4" size={32} />
              <h3 className="font-sora font-semibold text-[22px] text-foreground mb-2">
                {service.title}
              </h3>
              <p className="text-muted-foreground font-inter text-sm">{service.tech}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
