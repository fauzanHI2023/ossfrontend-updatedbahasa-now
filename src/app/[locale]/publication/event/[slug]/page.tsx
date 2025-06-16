'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { fetchEvents } from '@/lib/publication/auth-event';

interface Events {
  id: number;
  post_title: string;
  post_content: string;
  post_date_gmt: string;
  slug: string;
}

const PostDetail: React.FC = () => {
  const params = useParams();
  const slug = params?.slug;
  const [post, setPost] = useState<Events | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Definisikan fungsi truncateAndStripHtml sebelum digunakan
  const stripHtml = (html: string) => {
    if (typeof window !== "undefined") {
      // Untuk lingkungan client-side
      const doc = new DOMParser().parseFromString(html, "text/html");
      const text = doc.body.textContent || "";
  
      // Hapus karakter "rn" atau variasinya
      return text.replace(/(\r\n|\n|\r|rn)+/g, " ").trim();
    }
  
    // Fallback untuk SSR (menghapus HTML tag dan karakter \r\n)
    return html
      .replace(/<[^>]*>?/gm, "") // Hapus semua tag HTML
      .replace(/(\r\n|\n|\r|rn)+/g, " ") // Hapus karakter \r\n dan variasinya
      .trim(); // Hapus spasi ekstra di awal/akhir
  };
  
  // Pemakaian dalam useEffect
  useEffect(() => {
    const fetchPost = async () => {
      if (!slug) {
        console.warn("Missing id in URL");
        setLoading(false);
        return;
      }
  
      setLoading(true);
      try {
        const data = await fetchEvents();
  
        if (data?.status === "200") {
          // Proses semua post_content untuk menghapus tag HTML dan karakter \r\n
          const processedPosts: Events[] = data.data.map((post: Events) => ({
            ...post,
            post_content: stripHtml(post.post_content), // Hapus HTML dan karakter \r\n
          }));
  
          // Cari post berdasarkan ID
          const foundPost = processedPosts.find((post: Events) => post.slug === slug);
  
          if (foundPost) {
            setPost(foundPost);
          } else {
            console.warn("Post not found for ID:");
            setPost(null);
          }
        } else {
          console.error("Invalid response status:", data.status);
        }
      } catch (error) {
        console.error("Error fetching post:", error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchPost();
  }, [slug]);        

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!post) {
    return <p>Post not found. Please check the URL or ID.</p>;
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

//   const stripHtml = (html: string) => {
//     if (typeof window !== "undefined") {
//       const doc = new DOMParser().parseFromString(html, "text/html");
//       const text = doc.body.textContent || "";
//       // Hapus karakter "rn" atau variasi lainnya
//       return text.replace(/(\r\n|\n|\r|rn)+/g, " ").trim();
//     }
//     // Fallback untuk SSR
//     return html.replace(/<[^>]*>?/gm, "").replace(/(\r\n|\n|\r|rn)+/g, " ").trim();
//   };
  

//   const truncateAndStripHtml = (html: string, wordLimit: number) => {
//     const plainText = stripHtml(html);
//     const words = plainText.split(" ");
//     return (
//       words.slice(0, wordLimit).join(" ") +
//       (words.length > wordLimit ? "..." : "")
//     );
//   };

  const processContent  = (html: string) => {
    let processedHtml = html.replace(/(\r\n|\r|\n)+/g, "<br>");
    processedHtml = processedHtml.replace(
      /<img([^>]+)>/g,
      `<div style="text-align:center;"><img$1 style="margin:1rem auto; max-width: 100%; heigh: auto;"/></div>`
    )
    return processedHtml; 
  }

  return (
    <main className="flex text-center justify-center items-center sm:py-36 py-12 w-full">
      <div className="sm:w-8/12 sm:max-w-[1430px] mx-auto mx-16">
        <h1 className="text-4xl font-semibold text-sky-900 leading-[3.5rem] mb-4">{post.post_title}</h1>
        <p className="text-gray-600 text-sm mb-6">
          {new Date(post.post_date_gmt).toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
          })}
        </p>
        <div
          className="prose text-justify max-w-none leading-9 text-base text-[#666]"
          dangerouslySetInnerHTML={{ 
            __html: processContent(post.post_content), 
          }}
        />
      </div>
    </main>
  );
};

export default PostDetail;