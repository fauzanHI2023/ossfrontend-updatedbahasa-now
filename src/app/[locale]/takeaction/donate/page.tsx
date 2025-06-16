'use client';
import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  Suspense,
  CSSProperties
} from 'react';
import {MoveRight} from 'lucide-react';
import {publicDonate, joinProject} from '@/data/data';
import {Progress} from '@/components/ui/progress_fe';
import {fetchCampaign} from '@/lib/donation/campaign/auth-campaign';
import {fetchCampaignByCoreProgram} from '@/lib/donation/campaign/auth-campaign';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Link from 'next/link';
import Image from 'next/image';
import {motion, useScroll} from 'framer-motion';
import {FlipWords} from '@/components/ui/flip-words';
import {Heart} from 'lucide-react';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from '@/components/ui/tabs-fe';
import {useTranslations} from 'next-intl';
import HashLoader from 'react-spinners/HashLoader';

const ITEMS_PER_PAGE = 8;

const override: CSSProperties = {
  display: 'block',
  margin: '0 block',
  borderColor: 'red'
};

const Donate = () => {
  const t = useTranslations();
  const {scrollYProgress} = useScroll();
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('all');
  const [campaigns, setCampaigns] = useState<any[]>([]);
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  let [color, setColor] = useState('#209ce2');

  const itemsPerPage = 4;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        let campaignsData;
        if (activeTab === 'all') {
          campaignsData = await fetchCampaign();
        } else {
          campaignsData = await fetchCampaignByCoreProgram(activeTab);
        }
        setCampaigns(campaignsData?.data || []);
      } catch (err) {
        setError('Failed to load campaigns');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [activeTab]);
  // Function to filter collection items by type
  const filterCollectionByType = (tipe: string) => {
    return joinProject.filter((item) => item.tipe === tipe);
  };

  const texts = [
    'Your Donation, Change the World Now',
    'Small Steps, Big Impact Together'
  ];

  const wordFlips = [
    'Your Donation, Change the World Now',
    'Small Steps, Big Impact Together'
  ];

  const [currentTextIndex, setCurrentTextIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTextIndex((prevIndex) => (prevIndex + 1) % texts.length);
    }, 11000); // Setiap 11 detik: 5 detik animasi + 6 detik delay

    return () => clearInterval(interval); // Bersihkan interval ketika komponen tidak lagi dirender
  }, []);

  useEffect(() => {
    AOS.init();
  });

  const calculateProgress = (grossAmount: any): any => {
    const min = 50000;
    const max = 100000000;
    return ((grossAmount - min) / (max - min)) * 100;
  };

  const stripHtml = (html: string) => {
    if (typeof window !== 'undefined') {
      const doc = new DOMParser().parseFromString(html, 'text/html');
      return doc.body.textContent || '';
    }
    return html;
  };

  const truncateAndStripHtml = (html: string, wordLimit: number) => {
    const plainText = stripHtml(html);
    const words = plainText.split(' ');
    return (
      words.slice(0, wordLimit).join(' ') +
      (words.length > wordLimit ? '...' : '')
    );
  };

  if (error) {
    return (
      <div className="p-24 text-center text-red-500">
        <p>{error}</p>
      </div>
    );
  }

  const formatCurrency = (value: string) => {
    const parsedValue = parseInt(value || '0');
    return `Rp ${parsedValue.toLocaleString('id-ID')}`;
  };

  return (
    <main className="">
      <section className="flex flex-row w-full min:h-[778px] sm:p-24 p-6 sm:pt-34 pt-24 dark:bg-slate-900 bg-sky-50 sm:bg-cover bg-cover bg-center bg-no-repeat">
        <div className="flex sm:flex-row flex-col justify-center items-center w-full">
          <div
            className="flex flex-col gap-y-6 sm:w-3/5 w-full justify-center sm:pb-0 pb-8"
            data-aos="fade-left"
          >
            <div className="flex flex-col gap-y-4 pr-16">
              <motion.h3
                key={currentTextIndex}
                className="font-semibold sm:text-[52px] text-2xl pb-3 dark:text-white text-slate-800 leading-tight"
              >
                <FlipWords words={wordFlips} />
              </motion.h3>
            </div>
            <h6
              className="text-base font-light text-slate-600 dark:text-slate-300"
              data-aos="fade-left"
            >
              {t('takeactionDonatePage.sectionOne.titletwo')}
            </h6>
            <button className="bg-sky-600 rounded-xl hover:bg-sky-500 transition duration-200 ease-in dark:bg-sky-500 dark:text-white text-white py-4 px-6 w-[200px]">
              Lets Donate
            </button>
          </div>
          <div
            className="animation-banner-donate flex sm:w-2/5 w-full items-center justify-center"
            data-aos="fade-right"
          >
            <div className="grid grid-cols-3 gap-4">
              <motion.div
                className="col-span-2"
                initial={{opacity: 0, scale: 0.8}}
                animate={{opacity: 1, scale: 1}}
                transition={{duration: 0.8}}
              >
                <Image
                  src="/rightholders1.jpg"
                  alt="image 1"
                  width={200}
                  height={200}
                />
              </motion.div>
              <motion.div
                className="col-span-1"
                initial={{opacity: 0, scale: 0.8}}
                animate={{opacity: 1, scale: 1}}
                transition={{duration: 0.8}}
              >
                <Image
                  src="/rightholders2.jpg"
                  alt="image 2"
                  width={200}
                  height={200}
                />
              </motion.div>
              <motion.div
                className="col-span-1"
                initial={{opacity: 0, scale: 0.8}}
                animate={{opacity: 1, scale: 1}}
                transition={{duration: 0.8}}
              >
                <Image
                  src="/rightholders3.jpg"
                  alt="image 3"
                  width={200}
                  height={200}
                />
              </motion.div>
              <motion.div
                className="col-span-1"
                initial={{opacity: 0, scale: 0.8}}
                animate={{opacity: 1, scale: 1}}
                transition={{duration: 0.8}}
              >
                <Image
                  src="/rightholders4.jpg"
                  alt="image 4"
                  width={200}
                  height={200}
                />
              </motion.div>
              <motion.div
                className="col-span-1"
                initial={{opacity: 0, scale: 0.8}}
                animate={{opacity: 1, scale: 1}}
                transition={{duration: 0.8}}
              >
                <Image
                  src="/rightholders2.jpg"
                  alt="image 4"
                  width={200}
                  height={200}
                />
              </motion.div>
              <motion.div
                className="col-span-2"
                initial={{opacity: 0, scale: 0.8}}
                animate={{opacity: 1, scale: 1}}
                transition={{duration: 0.8}}
              >
                <Image
                  src="/rightholders4.jpg"
                  alt="image 5"
                  width={200}
                  height={200}
                />
              </motion.div>
              <motion.div
                className="col-span-1"
                initial={{opacity: 0, scale: 0.8}}
                animate={{opacity: 1, scale: 1}}
                transition={{duration: 0.8}}
              >
                <Image
                  src="/rightholders1.jpg"
                  alt="image 4"
                  width={200}
                  height={200}
                />
              </motion.div>
            </div>
          </div>
        </div>
      </section>
      <section
        className={`relative flex flex-col w-full sm:px-32 sm:py-20 p-6 bg-white dark:bg-slate-950`}
      >
        <div className="flex sm:flex-row flex-col sm:pb-20 pb-12">
          <h5
            className={`font-semibold sm:text-[54px] text-2xl sm:w-1/2 w-full pr-3 sm:pb-0 pb-4 leading-tight`}
            data-aos="fade-up"
            data-aos-easing="linear"
            data-aos-duration="700"
          >
            {t('takeactionDonatePage.sectionTwo.titleOne')}{' '}
            <span className="text-sky-600">
              {t('takeactionDonatePage.sectionTwo.titleTwo')}
            </span>
          </h5>
          <p
            className={`flex justify-end items-center font-normal text-slate-600 dark:text-slate-200 text-base sm:w-1/2 w-full pr-6`}
            data-aos="fade-right"
            data-aos-easing="linear"
            data-aos-duration="1000"
          >
            {t('takeactionDonatePage.sectionTwo.desc')}
          </p>
        </div>
        <div className="flex flex-row gap-x-8">
          <Tabs defaultValue="all" onValueChange={setActiveTab}>
            <TabsList className="pb-6">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="children">Children</TabsTrigger>
              <TabsTrigger value="disaster">Disaster</TabsTrigger>
              <TabsTrigger value="empowerment">Empowerment</TabsTrigger>
              <TabsTrigger value="infrastructure">Infrastructure</TabsTrigger>
              <TabsTrigger value="sebar qurban">Sebar Qurban</TabsTrigger>
            </TabsList>

            <TabsContent value={activeTab}>
              {loading ? (
                <div className="sm:grid sm:grid-cols-4 sm:gap-10 w-full flex flex-col gap-y-6">
                  {Array.from({length: itemsPerPage}).map((_, index) => (
                    <div
                      key={index}
                      className="publikasi-card mb-4 border-b pb-4 w-full flex flex-col-reverse gap-x-3 justify-between bg-gray-200 dark:bg-slate-800 animate-pulse"
                    >
                      <div className="flex flex-col justify-between items-start w-full px-6 py-4">
                        <div className="h-6 w-32 bg-gray-300 dark:bg-slate-600 rounded"></div>
                        <div className="h-4 w-full bg-gray-300 dark:bg-slate-600 rounded mt-2"></div>
                        <div className="h-4 w-3/4 bg-gray-300 dark:bg-slate-600 rounded mt-2"></div>
                        <div className="flex sm:flex-row flex-col gap-x-4 mt-4">
                          <div className="h-6 w-24 bg-gray-300 dark:bg-slate-600 rounded"></div>
                          <div className="h-6 w-32 bg-gray-300 dark:bg-slate-600 rounded"></div>
                        </div>
                      </div>
                      <div className="w-full h-[240px] bg-gray-300 dark:bg-slate-600 rounded"></div>
                    </div>
                  ))}
                </div>
              ) : error ? (
                <p className="text-red-500">{error}</p>
              ) : (
                <div className="flex flex-col sm:grid sm:grid-cols-4 gap-x-8 gap-y-6 flex-wrap">
                  {campaigns.map((campaign) => (
                    <div
                      key={campaign.id}
                      className="h-full flex flex-col justify-between rounded-2xl"
                    >
                      <Link href={`/campaign/${campaign.slug}`}>
                        <div className="publikasi-card flex flex-col gap-y-4 h-[200px]">
                          <Image
                            src={`https://cdnx.human-initiative.org/image/${campaign.campaign_img}`}
                            alt={campaign.campaign_name}
                            width={500}
                            height={500}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </Link>
                      <div className="flex flex-col p-4 dark:bg-slate-900 bg-white">
                        <div className="flex flex-col gap-y-4">
                          <span className="flex text-sky-500 text-sm dark:text-slate-200 dark:text-sky-500 dark:bg-slate-700 bg-sky-100 py-1 px-4 rounded-2xl w-max">
                            {campaign.core_program}
                          </span>
                          <Link href={`/campaign/${campaign.slug}`}>
                            <h6 className="text-lg font-semibold text-slate-700 dark:text-white h-[60px] overflow-hidden">
                              {campaign.campaign_name}
                            </h6>
                          </Link>
                          <h6 className="text-sm font-medium text-slate-600 dark:text-white h-[40px] overflow-hidden">
                            {truncateAndStripHtml(
                              campaign.campaign_description,
                              5
                            )}
                          </h6>
                          <Progress
                            value={calculateProgress(
                              campaign.donation_collected || 0
                            )}
                          />
                        </div>
                        <p className="text-sm text-sky-700 dark:text-white text-center flex flex-row gap-x-2 py-4">
                          <span>
                            <Heart className="text-red-500" />
                          </span>
                          {campaign.support} people give support
                        </p>
                        <div className="flex flex-row gap-x-8">
                          <div className="w-2/3 flex flex-col justify-center items-start">
                            <h6 className="text-sky-500 dark:text-sky-500 text-base font-medium">
                              {formatCurrency(campaign.donation_collected)}
                            </h6>
                          </div>
                          <Link
                            href={`/campaign/${campaign.slug}`}
                            className="flex justify-center items-center w-1/3 bg-sky-700 text-center hover:bg-sky-600 transition duration-200 ease-in text-white dark:text-white py-3 px-4 rounded-xl"
                          >
                            Donate
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </main>
  );
};

export default Donate;
