"use client";

import React, { useState, useEffect } from "react";
import BannerCareer from "@/components/ui/banner/BannerCareer";
import { fetchVacancy } from "@/lib/vacancies/auth-vacancy";
import { usePagination } from "@/hooks/usePagination";
import { career } from "@/data/data";
import { ChevronRight } from "lucide-react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";

interface Vacancy {
  id: number;
  vacancy_name: string;
  job_description: string;
  requirement: string;
  location: string;
  due_date: string;
  type_vacancy: string;
  slug: string;
  created_at: string;
}

const BeHumanitarianWorker = () => {
  const [vacancy, setVacancy] = useState<Vacancy[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const itemsPerPage = 15;
  const maxVisiblePages = 5;
  const {
    currentPage,
    setCurrentPage,
    paginate,
    totalPages,
    getVisiblePageNumbers,
  } = usePagination(itemsPerPage, maxVisiblePages);

  useEffect(() => {
    const getVacancy = async () => {
      setLoading(true);
      const data = await fetchVacancy();
      if (data && data.status === "200") {
        setVacancy(data.data);
      }
      setLoading(false);
    };
    getVacancy();
  }, []);

  return (
    <main className="flex flex-col sm:py-16 py-6 sm:pt-28 pt-24 dark:bg-slate-950 bg-white">
      <BannerCareer
        title="Bergabunglah Bersama Kami di Human Initiative"
        description="Temukan peran Anda di Human Initiative dan jadilah bagian dari tim yang berdedikasi untuk menciptakan perubahan nyata. Bersama-sama, kita bekerja menghadapi tantangan global dan memberikan dampak positif bagi masyarakat"
        titlepage="Career"
        image="/career_11zon.png"
      />
      <section className="flex flex-col gap-y-16 w-full sm:px-48 sm:py-16 p-6 dark:bg-slate-950 bg-white">
        <div className="flex flex-col gap-y-4">
          <h5 className="text-xl text-center text-sky-600 font-bold">
            SHAPE YOUR CAREER, YOUR WAY
          </h5>
          <p className="text-base text-center text-slate-500 font-normal">
            Whether you are looking to further build your career or to gain
            hands-on internship experience, you can find a role that suits you
            best.
          </p>
        </div>
      </section>
      <section className="flex flex-col gap-y-16 w-full sm:px-48 sm:py-16 p-6 dark:bg-slate-950 bg-white">
        <div className="flex flex-col gap-y-0">
          {loading ? (
            <p>Loading...</p>
          ) : vacancy && vacancy.length > 0 ? (
            paginate(vacancy).map((vacancies) => (
              <div
                key={vacancies.id}
                className="flex flex-row justify-between items-center border border-sky-100 px-8 py-6 rounded transition ease-in duration-300 hover:border-b-sky-700 shadow-lg shadow-gray-100/50"
              >
                <Link className="w-full flex flex-row justify-between items-center" href={`/joinourmovement/behumanitarianworker/${vacancies.slug}`}>
                  <div className="flex flex-col justify-start gap-y-2">
                    <h5 className="font-medium text-sky-700">
                      {vacancies.vacancy_name}
                    </h5>
                    <p className="text-p-16 font-normal text-sm">
                      Indonesia&nbsp;({vacancies.location})
                    </p>
                  </div>
                  <span>
                    <ChevronRight className="text-slate-500 text-2xl" />
                  </span>
                </Link>
              </div>
            ))
          ) : (
            <p>No vacancy available.</p>
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
            {getVisiblePageNumbers(vacancy?.length || 0).map((pageNumber) => (
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
                Math.min(currentPage + 1, totalPages(vacancy?.length || 0))
              )
            }
            disabled={currentPage === totalPages(vacancy?.length || 0)}
            className="px-4 py-2 bg-sky-500 text-white rounded disabled:bg-gray-300"
          >
            <FaArrowRight />
          </button>
        </div>
      </section>
    </main>
  );
};

export default BeHumanitarianWorker;
