/** Scroll to a document element by id, accounting for sticky site chrome. */
export function scrollToElementById(
  id: string,
  behavior: ScrollBehavior = "smooth",
): void {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior, block: "start" });
}

/** Home series section anchor id (homepage “Ongoing Bodies of Work”). */
export const HOME_SERIES_SECTION_ID = "home-series";
