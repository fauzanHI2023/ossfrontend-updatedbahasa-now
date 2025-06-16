'use client';
import React, {useState, useEffect} from 'react';
import {useSession} from 'next-auth/react';
import DashboardLayout from '@/components/ui/dashboard/DashboardLayout';
import {fetchFilterRightholders} from '@/lib/cphp/auth-filter-rightholders';
import {useQuery} from '@tanstack/react-query';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion';
import {ListPlus} from 'lucide-react';

const statusOptions = [
  {id: 9, label: 'New'},
  {id: 10, label: 'Verified'},
  {id: 11, label: 'Revision'},
  {id: 12, label: 'Rejected'},
  {id: 13, label: 'Proposed'},
  {id: 14, label: 'Donated'}
];

const HistoryCPHP: React.FC = () => {
  const session: any = useSession();
  const user: {
    id?: string;
    name?: string | null | undefined;
    email?: string | null | undefined;
    image?: string | null | undefined;
    phpDonorData?: any[];
  } = session?.data?.user || {};
  const userId = user?.phpDonorData?.[0]?.guid;

  const [selectedStatus, setSelectedStatus] = useState<number>(9);

  const {
    data: rightholders = [],
    isLoading,
    error
  } = useQuery({
    queryKey: ['rightholders', selectedStatus],
    queryFn: () => fetchFilterRightholders(selectedStatus, userId),
    enabled: !!selectedStatus
  });

  return (
    <DashboardLayout>
      <main className="flex min-h-screen flex-col px-16 py-12">
        <div className="box p-6 flex flex-col gap-y-5 rounded-3xl dark:bg-slate-900 bg-white">
          <div className="flex flex-row justify-between items-center">
            <h5 className="text-xl font-bold">History CPHP</h5>
            <div className="flex flex-row gap-x-4 justify-center items-center">
              <label className="font-medium">Sort Status:</label>
              <select
                className="border p-2 rounded-md"
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(Number(e.target.value))}
              >
                {statusOptions.map((status) => (
                  <option key={status.id} value={status.id}>
                    {status.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="mt-4">
            {isLoading ? (
              <div className="space-y-4">
                {[...Array(3)].map((_, index) => (
                  <div
                    key={index}
                    className="border p-4 rounded-md shadow animate-pulse"
                  >
                    <div className="h-6 bg-gray-300 rounded w-3/4 mb-2"></div>
                    <div className="h-4 bg-gray-300 rounded w-1/2 mb-2"></div>
                    <div className="h-4 bg-gray-300 rounded w-1/4"></div>
                  </div>
                ))}
              </div>
            ) : error ? (
              <p>Error loading data</p>
            ) : rightholders.length > 0 ? (
              <Accordion
                type="single"
                className="flex flex-col gap-y-6"
                collapsible
              >
                {rightholders.map((rightholder, index) => (
                  <AccordionItem value={rightholder.program_name} key={index}>
                    <AccordionTrigger className="flex flex-row justify-between items-starts rounded-xl bg-white dark:bg-slate-700 border border-slate-100 dark:border-slate-700 p-6">
                      <div className="flex flex-row items-center gap-x-4">
                        <span className="bg-sky-100 p-3 rounded-3xl">
                          <ListPlus className="text-sky-500" />
                        </span>
                        <p>{rightholder.form_name}</p>
                      </div>
                      <p>{rightholder.status}</p>
                    </AccordionTrigger>
                    <AccordionContent className="flex flex-col items-center rounded-b-xl bg-white dark:bg-slate-700 p-6 border-t border-slate-200">
                      <div className="flex flex-row justify-between items-center w-full mb-8">
                        <h5 className="text-slate-400 text-normal font-semibold">
                          {rightholder.form_name}
                        </h5>
                        <button className="text-slate-400">
                          {rightholder.applicant_no}
                        </button>
                      </div>
                      <div className="flex flex-wrap w-full">
                        <div className="w-1/2 flex flex-row gap-x-4 items-center pb-4">
                          <label className="text-slate-600 dark:text-white w-[150px]">
                            Program Name
                          </label>
                          <h6 className="text-slate-800 dark:text-white">
                            {rightholder.program_name}
                          </h6>
                        </div>
                        <div className="w-1/2 flex flex-row gap-x-4 items-center pb-4">
                          <label className="text-slate-600 dark:text-white w-[150px]">
                            Applicant Name
                          </label>
                          <h6 className="text-slate-800 dark:text-white">
                            {rightholder.applicant_name}
                          </h6>
                        </div>
                        <div className="w-1/2 flex flex-row gap-x-4 items-center pb-4">
                          <label className="text-slate-600 dark:text-white w-[150px]">
                            Applicant Email
                          </label>
                          <h6 className="text-slate-800 dark:text-white">
                            {rightholder.applicant_email}
                          </h6>
                        </div>
                        <div className="w-1/2 flex flex-row gap-x-4 items-center pb-4">
                          <label className="text-slate-600 dark:text-white w-[150px]">
                            Applicant Hp No
                          </label>
                          <h6 className="text-slate-800 dark:text-white">
                            {rightholder.applicant_hp_no}
                          </h6>
                        </div>
                        <div className="w-1/2 flex flex-row gap-x-4 items-center pb-4">
                          <label className="text-slate-600 dark:text-white w-[150px]">
                            Status
                          </label>
                          <h6 className="text-sky-500 cursor-pointer">
                            {rightholder.status}
                          </h6>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            ) : (
              <p>No data available</p>
            )}
          </div>
        </div>
      </main>
    </DashboardLayout>
  );
};

export default HistoryCPHP;
