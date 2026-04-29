'use client';

import { MessageCircle } from "lucide-react";

const WhatsAppButton = () => {
  return (
    <a
      href="https://wa.me/917796527595"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg group"
      style={{
        background: "linear-gradient(135deg, #25D366, #128C7E)",
        boxShadow: "0 4px 20px rgba(37, 211, 102, 0.3)",
      }}
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle size={24} color="white" className="transition-transform duration-300 group-hover:scale-110" />
      <div className="absolute inset-0 rounded-full bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    </a>
  );
};

export default WhatsAppButton;
