/** Formato moneda chilena sin decimales (ej. $40.918), con punto como separador de miles. */
export function formatoCLP(valor: number): string {
  return new Intl.NumberFormat("es-CL", { style: "currency", currency: "CLP", maximumFractionDigits: 0 }).format(valor);
}

type Indicador = { value: number; date: string };

// Ambas APIs devuelven { serie: [{ fecha, valor }, ...] } con el valor más reciente primero.
// mindicador.cl es intermitente (a veces corta la conexión o demora), por eso hay un respaldo.
const FUENTES = [
  (codigo: string) => `https://mindicador.cl/api/${codigo}`,
  (codigo: string) => `https://findic.cl/api/${codigo}`,
];

const MS_POR_DIA = 86_400_000;

async function obtenerIndicador(codigo: "uf" | "dolar", maxDias: number, respaldo: Indicador): Promise<Indicador> {
  let masReciente: Indicador | null = null;

  for (const urlDe of FUENTES) {
    try {
      const response = await fetch(urlDe(codigo), {
        next: { revalidate: 3600 },
        signal: AbortSignal.timeout(4000),
      });
      if (!response.ok) continue;

      const serie = (await response.json())?.serie?.[0];
      if (!serie || typeof serie.valor !== "number" || serie.valor <= 0 || typeof serie.fecha !== "string") continue;

      const candidato = { value: Math.round(serie.valor * 100) / 100, date: serie.fecha.slice(0, 10) };

      // Next sirve la respuesta cacheada aunque la fuente esté caída: si el dato quedó viejo,
      // se prueba la siguiente fuente en vez de mostrar un valor congelado como si fuera de hoy.
      const antiguedadDias = (Date.now() - new Date(candidato.date).getTime()) / MS_POR_DIA;
      if (antiguedadDias <= maxDias) return candidato;
      if (!masReciente || candidato.date > masReciente.date) masReciente = candidato;
    } catch {
      // Esta fuente falló o demoró: se intenta con la siguiente.
    }
  }
  return masReciente ?? respaldo;
}

// La UF se publica todos los días; el dólar observado solo en días hábiles (hasta ~4 días sin dato en fines de semana largos).
export async function getUFToday(): Promise<Indicador> {
  return obtenerIndicador("uf", 3, {
    value: 41147,
    date: new Date().toISOString().split("T")[0],
  });
}

export async function getDollarToday(): Promise<Indicador> {
  return obtenerIndicador("dolar", 6, {
    value: 982,
    date: new Date().toISOString().split("T")[0],
  });
}
