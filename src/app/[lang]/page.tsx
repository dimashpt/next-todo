import { useTranslation } from '@/lib/i18n';
import { NextPage } from 'next';

const RootPage: NextPage = async () => {
  const { t } = await useTranslation('home');

  return (
    <section className="flex flex-col h-full w-full items-center justify-center flex-wrap">
      <div className="flex flex-col px-5 md:px-0">Hi</div>
    </section>
  );
};

export default RootPage;
