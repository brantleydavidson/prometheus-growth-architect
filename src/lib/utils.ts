
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const textAlignmentClasses = {
  left: "text-left",
  center: "text-center",
  right: "text-right",
}
