const tones = {
  brand: "bg-brand-600 text-white",
  soft: "bg-brand-50 text-brand-700",
  dark: "bg-slate-900 text-white",
  sale: "bg-rose-500 text-white",
  success: "bg-emerald-50 text-emerald-700",
  warning: "bg-amber-50 text-amber-700",
  glass: "bg-white/80 text-slate-900 backdrop-blur",
};

const Badge = ({ tone = "brand", className = "", children }) => {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-bold tracking-wide uppercase ${tones[tone]} ${className}`}
    >
      {children}
    </span>
  )
}

export default Badge;
