import '#/public/globals.css';
import Favicon from '#/public/favicon.ico';
import type { Metadata, NextPage } from 'next';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import { ThemeProvider } from '@/components/atoms';
import { Footer, Header } from '@/components/organisms';
import { dir } from 'i18next';
import QueryProvider from '@/lib/query';

type BaseLayoutProps = {
  children: React.ReactNode;
  params: { lang: string };
};

export const metadata: Metadata = {
  title: {
    template: '%s | dimashpt',
    default: 'ToDo App | dimashpt',
  },
  description: 'Next.JS ToDo App by dimashpt',
  icons: [{ rel: 'icon', url: Favicon.src }],
};

const RootLayout: NextPage<BaseLayoutProps> = ({
  children,
  params: { lang },
}: BaseLayoutProps) => {
  return (
    <html lang={lang} dir={dir(lang)} suppressHydrationWarning>
      <body
        className={`${GeistSans.variable} ${GeistMono.variable} font-mono`}
        suppressHydrationWarning
      >
        <QueryProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <main>
              <Header />
              {children}
              <Footer />
            </main>
          </ThemeProvider>
        </QueryProvider>
      </body>
    </html>
  );
};

export default RootLayout;
