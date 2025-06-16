"use client";

import React, { useState, useEffect } from "react";
import BannerPublikasi from "@/components/ui/banner/BannerPublikasi";
import { fetchNews } from "@/lib/publication/auth-news";
import Image from "next/image";
import { usePagination } from "@/hooks/usePagination";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import Link from "next/link";
import { MoveRight } from "lucide-react";
import { slugify } from "@/components/ui/utility/slugify";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs-fe";

interface News {
  id: number;
  post_title: string;
  guid: string;
  post_content: string;
  post_date_gmt: string;
  category_posts: string;
  slug: string;
}

const NewsStories: React.FC = () => {
  const [newss, setNewss] = useState<News[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedTab, setSelectedTab] = useState<string>("all");
  const itemsPerPage = 9;
  const maxVisiblePages = 5;
  const {
    currentPage,
    setCurrentPage,
    paginate,
    totalPages,
    getVisiblePageNumbers,
  } = usePagination(itemsPerPage, maxVisiblePages);

  useEffect(() => {
    const getNews = async () => {
      setLoading(true);
      const data = await fetchNews();
      if (data && data.status === "200") {
        setNewss(data.data);
      }
      setLoading(false);
    };
    getNews();
  }, []);

  const homePageImages = [
    "/newsstories (1).png",
    "/newsstories (2).png",
    "/newsstories (3).png",
    "/newsstories (4).png",
  ];

  const filterNews = () => {
    if (!newss) return [];
    const sortedNews = [...newss].sort((a, b) => b.id - a.id);
    let filtered = sortedNews;
    if (selectedTab !== "all") {
      filtered = filtered.filter((news) => news.category_posts === selectedTab);
    }
    return filtered;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const stripHtml = (html: string) => {
    if (typeof window !== "undefined") {
      const doc = new DOMParser().parseFromString(html, "text/html");
      return doc.body.textContent || "";
    }
    return html;
  };

  const truncateAndStripHtml = (html: string, wordLimit: number) => {
    const plainText = stripHtml(html);
    const words = plainText.split(" ");
    return (
      words.slice(0, wordLimit).join(" ") +
      (words.length > wordLimit ? "..." : "")
    );
  };

  return (
    <main className="flex flex-col items-center justify-center sm:pt-28 pt-12 px-6">
      <BannerPublikasi
        images={homePageImages}
        title="News & Stories Human Initiative"
        hashtag="Berdaya, Kolaborasi, Amanah"
      />
      <section className="w-full relative flex flex-col gap-y-8 sm:px-20 px-6 sm:py-8 py-10">
        <Tabs
          defaultValue="all"
          className="w-full"
          onValueChange={(value) => {
            setSelectedTab(value);
            setCurrentPage(1);
          }}
        >
          <TabsList className="pb-10">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="news">News</TabsTrigger>
            <TabsTrigger value="stories">Stories</TabsTrigger>
            <TabsTrigger value="collaborate">Collaborate</TabsTrigger>
          </TabsList>
          <TabsContent
            value={selectedTab}
            className="flex flex-col gap-y-8 justify-center items-center w-full"
          >
            {loading && (
              <div className="w-full sm:grid sm:grid-cols-3 sm:gap-8 flex flex-col gap-y-6">
                {Array.from({ length: 9 }).map((_, index) => (
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
            <div className="sm:grid sm:grid-cols-3 sm:gap-8 flex flex-col w-full">
              {!loading && filterNews && filterNews().length > 0 ? (
                paginate(filterNews()).map((news) => (
                  <div
                    key={news.id}
                    className="publikasi-card mb-4 border-b pb-4 w-full flex flex-col transition duration-500 ease-in"
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
                          className="rounded-t-xl w-full h-full object-cover float-none absolute"
                        />
                      </Link>
                    </span>
                    <div className="flex flex-col gap-y-4 justify-start items-start px-0 py-4">
                      <span className="dark:bg-slate-800 dark:text-slate-300 text-slate-600 bg-slate-200 py-1 px-2 rounded-2xl w-max">
                        {formatDate(news.post_date)}
                      </span>
                      <Link href={`/publication/news&stories/${news.slug}`}>
                        <h2 className="text-sky-800 dark:text-white sm:text-base text-base font-semibold dark:text-white leading-6 h-[50px] overflow-hidden">
                          {news.post_title}
                        </h2>
                      </Link>
                      <p className="text-slate-500 text-sm font-normal dark:text-slate-200">
                        {truncateAndStripHtml(news.post_content, 5)}
                      </p>
                      <Link
                        href={news.post_title}
                        className={`flex flex-row gap-x-2 items-center w-full text-center rounded-lg text-sky-500 dark:text-sky-500 inline-block bg-transparent font-medium text-normal p-1 hover:transition hover:ease-in-out`}
                      >
                        Read More <MoveRight />
                      </Link>
                    </div>
                  </div>
                ))
              ) : (
                <p>No media releases available.</p>
              )}
            </div>
          </TabsContent>
        </Tabs>

        <div className="pagination-controls flex justify-center items-center gap-4 mt-8">
          <button
            onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-sky-500 text-white rounded disabled:bg-gray-300"
          >
            <FaArrowLeft />
          </button>

          <div className="page-numbers flex gap-2">
            {getVisiblePageNumbers(newss?.length || 0).map((pageNumber) => (
              <button
                key={pageNumber}
                onClick={() => setCurrentPage(pageNumber)}
                className={`px-4 py-2 border rounded ${
                  currentPage === pageNumber
                    ? "bg-sky-500 text-white"
                    : "bg-gray-200 text-black"
                }`}
              >
                {pageNumber}
              </button>
            ))}
          </div>

          <button
            onClick={() =>
              setCurrentPage(
                Math.min(currentPage + 1, totalPages(newss?.length || 0))
              )
            }
            disabled={currentPage === totalPages(newss?.length || 0)}
            className="px-4 py-2 bg-sky-500 text-white rounded disabled:bg-gray-300"
          >
            <FaArrowRight />
          </button>
        </div>
      </section>
    </main>
  );
};

export default NewsStories;
