'use client';
import React from 'react';
import {FloatingDock} from '@/components/ui/floating-dock';
import {
  IconBrandGithub,
  IconBrandX,
  IconExchange,
  IconHome,
  IconNewSection,
  IconTerminal2,
  IconCreditCardPay,
  IconUsers
} from '@tabler/icons-react';
import Cart from './Cart';

export function FloatingDockDemo() {
  const links = [
    {
      title: 'Home',
      icon: (
        <IconHome className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: '#'
    },

    {
      title: 'Cart',
      icon: <Cart />,
      href: '/checkout'
    },
    {
      title: 'Donate',
      icon: (
        <IconCreditCardPay className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: '/takeaction/donate'
    },
    {
      title: 'Login',
      icon: (
        <IconUsers className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: '/login'
    },
    {
      title: 'Changelog',
      icon: (
        <IconExchange className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: '#'
    }
  ];
  return (
    <div className="fixed bottom-0 flex items-center justify-center h-[5rem] z-10 w-full sm:hidden flex">
      <FloatingDock // only for demo, remove for production
        items={links}
      />
    </div>
  );
}
