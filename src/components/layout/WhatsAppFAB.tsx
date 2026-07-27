"use client";

import Image from "next/image";

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
        w-[68px] h-[68px] rounded-full overflow-hidden
        flex items-center justify-center
        shadow-lg hover:shadow-xl hover:scale-105
        transition-all duration-300
      "
      aria-label="Contactar por WhatsApp"
      title="Contactar por WhatsApp"
    >
      <Image
        src="/iconos/whatsapp%20icono.png"
        alt="WhatsApp"
        width={68}
        height={68}
        className="w-full h-full object-cover"
      />
    </a>
  );
};
