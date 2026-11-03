"use client";

import { useState } from "react";
import Link from "next/link";
import Badge from "../ui/Badge";
import Model from "../ui/Model";
import Rating from "../ui/Rating";
import Button from "@/components/ui/Button";
import useCart from "@/Hooks/useCart";
import useWishlist from "@/Hooks/useWishlist";
import useCompare from "@/Hooks/useCompare";
import { formatCurrency } from "@/lib/FormatCurrency";
import { getDiscount } from "@/lib/ProductHelpers";


/** Product image with a graceful gradient + emoji fallback if the image fails to load. */
export function ProductImage({ product, src, className = "", imgClassName = "" }) {
  const [failed, setFailed] = useState(false);
  const url = src ?? product.image;

  return (
    <div className={`relative overflow-hidden bg-gradient-to-br ${product.gradient} ${className}`}>
      {failed || !url ? (
        <div className="absolute inset-0 grid place-items-center text-6xl drop-shadow-lg sm:text-7xl">
          {product.emoji}
        </div>
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={url}
          alt={product.name}
          loading="lazy"
          onError={() => setFailed(true)}
          className={`h-full w-full object-cover ${imgClassName}`}
        />
      )}
    </div>
  );
}

function HeartIcon({ filled }) {
  return (
    <svg className="h-[18px] w-[18px]" viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.8 4.6a5.5 5.5 0 00-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 00-7.8 7.8l1 1.1L12 21.2l7.8-7.7 1-1.1a5.5 5.5 0 000-7.8z" />
    </svg>
  );
}


const ProductCard = ({ product, layout = "grid" }) => {

  const { add } = useCart();
  const wishlist = useWishlist();
  const compare = useCompare();
  const [quick, setQuick] = useState(false);
  const discount = getDiscount(product);
  const liked = wishlist.has(product.id);
  const comparing = compare.has(product.id);
  const secondImage = product.images?.[1];

  const actionBtn =
    "grid h-10 w-10 place-items-center rounded-full bg-white text-slate-700 shadow-lg transition-all duration-300 hover:scale-110 hover:bg-slate-900 hover:text-white";

  return (
    <>
      <article
        className={`group relative ${layout === "list" ? "flex gap-4 sm:gap-6" : "flex flex-col"}`}
      >
        <div
          className={`relative overflow-hidden rounded-2xl bg-slate-100 ${
            layout === "list" ? "w-36 shrink-0 sm:w-56" : "w-full"
          }`}
        >
          <Link href={`/products/${product.slug}`} className="block" aria-label={product.name}>
            <div className="relative aspect-[4/5]">
              <ProductImage
                product={product}
                className="absolute inset-0"
                imgClassName="transition-transform duration-700 ease-out group-hover:scale-110"
              />
              {secondImage && (
                <ProductImage
                  product={product}
                  src={secondImage}
                  className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  imgClassName="scale-105"
                />
              )}
            </div>
          </Link>

          <div className="pointer-events-none absolute top-3 left-3 flex flex-col gap-1.5">
            {product.badge && (
              <Badge tone={product.badge.startsWith("-") ? "sale" : "dark"}>{product.badge}</Badge>
            )}
            {product.stock <= 12 && <Badge tone="warning">Only {product.stock} left</Badge>}
          </div>

          {/* Floating actions */}
          <div className="absolute top-3 right-3 flex flex-col gap-2">
            <button
              onClick={() => wishlist.toggle(product)}
              aria-label="Toggle wishlist"
              className={`${actionBtn} ${liked ? "!bg-rose-500 !text-white" : ""}`}
            >
              <HeartIcon filled={liked} />
            </button>
            <button
              onClick={() => setQuick(true)}
              aria-label="Quick view"
              className={`${actionBtn} translate-x-12 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 max-lg:translate-x-0 max-lg:opacity-100`}
            >
              <svg className="h-[18px] w-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            </button>
            <button
              onClick={() => compare.toggle(product)}
              aria-label="Compare"
              className={`${actionBtn} translate-x-12 opacity-0 delay-75 group-hover:translate-x-0 group-hover:opacity-100 max-lg:translate-x-0 max-lg:opacity-100 ${
                comparing ? "!bg-brand-600 !text-white" : ""
              }`}
            >
              <svg className="h-[18px] w-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 3h5v5M4 20L21 3M21 16v5h-5M15 15l6 6M4 4l5 5" />
              </svg>
            </button>
          </div>

          {/* Add to cart slide-up (desktop). On touch devices the button sits under the card. */}
          {layout === "grid" && (
            <div className="absolute inset-x-3 bottom-3 translate-y-[140%] transition-transform duration-500 ease-out group-hover:translate-y-0 max-lg:hidden">
              <Button onClick={() => add(product)} className="w-full" variant="dark">
                Add to cart
              </Button>
            </div>
          )}
        </div>

        <div className={`${layout === "list" ? "flex flex-1 flex-col justify-center" : "pt-4"}`}>
          <p className="text-xs font-semibold tracking-wider text-slate-400 uppercase">{product.brand}</p>
          <Link href={`/products/${product.slug}`}>
            <h3 className="mt-1 line-clamp-2 font-semibold text-slate-900 transition-colors group-hover:text-brand-600">
              {product.name}
            </h3>
          </Link>
          <div className="mt-1.5">
            <Rating value={product.rating} reviews={product.reviews} />
          </div>
          {layout === "list" && (
            <p className="mt-2 hidden line-clamp-2 text-sm text-slate-500 sm:block">{product.description}</p>
          )}
          <div className="mt-2 flex flex-wrap items-center gap-x-2">
            <span className="text-lg font-bold text-slate-900">{formatCurrency(product.price)}</span>
            {product.oldPrice && (
              <>
                <span className="text-sm text-slate-400 line-through">{formatCurrency(product.oldPrice)}</span>
                <span className="text-xs font-bold text-emerald-600">Save {discount}%</span>
              </>
            )}
          </div>
          <div className="mt-2.5 flex items-center gap-1.5">
            {product.colors.map((c) => (
              <span key={c} className="h-3.5 w-3.5 rounded-full ring-1 ring-slate-300 ring-offset-1" style={{ background: c }} />
            ))}
          </div>
          <Button
            onClick={() => add(product)}
            variant="outline"
            size="sm"
            className={`mt-3 ${layout === "grid" ? "w-full lg:hidden" : "w-fit"}`}
          >
            Add to cart
          </Button>
        </div>
      </article>

      {/* Quick view */}
      <Model open={quick} onClose={() => setQuick(false)} title={product.name} size="lg">
        <div className="grid gap-0 sm:grid-cols-2">
          <ProductImage product={product} className="aspect-square sm:aspect-auto sm:min-h-[420px]" />
          <div className="flex flex-col p-6 sm:p-8">
            <p className="text-xs font-semibold tracking-wider text-brand-600 uppercase">{product.brand}</p>
            <h3 className="mt-1 font-display text-2xl font-bold">{product.name}</h3>
            <div className="mt-2"><Rating value={product.rating} reviews={product.reviews} showValue /></div>
            <div className="mt-4 flex items-baseline gap-2">
              <span className="text-3xl font-extrabold">{formatCurrency(product.price)}</span>
              {product.oldPrice && <span className="text-slate-400 line-through">{formatCurrency(product.oldPrice)}</span>}
            </div>
            <p className="mt-4 text-sm leading-relaxed text-slate-600">{product.description}</p>
            <ul className="mt-4 space-y-1.5 text-sm text-slate-600">
              {product.features.slice(0, 3).map((f) => (
                <li key={f} className="flex items-center gap-2">
                  <span className="grid h-4 w-4 place-items-center rounded-full bg-emerald-100 text-[10px] text-emerald-600">✓</span>
                  {f}
                </li>
              ))}
            </ul>
            <div className="mt-auto flex flex-col gap-3 pt-6 sm:flex-row">
              <Button className="flex-1" onClick={() => { add(product); setQuick(false); }}>Add to cart</Button>
              <Button href={`/products/${product.slug}`} variant="outline" className="flex-1">View details</Button>
            </div>
          </div>
        </div>
      </Model>
    </>
  )
}

export default ProductCard;
