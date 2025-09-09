'use client';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {useQuery} from '@tanstack/react-query';
import {fetchNewsCollaborate} from '@/lib/publication/auth-news';
import {MoveRight} from 'lucide-react';

// Helper functions (jika belum ada)
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
};
const truncateAndStripHtml = (html: string, wordLimit: number) => {
  const text = html.replace(/<[^>]+>/g, '');
  return (
    text.split(' ').slice(0, wordLimit).join(' ') +
    (text.split(' ').length > wordLimit ? '...' : '')
  );
};

const NewsCollaborate = () => {
  const {
    data: newsDataRaw,
    isLoading,
    error
  } = useQuery({
    queryKey: ['news'],
    queryFn: fetchNewsCollaborate
  });

  if (error) return <p>Error loading news</p>;

  // Ambil array dari data yang dikembalikan API
  const newsList = newsDataRaw?.data?.slice(0, 4) || [];

  return (
    <section className="w-full relative flex flex-col gap-y-12 justify-center items-start bg-gradient-to-l to-gray-50 from-white px-32 py-16">
      <div className="w-full flex flex-row justify-between items-center">
        <h5 className="text-sky-700 text-4xl font-semibold">
          Collaborative News
        </h5>
        <Link href="/publication/news&stories" className="text-slate-900">
          See All
        </Link>
      </div>
      <div className="flex flex-col gap-y-8 justify-center items-center w-full">
        {isLoading && (
          <div className="w-full sm:grid sm:grid-cols-4 sm:gap-8 flex flex-col gap-y-6">
            {Array.from({length: 4}).map((_, index) => (
              <div
                key={index}
                className="publikasi-card mb-4 border-b pb-4 w-full flex flex-col-reverse gap-x-3 justify-between bg-gray-200 dark:bg-slate-800 animate-pulse rounded-lg"
              >
                <div className="flex flex-col justify-between items-start px-6 py-4">
                  <div className="h-6 w-3/4 bg-gray-300 dark:bg-gray-700 animate-pulse rounded"></div>
                </div>
                <span className="w-full h-[300px] bg-gray-300 dark:bg-gray-700 animate-pulse rounded-lg"></span>
              </div>
            ))}
          </div>
        )}
        <div className="sm:grid sm:grid-cols-4 sm:gap-8 flex flex-col w-full">
          {newsList.map((news: any) => (
            <div
              key={news.id}
              className="publikasi-card mb-4 border-b pb-4 w-full flex flex-col transition duration-500 ease-in"
              data-aos="fade-up"
              data-aos-easing="linear"
              data-aos-duration="700"
            >
              <span className="w-full h-[300px] overflow-hidden relative">
                <Link href={`/publication/news&stories/${news.slug}`}>
                  <Image
                    src={
                      news.news_integration
                        ? `https://cdnx.human-initiative.org/image/${news.guid}`
                        : `${news.guid}`
                    }
                    alt={news.post_title}
                    width={500}
                    height={300}
                    className="w-full h-full rounded-xl object-cover float-none absolute"
                  />
                </Link>
              </span>
              <div className="flex flex-col gap-y-4 justify-start items-start px-0 py-4">
                <span className="dark:bg-slate-800 dark:text-slate-300 text-slate-600 bg-slate-200 py-1 px-2 rounded-2xl w-max">
                  {formatDate(news.post_date)}
                </span>
                <Link href={`/publication/news&stories/${news.slug}`}>
                  <h2 className="text-sky-800 hover:text-sky-500 transition duration-300 ease-in dark:text-white sm:text-base text-base font-semibold leading-6 h-[50px] overflow-hidden">
                    {news.post_title}
                  </h2>
                </Link>
                <p className="text-slate-500 text-sm font-normal dark:text-slate-200">
                  {truncateAndStripHtml(news.post_content, 5)}
                </p>
                <Link
                  href={`/publication/news&stories/${news.slug}`}
                  className="flex flex-row gap-x-2 items-center w-full text-center rounded-lg text-sky-700 dark:text-sky-500 inline-block bg-transparent font-medium text-sm p-1 hover:transition hover:ease-in-out"
                >
                  Read More <MoveRight />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewsCollaborate;
