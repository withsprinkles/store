import { createStore } from "@withsprinkles/store";

export type ViewState = { category: string };

export const viewStore = createStore<ViewState, Partial<ViewState>>(
	{ category: "All" },
	(state, updates) => ({ ...state, ...updates }),
);
