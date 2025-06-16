import React from 'react';
import {menuItems} from '@/data/data';
import SubMenu from '@/components/SubMenu';
import Link from 'next/link';
import {ChevronDown} from 'lucide-react';
import {useTranslations} from 'next-intl';

const MobileMenu = () => {
  const translate = (label: string) => {
    const [namespace, key] = label.split('.');
    if (!namespace || !key) return label;
    const scopedT = useTranslations(namespace);
    return scopedT(key);
  };

  return (
    <ul className={`flex flex-col gap-x-6 w-full`}>
      {menuItems.map((item) => (
        <li key={item.id} className="relative group text-base font-normal pb-4">
          <Link
            href={item.url}
            className="flex flex-row dark:hover:text-slate-200 dark:text-slate-300 hover:text-slate-700 hover:font-semibold transition duration-200 ease-in text-slate-500 text-base font-semibold"
          >
            {translate(item.label)} <ChevronDown className="text-sm w-4" />
          </Link>
          {item.subMenu && <SubMenu items={item.subMenu} />}
        </li>
      ))}
    </ul>
  );
};

export default MobileMenu;
