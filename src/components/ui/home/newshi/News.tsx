import React, {useState, useEffect} from 'react';
import Link from 'next/link';
import Image from 'next/image';
import PopupNotif from '../../utility/PopupNotif';
import {MoveRight} from 'lucide-react';
import {fetchNews} from '@/lib/publication/auth-news';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from '@/components/ui/tabs-fe';
import AOS from 'aos';
import 'aos/dist/aos.css';
import AnimationCardPulse from '../../animation-card-pulse';
import {useTranslations} from 'next-intl';

interface News {
  id: number;
  post_title: string;
  guid: string;
  post_content: string;
  post_date: string;
  category_posts: string;
  slug: string;
  news_integration: string;
}

const News = () => {
  const t = useTranslations();
  const [newss, setNews] = useState<News[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedTab, setSelectedTab] = useState<string>('all');
  const [notifMessage, setNotifMessage] = useState('');

  useEffect(() => {
    const getNews = async () => {
      setLoading(true);
      const data = await fetchNews();
      if (data && data.status === '200') {
        setNews(data.data);
      }
      setLoading(false);
    };
    getNews();
    AOS.init();
  }, []);

  const filterNews = () => {
    if (!newss) return [];

    // Urutkan berdasarkan ID terbesar
    const sortedNews = [...newss].sort((a, b) => b.id - a.id);

    if (selectedTab === 'all') {
      // Tampilkan 4 berita untuk kategori "all"
      return sortedNews.slice(0, 4);
    }

    // Filter berita berdasarkan kategori yang dipilih dan ambil 4 teratas
    return sortedNews
      .filter((news) => news.category_posts === selectedTab)
      .slice(0, 4);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const learnMore = () => {
    setNotifMessage(
      'Silahkan Login terlebih dahulu untuk melihat lebih lanjut.'
    );
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
    <section
      className={`scroll-smooth relative flex flex-col w-full sm:px-24 sm:py-16 p-6 dark:bg-slate-950 bg-white`}
      id="#section-project-browse"
    >
      <div className="flex sm:flex-row flex-col justify-between sm:pb-14 pb-2">
        <h5
          className={`font-semibold text-slate-700 dark:text-slate-200 sm:text-[36px] text-2xl w-full pr-3 sm:pb-0 pb-4 leading-tight`}
          data-aos="fade-up"
          data-aos-easing="linear"
          data-aos-duration="700"
        >
          {t('SectionFourHome.title')}
        </h5>
        <div className="flex flex-col gap-y-6 sm:w-1/2 w-full">
          <p
            className={`w-full flex justify-end items-center font-light text-gray-500 dark:text-slate-500 text-normal sm:w-full w-full`}
            data-aos="fade-up"
            data-aos-easing="linear"
            data-aos-duration="1000"
          >
            {t('SectionFourHome.desc')}
          </p>
        </div>
      </div>
      <Tabs
        defaultValue="all"
        className="w-full"
        onValueChange={(value) => {
          setSelectedTab(value);
        }}
      >
        <TabsList className="pb-10 flex flex-row justify-between">
          <div
            className="flex flex-row"
            data-aos="fade-right"
            data-aos-easing="linear"
            data-aos-duration="700"
          >
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="news">News</TabsTrigger>
            <TabsTrigger value="stories">Stories</TabsTrigger>
            <TabsTrigger value="collaborate">Collaborate</TabsTrigger>
          </div>
          <Link
            href="/publication/news&stories"
            className="text-sky-700 font-bold dark:text-sky-700 hover:dark:text-sky-500 py-3 px-3 rounded-lg relative transition duration-700 ease-in"
          >
            See other{' '}
            <span className="transition duration-600 ease-in">News</span>
          </Link>
        </TabsList>
        <TabsContent
          value={selectedTab}
          className="flex flex-col gap-y-8 justify-center items-center w-full"
        >
          <div className="sm:grid sm:grid-cols-4 sm:gap-8 flex flex-col w-full">
            {loading ? (
              <div className="w-full">
                <AnimationCardPulse />
              </div>
            ) : filterNews().length > 0 ? (
              filterNews().map((news) => (
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
                      <h2 className="text-sky-800 hover:text-sky-500 transition duration-300 ease-in dark:text-white sm:text-base text-base font-semibold dark:text-white leading-6 h-[50px] overflow-hidden">
                        {news.post_title}
                      </h2>
                    </Link>
                    <p className="text-slate-500 text-sm font-normal dark:text-slate-200">
                      {truncateAndStripHtml(news.post_content, 5)}
                    </p>
                    <Link
                      href={news.post_title}
                      className={`flex flex-row gap-x-2 items-center w-full text-center rounded-lg text-sky-700 dark:text-sky-500 inline-block bg-transparent font-medium text-sm p-1 hover:transition hover:ease-in-out`}
                      onClick={learnMore}
                    >
                      Read More <MoveRight />
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <p>No news available.</p>
            )}
          </div>
        </TabsContent>
      </Tabs>
      {/* <div className={`grid sm:grid-cols-4 grid-cols-1 sm:gap-x-6`}>
        {newsHome.map((donate, index) => (
          <div
            key={index}
            className={`bg-sky-50 dark:bg-slate-950 sm:pb-0 pb-6`}
            data-aos="fade-up"
            data-aos-easing="linear"
            data-aos-duration="1500"
          >
            <div className={`flex flex-col gap-y-4 rounded-xl`}>
              <div className={`pb-4 `}>
                <Image
                  height={250}
                  width={300}
                  src={donate.image}
                  alt={donate.name}
                  className={`rounded-2xl w-full text-4xl text-blue-500`}
                />
              </div>
              <span className="dark:bg-slate-800 dark:text-slate-300 text-slate-600 bg-slate-200 py-1 px-2 rounded-2xl w-max">
                {donate.tanggal}
              </span>
              <h3
                className={`text-sky-800 dark:text-white sm:text-base text-base font-semibold h-[60px] overflow-hidden`}
              >
                {donate.name}
              </h3>
              <h6 className="text-slate-500 text-sm font-normal">
                {donate.deskripsi}
              </h6>
              <Link
                href={donate.urlnews}
                className={`flex flex-row gap-x-2 items-center w-full text-center rounded-lg text-sky-500 dark:text-sky-500 inline-block bg-transparent font-medium text-normal p-1 hover:transition hover:ease-in-out`}
                onClick={learnMore}
              >
                Read More <MoveRight />
              </Link>
            </div>
          </div>
        ))}
      </div> */}
      <PopupNotif
        message={notifMessage}
        duration={3000}
        onClose={() => setNotifMessage('')}
      />
    </section>
  );
};

export default News;
