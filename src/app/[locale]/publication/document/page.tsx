"use client";

import React, { useState, useEffect } from "react";
import BannerPublikasi from "@/components/ui/banner/BannerPublikasi";
import { fetchDocument } from "@/lib/publication/auth-document";
import axios from "axios";
import Image from "next/image";
import { usePagination } from "@/hooks/usePagination";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { ArrowDownToLine } from "lucide-react";
import PdfViewer from "@/components/pdf/PdfViewer";

interface Document {
  id: number;
  title: string;
  img: string;
  file: string;
  created_at: string;
  imgUrl?: string;
  fileUrl?: string;
}

const Document = () => {
  const [documents, setDocuments] = useState<Document[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
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
    const getDocuments = async () => {
      const data = await fetchDocument();
      if (data && data.status === "200") {
        const updatedReports = await Promise.all(
          data.data.map(async (document: Document) => {
            try {
              const imgResponse = await axios.get(
                `/api/getImage?key=${document.img}`
              );
              const fileResponse = await axios.get(
                `/api/getFile?key=${document.file}`
              );

              return {
                ...document,
                imgUrl: imgResponse.data.url,
                fileUrl: fileResponse.data.url,
              };
            } catch (error) {
              console.error(
                `Error fetching URLs for document ${document.id}:`,
                error
              );
              return document;
            }
          })
        );
        setDocuments(updatedReports);
      }
      setLoading(false);
    };
    getDocuments();
  }, []);

  const homePageImages = [
    "/document (1).png",
    "/document (2).png",
    "/document (3).png",
    "/document (4).png",
  ];

  const generatePageNumbers = () => {
    const pages = [];
    for (let i = 1; i <= totalPages(documents?.length || 0); i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <main className="flex flex-col items-center justify-center sm:pt-28 pt-12 px-6">
      <BannerPublikasi
        images={homePageImages}
        title="All Document of Human Initiative"
        hashtag="Berdaya, Kolaborasi, Amanah"
      />
      <section className="w-full relative flex flex-col gap-y-8 sm:px-16 px-6 sm:py-12 py-10">
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

        <div className="sm:grid sm:grid-cols-2 sm:gap-8 flex flex-col gap-y-6">
          {!loading && documents && documents.length > 0 ? (
            paginate(documents).map((document) => (
              <div
                key={document.id}
                className="publikasi-card mb-4 border-b pb-4 w-full flex flex-row gap-x-3 justify-between bg-gray-50 dark:bg-slate-900 transition duration-500 ease-in hover:bg-gray-100"
              >
                <div className="flex flex-col justify-between items-start w-3/5 px-6 py-4">
                  <h2 className="capitalize text-base font-medium text-slate-950 dark:text-white leading-6 h-[60px] overflow-hidden">
                    {document.title}
                  </h2>
                  <div className="flex sm:flex-row flex-col gap-x-4">
                    {document.fileUrl ? (
                      <a
                        href={document.fileUrl}
                        target="_blank"
                        className="text-sky-500 hover:underline mt-2 flex flex-row justify-center items-center"
                      >
                        Download Report
                        <ArrowDownToLine className="text-sky-600 hover:animate-shake" />
                      </a>
                    ) : (
                      <p>No document file available.</p>
                    )}
                    {document.fileUrl ? (
                      <PdfViewer fileUrl={document.fileUrl} />
                    ) : (
                      <p>No document file available.</p>
                    )}
                  </div>
                </div>
                {document.imgUrl ? (
                  <span className="w-[230px] h-[300px] overflow-hidden relative">
                    <Image
                      src={document.imgUrl}
                      alt={document.title}
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
            <p>No documents available.</p>
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
            {getVisiblePageNumbers(documents?.length || 0).map((pageNumber) => (
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
                Math.min(currentPage + 1, totalPages(documents?.length || 0))
              )
            }
            disabled={currentPage === totalPages(documents?.length || 0)}
            className="px-4 py-2 bg-sky-500 text-white rounded disabled:bg-gray-300"
          >
            <FaArrowRight />
          </button>
        </div>
      </section>
    </main>
  );
};

export default Document;
