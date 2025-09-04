# Sprinkles Store

This React store uses a simple [`EventTarget`](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget)-backed implementation to prove out the [API for React's upcoming concurrent store](https://github.com/facebook/react/pull/33215) ([types](https://github.com/DefinitelyTyped/DefinitelyTyped/pull/72826)).

For more info on the React Team's plans for this API, [check out the React Labs post](https://react.dev/blog/2025/04/23/react-labs-view-transitions-activity-and-more#concurrent-stores):

![screenshot of the aforementioned concurrent stores section of the React Labs post](https://private-user-images.githubusercontent.com/2440089/444222628-33373bb2-258f-4649-b521-32cc4c3e1393.png?jwt=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3NTcwMTk2MzYsIm5iZiI6MTc1NzAxOTMzNiwicGF0aCI6Ii8yNDQwMDg5LzQ0NDIyMjYyOC0zMzM3M2JiMi0yNThmLTQ2NDktYjUyMS0zMmNjNGMzZTEzOTMucG5nP1gtQW16LUFsZ29yaXRobT1BV1M0LUhNQUMtU0hBMjU2JlgtQW16LUNyZWRlbnRpYWw9QUtJQVZDT0RZTFNBNTNQUUs0WkElMkYyMDI1MDkwNCUyRnVzLWVhc3QtMSUyRnMzJTJGYXdzNF9yZXF1ZXN0JlgtQW16LURhdGU9MjAyNTA5MDRUMjA1NTM2WiZYLUFtei1FeHBpcmVzPTMwMCZYLUFtei1TaWduYXR1cmU9ODAzMjk2Yjg3ODM1NGJmNjRhM2E2OTUxOTQwNDcxMDFmY2IyNDEwNzBiNTk2YzJkNDkzOWM0Mzg2Njk3YzYyYiZYLUFtei1TaWduZWRIZWFkZXJzPWhvc3QifQ.xny6mqGPNgdppFW9xzkBVziV_ShI4c3sCj7FtaPlpVc)

## API

The store API only differs from React's proposed concurrent store API in that the hook to access the store inside of components is named `useStore()`, because, well, `use()` is taken.

```ts
export interface Store<out Value, in Action> {
	// private brand because only values from `createStore` are useable,
	// not arbitrary objects matching the shape.
	[STORE]: never;
	update: (action: Action) => void;
}

export function createStore<Value>(initialValue: Value): Store<Value, Value>;
export function createStore<Value>(
	initialValue: Value,
	reducer: (previousValue: Value) => Value,
): Store<Value, void>;
export function createStore<Value, Action>(
	initialValue: Value,
	reducer?: (previousValue: Value, action: Action) => Value,
): Store<Value, Action>;

// for React's built-in concurrent store, this will just be `use()` as it exists today
export function useStore<Value, Action>(store: Store<Value, Action>): Value;
```

You can see an example usage of this store API in the demo application at [`/apps/sprinkles-doughnut-shoppe`](/apps/sprinkles-doughnut-shoppe) with a [live example here]().

## Usage

Create a store:

```ts
import { createStore } from "@withsprinkles/store";

export type ViewState = { category: string };

export const viewStore = createStore<ViewState, Partial<ViewState>>(
	{ category: "All" },
	(state, updates) => ({ ...state, ...updates }),
);
```

Use your store in a component with the hook and it'll update automatically:

```tsx
import { doughnuts } from "~/lib/data";

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
			<main>
                <div>
                    {categories.map((category) => (
                        <button
                            key={category}
                            type="button"
                            onClick={() => viewStore.update({ category: category })}
                            className={view.category === category
                                    ? "bg-pink-600 text-white"
                                    : "bg-pink-100 text-pink-800 hover:bg-pink-200 dark:bg-pink-900/40 dark:text-pink-200"}
                        >
                            {category}
                        </button>
                    ))}
                </div>

				<section>
					{filtered.map((product) => (
						<ProductCard key={product.id} product={product} />
					))}
				</section>
			</main>
	);
}
```