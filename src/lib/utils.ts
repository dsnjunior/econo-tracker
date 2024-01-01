import { type ClassValue, clsx } from "clsx";
import { useEffect, useState } from "react";
import sanitizeHtml from "sanitize-html";
import { twMerge } from "tailwind-merge";
import { defaultLang } from "./i18n/ui";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function capitalize(str: string) {
	return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

export function getInitials(name: string) {
	return name
		.split(" ")
		.slice(0, 2)
		.map((n) => n[0])
		.join("");
}

export function formatDate(
	value: string,
	timeZone?: string,
	lang: string = typeof window === "undefined"
		? defaultLang
		: document.documentElement.lang,
	dateStyle: "long" | "full" | "medium" | "short" = "long",
) {
	return Intl.DateTimeFormat(lang, {
		dateStyle,
		timeZone: timeZone || undefined,
	}).format(
		new Date(
			...(new Date(value)
				.toISOString()
				.split("T")[0]
				.split("-")
				.map((v, idx) => (idx === 1 ? parseInt(v) - 1 : parseInt(v))) as [
				number,
				number,
				number,
			]),
		),
	);
}

export function formatNumber(
	value: string,
	lang: string = typeof window === "undefined"
		? defaultLang
		: document.documentElement.lang,
) {
	return Intl.NumberFormat(lang, {
		style: "currency",
		currency: "BRL",
		maximumFractionDigits: 0,
	}).format(Number(value.replaceAll(/[^,.(\d)]+/g, "")));
}

export function useMediaQuery(query: string): boolean {
	const [matches, setMatches] = useState(false);

	useEffect(() => {
		const media = window.matchMedia(query);
		if (media.matches !== matches) {
			setMatches(media.matches);
		}
		const listener = () => setMatches(media.matches);
		window.addEventListener("resize", listener);
		return () => window.removeEventListener("resize", listener);
	}, [matches, query]);

	return matches;
}

export function sanitize(dirty: string): string {
	return sanitizeHtml(dirty, {
		allowedTags: ["b", "i", "em", "strong", "a", "p", "br", "ul", "ol", "li"],
		allowedAttributes: {
			a: ["href"],
		},
	});
}

export const colors = [
	{ name: "red", value: "#dc2626" },
	{ name: "green", value: "#16a34a" },
	{ name: "blue", value: "#2563eb" },
	{ name: "slate", value: "#475569" },
	{ name: "purple", value: "#9333ea" },
	{ name: "orange", value: "#ea580c" },
	{ name: "lime", value: "#84cc16" },
	{ name: "rose", value: "#f43f5e" },
	{ name: "gray", value: "#6b7280" },
	{ name: "yellow", value: "#eab308" },
	{ name: "cyan", value: "#06b6d4" },
	{ name: "violet", value: "#7c3aed" },
	{ name: "pink", value: "#ec4899" },
] as const;
