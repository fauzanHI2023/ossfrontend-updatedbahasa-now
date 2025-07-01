'use client';
import React from 'react';
import {
  FaWhatsapp,
  FaInstagram,
  FaTiktok,
  FaLinkedinIn,
  FaFacebookF
} from 'react-icons/fa';
import {FaXTwitter} from 'react-icons/fa6';
import {AiOutlineYoutube} from 'react-icons/ai';
import {usePathname} from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import {useTranslations} from 'next-intl';
import {motion} from 'framer-motion';

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2 // jeda antar button
    }
  }
};

const textVariants = {
  hidden: {opacity: 0, y: 50},
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1.5,
      ease: 'easeOut'
    }
  }
};

const buttonVariants = {
  hidden: {opacity: 0, x: 50},
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 1.5,
      ease: 'easeOut'
    }
  }
};

const buttonVariantsLeft = {
  hidden: {opacity: 0, x: -50},
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut'
    }
  }
};

const Footer = () => {
  const pathname = usePathname();
  const t = useTranslations();
  const isPageLogin = pathname === '/login';

  const isPageRegister = pathname === '/register';
  return (
    <footer
      className={`flex flex-col mx-auto w-full max-w-8xl ${
        isPageLogin ? 'hidden' : 'flex'
      } ${isPageRegister ? 'hidden' : 'flex'}`}
      // style={{boxShadow: '0px 0px 3px 0px rgba(148,148,148,1)'}}
    >
      <div className="flex flex-col gap-y-10 px-6 py-12 xs:px-8 sm:px-24 sm:py-24 sm:pb-16 bg-sky-400 border-t border-gray-100">
        <div className="flex sm:flex-row flex-col justify-between items-start w-full">
          <div className="sm:w-1/3 w-full">
            <Image
              src="/logo HI White (1).png"
              alt="Human Initiative"
              width={200}
              height={70}
              className="w-[200px] h-[70px]"
            />
          </div>
          <div className="flex flex-col gap-y-0 sm:gap-y-8 sm:w-3/5 w-full sm:mt-0 mt-6">
            <ul className="flex sm:flex-row flex-col sm:gap-x-4 sm:gap-y-0 gap-y-3">
              <li className="text-white hover:font-medium transition duration-200 ease-in text-sm font-normal ">
                <Link href="/termandconditions">
                  {t('footerSection.termandconditions')}
                </Link>
              </li>
              <li className="sm:flex hidden text-white hover:font-medium transition duration-200 ease-in text-sm font-normal ">
                |
              </li>
              <li className="text-white hover:font-medium transition duration-200 ease-in text-sm font-normal ">
                <Link href="/privacypolicy">
                  {t('footerSection.privacyPolicy')}
                </Link>
              </li>
              <li className="sm:flex hidden text-white hover:font-medium transition duration-200 ease-in text-sm font-normal ">
                |
              </li>
              <li className="text-white hover:font-medium transition duration-200 ease-in text-sm font-normal ">
                <Link href="/faq">{t('footerSection.faq')}</Link>
              </li>
              <li className="sm:flex hidden text-white hover:font-medium transition duration-200 ease-in text-sm font-normal ">
                |
              </li>
              <li className="text-white hover:font-medium transition duration-200 ease-in text-sm font-normal ">
                <Link href="/whistleblowing">
                  {t('footerSection.whistleBlowingHi')}
                </Link>
              </li>
            </ul>
            <ul className="flex sm:flex-row flex-col gap-x-4 sm:gap-y-0 gap-y-3 sm:mt-0 mt-3">
              <li className="text-white hover:font-medium transition duration-200 ease-in text-sm font-normal ">
                <Link href="/termandconditions">
                  {t('footerSection.contact')}
                </Link>
              </li>
              <li className="sm:flex hidden text-white hover:font-medium transition duration-200 ease-in text-sm font-normal ">
                |
              </li>
              <li className="text-white hover:font-medium transition duration-200 ease-in text-sm font-normal ">
                <Link href="/privacypolicy">
                  {t('footerSection.locations')}
                </Link>
              </li>
            </ul>
            <ul className="flex flex-row gap-x-4 sm:mt-0 mt-3">
              <li className="text-white transition duration-200 ease-in text-base font-semibold ">
                NPWP : 01.945.505.4-005.000
              </li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col gap-y-4">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{once: true, amount: 0.3}}
          >
            <motion.p
              className="text-white dark:text-white text-sm font-normal italic"
              variants={textVariants}
            >
              &quot;{t('footerSection.descFooter')}​&quot;
            </motion.p>
          </motion.div>
        </div>
      </div>
      <div className="flex flex-col gap-y-10 px-6 py-4 xs:px-8 sm:px-24 sm:py-4 bg-slate-50 shadow-xl">
        <div className="flex flex-row justify-between items-center">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{once: true, amount: 0.3}}
          >
            <motion.h6
              className={`text-gray-600 dark:text-white text-xs`}
              variants={buttonVariantsLeft}
            >
              <span>&#64;</span> 2025 Human Initiative. All rights reserved
            </motion.h6>
          </motion.div>
          <motion.div
            className="flex flex-row"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{once: true, amount: 0.3}}
          >
            <motion.span className={`px-1`} variants={buttonVariants}>
              <FaWhatsapp className="text-green-500 w-6 h-6" />
            </motion.span>
            <motion.span className={`px-1`} variants={buttonVariants}>
              <FaInstagram className="text-pink-500 w-6 h-6" />
            </motion.span>
            <motion.span className={`px-1`} variants={buttonVariants}>
              <AiOutlineYoutube className="text-red-500 w-6 h-6" />
            </motion.span>
            <motion.span className={`px-1`} variants={buttonVariants}>
              <FaTiktok className="text-black w-6 h-6" />
            </motion.span>
            <motion.span className={`px-1`} variants={buttonVariants}>
              <FaLinkedinIn className="text-[#0277b5] w-6 h-6" />
            </motion.span>
            <motion.span className={`px-1`} variants={buttonVariants}>
              <FaXTwitter className="text-black w-6 h-6" />
            </motion.span>
            <motion.span className={`px-1`} variants={buttonVariants}>
              <FaFacebookF className="text-[#0766ff] w-6 h-6" />
            </motion.span>
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
