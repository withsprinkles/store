import { useCallback, useMemo, useSyncExternalStore } from "react";

const STORE = Symbol.for("@withsprinkles/store");

class StoreImpl<Value, Action> extends EventTarget {
	[STORE] = undefined as never;

	#value: Value;
	#reducer?: (previousValue: Value, action: Action) => Value;

	constructor(
		initialValue: Value,
		reducer?: (previousValue: Value, action: Action) => Value,
	) {
		super();
		this.#value = initialValue;
		this.#reducer = reducer;
	}

	getSnapshot(): Value {
		return this.#value;
	}

	subscribe(callback: () => void): () => void {
		this.addEventListener("update", callback);
		return () => this.removeEventListener("update", callback);
	}

	update(action: Action): void {
		const newValue = this.#reducer
			? this.#reducer(this.#value, action)
			: (action as unknown as Value);

		if (newValue !== this.#value) {
			this.#value = newValue;
			this.dispatchEvent(new CustomEvent("update"));
		}
	}
}

/**
 * The return value of `createStore`.
 */
export interface Store<out Value, in Action> {
	// private brand because only values from `createStore` are useable,
	// not arbitrary objects matching the shape.
	[STORE]: never;
	update: (action: Action) => void;
	// getSnapshot(): Value;
	// subscribe(callback: () => void): () => void;
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
export function createStore<Value, Action>(
	initialValue: Value,
	reducer?: (previousValue: Value, action: Action) => Value,
): Store<Value, Action> {
	return new StoreImpl(initialValue, reducer);
}

export function useStore<Value, Action>(store: Store<Value, Action>): Value {
	const _store = useMemo(() => store as StoreImpl<Value, Action>, [store]);
	const subscribe = useCallback(
		(callback: () => void) => _store.subscribe(callback),
		[_store],
	);
	const getSnapshot = useCallback(() => _store.getSnapshot(), [_store]);
	return useSyncExternalStore(subscribe, getSnapshot, getSnapshot);
}
