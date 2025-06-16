'use client';

import React, {useEffect, useState, CSSProperties} from 'react';
import {useParams} from 'next/navigation';
import {fetchNews} from '@/lib/publication/auth-news';
import HashLoader from 'react-spinners/HashLoader';
import Image from 'next/image';
import Link from 'next/link';
import {
  FaWhatsapp,
  FaInstagram,
  FaTiktok,
  FaLinkedinIn,
  FaFacebookF
} from 'react-icons/fa';
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
  const slug = params?.slug;
  const [newss, setNewss] = useState<News[] | null>(null);
  const [post, setPost] = useState<News | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [color, setColor] = useState('#209ce2');

  const stripHtml = (html: string) => {
    if (typeof window !== 'undefined') {
      // Untuk lingkungan client-side
      const doc = new DOMParser().parseFromString(html, 'text/html');
      const text = doc.body.textContent || '';

      // Hapus karakter "rn" atau variasinya
      return text.replace(/(\r\n|\n|\r|rn)+/g, ' ').trim();
    }

    // Fallback untuk SSR (menghapus HTML tag dan karakter \r\n)
    return html
      .replace(/<[^>]*>?/gm, '') // Hapus semua tag HTML
      .replace(/(\r\n|\n|\r|rn)+/g, ' ') // Hapus karakter \r\n dan variasinya
      .trim(); // Hapus spasi ekstra di awal/akhir
  };

  useEffect(() => {
    const fetchPost = async () => {
      // console.log("Params from URL:", params); // Debug log
      if (!slug) {
        console.warn('Missing slug in URL');
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        const data = await fetchNews();
        // console.log("Fetched data:", data); // Debug log
        if (data?.status === '200') {
          const posts: News[] = data.data.map((post: News) => ({
            ...post,
            post_content: stripHtml(post.post_content)
          }));
          const foundPost = posts.find((post) => post.slug === slug);
          // console.log("Found post:", foundPost); // Debug log
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

  const processContent = (html: string) => {
    let processedHtml = html.replace(/(\r\n|\r|\n)+/g, '<br>'); // Replace all line breaks with <br>
    processedHtml = processedHtml.replace(
      /<img([^>]+)>/g,
      `<div style="text-align: center;"><img$1 style="margin: 1rem auto; max-width: 100%; height: auto;" /></div>`
    ); // Center <img> tags
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
      <ul className="relative mb-15 w-10/12 mb-12">
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
