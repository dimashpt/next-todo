'use client';

import { cn } from '@/lib/utils';
import { cva } from 'class-variance-authority';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

type NavItemProps = {
  href: string;
  children: React.ReactNode;
};

const link = cva(
  'w-full h-full block py-4 px-5 transition-colors group-hover:text-foreground',
  {
    variants: {
      active: {
        true: 'text-foreground font-bold',
        false: 'text-muted-foreground',
      },
    },
    defaultVariants: {
      active: false,
    },
  },
);

const indicator = cva(
  'absolute bottom-0 bg-foreground transition-all group-hover:h-0.5 w-full',
  {
    variants: {
      active: {
        true: 'h-0.5',
        false: 'h-0',
      },
    },
    defaultVariants: {
      active: false,
    },
  },
);

export const NavItem: React.FC<NavItemProps> = ({
  href,
  children,
}: NavItemProps) => {
  const path = usePathname();
  // match the active state based on the second part of the path
  const active = path.split('/')[2] === href.split('/')[2];

  return (
    <li className="relative group">
      <Link href={href} className={cn(link({ active }))}>
        {children}
      </Link>
      <div className={cn(indicator({ active }))} />
    </li>
  );
};
