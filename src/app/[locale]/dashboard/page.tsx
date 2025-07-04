'use client';
import React from 'react';
import DashboardLayout from '@/components/ui/dashboard/DashboardLayout';
import {summaryDashboard} from '@/data/data';
import GenderChart from '@/components/chart/GenderChart';
import OldChart from '@/components/chart/OldChart';
import {useTranslations, useLocale} from 'next-intl';
import {useSession} from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import gsap from 'gsap';
import {MorphSVGPlugin} from 'gsap/MorphSVGPlugin';

gsap.registerPlugin(MorphSVGPlugin);

const Page = () => {
  const t = useTranslations();
  const session: any = useSession();
  const user = session?.data?.user?.full_name;
  return (
    <DashboardLayout>
      <div className="gap-8 px-16 py-12 pb-0">
        <div className="relative h-[688px] overflow-scroll flex flex-col gap-y-10 bg-white dark:bg-slate-900 p-4 rounded-3xl">
          <div className="bg-gradient-to-r to-blue-500 from-sky-300 p-10 rounded-3xl">
            <h6 className="text-white font-semibold">
              {t('HomeMenuDashboard.halo')},{' '}
              <span className="text-white">{user}</span>!{' '}
              {t('HomeMenuDashboard.sayHi')}
            </h6>
          </div>
          <div className="flex flex-col gap-y-2">
            <h5 className="text-slate-600 dark:text-white w-full font-bold text-lg">
              Dashboard
            </h5>
            <div className="grid grid-cols-2 gap-6">
              {summaryDashboard.map((countSummary, index) => (
                <div
                  key={index}
                  className="dark:bg-slate-900 bg-gradient-to-r from-sky-500 to-blue-700 rounded-3xl py-4 px-6 h-[150px]"
                >
                  <Link
                    href={countSummary.url}
                    className="flex flex-row gap-x-4"
                  >
                    <div className="flex flex-col gap-y-1 justify-center items-start w-[65%]">
                      <div className="text-sm font-semibold text-white dark:text-white">
                        {countSummary.label}
                      </div>
                      <div className="text-3xl text-nowrap font-semibold text-white">
                        {countSummary.angka}
                      </div>
                    </div>
                    <div className="mb-2 w-[35%]">
                      <span className="w-full relative" id="hippo">
                        {countSummary.icon}
                      </span>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-y-4">
            <h5 className="text-slate-600 dark:text-white w-full font-bold text-lg">
              Latest Activity
            </h5>
            <div className="w-full flex flex-row justify-center items-center rounded-2xl px-6 py-2 bg-gradient-to-r from-sky-50 via-cyan-100 to-sky-50">
              <span className="w-1/12">
                <Image
                  src="/transaction (1).png"
                  alt="Human Initiative"
                  width={30}
                  height={30}
                  className="w-[60] h-[60]"
                ></Image>
              </span>
              <h5 className="w-9/12 text-slate-600 text-sm font-semibold">
                Anda mempunyai 3 transaction bulan ini
              </h5>
              <Link
                href="#"
                className="w-2/12 bg-cyan-600 rounded-lg py-1 px-1 text-white flex justify-center items-center text-sm"
              >
                Lihat Transaksi
              </Link>
            </div>
            <div className="w-full flex flex-row justify-center items-center rounded-2xl px-6 py-2 bg-gradient-to-r from-sky-50 via-cyan-100 to-sky-50">
              <span className="w-1/12">
                <Image
                  src="/transaction (1).png"
                  alt="Human Initiative"
                  width={30}
                  height={30}
                  className="w-[60] h-[60]"
                ></Image>
              </span>
              <h5 className="w-9/12 text-slate-600 text-sm font-semibold">
                Anda mempunyai 3 transaction bulan ini
              </h5>
              <Link
                href="#"
                className="w-2/12 bg-cyan-600 rounded-lg py-1 px-1 text-white flex justify-center items-center text-sm"
              >
                Lihat Transaksi
              </Link>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Page;
