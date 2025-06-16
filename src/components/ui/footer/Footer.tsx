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
          <div>
            <p className="text-white dark:text-white text-sm font-normal italic">
              &quot;{t('footerSection.descFooter')}​&quot;
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-y-10 px-6 py-4 xs:px-8 sm:px-24 sm:py-4 bg-slate-50 shadow-xl">
        <div className="flex flex-row justify-between items-center">
          <h6 className={`text-gray-600 dark:text-white text-xs`}>
            <span>&#64;</span> 2025 Human Initiative. All rights reserved
          </h6>
          <div className="flex flex-row">
            <span className={`px-1`}>
              <FaWhatsapp className="text-green-500 w-6 h-6" />
            </span>
            <span className={`px-1`}>
              <FaInstagram className="text-pink-500 w-6 h-6" />
            </span>
            <span className={`px-1`}>
              <AiOutlineYoutube className="text-red-500 w-6 h-6" />
            </span>
            <span className={`px-1`}>
              <FaTiktok className="text-black w-6 h-6" />
            </span>
            <span className={`px-1`}>
              <FaLinkedinIn className="text-[#0277b5] w-6 h-6" />
            </span>
            <span className={`px-1`}>
              <FaXTwitter className="text-black w-6 h-6" />
            </span>
            <span className={`px-1`}>
              <FaFacebookF className="text-[#0766ff] w-6 h-6" />
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
