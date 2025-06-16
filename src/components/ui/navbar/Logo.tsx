'use client';

import React, {useState, useEffect} from 'react';
import {usePathname} from 'next/navigation';
import Link from 'next/link';

const Logo = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  // Cek apakah pathname hanya "/en", "/id", "/ar", dll
  const isHome = /^\/[a-z]{2}\/?$/.test(pathname);

  const logoBgClass = isScrolled
    ? 'bg-logo-blue'
    : isHome
      ? 'bg-logo-white'
      : 'bg-logo-blue';

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <Link
      href="/"
      className={`${logoBgClass} hidden sm:flex w-32 h-12 bg-no-repeat bg-contain title-font font-medium items-center text-gray-900 mb-0`}
    />
  );
};

export default Logo;
