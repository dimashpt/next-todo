import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

export function getLangFromPathname(pathname: string): string {
  return pathname.split('/')[1] ?? '';
}
