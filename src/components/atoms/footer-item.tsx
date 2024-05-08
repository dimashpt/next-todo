import { ComponentProps } from 'react';

export const FooterItem: React.FC<ComponentProps<'a'>> = ({
  children,
  ...props
}: ComponentProps<'a'>) => {
  return (
    <a
      className="flex items-center gap-x-1 px-2 py-1 hover:text-foreground text-muted-foreground transition-colors"
      {...props}
    >
      {children}
    </a>
  );
};
