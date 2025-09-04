import { useStore } from "@withsprinkles/store";
import type { Doughnut } from "~/lib/data";
import { formatCurrency } from "~/lib/utils";
import { cartStore } from "~/stores/cart.store";
import { userPrefsStore } from "~/stores/preferences.store";

export function ProductCard({ product }: { product: Doughnut }) {
	const { currency } = useStore(userPrefsStore);
	const cart = useStore(cartStore);
	const inCartQty =
		cart.items.find((i) => i.doughnut.id === product.id)?.quantity ?? 0;
	const isOutOfStock = product.stock <= inCartQty;
	const addToCart = () => cartStore.update({ type: "ADD", doughnut: product });

	return (
		<div className="relative flex flex-col rounded-xl border border-pink-200/60 bg-white/70 dark:bg-pink-950/30 p-4 shadow-sm">
			<div className="flex items-center justify-between">
				<div className="h-14 w-14 select-none rounded-full flex items-center justify-center overflow-hidden">
					{product.image.startsWith("/") ? (
						<img
							src={product.image}
							alt=""
							className="h-full w-full object-cover"
						/>
					) : (
						<span aria-hidden className="text-4xl leading-none">
							{product.image}
						</span>
					)}
				</div>
				<span className="rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-200 px-2 py-1 text-xs font-medium">
					{product.category}
				</span>
			</div>
			<h3 className="mt-3 font-semibold text-pink-900 dark:text-pink-100">
				{product.name}
			</h3>
			<div className="mt-1 flex items-center justify-between">
				<p className="text-lg font-bold text-blue-700 dark:text-blue-200">
					{formatCurrency(product.price, currency)}
				</p>
				<p className="text-xs text-pink-700/70 dark:text-pink-200/70">
					{product.stock - inCartQty} in stock
				</p>
			</div>
			<button
				type="button"
				onClick={addToCart}
				disabled={isOutOfStock}
				className="mt-3 inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-pink-500 to-blue-500 px-3 py-2 text-sm font-semibold text-white shadow-sm cursor-pointer active:translate-y-px active:shadow transition-transform disabled:opacity-40 disabled:cursor-not-allowed"
			>
				{isOutOfStock ? "Sold Out" : "Add to Cart"}
			</button>
		</div>
	);
}
