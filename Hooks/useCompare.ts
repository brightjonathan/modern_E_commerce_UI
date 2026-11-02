"use client";

import { useContext } from "react";
import { ShopContext } from "@/context/ShopContext";

export default function useCompare() {
  const { compare, dispatch, notify } = useContext(ShopContext);

  return {
    compare,
    count: compare.length,
    has: (id) => compare.includes(id),
    toggle: (product) => {
      if (!compare.includes(product.id) && compare.length >= 3) {
        notify("You can compare up to 3 products");
        return;
      }
      dispatch({ type: "TOGGLE_COMPARE", id: product.id });
    },
    clear: () => dispatch({ type: "CLEAR_COMPARE" }),
  };
}
