import { useCallback, useEffect, useState } from "react";
import { SEED_ITEMS, type Item } from "./inventory-data";

const LISTINGS_KEY = "campuscart.listings.v1";
const CART_KEY = "campuscart.cart.v1";
const MY_KEY = "campuscart.mine.v1";

function read<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function write<T>(key: string, value: T) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(key, JSON.stringify(value));
  window.dispatchEvent(new CustomEvent("campuscart:change", { detail: key }));
}

function useLocalStore<T>(key: string, initial: T) {
  const [value, setValue] = useState<T>(initial);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setValue(read(key, initial));
    setReady(true);
    const onChange = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      if (detail === key) setValue(read(key, initial));
    };
    window.addEventListener("campuscart:change", onChange);
    window.addEventListener("storage", () => setValue(read(key, initial)));
    return () => window.removeEventListener("campuscart:change", onChange);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  const update = useCallback(
    (next: T | ((prev: T) => T)) => {
      setValue((prev) => {
        const n =
          typeof next === "function" ? (next as (p: T) => T)(prev) : next;
        write(key, n);
        return n;
      });
    },
    [key],
  );

  return [value, update, ready] as const;
}

/* Listings = seed + user-added */
export function useListings() {
  const [userItems, setUserItems] = useLocalStore<Item[]>(LISTINGS_KEY, []);
  const all: Item[] = [...userItems, ...SEED_ITEMS];
  return { all, userItems, setUserItems };
}

export function useItem(id: string | undefined) {
  const { all } = useListings();
  return all.find((i) => i.id === id);
}

/* My listings (ids added by me) */
export function useMine() {
  return useLocalStore<string[]>(MY_KEY, []);
}

/* Cart */
export interface CartLine {
  itemId: string;
  qty: number;
}
export function useCart() {
  const [cart, setCart] = useLocalStore<CartLine[]>(CART_KEY, []);

  const add = (itemId: string, qty = 1) =>
    setCart((prev) => {
      const found = prev.find((l) => l.itemId === itemId);
      if (found)
        return prev.map((l) =>
          l.itemId === itemId ? { ...l, qty: l.qty + qty } : l,
        );
      return [...prev, { itemId, qty }];
    });

  const remove = (itemId: string) =>
    setCart((prev) => prev.filter((l) => l.itemId !== itemId));

  const setQty = (itemId: string, qty: number) =>
    setCart((prev) =>
      qty <= 0
        ? prev.filter((l) => l.itemId !== itemId)
        : prev.map((l) => (l.itemId === itemId ? { ...l, qty } : l)),
    );

  const clear = () => setCart([]);

  return { cart, add, remove, setQty, clear };
}

export function newItemId() {
  return `user-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;
}
