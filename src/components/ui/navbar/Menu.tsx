import React, {useState, useEffect} from 'react';
import {menuItems} from '@/data/data';
import SubMenu from '@/components/SubMenu';
import Link from 'next/link';
import {ChevronDown} from 'lucide-react';
import {useTranslations} from 'next-intl';
import {usePathname} from 'next/navigation';

const Menu = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const translate = (label: string) => {
    const [namespace, key] = label.split('.');
    if (!namespace || !key) return label;
    const scopedT = useTranslations(namespace);
    return scopedT(key);
  };

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

  const isHome = /^\/[a-z]{2}\/?$/.test(pathname);

  const textClass = isScrolled
    ? 'text-slate-500'
    : isHome
      ? 'text-white'
      : 'text-slate-500';

  return (
    <ul className={`hidden sm:flex flex-row relative mt-4 w-auto px-4 gap-x-6`}>
      {menuItems.map((item) => (
        <li key={item.id} className="relative group text-base font-normal pb-2">
          <Link
            href={item.url}
            className={`${textClass} inline-block dark:hover:text-slate-200 dark:text-slate-300 hover:text-slate-700 menu-slide transition duration-200 ease-in text-base font-normal`}
          >
            <span className="flex flex-row">
              {translate(item.label)} <ChevronDown className="text-sm w-4" />
            </span>
          </Link>
          {item.subMenu && <SubMenu items={item.subMenu} />}
        </li>
      ))}
    </ul>
  );
};

export default Menu;
