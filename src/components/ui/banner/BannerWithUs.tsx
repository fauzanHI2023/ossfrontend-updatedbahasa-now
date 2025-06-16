'use client';

import {useEffect, useState} from 'react';
import {motion, AnimatePresence} from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import {useTranslations} from 'next-intl';

const slides = [
  {
    keyword: 'Child Protection',
    buttonlabel: 'Pelajari Selengkapnya!',
    colorlabel: 'bg-sky-500',
    image: '/IMG_8069.JPG'
  },
  {
    keyword: 'Infrastruktur',
    buttonlabel: 'Pelajari Selengkapnya!',
    colorlabel: 'bg-amber-500',
    image: '/DSC_1030.JPG'
  },
  {
    keyword: 'Empowerment',
    buttonlabel: 'Pelajari Selengkapnya!',
    colorlabel: 'bg-lime-500',
    image: '/DSC05047.JPG'
  },
  {
    keyword: 'Disaster Management',
    buttonlabel: 'Pelajari Selengkapnya!',
    colorlabel: 'bg-violet-500',
    image: '/WhatsApp Image 2025-03-12 at 4.40.21 PM.jpeg'
  }
];

// Animasi untuk <span>
const keywordVariants = {
  initial: {opacity: 0, y: 20},
  animate: {opacity: 1, y: 0},
  exit: {opacity: 0, y: -20}
};

// Animasi gambar dari kanan
const imageVariants = {
  initial: {opacity: 0, x: 100},
  animate: {opacity: 1, x: 0},
  exit: {opacity: 0, x: -100}
};

export default function BannerCarousel() {
  const t = useTranslations();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 7000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full min:h-[778px] bg-gray-50 flex items-center justify-center p-6 pt-32 pb-28">
      <div className="w-[1250px] grid grid-cols-1 md:flex md:flex-row md:justify-between gap-8 items-center">
        {/* Text Section */}
        <div className="space-y-2 flex flex-col gap-y-5 w-[65%]">
          <h2 className="md:leading-[40px] w-[65%] text-3xl md:text-[2.5rem] font-bold text-gray-900">
            <span className="md:leading-[72px]">
              {t('takeactionCollaborationImpact.sectionOne.titleOne')}
            </span>
            <div className="flex flex-col flex-nowrap gap-1 md:flex-row md:flex-wrap">
              <h5>{t('takeactionCollaborationImpact.sectionOne.titleTwo')}</h5>
              <AnimatePresence mode="wait">
                <motion.span
                  key={slides[index].keyword}
                  variants={keywordVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={{duration: 0.6}}
                  className="text-primary inline-block md:leading-[72px] text-sky-600"
                >
                  {slides[index].keyword}
                </motion.span>
              </AnimatePresence>
            </div>
          </h2>
          <div className="flex flex-col gap-y-6">
            <p className="text-base text-gray-800 font-medium">
              {t('takeactionCollaborationImpact.sectionOne.desc')}
            </p>
            <div className="flex flex-row gap-x-4">
              <AnimatePresence mode="wait">
                <Link href="#">
                  <motion.span
                    key={slides[index].buttonlabel}
                    variants={keywordVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    transition={{duration: 0.6}}
                    className={`${slides[index].colorlabel} rounded-2xl text-center flex justify-center items-center text-white px-3 w-[240px] h-12`}
                  >
                    {slides[index].buttonlabel}
                  </motion.span>
                </Link>
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Image Section */}
        <div className="w-[35%] relative h-64 md:h-80 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={slides[index].image}
              variants={imageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{duration: 0.8}}
              className="absolute w-full h-full"
            >
              <Image
                src={slides[index].image}
                alt={slides[index].keyword}
                fill
                className="object-cover rounded-2xl shadow-lg"
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
