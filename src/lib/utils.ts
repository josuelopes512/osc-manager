// @ts-nocheck

import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const delay = (ms: number) =>
	new Promise((resolve) => setTimeout(resolve, ms));

// generate comment for this function

/**
 * Converts a number to a string with a fixed number of decimal places.
 *
 * @param {number} value - The number to be converted.
 * @param {number} p - The number of decimal places (precision).
 * @returns {number} The formatted number.
 */

export function toFixed(value: number, p?: number): number {
	const precision = p || 0;
	const power = 10 ** precision;
	const absValue = Math.abs(Math.round(value * power));
	let result = (value < 0 ? "-" : "") + String(Math.floor(absValue / power));

	if (precision > 0) {
		const fraction = String(absValue % power);
		const padding = new Array(
			Math.max(precision - fraction.length, 0) + 1,
		).join("0");
		result += `.${padding}${fraction}`;
	}
	return Number(result);
}

export function findRecaptchaClients() {
	// eslint-disable-next-line camelcase
	if (typeof ___grecaptcha_cfg !== "undefined") {
		// eslint-disable-next-line camelcase, no-undef
		return Object.entries(___grecaptcha_cfg.clients).map(([cid, client]) => {
			const data = { id: cid, version: cid >= 10000 ? "V3" : "V2" };
			const objects = Object.entries(client).filter(
				([_, value]) => value && typeof value === "object",
			);

			objects.forEach(([toplevelKey, toplevel]) => {
				const found = Object.entries(toplevel).find(
					([_, value]) =>
						value &&
						typeof value === "object" &&
						"sitekey" in value &&
						"size" in value,
				);

				if (
					typeof toplevel === "object" &&
					toplevel instanceof HTMLElement &&
					toplevel.tagName === "DIV"
				) {
					data.pageurl = toplevel.baseURI;
				}

				if (found) {
					const [sublevelKey, sublevel] = found;

					data.sitekey = sublevel.sitekey;
					const callbackKey =
						data.version === "V2" ? "callback" : "promise-callback";
					const callback = sublevel[callbackKey];
					if (!callback) {
						data.callback = null;
						data.function = null;
					} else {
						data.function = callback;
						const keys = [cid, toplevelKey, sublevelKey, callbackKey]
							.map((key) => `['${key}']`)
							.join("");
						data.callback = `___grecaptcha_cfg.clients${keys}`;
					}
				}
			});
			return data;
		});
	}
	return [];
}

export function setToUTC(
	date: Date,
	hours?: number,
	minutes?: number,
	seconds?: number,
	milliseconds?: number,
) {
	return new Date(
		date.setUTCHours(hours ?? 0, minutes ?? 0, seconds ?? 0, milliseconds ?? 0),
	);
}

/**
 * Groups an array of objects by a key.
 *
 * @param {Array} list - The list of objects to be grouped.
 * @param {Function} keyGetter - The function to get the key.
 * @returns {Map} The grouped objects.
 */
export function groupBy<K, V>(
	list: Array<V>,
	keyGetter: (input: V) => K,
): Map<K, Array<V>> {
	const map = new Map<K, Array<V>>();

	list.forEach((item) => {
		const key = keyGetter(item);
		const collection = map.get(key);
		if (!collection) {
			map.set(key, [item]);
		} else {
			collection.push(item);
		}
	});
	return map;
}

export function partiallyHideEmail(email: string): string {
	return email.replace(/(\w{3})[\w.-]+@([\w.]+\w)/, "$1***@$2");
}
