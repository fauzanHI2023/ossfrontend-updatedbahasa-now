"use client";
import React, { useState, useEffect } from "react";
import BannerPublikasi from "@/components/ui/banner/BannerPublikasi";
import { fetchLibrary } from "@/lib/publication/auth-library";
import axios from "axios";
import Image from "next/image";
import { usePagination } from "@/hooks/usePagination";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { ArrowDownToLine } from "lucide-react";
import PdfViewer from "@/components/pdf/PdfViewer";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs-fe";

interface Library {
  id: number;
  title: string;
  cover: string;
  link: string;
  created_at: string;
  type_report: string;
  coverUrl?: string;
  linkUrl?: string;
}

const Library = () => {
  const [librarys, setLibrarys] = useState<Library[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedTab, setSelectedTab] = useState<string>("all");
  const itemsPerPage = 10;
  const maxVisiblePages = 5;
  const {
    currentPage,
    setCurrentPage,
    paginate,
    totalPages,
    getVisiblePageNumbers,
  } = usePagination(itemsPerPage, maxVisiblePages);

  useEffect(() => {
    const getLibrary = async () => {
      setLoading(true);
      const data = await fetchLibrary();
      if (data && data.status === "200") {
        const updatedLibrarys = await Promise.all(
          data.data.map(async (library: Library) => {
            try {
              const coverResponse = await axios.get(
                `/api/getImage?key=${library.cover}`
              );
              const linkResponse = await axios.get(
                `/api/getFile?key=${library.link}`
              );

              return {
                ...library,
                coverUrl: coverResponse.data.url,
                linkUrl: linkResponse.data.url,
              };
            } catch (error) {
              console.error(
                `Error fetching URLs for library ${library.id}:`,
                error
              );
              return library;
            }
          })
        );
        setLibrarys(updatedLibrarys);
      }
      setLoading(false);
    };
    getLibrary();
  }, []);

  const homePageImages = [
    "/library (1).png",
    "/library (2).png",
    "/library (3).png",
    "/library (4).png",
  ]; // Daftar gambar untuk halaman beranda

  const filterReports = (type: string) => {
    if (!librarys) return [];
    if (type === "all") return librarys;
    return librarys.filter((library) => library.type_report === type);
  };

  const generatePageNumbers = () => {
    const pages = [];
    for (
      let i = 1;
      i <= totalPages(filterReports(selectedTab)?.length || 0);
      i++
    ) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <main className="flex flex-col items-center justify-center sm:pt-28 pt-12 px-6">
      <BannerPublikasi
        images={homePageImages}
        title="Library of Human Initiative"
        hashtag="Berdaya, Kolaborasi, Amanah"
      />
      <section className="relative w-full flex flex-col gap-y-8 sm:px- px-6 sm:py-12 py-10">
        <Tabs
          defaultValue="all"
          className="w-full"
          onValueChange={(value) => {
            setSelectedTab(value);
            setCurrentPage(1); // Reset pagination when changing tabs
          }}
        >
          <TabsList className="pb-10">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="companyprofile">Company Profile</TabsTrigger>
            <TabsTrigger value="catalog">Catalog Program</TabsTrigger>
            <TabsTrigger value="magazine">Magazine</TabsTrigger>
          </TabsList>

          <TabsContent
            value={selectedTab}
            className="flex flex-col gap-y-8 justify-center items-center w-full"
          >
            {loading && (
              <div className="sm:grid sm:grid-cols-2 sm:gap-10 w-full flex flex-col gap-y-6">
                {Array.from({ length: itemsPerPage }).map((_, index) => (
                  <div
                    key={index}
                    className="publikasi-card mb-4 border-b pb-4 w-full flex flex-row gap-x-3 justify-between bg-gray-200 dark:bg-slate-800 animate-pulse"
                  >
                    <div className="flex flex-col justify-between items-start w-3/5 px-6 py-4">
                      <div className="h-6 w-32 bg-gray-300 dark:bg-slate-600 rounded"></div>
                      <div className="h-4 w-full bg-gray-300 dark:bg-slate-600 rounded mt-2"></div>
                      <div className="h-4 w-3/4 bg-gray-300 dark:bg-slate-600 rounded mt-2"></div>
                      <div className="flex sm:flex-row flex-col gap-x-4 mt-4">
                        <div className="h-6 w-24 bg-gray-300 dark:bg-slate-600 rounded"></div>
                        <div className="h-6 w-32 bg-gray-300 dark:bg-slate-600 rounded"></div>
                      </div>
                    </div>
                    <div className="w-[230px] h-[300px] bg-gray-300 dark:bg-slate-600 rounded"></div>
                  </div>
                ))}
              </div>
            )}

            <div className="sm:grid sm:grid-cols-2 sm:gap-10 w-full flex flex-col gap-y-6">
              {!loading &&
              filterReports &&
              filterReports(selectedTab).length > 0 ? (
                paginate(filterReports(selectedTab)).map((library) => (
                  <div
                    key={library.id}
                    className="publikasi-card mb-4 border-b pb-4 w-full flex flex-row gap-x-3 justify-between bg-gray-50 dark:bg-slate-900 transition duration-500 ease-in hover:bg-gray-100"
                  >
                    <div className="flex flex-col justify-between items-start w-3/5 px-6 py-4">
                      <h2 className="text-sky-500 text-xl font-normal">
                        PDF File
                      </h2>
                      <h2 className="capitalize text-lg leading-6 font-medium text-slate-950 dark:text-white leading-6 h-1/6 overflow-hidden">
                        {library.title}
                      </h2>
                      <div className="flex sm:flex-row flex-col gap-x-4">
                        {library.linkUrl ? (
                          <a
                            href={library.linkUrl}
                            target="_blank"
                            className="text-sky-500 hover:underline mt-2 flex flex-row justify-center items-center"
                          >
                            Download Report
                            <ArrowDownToLine className="text-sky-600 hover:animate-shake" />
                          </a>
                        ) : (
                          <p>No library file available.</p>
                        )}
                        {library.linkUrl ? (
                          <PdfViewer fileUrl={library.linkUrl} />
                        ) : (
                          <p>No library file available.</p>
                        )}
                      </div>
                    </div>
                    {library.coverUrl ? (
                      <span className="w-[230px] h-[300px] overflow-hidden relative">
                        <Image
                          src={library.coverUrl}
                          alt={library.title}
                          width={500}
                          height={500}
                          className="w-full h-full object-cover float-none absolute"
                        />
                      </span>
                    ) : (
                      <p>No img image available.</p>
                    )}
                  </div>
                ))
              ) : (
                <p>No librarys available.</p>
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
                {getVisiblePageNumbers(librarys?.length || 0).map(
                  (pageNumber) => (
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
                  )
                )}
              </div>

              <button
                onClick={() =>
                  setCurrentPage(
                    Math.min(currentPage + 1, totalPages(librarys?.length || 0))
                  )
                }
                disabled={currentPage === totalPages(librarys?.length || 0)}
                className="px-4 py-2 bg-sky-500 text-white rounded disabled:bg-gray-300"
              >
                <FaArrowRight />
              </button>
            </div>
          </TabsContent>
        </Tabs>
      </section>
    </main>
  );
};

export default Library;
