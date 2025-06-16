'use client';
import React, {useState, useEffect, CSSProperties} from 'react';
import BannerPublikasi from '@/components/ui/banner/BannerPublikasi';
import {fetchPublicReports} from '@/lib/publication/auth-public-report';
import axios from 'axios';
import Image from 'next/image';
import {usePagination} from '@/hooks/usePagination';
import {FaArrowLeft, FaArrowRight} from 'react-icons/fa';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from '@/components/ui/tabs-fe';
import {ArrowDownToLine, SlidersHorizontal} from 'lucide-react';
import PdfViewer from '@/components/pdf/PdfViewer';
import HashLoader from 'react-spinners/HashLoader';
import AOS from 'aos';
import 'aos/dist/aos.css';

const override: CSSProperties = {
  display: 'block',
  margin: '0 auto',
  borderColor: 'red'
};

interface PublicReport {
  id: number;
  title: string;
  cover: string;
  link: string;
  created_at: string;
  type_report: string;
  year_publicreport: string;
  coverUrl?: string;
  linkUrl?: string;
}

const PublicReport = () => {
  const [publicReports, setPublicReports] = useState<PublicReport[] | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedTab, setSelectedTab] = useState<string>('all');
  const [selectedYear, setSelectedYear] = useState<string>('All');
  const [showYearDropdown, setShowYearDropdown] = useState(false);
  let [color, setColor] = useState('#209ce2');

  const itemsPerPage = 10; // Number of items per page
  const maxVisiblePages = 5;
  const {
    currentPage,
    setCurrentPage,
    paginate,
    totalPages,
    getVisiblePageNumbers
  } = usePagination(itemsPerPage, maxVisiblePages);

  useEffect(() => {
    const getPublicReports = async () => {
      setLoading(true);
      const data = await fetchPublicReports();
      if (data && data.status === '200') {
        const updatedReports = await Promise.all(
          data.data.map(async (report: PublicReport) => {
            try {
              const coverResponse = await axios.get(
                `/api/getImage?key=${report.cover}`
              );
              const linkResponse = await axios.get(
                `/api/getFile?key=${report.link}`
              );

              return {
                ...report,
                coverUrl: coverResponse.data.url,
                linkUrl: linkResponse.data.url
              };
            } catch (error) {
              console.error(
                `Error fetching URLs for report ${report.id}:`,
                error
              );
              return report;
            }
          })
        );
        setPublicReports(updatedReports);
      }
      setLoading(false);
    };
    getPublicReports();
    AOS.init();
  }, []);

  const homePageImages = [
    '/publicreport (1).png',
    '/publicreport (2).png',
    '/publicreport (3).png',
    '/publicreport (4).png'
  ];

  const filterReports = () => {
    if (!publicReports) return [];
    let filtered = publicReports;
    if (selectedTab !== 'all') {
      filtered = filtered.filter(
        (report) => report.type_report === selectedTab
      );
    }
    if (selectedYear !== 'All') {
      filtered = filtered.filter(
        (report) => report.year_publicreport === selectedYear
      );
    }
    return filtered;
  };

  const generateYearOptions = () => {
    const years = [];
    for (let year = 2000; year <= 2024; year++) {
      years.push(year.toString());
    }
    return years;
  };

  const generatePageNumbers = () => {
    const pages = [];
    for (let i = 1; i <= totalPages(publicReports?.length || 0); i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <main className="flex flex-col items-center justify-center sm:pt-28 pt-12 px-6">
      <BannerPublikasi
        images={homePageImages}
        title="Public Report of Human Initiative"
        hashtag="Berdaya, Kolaborasi, Amanah"
      />
      <section className="relative w-full flex flex-col gap-y-8 sm:px-12 px-6 sm:py-12 py-10">
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
            <TabsTrigger value="annual">Annual Report</TabsTrigger>
            <TabsTrigger value="financial">Financial Report</TabsTrigger>
            <TabsTrigger value="factsheet">Fact Sheet</TabsTrigger>
          </TabsList>

          <div className="mb-4 flex flex-row justify-center items-center gap-x-4 relative bottom-4 float-right">
            {/* Tombol "Year" */}
            <button
              onClick={() => setShowYearDropdown(!showYearDropdown)}
              className="flex flex-row justify-between px-6 py-2 rounded-3xl bg-sky-500 text-white z-20 hover:transition-all hover:duration-200 hover:bg-sky-600"
            >
              Year{' '}
              <SlidersHorizontal className="pl-2 w-12 text-white text-lg" />
            </button>

            {/* Dropdown */}
            {showYearDropdown && (
              <>
                <div
                  onClick={() => setShowYearDropdown(false)}
                  className="fixed inset-0 bg-black bg-opacity-75 z-10 top-0 left-0 transition-opacity duration-200 ease-in w-full h-full"
                />

                <div className="absolute top-full mt-8 right-0 bg-white dark:bg-slate-800 border rounded-lg shadow-lg w-96 z-20">
                  <h5 className="text-center py-4 bg-white dark:bg-slate-700 text-sky-900 dark:text-sky-500 font-medium border border-b-4 border-b-sky-500">
                    Select Year
                  </h5>
                  <ul className="flex flex-col h-32 overflow-hidden overflow-y-scroll">
                    <li
                      onClick={() => {
                        setSelectedYear('All');
                        setShowYearDropdown(false);
                        setCurrentPage(1);
                      }}
                      className="px-4 py-2 text-sky-900 dark:text-sky-700 hover:bg-gray-100 dark:hover:bg-slate-700 cursor-pointer"
                    >
                      All
                    </li>
                    {generateYearOptions().map((year) => (
                      <li
                        key={year}
                        onClick={() => {
                          setSelectedYear(year);
                          setShowYearDropdown(false);
                          setCurrentPage(1);
                        }}
                        className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-slate-700 cursor-pointer"
                      >
                        {year}
                      </li>
                    ))}
                  </ul>
                </div>
              </>
            )}
          </div>

          <TabsContent
            value={selectedTab}
            className="flex flex-col gap-y-8 justify-center items-center w-full"
          >
            {loading ? (
              <div className="sm:grid sm:grid-cols-2 sm:gap-10 w-full flex flex-col gap-y-6">
                {Array.from({length: itemsPerPage}).map((_, index) => (
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
            ) : (
              <div className="sm:grid sm:grid-cols-2 sm:gap-10 w-full flex flex-col gap-y-6">
                {filterReports().length > 0 ? (
                  paginate(filterReports()).map((report) => (
                    <div
                      key={report.id}
                      className="publikasi-card mb-4 border-b w-full flex flex-row gap-x-3 justify-between bg-gray-50 dark:bg-slate-900 transition duration-500 ease-in hover:bg-gray-100"
                    >
                      {report.coverUrl ? (
                        <span className="w-[230px] h-[300px] overflow-hidden relative">
                          <Image
                            src={report.coverUrl}
                            alt={report.title}
                            width={500}
                            height={500}
                            className="w-full h-full object-cover float-none absolute"
                          />
                        </span>
                      ) : (
                        <p>No img image available.</p>
                      )}
                      <div className="flex flex-col justify-between items-start w-3/5 p-6">
                        <h2 className="text-gray-700 text-xl font-normal">
                          PDF
                        </h2>
                        <h2 className="capitalize text-lg leading-6 font-medium text-gray-700 dark:text-white leading-6 h-1/6 overflow-hidden">
                          {report.title}
                        </h2>
                        <div className="flex sm:flex-row flex-col justify-center items-center gap-x-4">
                          <a
                            href={report.linkUrl}
                            target="_blank"
                            className="text-gray-800 text-sm hover:underline flex flex-row justify-center items-center"
                          >
                            <ArrowDownToLine className="text-sky-600 text-sm w-4 h-4 hover:animate-shake" />
                            Download Report{' '}
                            <span className="pl-4 text-gray-500">|</span>
                          </a>
                          {report.linkUrl ? (
                            <PdfViewer fileUrl={report.linkUrl} />
                          ) : (
                            <p>No report file available.</p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>No reports available.</p>
                )}
              </div>
            )}
          </TabsContent>
        </Tabs>
        {/* Pagination Controls */}
        <div className="pagination-controls flex justify-center items-center gap-4 mt-8">
          <button
            onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-3 bg-sky-500 text-white rounded disabled:bg-gray-300"
          >
            <FaArrowLeft />
          </button>

          <div className="page-numbers flex gap-2">
            {generatePageNumbers().map((pageNumber) => (
              <button
                key={pageNumber}
                onClick={() => setCurrentPage(pageNumber)}
                className={`px-4 py-2 border rounded ${currentPage === pageNumber ? 'bg-sky-500 text-white' : 'bg-gray-200 text-black'}`}
              >
                {pageNumber}
              </button>
            ))}
          </div>

          <button
            onClick={() =>
              setCurrentPage(
                Math.min(
                  currentPage + 1,
                  totalPages(publicReports?.length || 0)
                )
              )
            }
            disabled={currentPage === totalPages(publicReports?.length || 0)}
            className="px-4 py-3 bg-sky-500 text-white rounded disabled:bg-gray-300"
          >
            <FaArrowRight />
          </button>
        </div>
      </section>
    </main>
  );
};

export default PublicReport;
