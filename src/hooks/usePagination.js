import { useState, useMemo } from 'react';
import { ITEMS_PER_PAGE } from '../utils/constants';

export const usePagination = (items = [], itemsPerPage = ITEMS_PER_PAGE) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.max(1, Math.ceil(items.length / itemsPerPage));

  const paginatedItems = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return items.slice(start, start + itemsPerPage);
  }, [items, currentPage, itemsPerPage]);

  const goToPage = (page) => {
    const pageNum = Math.max(1, Math.min(page, totalPages));
    setCurrentPage(pageNum);
  };

  const resetPage = () => setCurrentPage(1);

  return {
    currentPage,
    totalPages,
    paginatedItems,
    goToPage,
    resetPage,
    totalItems: items.length,
    itemsPerPage,
  };
};

export default usePagination;
