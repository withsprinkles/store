import { useStore } from "@withsprinkles/store";
import { ProductCard } from "./components/ProductCard";
import { CartHeader, ShoppingCart } from "./components/ShoppingCart";
import { ThemeSelector } from "./components/ThemeSelector";
import { doughnuts } from "./lib/data";
import { viewStore } from "./stores/view.store";

export function ShoppingApp() {
	const view = useStore(viewStore);

	const categories = [
		"All",
		...Array.from(new Set(doughnuts.map((d) => d.category))),
	];
	const filtered =
		view.category === "All"
			? doughnuts
			: doughnuts.filter((d) => d.category === view.category);

	return (
		<div className="min-h-screen bg-gradient-to-b from-pink-50 to-blue-50 dark:from-pink-950 dark:to-blue-950">
			<main className="mx-auto max-w-6xl px-4 pb-16">
				<CartHeader />
				<div className="flex flex-wrap items-center justify-between gap-3">
					<ThemeSelector />
					<div className="flex flex-wrap items-center gap-2">
						{categories.map((c) => (
							<button
								key={c}
								type="button"
								onClick={() => viewStore.update({ category: c })}
								className={`cursor-pointer rounded-full px-3 py-1 text-sm font-medium transition-colors active:translate-y-px ${
									view.category === c
										? "bg-pink-600 text-white"
										: "bg-pink-100 text-pink-800 hover:bg-pink-200 dark:bg-pink-900/40 dark:text-pink-200"
								}`}
							>
								{c}
							</button>
						))}
					</div>
				</div>

				<ShoppingCart />

				<section className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
					{filtered.map((product) => (
						<ProductCard key={product.id} product={product} />
					))}
				</section>
			</main>
		</div>
	);
}
