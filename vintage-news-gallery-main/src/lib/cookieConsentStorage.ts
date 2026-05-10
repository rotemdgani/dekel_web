/** Persisted cookie-banner choice so it survives navigation and revisits. */
export const COOKIE_CONSENT_STORAGE_KEY = "dh_cookie_consent_v1";

export type CookieConsentValue = "accepted" | "declined";

export function readCookieConsent(): CookieConsentValue | null {
  try {
    const v = localStorage.getItem(COOKIE_CONSENT_STORAGE_KEY);
    return v === "accepted" || v === "declined" ? v : null;
  } catch {
    return null;
  }
}

export function writeCookieConsent(value: CookieConsentValue): void {
  try {
    localStorage.setItem(COOKIE_CONSENT_STORAGE_KEY, value);
  } catch {
    /* ignore quota / private mode */
  }
}
