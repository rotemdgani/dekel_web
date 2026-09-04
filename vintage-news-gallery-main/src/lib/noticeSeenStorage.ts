/** Session-only dismissal for the NOTICE banner artwork (not consent). */
export const NOTICE_SEEN_STORAGE_KEY = "dh_notice_seen";

export function readNoticeSeen(): boolean {
  try {
    return sessionStorage.getItem(NOTICE_SEEN_STORAGE_KEY) === "1";
  } catch {
    return false;
  }
}

export function writeNoticeSeen(): void {
  try {
    sessionStorage.setItem(NOTICE_SEEN_STORAGE_KEY, "1");
  } catch {
    /* ignore quota / private mode */
  }
}
