"use client";
import React, { useState, useEffect } from "react";
import BannerPublikasi from "@/components/ui/banner/BannerPublikasi";
import { fetchPetition } from "@/lib/publication/auth-petition";
import axios from "axios";
import Image from "next/image";
import { usePagination } from "@/hooks/usePagination";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { FileDown } from "lucide-react";

interface Petition {
  id: number;
  title: string;
  img: string;
  description: string;
  created_at: string;
  imgUrl?: string;
}

const Petition = () => {
  const [petitions, setPetitions] = useState<Petition[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const itemsPerPage = 9;
  const maxVisiblePages = 5;
  const { currentPage, setCurrentPage, paginate, totalPages, getVisiblePageNumbers } =
    usePagination(itemsPerPage, maxVisiblePages);

  useEffect(() => {
    const getPetitions = async () => {
      const data = await fetchPetition();
      if (data && data.status === "200") {
        const updatedReports = await Promise.all(
          data.data.map(async (petition: Petition) => {
            try {
              const imgResponse = await axios.get(
                `/api/getImage?key=${petition.img}`
              );

              return {
                ...petition,
                imgUrl: imgResponse.data.url,
              };
            } catch (error) {
              console.error(
                `Error fetching URLs for petition ${petition.id}:`,
                error
              );
              return petition;
            }
          })
        );
        setPetitions(updatedReports);
      }
      setLoading(false);
    };
    getPetitions();
  }, []);

  const homePageImages = [
    "/petition (1).png",
    "/petition (2).png",
    "/petition (3).png",
    "/petition (4).png",
  ]; // Daftar gambar untuk halaman beranda

  const generatePageNumbers = () => {
    const pages = [];
    for (let i = 1; i <= totalPages(petitions?.length || 0); i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <main className="flex flex-col items-center justify-center sm:pt-28 pt-12 px-6">
      <BannerPublikasi images={homePageImages} title="Petition" hashtag="Kolaborasi, Amanah" />
      <section className="w-full relative flex flex-col gap-y-8 sm:px-28 px-6 sm:py-28 py-10">
        <h5 className="title-2xl-semibold-black dark:text-white">Petition</h5>
        <div className="sm:grid sm:grid-cols-3 sm:gap-8 flex flex-col gap-y-6">
          {loading ? (
            <p>Loading...</p>
          ) : petitions && petitions.length > 0 ? (
            paginate(petitions).map((petition) => (
              <div
                key={petition.id}
                className="publikasi-card mb-4 border-b pb-4 w-full flex flex-col-reverse gap-x-3 justify-between bg-gray-50 dark:bg-slate-900 transition duration-500 ease-in hover:bg-gray-100"
              >
                <div className="flex flex-col justify-between items-start px-6 py-4">
                  <h2 className="capitalize text-base font-medium text-slate-950 dark:text-white leading-6 h-[60px] overflow-hidden">
                    {petition.title}
                  </h2>
                </div>
                {petition.imgUrl ? (
                  <span className="w-full h-[300px] overflow-hidden relative">
                    <Image
                      src={petition.imgUrl}
                      alt={petition.title}
                      width={500}
                      height={500}
                      className="w-full h-full object-img float-none absolute"
                    />
                  </span>
                ) : (
                  <p>No img image available.</p>
                )}
              </div>
            ))
          ) : (
            <p>No petitions available.</p>
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
            {getVisiblePageNumbers(petitions?.length || 0).map((pageNumber) => (
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
                Math.min(currentPage + 1, totalPages(petitions?.length || 0))
              )
            }
            disabled={currentPage === totalPages(petitions?.length || 0)}
            className="px-4 py-2 bg-sky-500 text-white rounded disabled:bg-gray-300"
          >
            <FaArrowRight />
          </button>
        </div>
      </section>
    </main>
  );
};

export default Petition;
