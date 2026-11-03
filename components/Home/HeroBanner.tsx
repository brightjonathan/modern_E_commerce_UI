"use client";

import { useEffect, useState } from "react";
import Button from "../ui/Button";
import { ProductImage } from "../Products/ProductCard";
import { getProductById } from "@/lib/ProductHelpers";
import { formatCurrency } from "@/lib/FormatCurrency";


const slides = [
  {
    eyebrow: "New season · 2026",
    title: "Sound that moves",
    highlight: "with you.",
    text: "Studio-grade audio, all-day comfort. Discover headphones and speakers engineered for people who love music.",
    cta: { label: "Shop audio", href: "/categories/audio" },
    productId: 1,
    bg: "from-indigo-50 via-white to-pink-50",
    blob: ["bg-brand-300/50", "bg-pink-300/50"],
  },
  {
    eyebrow: "Tech essentials",
    title: "Smart gear for a",
    highlight: "smarter day.",
    text: "From 4K displays to wearables that keep up — upgrade your setup with the best in modern electronics.",
    cta: { label: "Shop electronics", href: "/categories/electronics" },
    productId: 5,
    bg: "from-sky-50 via-white to-indigo-50",
    blob: ["bg-sky-300/50", "bg-indigo-300/50"],
  },
  {
    eyebrow: "Streetwear drop",
    title: "Step into",
    highlight: "something fresh.",
    text: "Lightweight sneakers and performance outerwear designed for comfort, built for every kind of weather.",
    cta: { label: "Shop fashion", href: "/categories/fashion" },
    productId: 3,
    bg: "from-amber-50 via-white to-rose-50",
    blob: ["bg-amber-300/50", "bg-rose-300/50"],
  },
];

const HeroBanner = () => {

  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setActive((a) => (a + 1) % slides.length), 6000);
    return () => clearInterval(t);
  }, [paused]);

  const slide = slides[active];
  const product = getProductById(slide.productId);


  return (
   <section
      className={`relative overflow-hidden bg-gradient-to-br transition-colors duration-1000 ${slide.bg}`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className={`absolute -top-20 -left-20 h-80 w-80 animate-blob rounded-full blur-3xl transition-colors duration-1000 ${slide.blob[0]}`} />
      <div className={`absolute -right-20 bottom-0 h-96 w-96 animate-blob rounded-full blur-3xl transition-colors duration-1000 [animation-delay:-7s] ${slide.blob[1]}`} />

      <div className="container-x relative grid min-h-[600px] items-center gap-10 py-14 sm:py-20 lg:min-h-[680px] lg:grid-cols-2">
        {/* Copy */}
        <div key={active} className="order-2 text-center lg:order-1 lg:text-left">
          <span className="inline-flex animate-fade-up items-center gap-2 rounded-full border border-brand-200 bg-white/80 px-4 py-1.5 text-xs font-bold tracking-wider text-brand-700 uppercase backdrop-blur">
            <span className="h-2 w-2 animate-pulse rounded-full bg-brand-500" />
            {slide.eyebrow}
          </span>
          <h1 className="mt-6 animate-fade-up font-display text-4xl leading-[1.08] font-extrabold tracking-tight [animation-delay:100ms] sm:text-5xl lg:text-6xl xl:text-7xl">
            {slide.title}
            <br />
            <span className="text-gradient">{slide.highlight}</span>
          </h1>
          <p className="mx-auto mt-6 max-w-lg animate-fade-up text-base text-slate-600 [animation-delay:200ms] sm:text-lg lg:mx-0">
            {slide.text}
          </p>
          <div className="mt-8 flex animate-fade-up flex-col items-center gap-3 [animation-delay:300ms] sm:flex-row sm:justify-center lg:justify-start">
            <Button href={slide.cta.href} size="lg" className="w-full sm:w-auto">
              {slide.cta.label}
              <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" viewBox="0 0 20 20" fill="currentColor"><path d="M10.3 3.3a1 1 0 011.4 0l6 6a1 1 0 010 1.4l-6 6a1 1 0 01-1.4-1.4L14.6 11H3a1 1 0 110-2h11.6l-4.3-4.3a1 1 0 010-1.4z" /></svg>
            </Button>
            <Button href="/products" variant="outline" size="lg" className="w-full sm:w-auto">
              Browse all
            </Button>
          </div>

          <div className="mt-10 flex animate-fade-up items-center justify-center gap-8 [animation-delay:400ms] lg:justify-start">
            {[
              ["25k+", "Happy customers"],
              ["4.9★", "Average rating"],
              ["48h", "Fast delivery"],
            ].map(([n, l]) => (
              <div key={l}>
                <p className="font-display text-2xl font-extrabold">{n}</p>
                <p className="text-xs text-slate-500">{l}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Visual */}
        <div key={`v-${active}`} className="relative order-1 mx-auto w-full max-w-[420px] animate-scale-in lg:order-2 lg:max-w-[520px]">
          <div className="absolute inset-6 rotate-6 rounded-[3rem] bg-gradient-to-br from-brand-500 to-pink-500 opacity-20 blur-sm" />
          <div className="relative animate-float">
            <ProductImage
              product={product}
              className="aspect-square rounded-[3rem] shadow-2xl shadow-brand-900/20"
            />
          </div>

          <div className="absolute -bottom-4 -left-2 animate-float rounded-2xl bg-white p-3 pr-5 shadow-xl [animation-delay:-2s] sm:-left-8">
            <div className="flex items-center gap-3">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-brand-50 text-xl">{product.emoji}</span>
              <div>
                <p className="max-w-[140px] truncate text-sm font-bold">{product.name}</p>
                <p className="text-sm font-semibold text-brand-600">{formatCurrency(product.price)}</p>
              </div>
            </div>
          </div>

          <div className="absolute -top-2 -right-2 animate-float rounded-2xl bg-slate-900 px-4 py-3 text-center text-white shadow-xl [animation-delay:-4s] sm:-right-6">
            <p className="text-[10px] font-semibold tracking-wider text-slate-400 uppercase">From</p>
            <p className="font-display text-xl font-extrabold">{formatCurrency(product.price)}</p>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="absolute inset-x-0 bottom-6 z-10 flex items-center justify-center gap-3">
        {slides.map((s, i) => (
          <button
            key={s.title}
            onClick={() => setActive(i)}
            aria-label={`Go to slide ${i + 1}`}
            className="group py-2"
          >
            <span className={`block h-1.5 overflow-hidden rounded-full bg-slate-300 transition-all duration-500 ${active === i ? "w-12" : "w-6 group-hover:bg-slate-400"}`}>
              {active === i && (
                <span
                  key={paused ? "p" : "r"}
                  className="block h-full origin-left animate-[progress_6s_linear] rounded-full bg-brand-600"
                  style={paused ? { width: "100%", animation: "none" } : undefined}
                />
              )}
            </span>
          </button>
        ))}
      </div>

      <style>{`@keyframes progress { from { transform: scaleX(0) } to { transform: scaleX(1) } }`}</style>
    </section>
  )
}

export default HeroBanner;