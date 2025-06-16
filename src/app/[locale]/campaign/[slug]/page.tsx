'use client';

import React, {useEffect, useState, CSSProperties} from 'react';
import Link from 'next/link';
import {useParams} from 'next/navigation';
import {fetchCampaign} from '@/lib/donation/campaign/auth-campaign';
import {inputCart} from '@/lib/donation/transaction/auth-cart';
import PopupNotif from '@/components/ui/utility/PopupNotif';
import {BsFillCollectionFill} from 'react-icons/bs';
import {TbLayoutDistributeHorizontal} from 'react-icons/tb';
import {FaUserAlt} from 'react-icons/fa';
import {MdAreaChart} from 'react-icons/md';
import bg from '../../../../public/DSC04008-2048x1365.jpg';
import {useCart} from '@/context/CartContext';
import {useRouter} from 'next/navigation';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Image from 'next/image';
import HashLoader from 'react-spinners/HashLoader';
import {UsersRound, SendHorizontal, HandHeart} from 'lucide-react';
import {motion, AnimatePresence} from 'framer-motion';
import DOMPurify from 'dompurify';
import {useLocale} from 'next-intl';
import {formatCurrency} from '@/utils/formatCurrency';
import {Progress} from '@/components/ui/progress_fe';
import CountUp from '@/components/ui/count-up';

const override: CSSProperties = {
  display: 'block',
  margin: '0 auto',
  borderColor: 'red'
};
interface Campaigns {
  id: number;
  campaign_name: string;
  campaign_category: string;
  campaign_img: string;
  campaign_description: string;
  target_donation: string;
  donation_collected: string;
  amount_distributed: string;
  minimum_donation: string;
  support: string;
  core_program: string;
  slug: string;
  qurban_type: string;
}

const PostDetail: React.FC = () => {
  const params = useParams();
  const slug = params?.slug;
  const [post, setPost] = useState<Campaigns | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [rawAmount, setRawAmount] = useState<number | null>(null);
  const [donationAmount, setDonationAmount] = useState<number>(0);
  const [quantity, setQuantity] = useState(1);
  const {cartItems, setCartItems} = useCart();
  const [cookies, setCookies] = useState<string | null>(null);
  let [color, setColor] = useState('#209ce2');
  const [hoveredShare, setHoveredShare] = useState(false);
  const [hoveredDonate, setHoveredDonate] = useState(false);
  const router = useRouter();
  const locale = useLocale();

  const minimumDonation = Number(post?.minimum_donation) || 0;
  const totalDonation = quantity * minimumDonation;

  const nominalOptions = [
    {label: 'Rp50.000', value: 50000.0},
    {label: 'Rp100.000', value: 100000.0},
    {label: 'Rp500.000', value: 500000.0},
    {label: 'Rp1.000.000', value: 1000000.0}
  ];

  const calculateProgress = (grossAmount: any): any => {
    const min = 50000;
    const max = 100000000;
    return ((grossAmount - min) / (max - min)) * 100;
  };

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
    return `Rp${parsedValue.toLocaleString('id-ID')}`;
  };

  const handleDonasiClick = () => {
    const isQurban = post?.campaign_category === 'qurban';
    const amount = isQurban ? minimumDonation : rawAmount;
    const qty = isQurban ? quantity : 1;

    // console.log('Amount to be sent:', amount);
    // console.log('Quantity:', qty);

    if (amount && post?.id) {
      const cookiesId = document.cookie
        .split(';')
        .find((cookie) => cookie.trim().startsWith('osscart='))
        ?.split('=')[1];

      if (cookiesId) {
        const cartData = {
          cookies_id: cookiesId,
          campaign_id: post.id,
          quantity: qty,
          amount
        };

        const storedData = JSON.parse(localStorage.getItem('osscart') || '[]');
        const updatedCart = [...storedData, cartData];

        localStorage.setItem('osscart', JSON.stringify(updatedCart));
        setCartItems(updatedCart);

        inputCart(
          cartData.cookies_id,
          cartData.campaign_id,
          cartData.quantity,
          cartData.amount
        )
          .then(() => {
            setNotifMessage('Donation Added!');
            router.push(`/checkout`);
          })
          .catch(() => {
            setNotifMessage('An error occurred when making a donation.');
          });
      } else {
        setNotifMessage("Cookie 'osscart' tidak ditemukan.");
      }
    }
  };

  // Definisikan fungsi truncateAndStripHtml sebelum digunakan
  const stripHtml = (html: string) => {
    if (typeof window !== 'undefined') {
      // Untuk lingkungan client-side
      const doc = new DOMParser().parseFromString(html, 'text/html');
      const text = doc.body.textContent || '';

      // Hapus karakter "rn" atau variasinya
      return text.replace(/(\r\n|\n|\r|rn)+/g, ' ').trim();
    }

    // Fallback untuk SSR (menghapus HTML tag dan karakter \r\n)
    return html
      .replace(/<[^>]*>?/gm, '') // Hapus semua tag HTML
      .replace(/(\r\n|\n|\r|rn)+/g, ' ') // Hapus karakter \r\n dan variasinya
      .trim(); // Hapus spasi ekstra di awal/akhir
  };

  // Pemakaian dalam useEffect
  useEffect(() => {
    const fetchPost = async () => {
      if (!slug) {
        console.warn('Missing id in URL');
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        const data = await fetchCampaign();

        if (data?.status === 'true') {
          // Biarkan HTML tetap ada
          const processedPosts: Campaigns[] = data.data.map(
            (post: Campaigns) => ({
              ...post,
              campaign_description: post.campaign_description
            })
          );

          const foundPost = processedPosts.find(
            (post: Campaigns) => post.slug === slug
          );

          if (foundPost) {
            setPost(foundPost);
            if (foundPost.campaign_category === 'qurban') {
              setDonationAmount(Number(foundPost.minimum_donation));
            }
          } else {
            console.warn('Post not found for ID:');
            setPost(null);
          }
        } else {
          console.error('Invalid response status:', data.status);
        }
      } catch (error) {
        console.error('Error fetching post:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  const handleIncrease = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  if (loading) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center p-24 dark:bg-slate-900 bg-gray-50">
        <HashLoader
          color={color}
          loading={loading}
          cssOverride={override}
          size={50}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </main>
    );
  }

  if (!post) {
    return <p>Post not found. Please check the URL or ID.</p>;
  }

  const processContent = (html: string) => {
    let processedHtml = html.replace(/(\r\n|\r|\n)+/g, '<br>');
    processedHtml = processedHtml.replace(
      /<img([^>]+)>/g,
      `<div style="text-align:center;"><img$1 style="margin:1rem auto; max-width: 100%; heigh: auto;"/></div>`
    );
    return processedHtml;
  };

  return (
    <main className="flex flex-col text-center justify-center items-center mt-24 sm:py-0 sm:pb-36 py-12 w-full">
      <section className="flex flex-row gap-x-8 w-10/12 mt-10 relative">
        <div className="flex flex-col gap-y-6 w-8/12">
          <div className="flex flex-col justify-center items-start h-auto w-full h-16 relative">
            <Image
              src={`https://cdnx.human-initiative.org/image/${post.campaign_img}`}
              alt={post.campaign_name}
              width={600}
              height={500}
              className="bg-cover bg-center relative w-full h-full rounded-xl"
            />
            <div
              className="prose text-justify max-w-none leading-7 text-sm text-[#666] mt-6 campaign-description"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(post.campaign_description)
              }}
            />
          </div>
        </div>
        <aside className="flex flex-col gap-y-6 w-4/12">
          <h4 className="flex flex-col gap-y-2 text-2xl text-slate-700 font-semibold pb-4 pt- text-left w-full">
            {post.campaign_name}
            <span className="text-sky-500 text-xs font-medium capitalize">
              {post.core_program}
            </span>
          </h4>
          <div className="sm:w-full mx-0 relative">
            <div className="flex flex-col gap-y-4 mt-[-2rem]">
              <div className="flex flex-col justify-center items-center gap-x-4 bg-white dark:bg-slate-700 dark:text-white">
                <div className="flex flex-row gap-x-0 text-sky-600 font-black text-2xl">
                  {/* {formatCurrency(post.donation_collected)} */}
                  Rp
                  <CountUp
                    from={0}
                    to={post.donation_collected}
                    separator=","
                    direction="up"
                    duration={0.2}
                    className="count-up-text"
                  />
                </div>
              </div>
              {/* <div className="flex flex-col justify-center items-start gap-x-4 bg-white dark:bg-slate-700 dark:text-white">
                <div className="flex text-sm flex-row gap-x-2">
                  {formatCurrency(post.amount_distributed)}
                </div>
                <p className="text-xs font-normal text-sky-700 dark:text-sky-500">
                  Amount Distributed
                </p>
              </div> */}
              <Progress
                value={calculateProgress(post.donation_collected || 0)}
              />
              {/* <div className="flex flex-col justify-center items-start gap-x-4 bg-white dark:bg-slate-700 dark:text-white">
                <div className="flex text-sm flex-row gap-x-2">
                  {post.support}
                </div>
                <p className="text-xs font-normal text-sky-700 dark:text-sky-500">
                  Donor
                </p>
              </div> */}
              <div className="flex flex-row justify-center items-center gap-x-2 bg-white dark:bg-slate-700 dark:text-white">
                <div className="flex text-sm flex-row gap-x-2">
                  {formatCurrency(post.target_donation)}
                </div>
                <p className="text-xs font-normal text-sky-700 dark:text-sky-500">
                  Target Donation
                </p>
                <div className="flex text-sm flex-row gap-x-2">
                  {post.support}
                </div>
                <p className="text-xs font-normal text-sky-700 dark:text-sky-500">
                  Donor
                </p>
              </div>
            </div>
            <form className="flex flex-col mt-6">
              {post.campaign_category === 'reguler' ? (
                <>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    {nominalOptions.map((option) => (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => handleAmountClick(option.value)}
                        className={`px-[4px] py- h-[40px] text-xs text-center rounded-3xl transition transition duration-300 ease-in ${
                          selectedAmount === option.value
                            ? 'bg-sky-600 text-white hover:bg-sky-500'
                            : 'bg-gray-300 text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                  <div className="w-full flex flex-col justify-center items-center gap-y-4">
                    <input
                      type="text"
                      value={customAmount}
                      onChange={handleCustomAmountChange}
                      placeholder="Enter Donation Amount"
                      className="w-full py-0 px-3 h-[48px] text-sm bg-gray-50 border border-gray-200 rounded-lg dark:text-slate-200 text-slate-700"
                    />
                    <div className="w-full flex flex-row-reverse gap-x-4">
                      <div className="w-2/12">
                        <Link href="/share">
                          <button
                            onMouseEnter={() => setHoveredShare(true)}
                            onMouseLeave={() => setHoveredShare(false)}
                            className="relative w-full h-12 px-4 py-2 bg-sky-100 text-sky-700 rounded-xl overflow-hidden flex items-center justify-center"
                          >
                            <AnimatePresence mode="wait">
                              {!hoveredShare ? (
                                <motion.span
                                  key="text"
                                  initial={{opacity: 1, x: 0}}
                                  animate={{opacity: 1, x: 0}}
                                  exit={{opacity: 0, x: -20}}
                                  transition={{duration: 0.3}}
                                  className="absolute"
                                >
                                  <SendHorizontal size={20} />
                                </motion.span>
                              ) : (
                                <motion.span
                                  key="icon"
                                  initial={{opacity: 0, x: 20}}
                                  animate={{opacity: 1, x: 0}}
                                  exit={{opacity: 0, x: -20}}
                                  transition={{duration: 0.3}}
                                  className="absolute"
                                >
                                  <SendHorizontal size={20} />
                                </motion.span>
                              )}
                            </AnimatePresence>
                          </button>
                        </Link>
                      </div>
                      <div className="w-10/12">
                        <button
                          type="button"
                          onMouseEnter={() => setHoveredDonate(true)}
                          onMouseLeave={() => setHoveredDonate(false)}
                          onClick={handleDonasiClick}
                          className="relative w-full h-12 px-4 py-2 bg-sky-700 text-white rounded-xl overflow-hidden flex items-center justify-center"
                        >
                          <AnimatePresence mode="wait">
                            {!hoveredDonate ? (
                              <motion.span
                                key="text"
                                initial={{opacity: 1, x: 0}}
                                animate={{opacity: 1, x: 0}}
                                exit={{opacity: 0, x: -20}}
                                transition={{duration: 0.3}}
                                className="absolute"
                              >
                                Donate
                              </motion.span>
                            ) : (
                              <motion.span
                                key="icon"
                                initial={{opacity: 0, x: 20}}
                                animate={{opacity: 1, x: 0}}
                                exit={{opacity: 0, x: -20}}
                                transition={{duration: 0.3}}
                                className="absolute"
                              >
                                <HandHeart size={20} />
                              </motion.span>
                            )}
                          </AnimatePresence>
                        </button>
                      </div>
                    </div>
                  </div>
                </>
              ) : post.campaign_category === 'qurban' ? (
                <>
                  <div className="flex flex-col justify-center items-start gap-4 mb-4">
                    <div className="w-full flex flex-row justify-between items-center">
                      <div className="flex items-center gap-4 text-slate-800">
                        <button
                          type="button"
                          onClick={handleDecrease}
                          className="text-lg px-4 py-2 hover:bg-gray-100 transition duration-300 ease-in rounded-l-lg"
                        >
                          -
                        </button>
                        <span className="text-lg font-semibold dark:text-white">
                          {quantity}
                        </span>
                        <button
                          type="button"
                          onClick={handleIncrease}
                          className="text-lg px-4 py-2 hover:bg-gray-100 transition duration-300 ease-in rounded-r-lg"
                        >
                          +
                        </button>
                      </div>
                      <div>
                        <span className="ml-4 text-lg font-semibold text-sky-600 dark:text-sky-400">
                          Rp {totalDonation.toLocaleString('id-ID')}
                        </span>
                      </div>
                    </div>

                    {post.qurban_type === '1/7sapi' ? (
                      <>
                        <div className="flex flex-col w-full">
                          {Array.from({length: quantity}, (_, index) => (
                            <div className="qurban-1/7sapi flex flex-col justify-center items-start gap-y-2 mt-4">
                              <div className="flex w-full mb-1 border-b">
                                <h4 className="flex flex-row gap-x-2 text-sm font-semibold text-gray-700 mb-4">
                                  <span>
                                    <UsersRound className="w-4 h-4 text-sky-500" />
                                  </span>{' '}
                                  Hewan {index + 1}
                                </h4>
                              </div>
                              <div className="flex flex-col gap-y-2 justify-start items-start w-full">
                                <label className="text-sm font-medium text-gray-500">
                                  Nama Pequrban
                                </label>
                                <input
                                  type="text"
                                  placeholder="Max. 3 Words : Doremi's son / Doremi's son Family"
                                  className="w-full p-3 border border-gray-300 rounded-lg dark:text-slate-200 text-slate-700"
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      </>
                    ) : post.qurban_type === 'sapi' ? (
                      <>
                        <div className="flex flex-col w-full">
                          {Array.from({length: quantity}, (_, index) => (
                            <div className="qurban-sapi flex flex-col w-full mt-4">
                              <div className="flex flex-col justify-center items-start gap-y-2">
                                <div className="flex w-full mb-1 border-b">
                                  <h4 className="flex flex-row gap-x-2 text-sm font-semibold text-gray-700 mb-4">
                                    <span>
                                      <UsersRound className="w-4 h-4 text-sky-500" />
                                    </span>{' '}
                                    Hewan {index + 1}
                                  </h4>
                                </div>
                                <div className="flex flex-col gap-y-2 justify-start items-start w-full">
                                  <label className="text-sm font-medium text-gray-500">
                                    Nama Pequrban
                                  </label>
                                  <input
                                    type="text"
                                    placeholder="Max. 3 Words : Doremi's son / Doremi's son Family"
                                    className="w-full p-3 border border-gray-300 rounded-lg dark:text-slate-200 text-slate-700"
                                  />
                                </div>
                              </div>
                              <div className="flex flex-col justify-center items-start gap-y-2">
                                <div className="flex w-full mb-1 border-b"></div>
                                <div className="flex flex-col gap-y-2 justify-start items-start w-full">
                                  <label className="text-sm font-medium text-gray-500">
                                    Nama Pequrban
                                  </label>
                                  <input
                                    type="text"
                                    placeholder="Max. 3 Words : Doremi's son / Doremi's son Family"
                                    className="w-full p-3 border border-gray-300 rounded-lg dark:text-slate-200 text-slate-700"
                                  />
                                </div>
                              </div>
                              <div className="flex flex-col justify-center items-start gap-y-2">
                                <div className="flex w-full mb-1 border-b"></div>
                                <div className="flex flex-col gap-y-2 justify-start items-start w-full">
                                  <label className="text-sm font-medium text-gray-500">
                                    Nama Pequrban
                                  </label>
                                  <input
                                    type="text"
                                    placeholder="Max. 3 Words : Doremi's son / Doremi's son Family"
                                    className="w-full p-3 border border-gray-300 rounded-lg dark:text-slate-200 text-slate-700"
                                  />
                                </div>
                              </div>
                              <div className="flex flex-col justify-center items-start gap-y-2">
                                <div className="flex w-full mb-1 border-b"></div>
                                <div className="flex flex-col gap-y-2 justify-start items-start w-full">
                                  <label className="text-sm font-medium text-gray-500">
                                    Nama Pequrban
                                  </label>
                                  <input
                                    type="text"
                                    placeholder="Max. 3 Words : Doremi's son / Doremi's son Family"
                                    className="w-full p-3 border border-gray-300 rounded-lg dark:text-slate-200 text-slate-700"
                                  />
                                </div>
                              </div>
                              <div className="flex flex-col justify-center items-start gap-y-2">
                                <div className="flex w-full mb-1 border-b"></div>
                                <div className="flex flex-col gap-y-2 justify-start items-start w-full">
                                  <label className="text-sm font-medium text-gray-500">
                                    Nama Pequrban
                                  </label>
                                  <input
                                    type="text"
                                    placeholder="Max. 3 Words : Doremi's son / Doremi's son Family"
                                    className="w-full p-3 border border-gray-300 rounded-lg dark:text-slate-200 text-slate-700"
                                  />
                                </div>
                              </div>
                              <div className="flex flex-col justify-center items-start gap-y-2">
                                <div className="flex w-full mb-1 border-b"></div>
                                <div className="flex flex-col gap-y-2 justify-start items-start w-full">
                                  <label className="text-sm font-medium text-gray-500">
                                    Nama Pequrban
                                  </label>
                                  <input
                                    type="text"
                                    placeholder="Max. 3 Words : Doremi's son / Doremi's son Family"
                                    className="w-full p-3 border border-gray-300 rounded-lg dark:text-slate-200 text-slate-700"
                                  />
                                </div>
                              </div>
                              <div className="flex flex-col justify-center items-start gap-y-2">
                                <div className="flex w-full mb-1 border-b"></div>
                                <div className="flex flex-col gap-y-2 justify-start items-start w-full">
                                  <label className="text-sm font-medium text-gray-500">
                                    Nama Pequrban
                                  </label>
                                  <input
                                    type="text"
                                    placeholder="Max. 3 Words : Doremi's son / Doremi's son Family"
                                    className="w-full p-3 border border-gray-300 rounded-lg dark:text-slate-200 text-slate-700"
                                  />
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="flex flex-col w-full">
                          {Array.from({length: quantity}, (_, index) => (
                            <div className="qurban-kambing flex flex-col justify-center items-start gap-y-2 mt-4">
                              <div className="flex w-full mb-1 border-b">
                                <h4 className="flex flex-row gap-x-2 text-sm font-semibold text-gray-700 mb-4">
                                  <span>
                                    <UsersRound className="w-4 h-4 text-sky-500" />
                                  </span>{' '}
                                  Hewan {index + 1}
                                </h4>
                              </div>
                              <div className="flex flex-col gap-y-2 justify-start items-start w-full">
                                <label className="text-sm font-medium text-gray-500">
                                  Nama Pequrban
                                </label>
                                <input
                                  type="text"
                                  placeholder="Max. 3 Words : Doremi's son / Doremi's son Family"
                                  className="w-full p-3 border border-gray-300 rounded-lg dark:text-slate-200 text-slate-700"
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      </>
                    )}

                    <div className="w-full">
                      <button
                        type="button"
                        onClick={handleDonasiClick}
                        className="w-full py-3 text-white font-semibold bg-sky-700 hover:bg-sky-600 transition-all duration-600 ease-in rounded-xl"
                      >
                        Donate
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <p className="text-center text-gray-600 dark:text-gray-300">
                  Unknown campaign category.
                </p>
              )}
            </form>
          </div>
          <div className="w-full flex flex-col justify-start items-start gap-y-4">
            <h5 className="text-gray-600 text-lg font-semibold">Donors</h5>
            <div className="w-full flex flex-col justify-start items-start">
              <div className="w-full bg-gray-100 py-6 px-4 rounded-t-3xl">
                <h6 className="text-slate-900 text-sm font-semibold">
                  Share with everyone the same as you donate
                </h6>
              </div>
              <div className="w-full bg-white rounded-b-3xl py-6 px-4"></div>
            </div>
          </div>
          <div className="w-full flex flex-col justify-start items-start gap-y-4">
            <div className="w-full flex flex-row justify-between items-center">
              <h5 className="text-gray-600 text-lg font-semibold">Reports</h5>
              <div className="flex flex-row justify-center items-center gap-x-1 bg-white dark:bg-slate-700 dark:text-white">
                <p className="text-xs font-normal text-sky-700 dark:text-sky-500">
                  Amount Distributed
                </p>
                <div className="flex text-sm flex-row gap-x-2">
                  {formatCurrency(post.amount_distributed)}
                </div>
              </div>
            </div>
            <div className="w-full flex flex-col justify-start items-start">
              <div className="w-full bg-gray-100 py-6 px-4 rounded-t-3xl">
                <h6 className="text-slate-900 text-sm font-semibold">
                  Qurban Report
                </h6>
              </div>
              <div className="w-full bg-white rounded-b-3xl py-6 px-4"></div>
            </div>
          </div>
        </aside>
      </section>
      <PopupNotif
        message={notifMessage}
        duration={3000}
        onClose={() => setNotifMessage('')}
      />
    </main>
  );
};

export default PostDetail;
