import Link from 'next/link';
import { NavMenu } from '../molecules';
import { NavItem } from '../atoms';
import { useTranslation } from '@/lib/i18n';
import { headers } from 'next/headers';
import { getLangFromPathname } from '@/lib/utils';

export const Header: React.FC = async () => {
  const lang = getLangFromPathname(headers().get('x-pathname')!);
  const { t } = await useTranslation('nav');

  return (
    <nav className="md:grid grid-cols-12 border-b flex items-center justify-between relative overflow-x-auto">
      <Link
        href="/"
        className="md:border-r md:px-5 px-2.5 py-4 text-foreground md:col-span-3 lg:col-span-2 shrink-0 transition-colors"
      >
        @{t('common:username')}
      </Link>
      <div className="md:col-span-9 lg:col-span-10 flex items-center justify-between">
        <NavMenu>
          <NavItem href={`/${lang}`}>{t('home')}</NavItem>
        </NavMenu>
      </div>
    </nav>
  );
};
