
"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
  type ReactNode,
} from "react";

type CartItem = {
  id: string;
  qty: number;
  color?: string;
};

type ShopState = {
  cart: CartItem[];
  wishlist: string[];
  compare: string[];
};

type ShopAction =
  | { type: "HYDRATE"; payload: Partial<ShopState> }
  | { type: "ADD_CART"; id: string; qty?: number; color?: string }
  | { type: "SET_QTY"; id: string; qty: number; color?: string }
  | { type: "REMOVE_CART"; id: string; color?: string }
  | { type: "CLEAR_CART" }
  | { type: "TOGGLE_WISHLIST"; id: string }
  | { type: "TOGGLE_COMPARE"; id: string }
  | { type: "CLEAR_COMPARE" };

type Toast = {
  message: string;
  key: number;
};

type ShopContextType = ShopState & {
  dispatch: React.Dispatch<ShopAction>;
  hydrated: boolean;
  toast: Toast | null;
  notify: (message: string) => void;
};

type ShopProviderProps = {
  children: ReactNode;
};

export const ShopContext = createContext<ShopContextType | null>(null);

const initialState: ShopState = {
  cart: [],
  wishlist: [],
  compare: [],
};

function reducer(state: ShopState, action: ShopAction): ShopState {
  switch (action.type) {
    case "HYDRATE":
      return { ...initialState, ...action.payload };

    case "ADD_CART": {
      const { id, qty = 1, color } = action;

      const exists = state.cart.find(
        (item) => item.id === id && item.color === color
      );

      return {
        ...state,
        cart: exists
          ? state.cart.map((item) =>
              item === exists
                ? { ...item, qty: item.qty + qty }
                : item
            )
          : [...state.cart, { id, qty, color }],
      };
    }

    case "SET_QTY":
      return {
        ...state,
        cart: state.cart.map((item) =>
          item.id === action.id && item.color === action.color
            ? { ...item, qty: Math.max(1, action.qty) }
            : item
        ),
      };

    case "REMOVE_CART":
      return {
        ...state,
        cart: state.cart.filter(
          (item) =>
            !(item.id === action.id && item.color === action.color)
        ),
      };

    case "CLEAR_CART":
      return { ...state, cart: [] };

    case "TOGGLE_WISHLIST":
      return {
        ...state,
        wishlist: state.wishlist.includes(action.id)
          ? state.wishlist.filter((id) => id !== action.id)
          : [...state.wishlist, action.id],
      };

    case "TOGGLE_COMPARE":
      if (state.compare.includes(action.id)) {
        return {
          ...state,
          compare: state.compare.filter((id) => id !== action.id),
        };
      }

      if (state.compare.length >= 3) return state;

      return {
        ...state,
        compare: [...state.compare, action.id],
      };

    case "CLEAR_COMPARE":
      return { ...state, compare: [] };

    default:
      return state;
  }
}

export function ShopProvider({ children }: ShopProviderProps) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [hydrated, setHydrated] = useState(false);
  const [toast, setToast] = useState<Toast | null>(null);

  // Load saved state from localStorage.
  useEffect(() => {
    try {
      const saved = localStorage.getItem("lumashop-state");

      if (saved) {
        dispatch({
          type: "HYDRATE",
          payload: JSON.parse(saved) as Partial<ShopState>,
        });
      }
    } catch {
      // Ignore invalid or unavailable localStorage data.
    }

    setHydrated(true);
  }, []);

  // Persist state after hydration.
  useEffect(() => {
    if (!hydrated) return;

    try {
      localStorage.setItem("lumashop-state", JSON.stringify(state));
    } catch {
      // Ignore localStorage write errors.
    }
  }, [state, hydrated]);

  // Automatically dismiss toast notifications.
  useEffect(() => {
    if (!toast) return;

    const timer = setTimeout(() => setToast(null), 2600);

    return () => clearTimeout(timer);
  }, [toast]);

  // Global scroll-reveal animation.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    const scan = () => {
      document
        .querySelectorAll(".reveal:not(.is-visible)")
        .forEach((element) => observer.observe(element));
    };

    scan();

    const mutationObserver = new MutationObserver(scan);

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
    };
  }, []);

  const notify = useCallback((message: string) => {
    setToast({ message, key: Date.now() });
  }, []);

  const value = useMemo<ShopContextType>(
    () => ({
      ...state,
      dispatch,
      hydrated,
      toast,
      notify,
    }),
    [state, hydrated, toast, notify]
  );

  return (
    <ShopContext.Provider value={value}>
      {children}

      <div
        aria-live="polite"
        className="pointer-events-none fixed inset-x-0 bottom-4 z-[100] flex justify-center px-4"
      >
        {toast && (
          <div
            key={toast.key}
            className="pointer-events-auto flex animate-scale-in items-center gap-3 rounded-full bg-slate-900 px-5 py-3 text-sm font-medium text-white shadow-2xl shadow-slate-900/30"
          >
            <span className="grid h-5 w-5 place-items-center rounded-full bg-emerald-500 text-[11px]">
              ✓
            </span>
            {toast.message}
          </div>
        )}
      </div>
    </ShopContext.Provider>
  );
}

// Type-safe hook for accessing the shop context.
export function useShop(): ShopContextType {
  const context = useContext(ShopContext);

  if (!context) {
    throw new Error("useShop must be used within a ShopProvider");
  }

  return context;
}
