"use client";

import React, { useState, useEffect } from "react";
import BannerPublikasi from "@/components/ui/banner/BannerPublikasi";
import { fetchSituationReports } from "@/lib/publication/auth-situation-report";
import axios from "axios";
import Image from "next/image";
import { usePagination } from "@/hooks/usePagination";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

interface SituationReport {
  id: number;
  title: string;
  cover: string;
  link: string;
  created_at: string;
  coverUrl?: string;
  linkUrl?: string;
}

const SituationReport = () => {
  const [situationReports, setSituationReports] = useState<SituationReport[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const itemsPerPage = 9; // Number of items per page
  const { currentPage, setCurrentPage, paginate, totalPages } = usePagination(itemsPerPage);

  useEffect(() => {
    const getSituationReports = async () => {
      setLoading(true);
      const data = await fetchSituationReports();
      if (data && data.status === "200") {
        const updatedReports = await Promise.all(
          data.data.map(async (report: SituationReport) => {
            try {
              const coverResponse = await axios.get(`/api/getImage?key=${report.cover}`);
              const linkResponse = await axios.get(`/api/getFile?key=${report.link}`);

              return {
                ...report,
                coverUrl: coverResponse.data.url,
                linkUrl: linkResponse.data.url,
              };
            } catch (error) {
              console.error(`Error fetching URLs for report ${report.id}:`, error);
              return report;
            }
          })
        );
        setSituationReports(updatedReports);
      }
      setLoading(false);
    };
    getSituationReports();
  }, []);

  const homePageImages = ["/situation (1).png", "/transly-translation-agency-bjrgU1rkWis-unsplash.jpg", "/situation (3).png", "/situation (4).png"];

  const generatePageNumbers = () => {
    const pages = [];
    for (let i = 1; i <= totalPages(situationReports?.length || 0); i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <main className="flex flex-col items-center justify-center sm:pt-28 pt-12 px-6">
      <BannerPublikasi images={homePageImages} title="Situation Report" hashtag="Kolaborasi, Amanah" />
      <section className="relative flex flex-col gap-y-8 sm:px-28 px-6 sm:py-28 py-10 w-full">
        <h5 className="title-2xl-semibold-black dark:text-white">Situation Report</h5>
        {/* Loading Skeleton */}
        {loading && (
          <div className="sm:grid sm:grid-cols-3 sm:gap-8 flex flex-col gap-y-6">
            {[...Array(9)].map((_, index) => (
              <div key={index} className="animate-pulse mb-4 border-b pb-4 w-full flex flex-col gap-y-3 bg-gray-200 dark:bg-slate-700" style={{ animationDuration: "2.5s" }}>
                <div className="h-[240px] bg-gray-300 dark:bg-slate-600 rounded w-full"></div>
                <div className="h-6 w-3/4 bg-gray-300 dark:bg-slate-600 rounded mx-auto"></div>
                <div className="h-4 w-1/2 bg-gray-300 dark:bg-slate-600 rounded mx-auto"></div>
              </div>
            ))}
          </div>
        )}

        {/* Content */}
        <div className="sm:grid sm:grid-cols-3 sm:gap-8 flex flex-col gap-y-6">
          {!loading && situationReports && situationReports.length > 0
            ? paginate(situationReports).map((report) => (
                <div key={report.id} className="publikasi-card mb-4 border-b pb-4 w-full flex flex-col gap-y-3 bg-gray-50 dark:bg-slate-900 dark:hover:bg-slate-800 hover:bg-gray-100 transition duration-500 ease-in hover:bg-gray-100">
                  {report.coverUrl ? (
                    <span className="h-[240px] overflow-hidden relative">
                      <Image src={report.coverUrl} alt={report.title} width={500} height={500} className="w-full h-full object-cover float-none absolute" />
                    </span>
                  ) : (
                    <p>No cover image available.</p>
                  )}
                  <h2 className="px-6 py-4 capitalize text-base font-medium text-slate-950 dark:text-white leading-6 h-[60px] overflow-hidden">{report.title}</h2>
                  {report.linkUrl ? (
                    <a href={report.linkUrl} target="_blank" className="px-6 text-blue-500 hover:underline mt-2 block">
                      Download Report
                    </a>
                  ) : (
                    <p>No report file available.</p>
                  )}
                </div>
              ))
            : !loading && <p>No reports available.</p>}
        </div>

        {/* Pagination Controls */}
        <div className="pagination-controls flex justify-center items-center gap-4 mt-8">
          <button onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))} disabled={currentPage === 1} className="px-4 py-3 bg-sky-500 text-white rounded disabled:bg-gray-300">
            <FaArrowLeft />
          </button>

          <div className="page-numbers flex gap-2">
            {generatePageNumbers().map((pageNumber) => (
              <button key={pageNumber} onClick={() => setCurrentPage(pageNumber)} className={`px-4 py-2 border rounded ${currentPage === pageNumber ? "bg-sky-500 text-white" : "bg-gray-200 text-black"}`}>
                {pageNumber}
              </button>
            ))}
          </div>

          <button
            onClick={() => setCurrentPage(Math.min(currentPage + 1, totalPages(situationReports?.length || 0)))}
            disabled={currentPage === totalPages(situationReports?.length || 0)}
            className="px-4 py-3 bg-sky-500 text-white rounded disabled:bg-gray-300"
          >
            <FaArrowRight />
          </button>
        </div>
      </section>
    </main>
  );
};

export default SituationReport;
