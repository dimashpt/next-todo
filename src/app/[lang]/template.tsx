import { NextPage } from 'next';
import { AnimateRoute } from '@/components/atoms';

const RootTemplate: NextPage<React.PropsWithChildren> = ({
  children,
}: React.PropsWithChildren) => {
  return (
    <AnimateRoute className="flex-1 overflow-y-auto">{children}</AnimateRoute>
  );
};

export default RootTemplate;
