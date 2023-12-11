import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(
  price: number | string,
  options: {
    currency?: "USD" | "EUR" | "GBP" | "JPY" | "CNY" | "KRW" | "CAD" | "AUD";
    notation?: Intl.NumberFormatOptions["notation"];
  } = {}
) {
  const { currency = "USD", notation = "compact" } = options;

  const numericPrice = typeof price === "string" ? parseInt(price, 10) : price;

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency,
    notation: notation,
    maximumFractionDigits: 2,
  }).format(numericPrice);
}
