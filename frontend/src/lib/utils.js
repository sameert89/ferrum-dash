import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function cssVar(name) {
  return getComputedStyle(document.documentElement)
    .getPropertyValue(name)
    .trim();
}

/**
 * Takes a UTC date, converts to local time, and returns the elapsed time as a short, human string.
 * Rules (absolute difference, future dates allowed):
 * - < 1 min: x secs
 * - 1 min to < 1 hr: x mins
 * - 1 hr to < 1 day: x hrs
 * - 1 day to < 1 month: x days
 * - >= 1 month: x days
 * @param {Date | string | number} date UTC date value
 * @returns {string}
 */
export function calculateTimePassedAsVerboseString(date) {
  const input = new Date(date);
  if (Number.isNaN(input.getTime())) return "";

  const localInput = new Date(
    input.getTime() + input.getTimezoneOffset() * 60000,
  );
  const now = new Date();
  const diffMs = Math.abs(now.getTime() - localInput.getTime());

  const diffSecs = Math.floor(diffMs / 1000);
  if (diffSecs < 60) return `${diffSecs} sec(s)`;

  const diffMins = Math.floor(diffSecs / 60);
  if (diffMins < 60) return `${diffMins} min(s)`;

  const diffHours = Math.floor(diffMins / 60);
  if (diffHours < 24) return `${diffHours} hr(s)`;

  const diffDays = Math.floor(diffHours / 24);
  return `${diffDays} day(s)`;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
