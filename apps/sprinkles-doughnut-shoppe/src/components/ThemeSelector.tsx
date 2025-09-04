import { useStore } from "@withsprinkles/store";
import { userPrefsStore } from "~/stores/preferences.store";

export function ThemeSelector() {
	const prefs = useStore(userPrefsStore);

	return (
		<div className="mt-2 flex flex-wrap items-center gap-3">
			<label className="text-sm text-pink-800 dark:text-pink-200">
				Theme:
				<select
					value={prefs.theme}
					onChange={(e) => {
						const theme = e.target.value as "light" | "dark";
						userPrefsStore.update({ theme });
						const root = document.documentElement;
						if (theme === "dark") root.classList.add("dark");
						else root.classList.remove("dark");
					}}
					className="ml-2 rounded-md border border-pink-300 bg-white/80 px-2 py-1 text-sm dark:border-pink-800 dark:bg-pink-900/30 cursor-pointer"
				>
					<option value="light">Light</option>
					<option value="dark">Dark</option>
				</select>
			</label>
			<label className="text-sm text-pink-800 dark:text-pink-200">
				Currency:
				<select
					value={prefs.currency}
					onChange={(e) =>
						userPrefsStore.update({
							currency: e.target.value as "USD" | "EUR" | "GBP",
						})
					}
					className="ml-2 rounded-md border border-pink-300 bg-white/80 px-2 py-1 text-sm dark:border-pink-800 dark:bg-pink-900/30 cursor-pointer"
				>
					<option value="USD">USD</option>
					<option value="EUR">EUR</option>
					<option value="GBP">GBP</option>
				</select>
			</label>
		</div>
	);
}
