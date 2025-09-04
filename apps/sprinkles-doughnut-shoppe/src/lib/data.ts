export type Doughnut = {
	id: string;
	name: string;
	price: number;
	image: string; // emoji or public path
	category: string;
	stock: number;
};

// Sample product inventory
export const doughnuts: Doughnut[] = [
	{
		id: "sprinkle-classic",
		name: "Classic Sprinkles",
		price: 2.5,
		image: "/sprinkle-donuts-1.jpg",
		category: "Classic",
		stock: 24,
	},
	{
		id: "choco-rainbow",
		name: "Choco Rainbow",
		price: 3.0,
		image: "/sprinkle-donuts-2.jpg",
		category: "Chocolate",
		stock: 16,
	},
	{
		id: "strawberry-glaze",
		name: "Strawberry Glaze",
		price: 2.75,
		image: "🍓",
		category: "Fruit",
		stock: 12,
	},
	{
		id: "blueberry-burst",
		name: "Blueberry Burst",
		price: 2.9,
		image: "🫐",
		category: "Fruit",
		stock: 10,
	},
	{
		id: "vanilla-cream",
		name: "Vanilla Cream",
		price: 3.25,
		image: "🤍",
		category: "Filled",
		stock: 8,
	},
	{
		id: "boston-cream",
		name: "Boston Cream",
		price: 3.5,
		image: "🍫",
		category: "Filled",
		stock: 14,
	},
	{
		id: "maple-bacon",
		name: "Maple Bacon",
		price: 3.75,
		image: "🥓",
		category: "Special",
		stock: 6,
	},
	{
		id: "matcha-sesame",
		name: "Matcha Sesame",
		price: 3.4,
		image: "🍵",
		category: "Special",
		stock: 9,
	},
	{
		id: "cinnamon-sugar",
		name: "Cinnamon Sugar",
		price: 2.35,
		image: "🌀",
		category: "Classic",
		stock: 20,
	},
	{
		id: "lemon-zest",
		name: "Lemon Zest",
		price: 2.85,
		image: "🍋",
		category: "Fruit",
		stock: 11,
	},
	{
		id: "cookies-n-cream",
		name: "Cookies n’ Cream",
		price: 3.6,
		image: "🍪",
		category: "Chocolate",
		stock: 7,
	},
	{
		id: "pink-vanilla",
		name: "Pink Vanilla",
		price: 2.95,
		image: "💖",
		category: "Classic",
		stock: 18,
	},
];
