import { createStore } from "@withsprinkles/store";
import type { Doughnut } from "~/lib/data";

export type CartItem = {
	doughnut: Doughnut;
	quantity: number;
};

export type CartState = {
	items: CartItem[];
	total: number;
	itemCount: number;
	isOpen: boolean;
};

export type CartAction =
	| { type: "ADD"; doughnut: Doughnut }
	| { type: "REMOVE"; id: string }
	| { type: "UPDATE_QUANTITY"; id: string; quantity: number }
	| { type: "TOGGLE_CART" }
	| { type: "CLEAR_CART" };

export const cartStore = createStore<CartState, CartAction>(
	{
		items: [],
		total: 0,
		itemCount: 0,
		isOpen: false,
	},
	(state, action) => {
		switch (action.type) {
			case "ADD": {
				const existing = state.items.find(
					(i) => i.doughnut.id === action.doughnut.id,
				);
				const nextItems: CartItem[] = existing
					? state.items.map((i) =>
							i.doughnut.id === action.doughnut.id
								? {
										...i,
										quantity: Math.min(i.quantity + 1, action.doughnut.stock),
									}
								: i,
						)
					: [{ doughnut: action.doughnut, quantity: 1 }, ...state.items];

				const total = nextItems.reduce(
					(sum, i) => sum + i.doughnut.price * i.quantity,
					0,
				);
				const itemCount = nextItems.reduce((c, i) => c + i.quantity, 0);
				return { ...state, items: nextItems, total, itemCount };
			}

			case "REMOVE": {
				const nextItems = state.items.filter(
					(i) => i.doughnut.id !== action.id,
				);
				const total = nextItems.reduce(
					(sum, i) => sum + i.doughnut.price * i.quantity,
					0,
				);
				const itemCount = nextItems.reduce((c, i) => c + i.quantity, 0);
				return { ...state, items: nextItems, total, itemCount };
			}

			case "UPDATE_QUANTITY": {
				const nextItems = state.items
					.map((i) =>
						i.doughnut.id === action.id
							? {
									...i,
									quantity: Math.max(
										1,
										Math.min(action.quantity, i.doughnut.stock),
									),
								}
							: i,
					)
					.filter((i) => i.quantity > 0);
				const total = nextItems.reduce(
					(sum, i) => sum + i.doughnut.price * i.quantity,
					0,
				);
				const itemCount = nextItems.reduce((c, i) => c + i.quantity, 0);
				return { ...state, items: nextItems, total, itemCount };
			}

			case "TOGGLE_CART":
				return { ...state, isOpen: !state.isOpen };

			case "CLEAR_CART":
				return { ...state, items: [], total: 0, itemCount: 0 };

			default:
				return state;
		}
	},
);
