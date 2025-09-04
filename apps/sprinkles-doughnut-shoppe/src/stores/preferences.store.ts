import { createStore } from "@withsprinkles/store";

export type ThemeState = {
	theme: "light" | "dark";
	currency: "USD" | "EUR" | "GBP";
	language: "en" | "es" | "fr";
};

export const userPrefsStore = createStore<ThemeState, Partial<ThemeState>>(
	{ theme: "light", currency: "USD", language: "en" },
	(state, updates) => ({ ...state, ...updates }),
);
