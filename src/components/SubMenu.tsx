'use client';
import Link from 'next/link';
import {useTranslations} from 'next-intl';

interface SubMenuItem {
  id: number;
  label: string;
  url: string;
}

interface MenuItem {
  id: number;
  label: string;
  url: string;
  subMenu?: SubMenuItem[];
}

interface SubMenuProps {
  items: MenuItem[];
}

const SubMenu: React.FC<SubMenuProps> = ({items}) => {
  const translate = (label: string) => {
    const [namespace, key] = label.split('.');
    if (!namespace || !key) return label;
    const scopedT = useTranslations(namespace);
    return scopedT(key);
  };
  return (
    <ul className="hidden group-hover:block sm:absolute relative bg-transaparent sm:bg-white drop-shadow-2xl rounded-lg transition duration-500 ease-in sm:mt-o mt-2">
      {items.map((item) => (
        <li key={item.id} className="w-full">
          <Link
            href={item.url}
            className="block px-4 py-2 text-sm text-sky-700 font-semibold transition hover:ease-in hover:duration-300 break-normal hover:text-white hover:bg-sky-500 dark:hover:bg-sky-700 w-full"
          >
            {translate(item.label)}
          </Link>
          {item.subMenu && <SubMenu items={item.subMenu} />}
        </li>
      ))}
    </ul>
  );
};

export default SubMenu;
