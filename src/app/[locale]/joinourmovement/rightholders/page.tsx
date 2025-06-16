'use client';
import React, {useState, useEffect, CSSProperties} from 'react';
import Banner from '@/components/ui/banner/Banner';
import {MoveRight} from 'lucide-react';
import {rightHolders} from '@/data/data';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Link from 'next/link';
import Image from 'next/image';
import {motion} from 'framer-motion';
import {TextGenerateEffect} from '@/components/ui/text-generate-effect';
import {fetchRightholders} from '@/lib/cphp/auth-list-rightholders';
import {useQuery} from '@tanstack/react-query';
import Iframe from 'react-iframe';
import {GlowingEffect} from '@/components/ui/glowing-effect';
import {CalendarDays} from 'lucide-react';
import HashLoader from 'react-spinners/HashLoader';
import {useTranslations} from 'next-intl';

const wordFlips = `Be Part of the Change with Us`;

const override: CSSProperties = {
  display: 'block',
  margin: '0 auto',
  borderColor: 'red'
};

interface Rightholder {
  id: string;
  form_name: string;
  form_description: string;
  link: string;
  end_datetime: string;
}

const Rightholders = () => {
  const t = useTranslations();
  const [step, setStep] = useState(1);
  const [showIframe, setShowIframe] = useState(false);
  const [iframeUrl, setIframeUrl] = useState('');
  let [color, setColor] = useState('#209ce2');

  useEffect(() => {
    const interval = setInterval(() => {
      setStep((prevStep: any) => (prevStep < 2 ? prevStep + 1 : 1));
    }, 15000); // Total duration: 12 seconds + 1 second buffer

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    AOS.init();
  });

  const {
    data: rightholders = [],
    isLoading,
    error
  } = useQuery<Rightholder[]>({
    queryKey: ['rightholders'],
    queryFn: fetchRightholders
  });

  return (
    <main className="">
      <section className="flex flex-row w-full h-[1000px] sm:p-24 p-6 sm:pt-40 pt-24 dark:bg-slate-950 bg-white sm:bg-cover bg-cover bg-center bg-no-repeat">
        <div className="flex sm:flex-col gap-y-16 flex-col justify-start items-center w-full">
          <div
            className="flex flex-col gap-y-12 sm:w-full w-full justify-center sm:pb-0 pb-8"
            data-aos="fade-left"
          >
            <div className="flex flex-col items-center gap-y-6">
              <h3 className="w-1/2">
                <TextGenerateEffect
                  words={t('takeactionRightholders.sectionOne.titleOne')}
                  className="text-center"
                />
              </h3>
              <h6
                className="w-1/2 font-light text-base text-center"
                data-aos="fade-left"
              >
                {t('takeactionRightholders.sectionOne.desc')}
              </h6>
            </div>
          </div>
          <div
            className="animation-image-rightholders rounded flex bg-background h-[500px] sm:w-full w-full items-center justify-center"
            data-aos="fade-left"
          >
            {/* Flow 1: Logo and "Righholders" text */}
            {step === 1 && (
              <div className="flex flex-row gap-x-12 py-16 px-24 w-full justify-center items-center bg-background h-[500px]">
                <motion.div
                  initial={{opacity: 0}}
                  animate={{opacity: 1}}
                  exit={{opacity: 0}}
                  transition={{duration: 3, ease: [0.4, 0, 0.2, 1]}}
                  className="w-1/4"
                >
                  <Image
                    src="/rightholders1.jpg"
                    width={300}
                    height={300}
                    alt="Logo"
                    className="rounded-3xl w-[300px] h-[500px] object-cover"
                  />
                </motion.div>
                <motion.div
                  initial={{opacity: 0}}
                  animate={{opacity: 1}}
                  exit={{opacity: 0}}
                  transition={{duration: 3, ease: [0.4, 0, 0.2, 1]}}
                  className="w-1/4"
                >
                  <Image
                    src="/rightholders2.jpg"
                    width={300}
                    height={300}
                    alt="Logo"
                    className="rounded-3xl w-[300px] h-[400px] object-cover"
                  />
                </motion.div>
                <motion.div
                  initial={{opacity: 0}}
                  animate={{opacity: 1}}
                  exit={{opacity: 0}}
                  transition={{duration: 3, ease: [0.4, 0, 0.2, 1]}}
                  className="w-1/4"
                >
                  <Image
                    src="/rightholders3.jpg"
                    width={300}
                    height={300}
                    alt="Logo"
                    className="rounded-3xl w-[300px] h-[400px] object-cover"
                  />
                </motion.div>
                <motion.div
                  initial={{opacity: 0}}
                  animate={{opacity: 1}}
                  exit={{opacity: 0}}
                  transition={{duration: 3, ease: [0.4, 0, 0.2, 1]}}
                  className="w-1/4"
                >
                  <Image
                    src="/rightholders4.jpg"
                    width={300}
                    height={300}
                    alt="Logo"
                    className="rounded-3xl w-[300px] h-[500px] object-cover"
                  />
                </motion.div>
              </div>
            )}

            {/* Flow 2: "Righholders" text on the left and grid images on the right */}
            {step === 2 && (
              <div className="flex flex-row gap-x-12 py-16 px-24 w-full justify-center items-center bg-background h-[500px]">
                <motion.div
                  initial={{opacity: 0}}
                  animate={{opacity: 1}}
                  exit={{opacity: 0}}
                  transition={{duration: 3, ease: [0.4, 0, 0.2, 1]}}
                  className="w-1/4"
                >
                  <Image
                    src="/rightholders5.jpg"
                    width={300}
                    height={300}
                    alt="Logo"
                    className="rounded-3xl w-[300px] h-[500px] object-cover"
                  />
                </motion.div>
                <motion.div
                  initial={{opacity: 0}}
                  animate={{opacity: 1}}
                  exit={{opacity: 0}}
                  transition={{duration: 3, ease: [0.4, 0, 0.2, 1]}}
                  className="w-1/4"
                >
                  <Image
                    src="/rightholders6.jpg"
                    width={300}
                    height={300}
                    alt="Logo"
                    className="rounded-3xl w-[300px] h-[400px] object-cover"
                  />
                </motion.div>
                <motion.div
                  initial={{opacity: 0}}
                  animate={{opacity: 1}}
                  exit={{opacity: 0}}
                  transition={{duration: 3, ease: [0.4, 0, 0.2, 1]}}
                  className="w-1/4"
                >
                  <Image
                    src="/rightholders7.jpg"
                    width={300}
                    height={300}
                    alt="Logo"
                    className="rounded-3xl w-[300px] h-[400px] object-cover"
                  />
                </motion.div>
                <motion.div
                  initial={{opacity: 0}}
                  animate={{opacity: 1}}
                  exit={{opacity: 0}}
                  transition={{duration: 3, ease: [0.4, 0, 0.2, 1]}}
                  className="w-1/4"
                >
                  <Image
                    src="/rightholders8.jpg"
                    width={300}
                    height={300}
                    alt="Logo"
                    className="rounded-3xl w-[300px] h-[500px] object-cover"
                  />
                </motion.div>
              </div>
            )}
          </div>
        </div>
      </section>
      <section className="flex flex-row w-full sm:p-16 p-6 dark:bg-slate-950 bg-white sm:bg-cover bg-cover bg-center bg-no-repeat">
        <div className="flex sm:flex-col gap-y-16 flex-col justify-start items-center w-full">
          <div
            className="flex flex-col gap-y-12 sm:w-full w-full justify-center items-center sm:pb-0 pb-8"
            data-aos="fade-left"
          >
            <div className="flex flex-col items-center gap-y-6">
              <h3 className="font-medium sm:text-[60px] text-2xl leading-[50px] text-center dark:text-white text-[#002C4A]">
                {t('takeactionRightholders.sectionTwo.title')}
              </h3>
            </div>
            <h6
              className="font-sm text-base w-3/4  text-center"
              data-aos="fade-left"
            >
              {t('takeactionRightholders.sectionTwo.desc')}
            </h6>
          </div>
        </div>
      </section>
      <section className="flex flex-row w-full h-[600px] sm:p-16 p-6 dark:bg-slate-950 bg-white sm:bg-cover bg-cover bg-center bg-no-repeat">
        <div className="flex sm:flex-row flex-col gap-y-16 flex-col justify-start items-center w-full">
          <div className="flex justify-center w-1/2">
            <Image
              src="/Group 913 (4).png"
              width={520}
              height={460}
              alt="Rightholders Human Initative"
            />
          </div>
          <div className="w-1/2 flex flex-col gap-y-8">
            <h6 className="text-base font-normal text-sky-500">
              {t('takeactionRightholders.sectionThree.titleOne')}
            </h6>
            <h3 className="font-medium sm:text-[50px] text-2xl leading-[50px] dark:text-white text-[#002C4A]">
              {t('takeactionRightholders.sectionThree.titleTwo')}
            </h3>
            <h4 className="font-normal text-sm">
              {t('takeactionRightholders.sectionThree.desc')}
            </h4>
          </div>
        </div>
      </section>
      <section
        className={`relative flex flex-col w-full sm:px-32 sm:py-20 p-6 dark:bg-slate-900 bg-gray-50`}
      >
        <div className="flex sm:flex-row flex-col sm:pb-20 pb-12">
          <h5
            className={`font-semibold sm:text-[54px] text-2xl sm:w-1/2 w-full pr-3 sm:pb-0 pb-4 leading-tight`}
            data-aos="fade-up"
            data-aos-easing="linear"
            data-aos-duration="700"
          >
            {t('takeactionRightholders.sectionFour.titleOne')}{' '}
            <span className="text-sky-500">
              {t('takeactionRightholders.sectionFour.titleTwo')}
            </span>
          </h5>
          <p
            className={`flex justify-end items-center font-semibold text-sky-950 text-normal sm:w-1/2 w-full pr-6`}
            data-aos="fade-right"
            data-aos-easing="linear"
            data-aos-duration="1000"
          >
            {t('takeactionRightholders.sectionFour.desc')}
          </p>
        </div>
        <div className="grid sm:grid-cols-4 grid-cols-1 gap-6">
          {isLoading ? (
            <HashLoader
              color={color}
              loading={isLoading}
              cssOverride={override}
              size={50}
            />
          ) : error || rightholders.length === 0 ? (
            <p className="text-lg font-semibold text-gray-600 dark:text-gray-300">
              No data available
            </p>
          ) : (
            rightholders.map((donate, index) => (
              <div
                key={index}
                className="bg-white dark:bg-slate-800 rounded-xl border p-6 sm:pb-0 pb-6"
                data-aos="fade-up"
              >
                <GlowingEffect
                  spread={40}
                  glow={true}
                  disabled={false}
                  proximity={64}
                  inactiveZone={0.01}
                />
                <div className="flex flex-col gap-y-4 py-4 px-6 pt-8 rounded-xl relative">
                  <div className="fixed top-0 right-0 bg-sky-700 dark:bg-sky-600 text-white py-2 px-3 rounded-tr-xl rounded-tl-xl w-full flex flex-row justify-center items-center gap-x-3">
                    <CalendarDays />
                    <span className="text-sm">{donate.end_datetime}</span>
                  </div>
                  <h3 className="sm:text-base text-base text-center font-semibold sm:pb-6 pb-3 h-[80px] overflow-hidden">
                    {donate.form_name}
                  </h3>
                  <h3 className="sm:text-sm text-sm text-center text-slate-400 dark:text-slate-300 font-normal sm:pb-6 pb-3 h-[60px] overflow-hidden">
                    {donate.form_description}
                  </h3>
                  <button
                    onClick={() => {
                      setIframeUrl(donate.link);
                      setShowIframe(true);
                    }}
                    className="flex justify-center items-center w-full text-sky-500 dark:text-sky-500 p-2 rounded-lg bg-transparent font-medium hover:transition hover:ease-in-out"
                  >
                    {t('takeactionRightholders.sectionFour.apply')}{' '}
                    <MoveRight />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
        {showIframe && iframeUrl && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-[100]">
            <div className="relative bg-white dark:bg-slate-700 rounded-lg w-full sm:w-3/4 h-full">
              <button
                onClick={() => setShowIframe(false)}
                className="absolute top-3 right-3 text-white bg-sky-500 hover:bg-sky-700 rounded-full w-8 h-8"
              >
                ✕
              </button>
              <Iframe
                url={iframeUrl}
                width="100%"
                height="100%"
                allowFullScreen
              />
            </div>
          </div>
        )}
      </section>
    </main>
  );
};

export default Rightholders;
