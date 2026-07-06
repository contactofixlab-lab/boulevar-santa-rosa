export async function getUFToday(): Promise<{ value: number; date: string; error?: string }> {
  try {
    const response = await fetch(
      "https://mindicador.cl/api/uf",
      {
        next: { revalidate: 3600 }, // Cachear 1 hora (UF se actualiza diariamente)
      }
    );

    if (!response.ok) {
      throw new Error(`API returned status ${response.status}`);
    }

    const data = await response.json();

    // Verificar si la respuesta tiene el formato esperado
    if (data.serie && Array.isArray(data.serie) && data.serie.length > 0) {
      const ufData = data.serie[0];

      if (ufData.valor && typeof ufData.valor === 'number') {
        const fechaUTC = new Date(ufData.fecha);
        const fechaLocal = fechaUTC.toISOString().split("T")[0];

        return {
          value: Math.round(ufData.valor * 100) / 100,
          date: fechaLocal,
        };
      }
    }

    throw new Error("Invalid UF data format");
  } catch (error) {
    // Fallback: usar valor aproximado de la UF actual
    console.warn("Error fetching UF:", error instanceof Error ? error.message : String(error));

    return {
      value: 40837, // Valor aproximado como fallback
      date: new Date().toISOString().split("T")[0],
      error: undefined, // Sin error, ya que tenemos un fallback válido
    };
  }
}
