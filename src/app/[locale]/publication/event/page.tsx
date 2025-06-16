"use client";
import React, { useState, useEffect } from "react";
import BannerPublikasi from "@/components/ui/banner/BannerPublikasi";
import { fetchEvents } from "@/lib/publication/auth-event";
import axios from "axios";
import Image from "next/image";
import { usePagination } from "@/hooks/usePagination";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { MoveRight } from "lucide-react";
import { FileDown } from "lucide-react";
import Link from "next/link";

interface Events {
  id: number;
  post_title: string;
  guid: string;
  post_content: string;
  post_date_gmt: string;
  slug: string;
}

const Event = () => {
  const [events, setEvents] = useState<Events[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
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
    const getEvents = async () => {
      setLoading(true);
      const data = await fetchEvents();
      if (data && data.status === "200") {
        const processedEvents = data.data.map((event: Events) => ({
          ...event,
          post_content: truncateAndStripHtml(event.post_content, 40),
        }));
        setEvents(processedEvents);
      }
      setLoading(false);
    };
    getEvents();
  }, []);

  const homePageImages = [
    "/event (1).png",
    "/event (2).png",
    "/event (3).png",
    "/event (4).png",
  ]; // Daftar gambar untuk halaman beranda

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
      const text = doc.body.textContent || "";
      // Hapus karakter "rn" atau variasi lainnya
      return text.replace(/(\r\n|\n|\r|rn)+/g, " ").trim();
    }
    // Fallback untuk SSR
    return html
      .replace(/<[^>]*>?/gm, "")
      .replace(/(\r\n|\n|\r|rn)+/g, " ")
      .trim();
  };

  const truncateAndStripHtml = (html: string, wordLimit: number) => {
    const plainText = stripHtml(html);
    const words = plainText.split(" ");
    return (
      words.slice(0, wordLimit).join(" ") +
      (words.length > wordLimit ? "..." : "")
    );
  };

  const generatePageNumbers = () => {
    const pages = [];
    for (let i = 1; i <= totalPages(events?.length || 0); i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <main className="flex flex-col items-center justify-center sm:pt-28 pt-12 px-6">
      <BannerPublikasi
        images={homePageImages}
        title="All Event of Human Initiative"
        hashtag="Berdaya, Kolaborasi, Amanah"
      />
      <section className="w-full relative flex flex-col gap-y-8 sm:px-20 px-6 sm:py-8 py-10">
        {/* <h5 className="title-2xl-semibold-black dark:text-white">Event</h5> */}
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

        <div className="sm:grid sm:grid-cols-3 sm:gap-8 flex flex-col">
          {!loading && events && events.length > 0 ? (
            paginate(events).map((eventSs) => (
              <div
                key={eventSs.id}
                className="publikasi-card mb-4 border-b pb-4 w-full flex flex-col rounded-b-lg bg-gray-50 hover:bg-slate-100 dark:bg-slate-900 hover:dark:bg-slate-800 transition duration-500 ease-in hover:bg-gray-100"
              >
                <span className="w-full h-[300px] overflow-hidden relative">
                  <Link href={`/publication/event/${eventSs.slug}`}>
                    <Image
                      src={eventSs.guid} // URL gambar langsung dari API
                      alt={eventSs.post_title}
                      width={500}
                      height={300}
                      className="w-full h-full object-cover float-none absolute rounded-t-lg"
                    />
                  </Link>
                </span>
                <div className="flex flex-col gap-y-4 justify-start items-start px-3 py-4">
                  <span className="dark:bg-slate-800 dark:text-slate-300 text-slate-600 bg-slate-200 py-1 px-2 rounded-2xl w-max">
                    {formatDate(eventSs.post_date_gmt)}
                  </span>
                  <Link href={`/publication/event/${eventSs.slug}`}>
                    <h2 className="text-sky-800 dark:text-white sm:text-base text-base font-semibold dark:text-white leading-6 h-[50px] overflow-hidden">
                      {eventSs.post_title}
                    </h2>
                  </Link>
                  <p className="text-slate-500 text-sm font-normal dark:text-slate-200">
                    {truncateAndStripHtml(eventSs.post_content, 5)}
                  </p>
                  <Link
                    href={`/publication/event/${eventSs.slug}`}
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

        {/* Pagination Controls */}
        <div className="pagination-controls flex justify-center items-center gap-4 mt-8">
          <button
            onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-sky-500 text-white rounded disabled:bg-gray-300"
          >
            <FaArrowLeft />
          </button>

          <div className="page-numbers flex gap-2">
            {getVisiblePageNumbers(events?.length || 0).map((pageNumber) => (
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
                Math.min(currentPage + 1, totalPages(events?.length || 0))
              )
            }
            disabled={currentPage === totalPages(events?.length || 0)}
            className="px-4 py-2 bg-sky-500 text-white rounded disabled:bg-gray-300"
          >
            <FaArrowRight />
          </button>
        </div>
      </section>
    </main>
  );
};

export default Event;
