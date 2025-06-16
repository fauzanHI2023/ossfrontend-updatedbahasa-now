'use client';

import React, {useEffect} from 'react';
import {useSession} from 'next-auth/react';
import {useQuery} from '@tanstack/react-query';
import DashboardLayout from '@/components/ui/dashboard/DashboardLayout';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion';
import AOS from 'aos';
import 'aos/dist/aos.css';
import {GiCow} from 'react-icons/gi';
import {fetchQurbanHistoryByGuid} from '@/lib/donation/history/auth-history-qurban';
import {cn} from '@/lib/utils';

const Page = () => {
  const session: any = useSession();
  const user = session?.data?.user;
  const phpDonorGuid = user?.phpDonorData?.[0]?.guid;

  useEffect(() => {
    AOS.init();
  }, []);

  const {data, isLoading, isError} = useQuery({
    queryKey: ['qurbanHistory', phpDonorGuid],
    queryFn: () => fetchQurbanHistoryByGuid(phpDonorGuid),
    enabled: !!phpDonorGuid
  });

  const qurbanDetails =
    data?.data?.datas?.flatMap((donation: any) =>
      donation.details.map((detail: any) => ({
        ...detail,
        donation_no: donation.donation_no,
        donor_name: donation.donor_name
      }))
    ) || [];

  return (
    <DashboardLayout>
      <main className="flex min-h-screen flex-col px-16 py-12">
        <div className="box p-6 flex flex-col gap-y-5 rounded-3xl dark:bg-slate-900 bg-white">
          <div className="flex flex-row justify-between items-center">
            <h5 className="text-xl font-bold">Qurban History</h5>
            <div className="flex flex-row gap-x-4 justify-center items-center">
              <label className="font-medium">Sort Status:</label>
              <select className="border p-2 rounded-md">
                <option value="">Confirmed</option>
                <option value="">Pending</option>
                <option value="">Cancel</option>
              </select>
            </div>
          </div>

          {isLoading &&
            Array.from({length: 5}).map((_, i) => (
              <div
                key={i}
                className="flex flex-row justify-between items-start rounded-xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 p-6 animate-pulse"
              >
                <div className="flex flex-row items-center gap-x-4">
                  <span className="bg-slate-200 p-3 rounded-3xl w-12 h-12" />
                  <div className="h-4 bg-slate-200 rounded w-24" />
                </div>
                <span className="h-3 bg-slate-200 rounded w-40 mt-2" />
                <h5 className="h-3 bg-slate-200 rounded w-36 mt-2" />
                <p className="h-4 bg-slate-300 rounded w-32 mt-1" />
              </div>
            ))}

          {isError && <p>Error loading data</p>}

          {!isLoading && !isError && (
            <div className="mt-4">
              <Accordion
                type="single"
                className="flex flex-col gap-y-6"
                defaultValue="item-0"
                collapsible
              >
                {qurbanDetails.map((detail: any, index: any) => (
                  <AccordionItem key={detail.id} value={`item-${index}`}>
                    <AccordionTrigger className="flex flex-row justify-between items-starts rounded-xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 p-6">
                      <div className="flex flex-row items-center gap-x-4">
                        <span className="bg-slate-100 p-1 rounded-3xl">
                          <GiCow className="text-sky-700 w-10 h-10 " />
                        </span>
                        <p className="text-base font-semibold text-gray-600 dark:text-slate-400">
                          {detail.donation_no}
                        </p>
                      </div>
                      <span className="text-xs font-normal w-40">
                        {detail.brand_name || '-'}
                      </span>
                      <h5 className="text-xs font-normal w-36 ">
                        {detail.pequrban_name || '-'}
                      </h5>
                      <p className="text-sm font-medium text-sky-700 dark:text-sky-500">
                        {detail.reports?.[detail.reports.length - 1]?.key ||
                          '-'}
                      </p>
                    </AccordionTrigger>
                    <AccordionContent
                      data-aos="fade-up"
                      className="flex flex-col items-center rounded-b-xl bg-white dark:bg-slate-700 p-6 border-t border-slate-200 transition-all duration-500 ease-in"
                    >
                      <div className="flex flex-row justify-between items-center w-full mb-8">
                        <h5 className="text-slate-400 text-normal font-semibold">
                          {detail.brand_name}
                        </h5>
                        <button className="text-slate-400">
                          Transaction ID: {detail.donation_no}
                        </button>
                      </div>
                      <div className="flex flex-wrap w-full">
                        <div className="w-1/2 flex flex-row gap-x-4 items-center pb-4">
                          <label className="text-slate-600 dark:text-white w-[150px]">
                            Program Name
                          </label>
                          <h6 className="text-slate-800 dark:text-white">
                            {detail.brand_name || '-'}
                          </h6>
                        </div>
                        <div className="w-1/2 flex flex-row gap-x-4 items-center pb-4">
                          <label className="text-slate-600 dark:text-white w-[150px]">
                            Pequrban Name
                          </label>
                          <h6 className="text-slate-800 dark:text-white">
                            {detail.pequrban_name || '-'}
                          </h6>
                        </div>
                        <div className="w-1/2 flex flex-row gap-x-4 items-center pb-4">
                          <label className="text-slate-600 dark:text-white w-[150px]">
                            Location
                          </label>
                          <h6 className="text-slate-800 dark:text-white">
                            {detail.distribution_location || '-'}
                          </h6>
                        </div>
                        <div className="w-1/2 flex flex-row gap-x-4 items-center pb-4">
                          <label className="text-slate-600 dark:text-white w-[150px]">
                            Amount
                          </label>
                          <h6 className="text-slate-800 dark:text-white">
                            Rp {detail.amount.toLocaleString()}
                          </h6>
                        </div>
                        <div className="w-1/2 flex flex-row gap-x-4 items-center pb-4">
                          <label className="text-slate-600 dark:text-white w-[150px]">
                            Status
                          </label>
                          <h6 className="text-sky-700 dark:text-sky-500">
                            {detail.reports?.[detail.reports.length - 1]?.key ||
                              '-'}
                          </h6>
                        </div>
                        <div className="w-full pt-4">
                          <h6 className="font-semibold mb-2">Details</h6>
                          <ul className="pl-4 relative">
                            {[...(detail.reports || [])]
                              .reverse()
                              .map((report: any, idx: number, arr: any[]) => {
                                const isLatest = idx === 0; // karena sudah di-reverse, index 0 adalah yang terakhir
                                return (
                                  <li
                                    key={idx}
                                    className="relative pl-6 pb-6 text-sm"
                                  >
                                    {/* Titik */}
                                    <span
                                      className={cn(
                                        'absolute left-0 top-1 w-2 h-2 rounded-full z-10',
                                        isLatest ? 'bg-sky-600' : 'bg-gray-300'
                                      )}
                                    />

                                    {/* Garis */}
                                    {idx < arr.length - 1 && (
                                      <span className="absolute left-[3px] top-[12px] h-full w-px bg-gray-300 dark:bg-gray-600" />
                                    )}

                                    {/* Konten */}
                                    <span
                                      className={cn(
                                        'text-sm',
                                        isLatest
                                          ? 'text-sky-600 font-semibold'
                                          : 'text-gray-500 dark:text-gray-400'
                                      )}
                                    >
                                      <h4>
                                        {report.key}:{' '}
                                        <span>{report.value}</span>
                                      </h4>
                                    </span>
                                  </li>
                                );
                              })}
                          </ul>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          )}
        </div>
      </main>
    </DashboardLayout>
  );
};

export default Page;
