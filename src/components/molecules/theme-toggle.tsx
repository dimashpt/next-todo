'use client';

import React from 'react';
import { useTheme } from 'next-themes';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/atoms';
import { Icons } from '@/assets';

export const ThemeToggle: React.FC = () => {
  const { setTheme, resolvedTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <a
          href="#"
          className="flex items-center gap-x-1 px-2 py-1 hover:text-foreground text-muted-foreground transition-colors"
        >
          {resolvedTheme === 'light' ? <Icons.Sun /> : <Icons.Moon />}
        </a>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme('light')}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('dark')}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('system')}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
