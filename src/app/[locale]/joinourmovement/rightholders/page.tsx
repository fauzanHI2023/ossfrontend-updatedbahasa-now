'use client';
import React, {useState, useEffect, CSSProperties} from 'react';
import {MoveRight} from 'lucide-react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Image from 'next/image';
import {motion} from 'framer-motion';
import {TextGenerateEffect} from '@/components/ui/text-generate-effect';
import {useTranslations} from 'next-intl';
import ListRightholders from '@/components/ui/rightholders/ListRightholders';

const Rightholders = () => {
  const t = useTranslations();
  const [step, setStep] = useState(1);
  const [color, _setColor] = useState('#209ce2');

  useEffect(() => {
    const interval = setInterval(() => {
      setStep((prevStep: any) => (prevStep < 2 ? prevStep + 1 : 1));
    }, 15000); // Total duration: 12 seconds + 1 second buffer

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    AOS.init();
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
              <h3 className="font-medium sm:text-[60px] text-2xl leading-[50px] text-center dark:text-white text-slate-500">
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
            className={`font-semibold text-4xl w-full pr-3 sm:pb-0 pb-4 leading-tight`}
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
            className={`hidden flex justify-end items-center font-semibold text-sky-950 text-normal sm:w-1/2 w-full pr-6`}
            data-aos="fade-right"
            data-aos-easing="linear"
            data-aos-duration="1000"
          >
            {t('takeactionRightholders.sectionFour.desc')}
          </p>
        </div>
        <ListRightholders />
      </section>
    </main>
  );
};

export default Rightholders;
