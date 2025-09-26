import { useEffect, useMemo, useState } from "react";

export const usePagination = <T>(page = 1, size = 5, data?: T[]) => {
  const [currentPage, setCurrentPage] = useState<number>(page);
  const [pageSize, setPageSize] = useState<number>(size);
  const [totalPages, setTotalPages] = useState<number>(
    Math.ceil(data?.length || 0 / size) || 0,
  );

  const loadMore = () => {
    if (canNextPage) setCurrentPage(currentPage + 1);
  };

  const canNextPage = useMemo(() => {
    if (totalPages === 0) return false;
    return (currentPage - 1) * pageSize + pageSize < totalPages;
  }, [currentPage, pageSize, totalPages]);

  //   const canPreviousPage = useMemo(() => {
  //     if (totalPages === 0) return false;
  //     return currentPage > 1;
  //   }, [currentPage, totalPages]);

  const reset = () => {
    setCurrentPage(page);
    setTotalPages(0);
  };

  useEffect(() => {
    if (data) {
      if (totalPages !== data.length) setTotalPages(data.length);
    } else if (totalPages !== 0) setTotalPages(0);
  }, [data]);

  useEffect(() => {
    if (currentPage !== page) setCurrentPage(page);
  }, [data]);

  //   useEffect(() => {
  //     setPageSize(size);
  //   }, [size]);

  return {
    currentPage,
    totalPages,
    canNextPage,
    // canPreviousPage,
    loadMore,
    reset,
  };
};
