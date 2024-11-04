import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function hashString(str: string) {
  const encoder = new TextEncoder();
  const data = encoder.encode(str);

  // Hash the API key using SHA-256
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);

  // Convert the ArrayBuffer to a hexadecimal string for storage
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashedKey = hashArray
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");

  return hashedKey;
}

export async function verifyHash(str: string, hashedKey: string) {
  const newHash = await hashString(str);
  return newHash === hashedKey;
}
