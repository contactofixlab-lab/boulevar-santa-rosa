export async function getUFToday(): Promise<{ value: number; date: string; error?: string }> {
  try {
    const response = await fetch(
      "https://www.bcentral.cl/api/indicador/uf/últimas/1",
      {
        headers: {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
        },
        next: { revalidate: 86400 }, // Cachear 24 horas (UF se actualiza 1 vez al día)
      }
    );

    if (!response.ok) throw new Error("Failed to fetch UF");

    const data = await response.json();

    if (data.UF && data.UF.length > 0) {
      const ufData = data.UF[0];
      return {
        value: parseFloat(ufData.Valor),
        date: ufData.Fecha,
      };
    }

    throw new Error("No UF data available");
  } catch (error) {
    // Fallback: UF aproximada (actualizar manualmente si es necesario)
    return {
      value: 37200, // Valor aproximado - fallback
      date: new Date().toISOString().split("T")[0],
      error: "Usando valor aproximado",
    };
  }
}
