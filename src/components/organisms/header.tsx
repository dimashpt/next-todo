import Link from 'next/link';
import { useTranslation } from '@/lib/i18n';

export const Header: React.FC = async () => {
  const { t } = await useTranslation('nav');

  return (
    <nav className="md:grid grid-cols-12 border-b flex items-center justify-between relative overflow-x-auto">
      <Link
        href="/"
        className="md:border-r md:px-5 px-2.5 py-4 text-foreground md:col-span-3 lg:col-span-2 shrink-0 transition-colors"
      >
        @{t('common:username')}
      </Link>
    </nav>
  );
};
