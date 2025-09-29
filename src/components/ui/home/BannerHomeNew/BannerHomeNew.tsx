'use client';
import React, {useState, useEffect, useRef} from 'react';
import {Swiper, SwiperSlide} from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import AOS from 'aos';
import 'aos/dist/aos.css';
import {Pagination, Navigation, Autoplay} from 'swiper/modules';
import {Tab, TabGroup, TabList, TabPanel, TabPanels} from '@headlessui/react';
import {inputCart} from '@/lib/donation/transaction/auth-cart';
import PopupNotif from '../../utility/PopupNotif';
import {useRouter} from 'next/navigation';
import {useCart} from '@/context/CartContext';
import {useTranslations, useLocale} from 'next-intl';
import * as motion from 'motion/react-client';
import gsap from 'gsap';
import {Button} from '../../button';
import {heroBanner} from '@/data/data';
import SplitText from '../../SplitText';
import Link from 'next/link';

const BannerHomeNew = () => {
  const [isOpen, setIsOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [rawAmount, setRawAmount] = useState<number | null>(null);
  const {cartItems, setCartItems} = useCart();
  const [cookies, setCookies] = useState<string | null>(null);
  const router = useRouter();
  const t = useTranslations();
  const locale = useLocale();
  const safeT = (key: string) => t(key as any);
  const isRTL = locale === 'ar';

  const containerRef = useRef<HTMLDivElement>(null);
  const section2Ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (isOpen) {
      gsap.to(panelRef.current, {
        x: 0,
        width: 360,
        duration: 0.5,
        ease: 'power3.out'
      });
    } else {
      gsap.to(panelRef.current, {
        x: 360,
        width: 0,
        duration: 0.4,
        ease: 'power3.in'
      });
    }
  }, [isOpen]);

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

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Section 1 styling
      gsap.to('.section1', {
        backgroundColor: '#000000',
        color: '#ffffff',
        scrollTrigger: {
          trigger: '.section1',
          start: 'top top',
          end: 'bottom center',
          scrub: true
        }
      });

      // Section 2 styling
      gsap.to('.section2', {
        backgroundColor: '#ffffff',
        color: '#000000',
        scrollTrigger: {
          trigger: '.section2',
          start: 'top center',
          end: 'bottom center',
          scrub: true
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <Swiper
        pagination={{clickable: true}}
        modules={[Pagination, Autoplay]}
        autoplay={{
          delay: 10000,
          disableOnInteraction: false
        }}
        className="w-full sm:h-[650px] h-[450px]"
      >
        {heroBanner.map((hero) => (
          <SwiperSlide key={hero.id}>
            <section
              dir={isRTL ? 'rtl' : 'ltr'}
              className={`flex flex-row ${
                isRTL ? 'flex-row-reverse' : ''
              } w-full h-full ${hero.img} bg-cover bg-left bg-no-repeat`}
            >
              <div className="absolute inset-0 bg-black/30"></div>
              <div className="flex sm:flex-row flex-col gap-y-4 w-full justify-start items-end sm:px-12 px-4">
                <div
                  className="flex flex-col gap-y-7 sm:w-5/12 w-full h-full sm:px-16 px-0 justify-center items-start sm:pb-0 pb-8 h-[260px] mt-10"
                  data-aos="fade-left"
                >
                  <SplitText
                    text={t(hero.desc as any, {})}
                    delay={100}
                    duration={0.6}
                    ease="power3.out"
                    splitType="words"
                    from={{opacity: 0, y: 40}}
                    to={{opacity: 1, y: 0}}
                    threshold={0.1}
                    rootMargin="-100px"
                    textAlign="left"
                    className="font-raleway font-bold text-white sm:text-4xl text-2xl px-2 py-3"
                  />
                  <Link
                    href={hero.link}
                    className="py-2 px-6 w-auto bg-sky-500 text-white dark:text-white rounded-lg text-xl font-semibold"
                  >
                    {hero.namelink}
                  </Link>
                </div>
              </div>
              <PopupNotif
                message={notifMessage}
                duration={3000}
                onClose={() => setNotifMessage('')}
              />
            </section>
          </SwiperSlide>
        ))}
        <SwiperSlide>
          <section
            dir={isRTL ? 'rtl' : 'ltr'}
            className={`flex flex-row ${
              isRTL ? 'flex-row-reverse' : ''
            } w-full h-full bg-hero-white bg-cover bg-left bg-no-repeat`}
          >
            <div className="absolute inset-0 bg-black/30"></div>
            <div className="flex sm:flex-row flex-col gap-y-4 w-full justify-start items-end sm:px-12 px-4">
              <div
                className="flex flex-col gap-y-7 sm:w-5/12 w-full h-full sm:px-16 px-0 justify-center items-start sm:pb-0 pb-8 h-[260px] mt-10"
                data-aos="fade-left"
              >
                <SplitText
                  text="Kadang yang dibutuhkan dunia bukan bantuan besar, tapi hati yang tak berpaling diam"
                  delay={100}
                  duration={0.6}
                  ease="power3.out"
                  splitType="words"
                  from={{opacity: 0, y: 40}}
                  to={{opacity: 1, y: 0}}
                  threshold={0.1}
                  rootMargin="-100px"
                  textAlign="left"
                  className="font-raleway font-bold text-white sm:text-4xl text-2xl px-2 py-3"
                />
                <Button
                  className="one-time py-2 px-6 w-auto bg-sky-500 text-white dark:text-white rounded-lg text-xl font-semibold"
                  onClick={() => setIsOpen(true)}
                >
                  One Time Donation
                </Button>
              </div>
            </div>
            <PopupNotif
              message={notifMessage}
              duration={3000}
              onClose={() => setNotifMessage('')}
            />
          </section>
        </SwiperSlide>
      </Swiper>
      <div
        ref={panelRef}
        style={{
          position: 'fixed',
          top: 0,
          right: 0,
          height: '100%',
          background: '#fff',
          overflow: 'auto',
          transform: 'translateX(360px)', // mulai dari luar layar
          width: 0,
          boxShadow: '-2px 0 10px rgba(0,0,0,0.2)',
          zIndex: 9999
        }}
      >
        <div className="p-4 flex justify-between items-center border-b border-gray-300">
          <h3 className="text-lg font-semibold">
            {t('FormOneTimeDonatiom.title')}
          </h3>
          <button
            onClick={() => setIsOpen(false)}
            className="text-gray-500 hover:text-gray-800"
          >
            ✕
          </button>
        </div>

        {/* Isi Form */}
        <div className="p-4">
          <motion.div
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            transition={{
              duration: 1,
              scale: {type: 'spring', visualDuration: 0.4}
            }}
            dir={isRTL ? 'rtl' : 'ltr'}
            className="flex sm:flex-row flex-col gap-y-4 w-full items-center"
          >
            <div
              className="flex w-full items-center justify-center"
              data-aos="fade-right"
            >
              <TabGroup className="w-full">
                <TabList className="w-full">
                  <Tab className="cursor-default transition duration-150 ease-in w-full py-3 text-center text-sky-700 font-bold text-lg"></Tab>
                </TabList>
                <TabPanels>
                  <TabPanel
                    className="flex flex-col text-sm transition duration-300 ease-in"
                    data-aos="fade-left"
                    data-aos-duration="500"
                  >
                    <div className="dark:bg-sky-950 bg-sky-600 dark:text-white text-white p-4 text-center rounded-tl-[6px] rounded-tr-[6px]">
                      <h4>{t('FormOneTimeDonatiom.desc')}</h4>
                    </div>
                    <form className="p-4 bg-white dark:bg-slate-100">
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        {nominalOptions.map((option) => (
                          <button
                            key={option.value}
                            type="button"
                            onClick={() => handleAmountClick(option.value)}
                            className={`p-3 text-center rounded-lg transition ${
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
                        className="w-full mt-4 py-3 text-white bg-sky-800 dark:bg-sky-600 hover:bg-sky-600 transition duration-300 ease-in rounded-lg"
                      >
                        {t('FormOneTimeDonatiom.button')}
                      </button>
                      {/* <div className="mt-4">
                    <h4>Cookies: {cookies || "Fetching..."}</h4>
                  </div> */}
                    </form>
                    <div className="flex flex-col dark:bg-sky-950 bg-sky-600 dark:text-white text-white p-8 text-center rounded-bl-[10px] rounded-br-[10px]">
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
        </div>
      </div>
    </>
  );
};

export default BannerHomeNew;
