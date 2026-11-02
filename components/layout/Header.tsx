"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Navbar from "./Navbar";
import MobileMenu from "./MobileMenu";
import useCart from "@/Hooks/useCart";
import useWishlist from "@/Hooks/useWishlist";
import useCompare from "@/Hooks/useCompare";

const icon = {
  search: "M21 21l-4.3-4.3M11 19a8 8 0 100-16 8 8 0 000 16z",
  heart: "M20.8 4.6a5.5 5.5 0 00-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 00-7.8 7.8l1 1.1L12 21.2l7.8-7.7 1-1.1a5.5 5.5 0 000-7.8z",
  user: "M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2M12 11a4 4 0 100-8 4 4 0 000 8z",
  bag: "M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4zM3 6h18M16 10a4 4 0 01-8 0",
  compare: "M16 3h5v5M4 20L21 3M21 16v5h-5M15 15l6 6M4 4l5 5",
};

function Icon({ d }) {
  return (
    <svg className="h-[22px] w-[22px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d={d} />
    </svg>
  );
}

function IconLink({ href, label, d, count, className = "" }) {
  return (
    <Link
      href={href}
      aria-label={label}
      className={`relative grid h-11 w-11 place-items-center rounded-full text-slate-700 transition-all duration-300 hover:bg-slate-100 hover:text-brand-600 ${className}`}
    >
      <Icon d={d} />
      {count > 0 && (
        <span
          key={count}
          className="absolute top-0.5 right-0.5 grid h-5 min-w-5 animate-scale-in place-items-center rounded-full bg-brand-600 px-1 text-[10px] font-bold text-white ring-2 ring-white"
        >
          {count}
        </span>
      )}
    </Link>
  );
}

const Header = () => {

  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const { count: cartCount } = useCart();
  const { count: wishCount } = useWishlist();
  const { count: compareCount } = useCompare();
  const closeMenu = useCallback(() => setMenu(false), []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const submit = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    setSearchOpen(false);
    router.push(`/search?q=${encodeURIComponent(query.trim())}`);
  };

  const renderSearch = (autoFocus) => (
    <form onSubmit={submit} className="relative w-full">
      <input
        autoFocus={autoFocus}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search products, brands, categories…"
        className="h-11 w-full rounded-full border border-transparent bg-slate-100 pr-12 pl-5 text-sm transition-all duration-300 placeholder:text-slate-400 focus:border-brand-500 focus:bg-white focus:shadow-lg focus:shadow-brand-500/10"
      />
      <button type="submit" aria-label="Search" className="absolute top-1/2 right-1.5 grid h-8 w-8 -translate-y-1/2 place-items-center rounded-full bg-brand-600 text-white transition hover:bg-brand-700">
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><path d={icon.search} /></svg>
      </button>
    </form>
  );

  return (
   <>
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled ? "glass border-b border-slate-200/80 shadow-sm shadow-slate-900/5" : "border-b border-transparent bg-white"
        }`}
      >
        <div className={`container-x flex items-center gap-3 transition-all duration-300 sm:gap-6 ${scrolled ? "h-16" : "h-[72px]"}`}>
          <button onClick={() => setMenu(true)} aria-label="Open menu" className="grid h-11 w-11 place-items-center rounded-full hover:bg-slate-100 lg:hidden">
            <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M4 7h16M4 12h10M4 17h16" /></svg>
          </button>

          <Link href="/" className="flex shrink-0 items-center gap-2.5" aria-label="LumaShop home">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-brand-500 to-violet-600 text-white shadow-lg shadow-brand-600/30 transition-transform duration-300 hover:rotate-6">
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d={icon.bag} /></svg>
            </span>
            <span className="hidden font-display text-xl font-extrabold tracking-tight sm:block">
              Luma<span className="text-brand-600">Shop</span>
            </span>
          </Link>

          <div className="hidden flex-1 justify-center lg:flex">
            <Navbar />
          </div>

          <div className="hidden max-w-xs flex-1 xl:block">
            {renderSearch(false)}
          </div>

          <div className="ml-auto flex items-center gap-0.5 sm:gap-1">
            <button onClick={() => setSearchOpen((s) => !s)} aria-label="Toggle search" className="grid h-11 w-11 place-items-center rounded-full text-slate-700 hover:bg-slate-100 xl:hidden">
              <Icon d={icon.search} />
            </button>
            <IconLink href="/compare" label="Compare" d={icon.compare} count={compareCount} className="hidden sm:grid" />
            <IconLink href="/wishlist" label="Wishlist" d={icon.heart} count={wishCount} className="hidden sm:grid" />
            <IconLink href="/account" label="Account" d={icon.user} className="hidden md:grid" />
            <IconLink href="/cart" label="Cart" d={icon.bag} count={cartCount} />
          </div>
        </div>

        {/* Mobile / tablet search drawer */}
        <div className={`grid transition-all duration-300 xl:hidden ${searchOpen ? "grid-rows-[1fr] border-t border-slate-100" : "grid-rows-[0fr]"}`}>
          <div className="overflow-hidden">
            <div className="container-x py-3">
              {searchOpen && renderSearch(true)}
            </div>
          </div>
        </div>
      </header>

      <MobileMenu open={menu} onClose={closeMenu} />
    </>
  )
}

export default Header;



