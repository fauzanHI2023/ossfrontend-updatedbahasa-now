"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export const usePagination = (itemsPerPage: number, maxVisiblePages: number = 6) => {
  const router = useRouter();
  const [currentPage, setCurrentPageState] = useState<number>(1);

  const paginate = (data: any[]) => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    return data.slice(indexOfFirstItem, indexOfLastItem);
  };

  const totalPages = (totalItems: number) => {
    return Math.ceil(totalItems / itemsPerPage);
  };

  const setCurrentPage = (page: number) => {
    setCurrentPageState(page);
    router.push(`?page=${page}`);
  };

  const getVisiblePageNumbers = (total: number) => {
    const totalPagesCount = totalPages(total);
    const startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    const endPage = Math.min(totalPagesCount, startPage + maxVisiblePages - 1);

    return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const page = parseInt(params.get("page") || "1", 10);
    setCurrentPageState(page);
  }, []);

  return { currentPage, setCurrentPage, paginate, totalPages, getVisiblePageNumbers };
};
