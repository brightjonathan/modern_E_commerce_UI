"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { mainNav } from "@/Data/Navigation";

const Navbar = () => {

   const pathname = usePathname();
  return (
     <nav className="hidden items-center gap-1 lg:flex" aria-label="Main">
      {mainNav.map((item) => {
        const active =
          item.href === "/" ? pathname === "/" : pathname.startsWith(item.href) && !item.children;
        return (
          <div key={item.label} className="group relative">
            <Link
              href={item.href}
              className={`relative flex items-center gap-1 px-4 py-2 text-sm font-semibold transition-colors ${
                active ? "text-brand-600" : "text-slate-700 hover:text-brand-600"
              }`}
            >
              {item.label}
              {item.children && (
                <svg className="h-4 w-4 transition-transform duration-300 group-hover:rotate-180" viewBox="0 0 20 20" fill="currentColor"><path d="M5.3 7.3a1 1 0 011.4 0L10 10.6l3.3-3.3a1 1 0 111.4 1.4l-4 4a1 1 0 01-1.4 0l-4-4a1 1 0 010-1.4z" /></svg>
              )}
              <span
                className={`absolute inset-x-4 -bottom-0.5 h-0.5 origin-left rounded-full bg-brand-600 transition-transform duration-300 ${
                  active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                }`}
              />
            </Link>

            {item.children && (
              <div className="invisible absolute top-full left-1/2 z-50 w-64 -translate-x-1/2 translate-y-2 pt-3 opacity-0 transition-all duration-300 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white p-2 shadow-2xl shadow-slate-900/10">
                  {item.children.map((c) => (
                    <Link
                      key={c.href}
                      href={c.href}
                      className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-brand-50 hover:text-brand-700"
                    >
                      <span className="grid h-9 w-9 place-items-center rounded-lg bg-slate-100 text-lg">{c.emoji}</span>
                      {c.label}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </nav>
  )
};

export default Navbar;
