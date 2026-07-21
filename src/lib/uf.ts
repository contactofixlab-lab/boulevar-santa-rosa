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
        next: { revalidate: 86400 },
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

export async function getDollarToday(): Promise<{ value: number; date: string }> {
  // Fallback value por defecto para evitar errores de compilación
  const defaultDollar = {
    value: 880,
    date: new Date().toISOString().split("T")[0],
  };

  try {
    const response = await fetch(
      "https://mindicador.cl/api/dolar",
      {
        next: { revalidate: 86400 },
        signal: AbortSignal.timeout(5000), // Timeout de 5 segundos
      }
    );

    if (!response.ok) {
      return defaultDollar;
    }

    const data = await response.json();

    if (data.serie && Array.isArray(data.serie) && data.serie.length > 0) {
      const dollarData = data.serie[0];

      if (dollarData.valor && typeof dollarData.valor === 'number') {
        return {
          value: Math.round(dollarData.valor * 100) / 100,
          date: new Date().toISOString().split("T")[0],
        };
      }
    }

    return defaultDollar;
  } catch {
    // Silently return default value on any error
    return defaultDollar;
  }
}
