/** Valida RUT chileno con dígito verificador módulo 11. */
export function isValidRut(rawRut: string): boolean {
  const clean = rawRut.replace(/[.\s]/g, "").toUpperCase();
  const match = /^(\d{7,8})-([\dK])$/.exec(clean);
  if (!match) return false;

  const [, digits, checkDigit] = match;
  let sum = 0;
  let multiplier = 2;
  for (let i = digits.length - 1; i >= 0; i--) {
    sum += Number(digits[i]) * multiplier;
    multiplier = multiplier === 7 ? 2 : multiplier + 1;
  }
  const remainder = 11 - (sum % 11);
  const expected = remainder === 11 ? "0" : remainder === 10 ? "K" : String(remainder);
  return expected === checkDigit;
}

export function formatRut(rawRut: string): string {
  const clean = rawRut.replace(/[.\s]/g, "").toUpperCase();
  const match = /^(\d{1,8})-?([\dK]?)$/.exec(clean);
  if (!match) return rawRut;
  const [, digits, checkDigit] = match;
  const withDots = digits.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  return checkDigit ? `${withDots}-${checkDigit}` : withDots;
}

export const isValidEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value.trim());

/* El teléfono se valida en FaseDatos según el país elegido (ver lib/paises.ts),
   porque el largo del número local cambia de un país a otro. */
