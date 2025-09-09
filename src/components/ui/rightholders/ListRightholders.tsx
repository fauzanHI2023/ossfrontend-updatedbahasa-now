'use client';

import React, {useState, useEffect, CSSProperties} from 'react';
import {MoveRight, CalendarDays} from 'lucide-react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Iframe from 'react-iframe';
import HashLoader from 'react-spinners/HashLoader';
import {GlowingEffect} from '@/components/ui/glowing-effect';
import {useTranslations} from 'next-intl';
import {useQuery} from '@tanstack/react-query';
import {fetchRightholders} from '@/lib/cphp/auth-list-rightholders';

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

export default function ListRightholders() {
  const t = useTranslations();
  const [showIframe, setShowIframe] = useState(false);
  const [iframeUrl, setIframeUrl] = useState('');
  const [color] = useState('#209ce2');
  const [visibleCount, setVisibleCount] = useState(8); // tampilkan 8 item dulu

  useEffect(() => {
    AOS.init();
  }, []);

  const {
    data: rightholders = [],
    isLoading,
    error
  } = useQuery<Rightholder[]>({
    queryKey: ['rightholders'],
    queryFn: fetchRightholders
  });

  if (isLoading) {
    return (
      <HashLoader
        color={color}
        loading={true}
        cssOverride={override}
        size={50}
      />
    );
  }

  if (error || rightholders.length === 0) {
    return (
      <p className="text-lg font-semibold text-gray-600 dark:text-gray-300">
        No data available
      </p>
    );
  }

  const visibleData = rightholders.slice(0, visibleCount);
  const hasMore = visibleCount < rightholders.length;

  return (
    <>
      <div className="grid sm:grid-cols-4 grid-cols-1 gap-6">
        {visibleData.map((donate, index) => (
          <div
            key={donate.id ?? index}
            className="bg-white dark:bg-slate-800 rounded-xl border p-6 sm:pb-0 pb-6"
            data-aos="fade-up"
            data-aos-easing="linear"
            data-aos-duration="700"
          >
            <GlowingEffect
              spread={40}
              glow={true}
              disabled={false}
              proximity={64}
              inactiveZone={0.01}
            />
            <div className="flex flex-col gap-y-4 py-4 px-6 pt-8 rounded-xl relative">
              <div className="fixed top-0 right-0 bg-sky-700 dark:bg-sky-600 text-white py-2 px-3 rounded-tr-xl rounded-tl-xl w-full flex flex-row justify-center items-center gap-x-3">
                <CalendarDays />
                <span className="text-sm">{donate.end_datetime}</span>
              </div>
              <h3 className="sm:text-base text-base text-center font-semibold sm:pb-6 pb-3 h-[80px] overflow-hidden">
                {donate.form_name}
              </h3>
              <h3 className="sm:text-sm text-sm text-center text-slate-400 dark:text-slate-300 font-normal sm:pb-6 pb-3 h-[60px] overflow-hidden">
                {donate.form_description}
              </h3>
              <button
                onClick={() => {
                  setIframeUrl(donate.link);
                  setShowIframe(true);
                }}
                className="flex justify-center items-center w-full text-sky-500 dark:text-sky-500 p-2 rounded-lg bg-transparent font-medium hover:transition hover:ease-in-out"
              >
                {t('takeactionRightholders.sectionFour.apply')} <MoveRight />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Button Load More */}
      {hasMore && (
        <div className="flex justify-center mt-6">
          <button
            onClick={() => setVisibleCount((prev) => prev + 8)} // tambah 8 item
            className="px-6 py-2 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition"
          >
            Load More
          </button>
        </div>
      )}

      {!hasMore && (
        <p className="text-center text-gray-500 mt-6">Sudah semua data</p>
      )}

      {/* Iframe Popup */}
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
    </>
  );
}
