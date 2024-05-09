import { NextPage } from 'next';
import { AnimateRoute } from '@/components/atoms';

/**
 * Root template component for the Next.js application.
 * animates the route transitions.
 */
const RootTemplate: NextPage<React.PropsWithChildren> = ({
  children,
}: React.PropsWithChildren) => {
  return (
    <AnimateRoute className="flex-1 overflow-y-auto">{children}</AnimateRoute>
  );
};

export default RootTemplate;
