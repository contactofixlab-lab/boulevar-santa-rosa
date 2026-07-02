export async function getUFToday(): Promise<{ value: number; date: string; error?: string }> {
  try {
    const response = await fetch(
      "https://mindicador.cl/api/uf",
      {
        next: { revalidate: 3600 }, // Cachear 1 hora (UF se actualiza diariamente)
      }
    );

    if (!response.ok) throw new Error("Failed to fetch UF");

    const data = await response.json();

    if (data.serie && data.serie.length > 0) {
      const ufData = data.serie[0]; // Primera entrada es el más reciente
      const fechaUTC = new Date(ufData.fecha);
      // Convertir a fecha local de Chile (UTC-4 o UTC-3)
      const fechaLocal = fechaUTC.toISOString().split("T")[0];

      return {
        value: ufData.valor,
        date: fechaLocal,
      };
    }

    throw new Error("No UF data available");
  } catch (error) {
    // Fallback: retornar error pero con estructura válida
    console.error("Error fetching UF:", error);
    return {
      value: 0,
      date: new Date().toISOString().split("T")[0],
      error: "No se pudo obtener la UF",
    };
  }
}
