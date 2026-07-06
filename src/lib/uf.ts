export async function getUFToday(): Promise<{ value: number; date: string }> {
  // Fallback value por defecto para evitar errores de compilación
  const defaultUF = {
    value: 40837,
    date: new Date().toISOString().split("T")[0],
  };

  try {
    const response = await fetch(
      "https://mindicador.cl/api/uf",
      {
        next: { revalidate: 3600 },
        signal: AbortSignal.timeout(5000), // Timeout de 5 segundos
      }
    );

    if (!response.ok) {
      return defaultUF;
    }

    const data = await response.json();

    if (data.serie && Array.isArray(data.serie) && data.serie.length > 0) {
      const ufData = data.serie[0];

      if (ufData.valor && typeof ufData.valor === 'number') {
        return {
          value: Math.round(ufData.valor * 100) / 100,
          date: new Date().toISOString().split("T")[0],
        };
      }
    }

    return defaultUF;
  } catch {
    // Silently return default value on any error
    return defaultUF;
  }
}
