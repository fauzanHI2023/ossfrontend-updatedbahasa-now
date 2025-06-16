'use client';
import React, {useEffect} from 'react';
import {programCard} from '@/data/data';
import Link from 'next/link';
import {FaArrowRightLong} from 'react-icons/fa6';
import AOS from 'aos';
import 'aos/dist/aos.css';
import {useTranslations, useLocale} from 'next-intl';

const OurProgram = () => {
  const t = useTranslations();
  const locale = useLocale();
  const isRTL = locale === 'ar';

  useEffect(() => {
    AOS.init();
  }, []);
  return (
    <section className={`relative flex flex-col w-full sm:px-32 sm:py-20 p-6`}>
      <div
        dir={isRTL ? 'rtl' : 'ltr'}
        className={`flex flex-col sm:flex-row ${isRTL ? 'flex-col sm:flex-row' : ''} sm:pb-20 pb-12`}
      >
        <div
          className={`flex flex-col gap-y-1 sm:w-1/2 w-full sm:pr-12 pr-0 sm:pb-0 pb-4`}
        >
          <h5
            className={` font-bold text-slate-700 dark:text-white sm:text-3xl text-2xl tracking-light leading-normal`}
            data-aos="fade-up"
            data-aos-easing="linear"
            data-aos-duration="700"
          >
            {t('SectionTwoHome.welcome')},{' '}
            <span className="text-sky-500">{t('SectionTwoHome.hi')}</span>
          </h5>
          <h5
            className={`font-bold text-slate-700 dark:text-white sm:text-3xl text-2xl tracking-light leading-loose`}
            data-aos="fade-up"
            data-aos-easing="linear"
            data-aos-duration="700"
          >
            {t('SectionTwoHome.title')}
          </h5>
          <p
            className={`text-gray-500 font-base text-normal pr-6 pt-6`}
            data-aos="fade-up"
            data-aos-easing="linear"
            data-aos-duration="1000"
          >
            {t('SectionTwoHome.desc')}
          </p>
        </div>
        <div
          className={`font-base text-normal sm:w-1/2 w-full pr-6`}
          data-aos="fade-up"
          data-aos-easing="linear"
          data-aos-duration="1000"
        >
          <iframe
            width="520"
            height="300"
            src="https://www.youtube.com/embed/2K6drhGq198"
            title="25 Tahun Human Initiative - Collective Kindness"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            className="rounded-xl"
          ></iframe>
        </div>
      </div>
      <div className="grid sm:grid-cols-4 grid-cols-1 sm:gap-x-6 gap-y-8">
        {programCard.map((program, index) => {
          const tp = useTranslations(program.namespace); // dynamic namespace per card

          return (
            <div
              key={index}
              data-aos="fade-up"
              data-aos-duration="800"
              className="rounded-xl bg-slate-100 dark:hover:bg-slate-800 hover:bg-slate-200 transition duration-300 ease-in dark:bg-slate-900 sm:pb-0 pb-6"
            >
              <div className="flex flex-col justify-between items-center gap-y-4 py-4 px-6 rounded-xl h-full">
                <div className="flex flex-col justify-center items-center">
                  <div className="pb-4 text-4xl text-sky-300">
                    {program.icon}
                  </div>
                  <h3 className="flex items-center sm:text-xl text-lg text-center font-semibold sm:pb-6 pb-3 h-[70px]">
                    {tp('title')}
                  </h3>
                  <p className="text-sm text-center">{tp('desc')}</p>
                </div>
                <Link
                  href={program.url}
                  className="flex flex-row items-start w-[40px] bg-slate-100 dark:bg-slate-800 rounded-lg p-2 text-2xl transition hover:w-full dark:hover:bg-slate-700 hover:bg-sky-500 hover:text-white overflow-hidden relative"
                >
                  <FaArrowRightLong className="w-16 transition duration-300" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default OurProgram;
