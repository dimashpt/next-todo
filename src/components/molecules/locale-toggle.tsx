'use client';

import React from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/atoms';
import Link from 'next/link';
import { Icons } from '@/assets';
import { usePathname } from 'next/navigation';

export const LocaleToggle: React.FC = () => {
  const pathname = usePathname();
  const lang = pathname.split('/')[1];

  function getUrl(locale: string): string {
    // change language based on the current page
    if (pathname === '/') {
      return `/${locale}`;
    }

    return pathname.replace(`/${lang}`, `/${locale}`);
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <a
          href="#"
          className="flex items-center gap-x-1 px-2 py-1 hover:text-foreground text-muted-foreground transition-colors uppercase"
        >
          {lang}
        </a>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem asChild>
          <Link href={getUrl('en')}>
            <Icons.UnitedKingdom />
            &nbsp;English
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href={getUrl('id')}>
            <Icons.Indonesia />
            &nbsp;Indonesia
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
