'use client';

import React, {useEffect, useState, CSSProperties} from 'react';
import {useParams} from 'next/navigation';
import {fetchNews} from '@/lib/publication/auth-news';
import HashLoader from 'react-spinners/HashLoader';
import Image from 'next/image';
import {FaWhatsapp, FaInstagram, FaFacebookF} from 'react-icons/fa';
import GradientText from '@/components/ui/GradienText';
import {useQuery} from '@tanstack/react-query';
import Link from 'next/link';
import {MoveRight} from 'lucide-react';

interface News {
  id: number;
  post_title: string;
  post_content: string;
  post_date_gmt: string;
  guid: string;
  slug: string;
  news_integration: string;
}

const override: CSSProperties = {
  display: 'block',
  margin: '0 auto',
  borderColor: 'red'
};

const PostDetail: React.FC = () => {
  const params = useParams();
  const slug = params?.slug as string | undefined;
  const [post, setPost] = useState<News | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [color] = useState('#209ce2');

  // 🔵 Ambil semua berita pakai TanStack
  const {data: newsData, isLoading} = useQuery({
    queryKey: ['news'],
    queryFn: fetchNews
  });

  useEffect(() => {
    if (!slug || !newsData) return;
    setLoading(true);

    if (newsData?.status === '200') {
      const posts: News[] = newsData.data;
      const foundPost = posts.find((p) => p.slug === slug);
      setPost(foundPost || null);
    }
    setLoading(false);
  }, [slug, newsData]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  if (loading || isLoading) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center p-24 dark:bg-slate-900 bg-gray-50">
        <HashLoader
          color={color}
          loading={loading}
          cssOverride={override}
          size={50}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </main>
    );
  }

  if (!post) {
    return <p>Post not found. Please check the URL or slug.</p>;
  }

  // 🟢 proses konten HTML
  const processContent = (html: string) => {
    let processedHtml = html.replace(/rn/gi, '<br/>');
    processedHtml = processedHtml.replace(/(\r\n|\r|\n)+/g, '<br/>');
    processedHtml = processedHtml.replace(
      /<img([^>]+)>/g,
      `<div class="flex justify-center my-6">
         <img$1 class="rounded-lg max-w-full h-auto" />
       </div>`
    );
    return processedHtml;
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

  // 🔴 Ambil berita lain selain yang sedang dibuka
  const moreNews =
    newsData?.status === '200'
      ? (newsData.data as News[]).filter((n) => n.slug !== slug).slice(0, 3)
      : [];

  return (
    <main className="flex flex-col text-center justify-center items-center sm:mt-36 sm:mb-14 py-0 w-full">
      <header className="flex flex-col justify-center items-center w-full h-auto sm:px-12 px-4">
        <div className="flex flex-col justify-center items-center w-full mb-4">
          <h1 className="sm:text-4xl sm:w-[800px] text-2xl w-full font-semibold z-[1] text-sky-900 dark:text-white sm:leading-[3.5rem] leading-1">
            {post.post_title}
          </h1>
          <span className="dark:text-slate-300 text-slate-400 py-3 px-2 rounded-2xl w-max mb-6">
            {formatDate(post.post_date_gmt)}
          </span>
        </div>
        <ul className="relative mb-15 w-11/12 mb-12">
          <li className="inline-block absolute w-full h-[1px] bg-slate-300 top-1/2 left-0 mt-[-1px]"></li>
          <li className="inline-block px-4 bg-white relative">
            <FaWhatsapp className="text-slate-500 w-8 h-8 hover:text-slate-800 cursor-pointer" />
          </li>
          <li className="inline-block px-4 bg-white relative">
            <FaInstagram className="text-slate-500 w-8 h-8 hover:text-slate-800 cursor-pointer" />
          </li>
          <li className="inline-block px-4 bg-white relative">
            <FaFacebookF className="text-slate-500 w-8 h-8 hover:text-slate-800 cursor-pointer" />
          </li>
        </ul>
        <Image
          src={
            post.news_integration
              ? `https://cdnx.human-initiative.org/image/${post.guid}`
              : `${post.guid}`
          }
          alt={post.post_title}
          width={500}
          height={300}
          className="rounded-xl sm:w-11/12 w-full sm:h-[500px] h-full object-cover"
        />
      </header>

      {/* 🔵 Konten */}
      <div className="sm:w-8/12 sm:max-w-[1430px] w-full sm:mx-auto mt-8 mb-8">
        <div
          className="text-justify max-w-none leading-9 text-base text-[#666] dark:text-white sm:px-0 px-4"
          dangerouslySetInnerHTML={{
            __html: processContent(post.post_content)
          }}
        />
      </div>

      {/* 🔵 More News */}
      <section className="flex flex-col justify-center items-center w-full sm:px-20 px-0 sm:py-8 py-0">
        <h3 className="flex flex-row gap-x-2 sm:text-3xl text-2xl font-bold text-slate-500 mb-8">
          More
          <GradientText
            colors={['#0284c7', '#172554']}
            animationSpeed={1}
            showBorder={false}
            className="font-bold"
          >
            News & Stories
          </GradientText>
        </h3>

        <div className="sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-6 flex flex-row justify-start overflow-x-auto sm:w-11/12 w-full pl-4">
          {moreNews.map((item) => (
            <div
              key={item.id}
              className="publikasi-card mb-4 border-b pb-4 w-full flex flex-col transition duration-500 ease-in"
            >
              <span className="sm:w-full w-[280px] sm:h-[300px] h-[280px] overflow-hidden relative">
                <Link href={`/publication/news&stories/${item.slug}`}>
                  <Image
                    src={
                      item.news_integration
                        ? `https://cdnx.human-initiative.org/image/${item.guid}`
                        : `${item.guid}`
                    }
                    alt={item.post_title}
                    width={500}
                    height={300}
                    className="rounded-t-xl w-full h-full object-cover float-none absolute"
                  />
                </Link>
              </span>
              <div className="flex flex-col gap-y-4 justify-start items-start px-0 py-4">
                <span className="dark:bg-slate-800 dark:text-slate-300 text-slate-600 bg-slate-200 py-1 px-2 rounded-2xl w-max">
                  {formatDate(item.post_date_gmt)}
                </span>
                <Link href={`/publication/news&stories/${item.slug}`}>
                  <h2 className="text-sky-800 dark:text-white sm:text-base text-base text-left font-semibold dark:text-white leading-6 h-[50px] overflow-hidden">
                    {item.post_title}
                  </h2>
                </Link>
                <p className="text-slate-500 text-sm font-normal dark:text-slate-200">
                  {truncateAndStripHtml(item.post_content, 5)}
                </p>
                <Link
                  href={item.post_title}
                  className={`flex flex-row gap-x-2 items-center w-full text-center rounded-lg text-sky-500 dark:text-sky-500 inline-block bg-transparent font-medium text-normal p-1 hover:transition hover:ease-in-out`}
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

export default PostDetail;
