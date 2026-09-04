/** Shared NOTICE artwork copy — one source for page blocks and the session banner. */

export const NOTICE_ANCHOR_ID = "notice";

export const NOTICE_TITLE = "Notice";

export const NOTICE_DATE_STUB = "[dd/mm/yyyy]";

export const NOTICE_LEAD = "Effective immediately and until further notice.";

export const NOTICE_ITEMS: readonly string[] = [
  "Please keep scrolling. Stopping may induce thought.",
  "It turns out one can get used to anything. Highly convenient.",
  "The war has been postponed to tomorrow. In the meantime, please proceed (accurate as of date of access).",
  "Shock is permitted, but not for longer than 15 seconds. We have a great deal more information to get through today.",
  "If you have forgotten who you are: this is acceptable. You did not have time for that anyway.",
  "There is no need to reach conclusions. The next tab is already waiting.",
];

export const NOTICE_THANKS = "Thank you for your cooperation.";

export const NOTICE_SIGN = "— Dekel Harari";

/** Banner shows only the first rule; full list lives in the page NOTICE block. */
export const NOTICE_BANNER_ITEM = NOTICE_ITEMS[0];
