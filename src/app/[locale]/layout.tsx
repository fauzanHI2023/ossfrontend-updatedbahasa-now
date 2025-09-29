import {notFound} from 'next/navigation';
import {Locale, hasLocale, NextIntlClientProvider} from 'next-intl';
import {getTranslations, setRequestLocale} from 'next-intl/server';
import {ReactNode} from 'react';
import {routing} from '@/i18n/routing';
import {
  Poppins,
  Quattrocento,
  Fanwood_Text,
  Space_Mono,
  Ubuntu,
  Raleway
} from 'next/font/google';
import '../globals.css';
import {ThemeProvider} from '@/components/theme-provider';
import AuthProvider from '@/context/SessionProvider';
import {CartProvider} from '@/context/CartContext';
import Navbar from '@/components/ui/navbar/Navbar';
import Footer from '@/components/ui/footer/Footer';
import QueryProvider from '@/components/ui/utility/QueryProvider';
import 'aos/dist/aos.css';
import {FloatingDockDemo} from '@/components/ui/navbar/FloatingDock';

type Props = {
  children: ReactNode;
  params: Promise<{locale: Locale}>;
};

const quattrocento = Ubuntu({
  weight: ['300', '400', '700'], // tergantung kebutuhan
  subsets: ['latin'],
  variable: '--font-title',
  display: 'swap'
});

const fanwood_text = Raleway({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-paragraph',
  display: 'swap'
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({locale}));
}

export async function generateMetadata(props: Omit<Props, 'children'>) {
  const {locale} = await props.params;

  const t = await getTranslations({locale, namespace: 'LocaleLayout'});

  return {
    title: t('title')
  };
}

export default async function LocaleLayout({children, params}: Props) {
  // Ensure that the incoming `locale` is valid
  const {locale} = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  // Enable static rendering
  setRequestLocale(locale);

  return (
    <html className="h-full" lang={locale}>
      <body
        className={`${fanwood_text.variable} ${quattrocento.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            <NextIntlClientProvider>
              <CartProvider>
                <Navbar />
                <QueryProvider>{children}</QueryProvider>
                <FloatingDockDemo />
                <Footer />
              </CartProvider>
            </NextIntlClientProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
