type SupportedLocale = 'en' | 'id' | 'ar';

export function formatCurrency(
  amount: number,
  locale: SupportedLocale
): string {
  const config: Record<SupportedLocale, {locale: string; currency: string}> = {
    en: {locale: 'en-US', currency: 'USD'},
    id: {locale: 'id-ID', currency: 'IDR'},
    ar: {locale: 'ar-SA', currency: 'SAR'} // Ubah jadi 'USD' atau 'IDR' kalau kamu mau
  };

  const {locale: fullLocale, currency} = config[locale];

  return new Intl.NumberFormat(fullLocale, {
    style: 'currency',
    currency,
    minimumFractionDigits: 0
  }).format(amount);
}
