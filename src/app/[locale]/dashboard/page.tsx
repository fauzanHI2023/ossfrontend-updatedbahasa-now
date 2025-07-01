'use client';
import React from 'react';
import DashboardLayout from '@/components/ui/dashboard/DashboardLayout';
import {summaryDashboard} from '@/data/data';
import GenderChart from '@/components/chart/GenderChart';
import OldChart from '@/components/chart/OldChart';
import {useTranslations, useLocale} from 'next-intl';
import {useSession} from 'next-auth/react';

const Page = () => {
  const session: any = useSession();
  const user = session?.data?.user?.full_name;
  return (
    <DashboardLayout>
      <div className="gap-8 px-16 py-12 pb-0">
        <div className="flex flex-col gap-y-10 bg-white dark:bg-slate-900 p-4 rounded-3xl">
          <div className="bg-gradient-to-r to-blue-500 from-sky-300 p-10 rounded-3xl">
            <h6 className="text-white font-semibold">
              Halo, <span className="text-white">{user}</span>! Terima kasih
              sudah kembali. Siap berbagi kebaikan hari ini?
            </h6>
          </div>
          <div className="flex flex-col gap-y-2">
            <h5 className="text-slate-600 dark:text-white w-full font-bold text-lg">
              Feature
            </h5>
            <div className="grid grid-cols-2 gap-6">
              {summaryDashboard.map((countSummary, index) => (
                <div
                  key={index}
                  className="flex flex-row gap-x-4 dark:bg-slate-900 bg-gradient-to-r from-sky-500 to-blue-700 rounded-3xl py-4 px-6 h-[150px]"
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
                    <span className="w-full relative">{countSummary.icon}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-y-2">
            <h5 className="text-slate-600 dark:text-white w-full font-bold text-lg">
              Activity
            </h5>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Page;
