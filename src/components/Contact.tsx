import { motion } from "framer-motion";
import { useState } from "react";
import { Mail, Linkedin, Github, Instagram, Phone, Send } from "lucide-react";

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

const Contact = () => {
  const [form, setForm] = useState({
    name: "", email: "", projectType: "", message: "",
  });
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setTimeout(() => {
      setSending(false);
      setForm({ name: "", email: "", projectType: "", message: "" });
      alert("Message sent!");
    }, 1000);
  };

  const inputClass = "w-full px-4 py-3 rounded-lg font-inter text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-neon/50 transition-all duration-300";
  const inputStyle = { background: "hsl(240 8% 10%)", border: "1px solid hsl(240 6% 20%)" };

  return (
    <section id="contact" className="py-24 px-6" style={{ background: "#0a0a0a" }}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="section-heading text-left text-white">Let's Connect</h2>
          <SectionUnderline />
        </motion.div>

        <motion.form
          onSubmit={handleSubmit}
          className="glass-card p-8 md:p-12 space-y-6 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="grid md:grid-cols-2 gap-6">
            <input
              className={inputClass}
              style={inputStyle}
              placeholder="Full Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
            <input
              className={inputClass}
              style={inputStyle}
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
          </div>
          <select
            className={inputClass}
            style={inputStyle}
            value={form.projectType}
            onChange={(e) => setForm({ ...form, projectType: e.target.value })}
            required
          >
            <option value="">Project Type</option>
            <option>Web App</option>
            <option>API Bot</option>
            <option>Business Website</option>
            <option>API Integration</option>
            <option>Other</option>
          </select>
          <textarea
            className={inputClass}
            style={{ ...inputStyle, minHeight: "140px", resize: "vertical" }}
            placeholder="Let's turn your idea into reality..."
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            required
          />
          <button
            type="submit"
            className="btn-neon-filled w-full py-4 text-base flex items-center justify-center gap-3"
            disabled={sending}
          >
            <Send size={18} /> {sending ? "Sending..." : "Send Message"}
          </button>
        </motion.form>

        <motion.div
          className="flex flex-wrap gap-6 mt-12 justify-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          {[
            { icon: Mail, label: "Email", href: "mailto:pawanwagh@example.com" },
            { icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com" },
            { icon: Github, label: "GitHub", href: "https://github.com" },
            { icon: Instagram, label: "Instagram", href: "https://instagram.com" },
            { icon: Phone, label: "Phone", href: "tel:+917796527595" },
          ].map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-muted-foreground text-sm font-inter transition-colors duration-300 hover:text-neon"
            >
              <link.icon size={18} /> {link.label}
            </a>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
