"use client";

import { useContext } from "react";
import { ShopContext } from "@/context/ShopContext";

export default function useWishlist() {
  const { wishlist, dispatch, notify } = useContext(ShopContext);

  return {
    wishlist,
    count: wishlist.length,
    has: (id) => wishlist.includes(id),
    toggle: (product) => {
      const had = wishlist.includes(product.id);
      dispatch({ type: "TOGGLE_WISHLIST", id: product.id });
      notify(had ? "Removed from wishlist" : "Saved to wishlist");
    },
  };
};
