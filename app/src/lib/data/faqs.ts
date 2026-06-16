export interface FAQ {
  id: string;
  pregunta: string;
  respuesta: string;
}

export const faqs: FAQ[] = [
  {
    id: "faq-1",
    pregunta: "¿Dónde se ubica Boulevard Santa Rosa?",
    respuesta: "Boulevard Santa Rosa se ubica en San Miguel, a solo 3 minutos del metro. La dirección es San Miguel 123, Santiago.",
  },
  {
    id: "faq-2",
    pregunta: "¿Cuáles son los tipos de propiedades disponibles?",
    respuesta: "Contamos con departamentos de 1, 2 y 3 dormitorios, locales comerciales, bodegas y estacionamientos.",
  },
  {
    id: "faq-3",
    pregunta: "¿Qué documentos necesito para cotizar?",
    respuesta: "Para cotizar solo necesitas proporcionar tu nombre, email y teléfono. Nuestro equipo se contactará contigo con las opciones disponibles.",
  },
  {
    id: "faq-4",
    pregunta: "¿Cuál es el valor de la UF?",
    respuesta: "La UF es variable. Puedes ver el valor actualizado al día en nuestro cotizador. Actualmente está en torno a UF 31,400.",
  },
  {
    id: "faq-5",
    pregunta: "¿Qué amenidades tiene el proyecto?",
    respuesta: "Boulevard Santa Rosa cuenta con piscina, gimnasio, coworking, áreas verdes, seguridad 24/7 y estacionamientos subterráneos.",
  },
  {
    id: "faq-6",
    pregunta: "¿Cuál es el plazo de entrega?",
    respuesta: "La entrega está estimada para Q4 2027. Puedes agendar una visita para conocer el avance de la obra.",
  },
];
