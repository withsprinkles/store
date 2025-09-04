import { useStore } from "@withsprinkles/store";
import { formatCurrency } from "~/lib/utils";
import { type CartItem, cartStore } from "~/stores/cart.store";
import { userPrefsStore } from "~/stores/preferences.store";

function CartItemComponent({ item }: { item: CartItem }) {
	const { currency } = useStore(userPrefsStore);
	const updateQuantity = (quantity: number) =>
		cartStore.update({
			type: "UPDATE_QUANTITY",
			id: item.doughnut.id,
			quantity,
		});
	const removeItem = () =>
		cartStore.update({ type: "REMOVE", id: item.doughnut.id });

	return (
		<div className="grid grid-cols-[auto_1fr_auto_auto] items-center gap-3 py-2">
			<div className="text-2xl">
				{item.doughnut.image.startsWith("/") ? (
					<img
						src={item.doughnut.image}
						alt=""
						className="h-8 w-8 rounded-full object-cover"
					/>
				) : (
					<span aria-hidden>{item.doughnut.image}</span>
				)}
			</div>
			<div className="min-w-0">
				<div className="truncate font-medium text-pink-900 dark:text-pink-100">
					{item.doughnut.name}
				</div>
				<div className="text-xs text-pink-700/70 dark:text-pink-200/70">
					Max {item.doughnut.stock}
				</div>
			</div>
			<input
				type="number"
				value={item.quantity}
				onChange={(e) => updateQuantity(parseInt(e.target.value, 10) || 1)}
				min={1}
				max={item.doughnut.stock}
				className="h-9 w-16 rounded-md border border-pink-200 bg-white/80 px-2 text-sm dark:bg-pink-900/30"
			/>
			<div className="flex items-center gap-3">
				<span className="inline-block w-[7ch] text-right tabular-nums text-sm font-semibold text-blue-700 dark:text-blue-200">
					{formatCurrency(item.doughnut.price * item.quantity, currency)}
				</span>
				<button
					type="button"
					onClick={removeItem}
					className="h-8 w-8 inline-flex items-center justify-center rounded-full bg-pink-100 text-pink-700 hover:bg-pink-200 dark:bg-pink-900/40 dark:text-pink-200 cursor-pointer active:translate-y-px transition-transform"
					aria-label={`Remove ${item.doughnut.name}`}
				>
					×
				</button>
			</div>
		</div>
	);
}

// Cart header with item count
export function CartHeader() {
	const { itemCount, isOpen } = useStore(cartStore);
	const toggleCart = () => cartStore.update({ type: "TOGGLE_CART" });
	return (
		<header className="flex items-center justify-between py-4">
			<div className="flex items-center gap-3">
				<img src="/doughnut.svg" alt="Sprinkles" className="h-8 w-8" />
				<h1 className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-pink-600 to-blue-600 bg-clip-text text-transparent">
					Sprinkles Doughnut Shoppe
				</h1>
			</div>
			<button
				type="button"
				onClick={toggleCart}
				className="inline-flex items-center gap-2 rounded-full bg-pink-600 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-pink-500 cursor-pointer active:translate-y-px transition-transform"
			>
				<span>🛒</span>
				Cart
				<span className="ml-1 rounded-full bg-white/20 px-2 py-0.5 text-xs">
					{itemCount}
				</span>
				<span className="ml-1">{isOpen ? "▼" : "▶"}</span>
			</button>
		</header>
	);
}

export function ShoppingCart() {
	const { items, total, isOpen } = useStore(cartStore);
	const { currency } = useStore(userPrefsStore);
	const clearCart = () => cartStore.update({ type: "CLEAR_CART" });
	if (!isOpen) return null;

	return (
		<section className="mt-4 rounded-2xl border border-pink-200/60 bg-white/80 dark:bg-pink-950/40 p-4 shadow">
			<h2 className="text-lg font-bold text-pink-900 dark:text-pink-100">
				Your Cart
			</h2>
			{items.length === 0 ? (
				<p className="mt-2 text-sm text-pink-700/70 dark:text-pink-200/70">
					Your cart is empty
				</p>
			) : (
				<>
					<div className="divide-y divide-pink-200/60 dark:divide-pink-900/60">
						{items.map((item) => (
							<CartItemComponent key={item.doughnut.id} item={item} />
						))}
					</div>
					<div className="mt-4 flex items-center justify-between">
						<div className="text-base font-semibold text-blue-700 dark:text-blue-200">
							Total: {formatCurrency(total, currency)}
						</div>
						<div className="flex items-center gap-2">
							<button
								type="button"
								onClick={clearCart}
								className="rounded-lg border border-pink-300 px-3 py-2 text-sm font-medium text-pink-700 hover:bg-pink-50 dark:border-pink-800 dark:text-pink-200 dark:hover:bg-pink-900/30 cursor-pointer active:translate-y-px transition-transform"
							>
								Clear Cart
							</button>
							<button
								type="button"
								className="rounded-lg bg-gradient-to-r from-pink-500 to-blue-500 px-3 py-2 text-sm font-semibold text-white shadow cursor-pointer active:translate-y-px transition-transform"
							>
								Checkout
							</button>
						</div>
					</div>
				</>
			)}
		</section>
	);
}
