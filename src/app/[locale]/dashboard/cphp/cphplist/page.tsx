'use client';
import React, {useState, useEffect, CSSProperties} from 'react';
import {useSession} from 'next-auth/react';
import DashboardLayout from '@/components/ui/dashboard/DashboardLayout';
import {fetchRightholders} from '@/lib/cphp/auth-list-rightholders';
import {useQuery} from '@tanstack/react-query';
import Iframe from 'react-iframe';
import {GlowingEffect} from '@/components/ui/glowing-effect';
import {CalendarDays} from 'lucide-react';
import HashLoader from 'react-spinners/HashLoader';
import AOS from 'aos';
import 'aos/dist/aos.css';
import {MoveRight} from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion';

const override: CSSProperties = {
  display: 'block',
  margin: '0 auto',
  borderColor: 'red'
};

interface Rightholder {
  id: string;
  form_name: string;
  form_description: string;
  link: string;
  end_datetime: string;
}

const CPHPList: React.FC = () => {
  const session: any = useSession();
  const user: {
    id?: string;
    name?: string | null | undefined;
    email?: string | null | undefined;
    image?: string | null | undefined;
    phpDonorData?: any[];
  } = session?.data?.user || {};
  const phpDonorId = user?.phpDonorData?.[0]?.id;
  const phpDonorGuid = user?.phpDonorData?.[0]?.guid;

  const [step, setStep] = useState(1);
  const [showIframe, setShowIframe] = useState(false);
  const [iframeUrl, setIframeUrl] = useState('');
  const [color, setColor] = useState('#209ce2');

  useEffect(() => {
    const interval = setInterval(() => {
      setStep((prevStep: any) => (prevStep < 2 ? prevStep + 1 : 1));
    }, 15000); // Total duration: 12 seconds + 1 second buffer

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    AOS.init();
  });

  const {
    data: rightholders = [],
    isLoading,
    error
  } = useQuery<Rightholder[]>({
    queryKey: ['rightholders'],
    queryFn: fetchRightholders
  });
  return (
    <DashboardLayout>
      <main className="flex min-h-screen flex-col px-16 py-12">
        <div className="box p-6 flex flex-col gap-y-5 rounded-3xl dark:bg-slate-900 bg-white">
          <h5 className="text-xl font-bold">CPHP List</h5>
          <div className="flex flex-col justify-center items-center gap-y-4 w-full">
            {isLoading ? (
              <HashLoader
                color={color}
                loading={isLoading}
                cssOverride={override}
                size={50}
              />
            ) : error || rightholders.length === 0 ? (
              <p className="text-lg font-semibold text-gray-600 dark:text-gray-300">
                No data available
              </p>
            ) : (
              rightholders.map((donate, index) => (
                <div
                  key={index}
                  className="bg-white w-full dark:bg-slate-800 rounded-xl border"
                  data-aos="fade-up"
                >
                  <GlowingEffect
                    spread={40}
                    glow={true}
                    disabled={false}
                    proximity={64}
                    inactiveZone={0.01}
                  />
                  <div className="flex flex-row justify-between items-center gap-x-6 p-5 rounded-xl relative">
                    <div className="text-slate-500 w-3/12 flex flex-row justify-start items-center gap-x-3">
                      <span className="bg-sky-100 p-3 rounded-3xl">
                        <CalendarDays className="w-6 h-6 text-sky-600" />
                      </span>
                      <span className="text-sm break-words w-24">
                        {donate.end_datetime}
                      </span>
                    </div>
                    <h3 className="sm:text-base text-base font-semibold h-6 w-7/12">
                      {donate.form_name}
                    </h3>
                    {/* <h3 className="sm:text-sm text-sm text-slate-400 dark:text-slate-300 font-normal h-6 truncate w-4/12">{donate.form_description}</h3> */}
                    <button
                      onClick={() => {
                        setIframeUrl(`${donate.link}/${phpDonorGuid}`);
                        setShowIframe(true);
                      }}
                      className="flex text-sm justify-center items-center w-2/12 bg-sky-700 hover:bg-sky-600 dark:bg-slate-700 dark:hover:bg-sky-800 text-white py-2 px-3 rounded-xl font-medium transition ease-in-out duration-300"
                    >
                      Apply <MoveRight />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
          {showIframe && iframeUrl && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-[100]">
              <div className="relative bg-white dark:bg-slate-700 rounded-lg w-full sm:w-3/4 h-full">
                <button
                  onClick={() => setShowIframe(false)}
                  className="absolute top-3 right-3 text-white bg-sky-500 hover:bg-sky-700 rounded-full w-8 h-8"
                >
                  ✕
                </button>
                <Iframe
                  url={iframeUrl}
                  width="100%"
                  height="100%"
                  allowFullScreen
                />
              </div>
            </div>
          )}
        </div>
      </main>
    </DashboardLayout>
  );
};

export default CPHPList;
