import Link from "next/link";

const variants = {
  primary:
    "bg-brand-600 text-white shadow-lg shadow-brand-600/25 hover:bg-brand-700 hover:shadow-brand-600/40",
  dark: "bg-slate-900 text-white hover:bg-slate-800 shadow-lg shadow-slate-900/20",
  light: "bg-white text-slate-900 hover:bg-slate-100 shadow-lg shadow-black/10",
  outline:
    "border border-slate-300 bg-transparent text-slate-900 hover:border-slate-900 hover:bg-slate-900 hover:text-white",
  soft: "bg-brand-50 text-brand-700 hover:bg-brand-100",
  ghost: "text-slate-700 hover:bg-slate-100",
};

const sizes = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-6 text-sm",
  lg: "h-13 px-8 text-base",
  icon: "h-10 w-10",
};

export default function Button({
  href,
  variant = "primary",
  size = "md",
  className = "",
  children,
  ...props
}) {
  const classes = `group inline-flex items-center justify-center gap-2 rounded-full font-semibold whitespace-nowrap transition-all duration-300 active:scale-[0.97] disabled:pointer-events-none disabled:opacity-50 ${variants[variant]} ${sizes[size]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes} {...props}>
        {children}
      </Link>
    );
  }
  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
