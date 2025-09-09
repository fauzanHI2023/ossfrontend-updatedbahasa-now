'use client';
import React from 'react';
import Banner from '@/components/ui/banner/Banner';
import {Baby, University, Backpack, MoveRight} from 'lucide-react';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from '@/components/ui/tabs-fe';
import Image from 'next/image';
import {fetchNewsByHashtagProgram} from '@/lib/publication/auth-news';
import {useQuery} from '@tanstack/react-query';
import {useTranslations} from 'next-intl';
import InitiativeChildren from '@/components/ui/whatwedo/InitiativeChildren';
import Link from 'next/link';

const InitiativeForChildren = () => {
  const t = useTranslations();
  const {data, isLoading, isError} = useQuery({
    queryKey: ['news', 'children'],
    queryFn: () => fetchNewsByHashtagProgram('children')
  });

  const posts = data?.data ?? [];

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const stripHtml = (html: string) => {
    if (typeof window !== 'undefined') {
      const doc = new DOMParser().parseFromString(html, 'text/html');
      return doc.body.textContent || '';
    }
    return html;
  };

  const truncateAndStripHtml = (html: string, wordLimit: number) => {
    const plainText = stripHtml(html);
    const words = plainText.split(' ');
    return (
      words.slice(0, wordLimit).join(' ') +
      (words.length > wordLimit ? '...' : '')
    );
  };

  return (
    <main className="flex flex-col sm:py-16 py-6 sm:pt-28 pt-24 dark:bg-slate-950 bg-white">
      <Banner
        title={t('bannerInitiativeChildren.title')}
        description={t('bannerInitiativeChildren.desc')}
        image="/DSC08227.JPG"
      />
      <section className="relative overflow-hidden flex flex-col justify-center items-center sm:gap-y-10 gap-y-10 py-10 sm:px-24 px-6 dark:bg-slate-950 bg-white">
        {/* <div className="absolute inset-0 w-full h-full z-20 pointer-events-none" />
        <Boxes/> */}
        <div className="flex flex-row justify-center items-center gap-x-10 w-full relative z-20">
          <h5 className="text-slate-700 dark:text-slate-300 w-full dark:text-white font-semibold text-5xl">
            Initiative for <span className="text-sky-600">Children</span>
          </h5>
          <p className="text-slate-600 dark:text-white font-normal text-base">
            Program bagi anak-anak yang membutuhkan dengan fokus tujuan untuk
            memenuhi 10 Hak Anak berdasarkan Konvensi Perserikatan Bangsa-Bangsa
            (PBB) tahun 1989
          </p>
        </div>
        {/* <div className="flex flex-row gap-x-16 justify-center items-center w-2/3">
          <div className="flex flex-col justify-center items-center gap-y-4 w-1/3">
            <span className="bg-green-200 rounded-[32px] w-16 h-16 text-center flex justify-center items-center">
              <Baby className="text-green-500 text-xl w-8 h-8" />
            </span>
            <h5>Perlindungan Anak</h5>
          </div>
          <div className="flex flex-col justify-center items-center gap-y-4 w-1/3">
            <span className="bg-sky-200 rounded-[32px] w-16 h-16 text-center flex justify-center items-center">
              <University className="text-sky-500 text-xl w-8 h-8" />
            </span>
            <h5>Pendidikan Anak Yatim dan Duafa</h5>
          </div>
          <div className="flex flex-col justify-center items-center gap-y-4 w-1/3">
            <span className="bg-pink-200 rounded-[32px] w-16 h-16 text-center flex justify-center items-center">
              <Backpack className="text-pink-500 text-xl w-8 h-8" />
            </span>
            <h5>Pemenuhan Kebutuhan Dasar</h5>
          </div>
        </div> */}
        <Tabs defaultValue="perlindungananak" className="w-full">
          <TabsList className="flex flex-row justify-start items-center gap-x-1 relative z-20">
            <TabsTrigger
              value="perlindungananak"
              className="w-max-content flex flex-row gap-x-2"
            >
              Penguatan Komunitas
            </TabsTrigger>
            <TabsTrigger
              value="pendidikananakyatimdanduafa"
              className="w-max-content flex flex-row gap-x-2"
            >
              Penguatan Sekolah
            </TabsTrigger>
            <TabsTrigger
              value="pemenuhankebutuhandasar"
              className="w-max-content flex flex-row gap-x-2"
            >
              Penguatan Keluarga
            </TabsTrigger>
          </TabsList>
          <TabsContent value="perlindungananak" className="py-4">
            <InitiativeChildren tab="penguatankomunitas" />
          </TabsContent>
          <TabsContent value="pendidikananakyatimdanduafa" className="py-4">
            <InitiativeChildren tab="penguatansekolah" />
          </TabsContent>
          <TabsContent value="pemenuhankebutuhandasar" className="py-4">
            <InitiativeChildren tab="penguatankeluarga" />
          </TabsContent>
        </Tabs>
      </section>
      <section className="flex flex-col justify-center items-center sm:gap-y-10 gap-y-10 sm:py-28 py-10 sm:px-24 px-6 dark:bg-slate-950 bg-slate-50 relative z-20">
        <div className="flex flex-row justify-center items-center gap-x-10 w-full relative z-20">
          <h5 className="text-slate-700 w-full dark:text-white font-semibold text-5xl">
            <span className="text-sky-600">Related</span> Publications
          </h5>
        </div>

        <div className="sm:grid sm:grid-cols-4 sm:gap-8 flex flex-col w-full">
          {isLoading && <p className="text-slate-600">Memuat data...</p>}
          {isError && (
            <p className="text-red-500">Gagal mengambil data publikasi.</p>
          )}

          {posts.map((post: any) => (
            <div
              key={post.id}
              className="publikasi-card mb-4 pb-4 w-full flex flex-col transition duration-500 ease-in"
            >
              <span className="w-full h-[300px] overflow-hidden relative">
                <Link href={`/publication/news&stories/${post.slug}`}>
                  <Image
                    src={
                      post.news_integration
                        ? `https://cdnx.human-initiative.org/image/${post.guid}`
                        : `${post.guid}`
                    }
                    alt={post.post_title}
                    width={500}
                    height={300}
                    className="w-full h-full rounded-xl object-cover float-none absolute"
                  />
                </Link>
              </span>
              <div className="flex flex-col gap-y-4 justify-start items-start px-0 py-4">
                <span className="dark:bg-slate-800 dark:text-slate-300 text-slate-600 bg-slate-200 py-1 px-2 rounded-2xl w-max">
                  {formatDate(post.post_date)}
                </span>
                <Link href={`/publication/news&stories/${post.slug}`}>
                  <h2 className="text-sky-800 hover:text-sky-500 transition duration-300 ease-in dark:text-white sm:text-base text-base font-semibold leading-6 h-[50px] overflow-hidden">
                    {post.post_title}
                  </h2>
                </Link>
                <p className="text-slate-500 text-sm font-normal dark:text-slate-200">
                  {truncateAndStripHtml(post.post_content, 5)}
                </p>
                <Link
                  href={`/publication/news&stories/${post.slug}`}
                  className="flex flex-row gap-x-2 items-center w-full text-center rounded-lg text-sky-700 dark:text-sky-500 inline-block bg-transparent font-medium text-sm p-1 hover:transition hover:ease-in-out"
                >
                  Read More <MoveRight />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default InitiativeForChildren;
