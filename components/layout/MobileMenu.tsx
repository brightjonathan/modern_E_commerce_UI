"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { mainNav } from "@/Data/Navigation";


const MobileMenu = ({ open, onClose }: { open: boolean; onClose: () => void }) => {

   const pathname = usePathname();
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    onClose();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);
  return (
    <div className={`fixed inset-0 z-[80] lg:hidden ${open ? "" : "pointer-events-none"}`} aria-hidden={!open}>
      <div
        onClick={onClose}
        className={`absolute inset-0 bg-slate-950/60 backdrop-blur-sm transition-opacity duration-300 ${open ? "opacity-100" : "opacity-0"}`}
      />
      <aside
        className={`absolute inset-y-0 left-0 flex w-[85%] max-w-sm flex-col bg-white shadow-2xl transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-16 items-center justify-between border-b border-slate-100 px-5">
          <Link href="/" className="font-display text-xl font-extrabold">
            Luma<span className="text-brand-600">Shop</span>
          </Link>
          <button onClick={onClose} aria-label="Close menu" className="grid h-10 w-10 place-items-center rounded-full bg-slate-100 transition hover:rotate-90">
            <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path d="M5.3 5.3a1 1 0 011.4 0L10 8.6l3.3-3.3a1 1 0 111.4 1.4L11.4 10l3.3 3.3a1 1 0 01-1.4 1.4L10 11.4l-3.3 3.3a1 1 0 01-1.4-1.4L8.6 10 5.3 6.7a1 1 0 010-1.4z" /></svg>
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 py-4">
          {mainNav.map((item, i) => (
            <div
              key={item.label}
              style={{ transitionDelay: open ? `${120 + i * 60}ms` : "0ms" }}
              className={`transition-all duration-500 ${open ? "translate-x-0 opacity-100" : "-translate-x-6 opacity-0"}`}
            >
              {item.children ? (
                <>
                  <button
                    onClick={() => setExpanded((e) => !e)}
                    className="flex w-full items-center justify-between rounded-xl px-4 py-3.5 text-base font-semibold text-slate-800 hover:bg-slate-50"
                  >
                    {item.label}
                    <svg className={`h-5 w-5 transition-transform duration-300 ${expanded ? "rotate-180" : ""}`} viewBox="0 0 20 20" fill="currentColor"><path d="M5.3 7.3a1 1 0 011.4 0L10 10.6l3.3-3.3a1 1 0 111.4 1.4l-4 4a1 1 0 01-1.4 0l-4-4a1 1 0 010-1.4z" /></svg>
                  </button>
                  <div className={`grid transition-all duration-300 ${expanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                    <div className="overflow-hidden">
                      <div className="grid grid-cols-2 gap-2 px-2 pb-3">
                        {item.children.map((c) => (
                          <Link key={c.href} href={c.href} className="flex items-center gap-2 rounded-xl bg-slate-50 px-3 py-3 text-sm font-medium text-slate-700 active:scale-95">
                            <span>{c.emoji}</span>
                            {c.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <Link
                  href={item.href}
                  className={`block rounded-xl px-4 py-3.5 text-base font-semibold transition hover:bg-slate-50 ${
                    (item.href === "/" ? pathname === "/" : pathname.startsWith(item.href)) ? "bg-brand-50 text-brand-700" : "text-slate-800"
                  }`}
                >
                  {item.label}
                </Link>
              )}
            </div>
          ))}
        </nav>

        <div className="grid grid-cols-2 gap-3 border-t border-slate-100 p-5">
          <Link href="/login" className="grid h-12 place-items-center rounded-full border border-slate-300 text-sm font-semibold">Sign in</Link>
          <Link href="/register" className="grid h-12 place-items-center rounded-full bg-brand-600 text-sm font-semibold text-white">Create account</Link>
        </div>
      </aside>
    </div>
  )
}

export default MobileMenu;
