export const API_BASE =
  import.meta.env.VITE_FLOWERS_API_BASE ||
  "https://webdev-backends.onrender.com/flowers";

export const PAYPAL_CLIENT_ID = import.meta.env.VITE_PAYPAL_CLIENT_ID?.trim() || "";
export const IS_PAYPAL_CONFIGURED = Boolean(PAYPAL_CLIENT_ID);
