"use client";

import { MessageCircle } from "lucide-react";

export const WhatsAppFAB = () => {
  const phoneNumber = "56973301234"; // Sin espacios ni +
  const message = "Hola, quiero información sobre Boulevard Santa Rosa";
  const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={whatsappURL}
      target="_blank"
      rel="noopener noreferrer"
      className="
        fixed bottom-6 right-6 z-30
        w-14 h-14 rounded-full
        bg-green-500 hover:bg-green-600
        flex items-center justify-center
        shadow-lg hover:shadow-xl
        transition-all duration-300
        animate-pulse
      "
      aria-label="Contactar por WhatsApp"
      title="Contactar por WhatsApp"
    >
      <MessageCircle className="w-7 h-7 text-white" />
    </a>
  );
};
