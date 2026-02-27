import { CartItem } from "../../types";

const CART_KEY = "cart";

export const loadCart = (): CartItem[] => {
  const str = localStorage.getItem(CART_KEY);
  return str ? JSON.parse(str) : [];
};

export const saveCart = (items: CartItem[]) => {
  localStorage.setItem(CART_KEY, JSON.stringify(items));
};
