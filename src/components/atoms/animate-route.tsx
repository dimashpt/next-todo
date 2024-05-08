'use client';

import { NextPage } from 'next';
import { motion } from 'framer-motion';

type AnimateRouteProps = React.PropsWithChildren<{
  className?: string;
}>;

export const AnimateRoute: NextPage<AnimateRouteProps> = ({
  children,
  className,
}: AnimateRouteProps) => {
  return (
    <motion.div
      className={className}
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -20, opacity: 0 }}
      transition={{
        type: 'easeInOut',
        duration: 0.5,
      }}
    >
      {children}
    </motion.div>
  );
};
