'use client';

import React, {useEffect, useState, CSSProperties} from 'react';
import {useParams} from 'next/navigation';
import {fetchNews} from '@/lib/publication/auth-news';
import HashLoader from 'react-spinners/HashLoader';
import Image from 'next/image';
import {FaWhatsapp, FaInstagram, FaFacebookF} from 'react-icons/fa';
import GradientText from '@/components/ui/GradienText';

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

  useEffect(() => {
    const fetchPost = async () => {
      if (!slug) {
        console.warn('Missing slug in URL');
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        const data = await fetchNews();
        if (data?.status === '200') {
          const posts: News[] = data.data;
          const foundPost = posts.find((post) => post.slug === slug);
          setPost(foundPost || null);
        } else {
          console.error('Invalid response status:', data.status);
        }
      } catch (error) {
        console.error('Error fetching post:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  if (loading) {
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

  // 🟢 proses konten HTML: biarkan <img>, tapi tambahkan styling
  const processContent = (html: string) => {
    // Hapus "rn" literal jadi line break
    let processedHtml = html.replace(/rn/gi, '<br/>');

    // Kalau ada sisa newline asli (\r, \n) juga ganti jadi <br/>
    processedHtml = processedHtml.replace(/(\r\n|\r|\n)+/g, '<br/>');

    // Tambahkan styling untuk <img>
    processedHtml = processedHtml.replace(
      /<img([^>]+)>/g,
      `<div class="flex justify-center my-6">
         <img$1 class="rounded-lg max-w-full h-auto" />
       </div>`
    );

    return processedHtml;
  };

  return (
    <main className="flex flex-col text-center justify-center items-center sm:my-36 py-0 w-full">
      <header className="flex flex-col justify-center items-center w-full h-auto px-12">
        <div className="flex flex-col justify-center items-center w-full mb-4">
          <h1 className="text-4xl w-[800px] font-semibold z-[1] text-sky-900 dark:text-white leading-[3.5rem]">
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
          className="rounded-xl w-11/12 h-[500px] object-cover"
        />
      </header>
      <div className="sm:w-8/12 sm:max-w-[1430px] mx-auto mx-16 mt-8 mb-8">
        <div
          className="prose text-justify max-w-none leading-9 text-base text-[#666] dark:text-white"
          dangerouslySetInnerHTML={{
            __html: processContent(post.post_content)
          }}
        />
      </div>
      <section className="flex flex-col justify-center items-center">
        <h3 className="flex flex-row gap-x-2 text-3xl font-bold text-slate-500">
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
      </section>
    </main>
  );
};

export default PostDetail;
