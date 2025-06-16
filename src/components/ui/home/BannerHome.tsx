'use client';

import React, {useState, useEffect} from 'react';
import {Tab, TabGroup, TabList, TabPanel, TabPanels} from '@headlessui/react';
import {inputCart} from '@/lib/donation/transaction/auth-cart';
import AOS from 'aos';
import 'aos/dist/aos.css';
import PopupNotif from '../utility/PopupNotif';
import {useRouter} from 'next/navigation';
import {useCart} from '@/context/CartContext';
import {useTranslations, useLocale} from 'next-intl';
import * as motion from 'motion/react-client';

const BannerHome: React.FC = () => {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [rawAmount, setRawAmount] = useState<number | null>(null);
  const {cartItems, setCartItems} = useCart();
  const [cookies, setCookies] = useState<string | null>(null);
  const router = useRouter();
  const t = useTranslations();
  const locale = useLocale();
  const isRTL = locale === 'ar';

  const nominalOptions = [
    {label: 'Rp 50.000', value: 50000.0},
    {label: 'Rp 100.000', value: 100000.0},
    {label: 'Rp 250.000', value: 250000.0},
    {label: 'Rp 500.000', value: 500000.0},
    {label: 'Rp 1.000.000', value: 1000000.0},
    {label: 'Rp 2.000.000', value: 2000000.0}
  ];

  const [notifMessage, setNotifMessage] = useState('');

  useEffect(() => {
    AOS.init();

    const getCookies = () => {
      const allCookies = document.cookie;
      setCookies(allCookies || 'Tidak ada cookies ditemukan');
    };

    const checkAndCreateCookie = () => {
      const cookieExists = document.cookie
        .split(';')
        .some((cookie) => cookie.trim().startsWith('osscart='));

      if (!cookieExists) {
        const expirationDate = new Date();
        expirationDate.setFullYear(expirationDate.getFullYear() + 2);
        document.cookie = `osscart=true; expires=${expirationDate.toUTCString()}; path=/`;
        setCookies('osscart cookie has been created.');
      } else {
        setCookies('osscart cookie already exists.');
      }
    };

    checkAndCreateCookie();
    getCookies();
  }, []);

  const handleAmountClick = (value: number) => {
    setSelectedAmount(value);
    setCustomAmount(formatCurrency(value.toString()));
    setRawAmount(value);
  };

  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^\d]/g, '');
    const formattedValue = formatCurrency(value);

    setCustomAmount(formattedValue);
    setRawAmount(parseInt(value) || null);

    const match = nominalOptions.find(
      (option) => option.value === parseInt(value)
    );
    setSelectedAmount(match ? match.value : null);
  };

  const formatCurrency = (value: string) => {
    const parsedValue = parseInt(value || '0');
    return `Rp ${parsedValue.toLocaleString('id-ID')}`;
  };

  const handleDonasiClick = () => {
    // Ensure rawAmount is valid
    if (rawAmount) {
      const cookiesId = document.cookie
        .split(';')
        .find((cookie) => cookie.trim().startsWith('osscart='))
        ?.split('=')[1];

      if (cookiesId) {
        // Menyimpan data ke localStorage
        const cartData = {
          cookies_id: cookiesId,
          campaign_id: 18, // Ganti sesuai dengan campaign_id yang dibutuhkan
          quantity: 1, // Quantity is fixed to 1 for each donation
          amount: rawAmount // Set the amount correctly
        };

        // Retrieve existing data from localStorage or initialize an empty array
        const storedData = JSON.parse(localStorage.getItem('osscart') || '[]');
        const updatedCart = [...storedData, cartData];

        localStorage.setItem('osscart', JSON.stringify(updatedCart));
        setCartItems(updatedCart); // Update context

        // Memanggil inputCart API
        inputCart(
          cartData.cookies_id,
          cartData.campaign_id,
          cartData.quantity,
          cartData.amount
        )
          .then((response) => {
            setNotifMessage('Donation Added!');
            router.push(`/checkout`);
          })
          .catch((error) => {
            setNotifMessage('Terjadi kesalahan saat melakukan donasi.');
          });
      } else {
        setNotifMessage("Cookie 'osscart' tidak ditemukan.");
      }
    }
  };

  return (
    <section
      dir={isRTL ? 'rtl' : 'ltr'}
      className={`flex flex-row ${
        isRTL ? 'flex-row-reverse' : ''
      } w-full h-full sm:p-24 p-6 sm:pt-28 pt-24 dark:bg-hero-pattern bg-hero-white sm:bg-cover bg-cover bg-center bg-no-repeat`}
    >
      <motion.div
        initial={{opacity: 0}}
        animate={{opacity: 1}}
        transition={{
          duration: 1,
          scale: {type: 'spring', visualDuration: 0.4}
        }}
        className="flex sm:flex-row flex-col gap-y-4 w-full items-center"
      >
        <div
          className="flex flex-col sm:w-1/2 w-full justify-around items-center sm:pb-0 pb-8 h-[260px]"
          data-aos="fade-left"
        >
          <h3 className="font-bold text-white sm:text-5xl text-3xl sm:pb-10 pb-3 leading-[1.5]">
            {t('SectionMainHomeTitle.helps')}{' '}
            <span className="font-bold text-sky-600">
              {t('SectionMainHomeTitle.connect')}
            </span>{' '}
            {t('SectionMainHomeTitle.desc')}
          </h3>
          <h6 className="font-normal text-white text-lg">
            {t('SectionMainHomeDesc.text')}
          </h6>
        </div>
        <div
          className="flex sm:w-1/2 w-full items-center justify-center"
          data-aos="fade-right"
        >
          <TabGroup className="sm:w-3/4 w-full">
            <TabList className="w-full">
              <Tab className="cursor-default transition duration-150 ease-in w-full py-3 text-center text-sky-700 font-bold text-lg">
                {t('FormOneTimeDonatiom.title')}
              </Tab>
            </TabList>
            <TabPanels>
              <TabPanel
                className="flex flex-col text-sm transition duration-300 ease-in"
                data-aos="fade-left"
                data-aos-duration="500"
              >
                <div className="dark:bg-sky-950 bg-sky-600 dark:text-white text-white p-4 text-center rounded-tl-[23px] rounded-tr-[23px]">
                  <h4>{t('FormOneTimeDonatiom.desc')}</h4>
                </div>
                <form className="p-4 bg-white dark:bg-slate-100">
                  <div className="grid grid-cols-3 gap-4 mb-4">
                    {nominalOptions.map((option) => (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => handleAmountClick(option.value)}
                        className={`p-3 text-center rounded-3xl transition ${
                          selectedAmount === option.value
                            ? 'bg-sky-600 text-white'
                            : 'bg-gray-200 text-gray-600 hover:bg-gray-300 transition duration-200 ease-in-out'
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                  <input
                    type="text"
                    value={customAmount}
                    onChange={handleCustomAmountChange}
                    placeholder="Enter Amount"
                    className="w-full bg-white p-3 border border-gray-300 rounded-lg dark:text-slate-600"
                  />
                  <button
                    type="button"
                    onClick={handleDonasiClick}
                    className="w-full mt-4 py-3 text-white bg-sky-800 dark:bg-sky-600 hover:bg-sky-600 transition duration-300 ease-in rounded-2xl"
                  >
                    {t('FormOneTimeDonatiom.button')}
                  </button>
                  {/* <div className="mt-4">
                    <h4>Cookies: {cookies || "Fetching..."}</h4>
                  </div> */}
                </form>
                <div className="flex flex-col dark:bg-sky-950 bg-sky-600 dark:text-white text-white p-8 text-center rounded-bl-[23px] rounded-br-[23px]">
                  <h4>
                    {t('FormOneTimeDonatiom.notes')}{' '}
                    <a href="" className="font-extrabold">
                      {t('FormOneTimeDonatiom.click')}
                    </a>
                  </h4>
                </div>
              </TabPanel>
            </TabPanels>
          </TabGroup>
        </div>
      </motion.div>
      <PopupNotif
        message={notifMessage}
        duration={3000}
        onClose={() => setNotifMessage('')}
      />
    </section>
  );
};

export default BannerHome;
