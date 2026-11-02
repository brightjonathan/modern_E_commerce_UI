"use client";

import { useContext, useMemo } from "react";
import { ShopContext } from "@/context/ShopContext";
import { getProductById } from "@/lib/ProductHelpers";

export default function useCart() {
  const { cart, dispatch, notify } = useContext(ShopContext);

  const items = useMemo(
    () =>
      cart
        .map((i) => ({ ...i, product: getProductById(i.id) }))
        .filter((i) => i.product),
    [cart]
  );

  const count = items.reduce((n, i) => n + i.qty, 0);
  const subtotal = items.reduce((sum, i) => sum + i.product.price * i.qty, 0);
  const shipping = subtotal === 0 || subtotal >= 75 ? 0 : 8;
  const tax = Math.round(subtotal * 0.075 * 100) / 100;
  const total = subtotal + shipping + tax;

  return {
    items,
    count,
    subtotal,
    shipping,
    tax,
    total,
    add: (product, qty = 1, color) => {
      dispatch({ type: "ADD_CART", id: product.id, qty, color: color ?? product.colors?.[0] });
      notify(`${product.name} added to cart`);
    },
    setQty: (id, color, qty) => dispatch({ type: "SET_QTY", id, color, qty }),
    remove: (id, color) => dispatch({ type: "REMOVE_CART", id, color }),
    clear: () => dispatch({ type: "CLEAR_CART" }),
  };
}
