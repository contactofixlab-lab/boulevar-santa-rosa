import { tipologias as mockTipologias, type Tipologia } from "@/lib/data/tipologias";

export interface MobysuiteResult {
  data: Tipologia[];
  source: "mobysuite" | "mock";
}

/**
 * Modo C — API REST. Server-only: usa MOBYSUITE_CLIENT_SECRET, nunca debe
 * importarse desde un componente cliente. Sin documentación oficial de
 * Mobysuite aún, el flujo de auth (client_credentials) es una suposición
 * razonable — si falla, cae a los datos mock sin romper la página.
 */
export async function getTipologiasFromMobysuite(): Promise<MobysuiteResult> {
  const host = process.env.MOBYSUITE_HOST;
  const clientId = process.env.MOBYSUITE_CLIENT_ID;
  const clientSecret = process.env.MOBYSUITE_CLIENT_SECRET;

  if (!host || !clientId || !clientSecret) {
    return { data: mockTipologias, source: "mock" };
  }

  try {
    const tokenRes = await fetch(`${host}/oauth/token`, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        grant_type: "client_credentials",
        client_id: clientId,
        client_secret: clientSecret,
      }),
      signal: AbortSignal.timeout(5000),
    });
    if (!tokenRes.ok) throw new Error(`Mobysuite auth ${tokenRes.status}`);
    const { access_token } = await tokenRes.json();

    const res = await fetch(`${host}/api/tipologias`, {
      headers: { Authorization: `Bearer ${access_token}` },
      signal: AbortSignal.timeout(5000),
      next: { revalidate: 300 },
    });
    if (!res.ok) throw new Error(`Mobysuite API ${res.status}`);

    const data = (await res.json()) as Tipologia[];
    return { data, source: "mobysuite" };
  } catch {
    return { data: mockTipologias, source: "mock" };
  }
}
