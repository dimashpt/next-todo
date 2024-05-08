type NavMenuProps = {
  children: React.ReactNode;
};

export const NavMenu: React.FC<NavMenuProps> = ({ children }: NavMenuProps) => {
  return (
    <ul className="md:flex items-center divide-x w-max border-r hidden shrink-0">
      {children}
    </ul>
  );
};
