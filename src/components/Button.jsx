import React from "react";
import { Link } from "react-router-dom";

const BASE =
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-accent-500";

const SIZES = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-base",
  lg: "px-8 py-4 text-lg",
};

const VARIANTS = {
  primary: "bg-accent-500 hover:bg-accent-600 text-white shadow-md hover:shadow-lg",
  secondary: "bg-sage-500 hover:bg-sage-600 text-white shadow-md hover:shadow-lg",
  ghost: "bg-transparent border border-current text-current hover:bg-current/5",
  white: "bg-white hover:bg-cream-100 text-sage-800",
  outline: "bg-transparent border border-sage-300 text-sage-700 hover:bg-sage-50",
};

export default function Button({
  variant = "primary",
  size = "md",
  to,
  href,
  className = "",
  children,
  ...rest
}) {
  const cls = `${BASE} ${SIZES[size]} ${VARIANTS[variant]} ${className}`;

  if (to) {
    return (
      <Link to={to} className={cls} {...rest}>
        {children}
      </Link>
    );
  }
  if (href) {
    return (
      <a href={href} className={cls} {...rest}>
        {children}
      </a>
    );
  }
  return (
    <button type="button" className={cls} {...rest}>
      {children}
    </button>
  );
}
