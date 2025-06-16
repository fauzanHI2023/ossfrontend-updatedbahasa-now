import React from 'react';
import DashboardLayout from '@/components/ui/dashboard/DashboardLayout';
import {summaryDashboard} from '@/data/data';
import GenderChart from '@/components/chart/GenderChart';
import OldChart from '@/components/chart/OldChart';
import {useTranslations, useLocale} from 'next-intl';

const page = () => {
  const t = useTranslations();
  const locale = useLocale();

  return (
    <DashboardLayout>
      <div className="grid grid-cols-4 gap-8 px-16 py-12">
        {summaryDashboard.map((countSummary, index) => (
          <div
            key={index}
            className="flex flex-row gap-x-4 dark:bg-slate-900 bg-white rounded-xl py-4 px-6"
          >
            <div className="flex flex-col gap-y-4 justify-between w-[65%]">
              <div className="text-sm font-semibold text-slate-900 dark:text-white">
                {countSummary.label}
              </div>
              <div className="text-lg text-nowrap font-semibold text-slate-500">
                {countSummary.angka}
              </div>
            </div>
            <div className="mb-2 w-[35%]">
              <span className="w-full">{countSummary.icon}</span>
            </div>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
};

export default page;
