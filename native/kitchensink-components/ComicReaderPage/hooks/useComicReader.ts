import { useCallback, useEffect, useState } from 'react';
import type { ComicReaderProps } from '../types';

export function useComicReader({
  data,
  initialCurrentPage,
  onPageChange,
}: Pick<
  ComicReaderProps,
  | 'data'
  | 'initialCurrentPage'
  | 'onPageChange'
>) {
  const [currentPage, setCurrentPage] = useState(initialCurrentPage);
  const [isLoading, setIsLoading] = useState(false);

  // 确保页码在有效范围内
  const clampPage = useCallback(
    (page: number) => {
      return Math.max(0, Math.min(page, data.length - 1));
    },
    [data.length]
  );

  // 更新页码
  const updatePage = useCallback(
    (newPage: number) => {
      const clampedPage = clampPage(newPage);
      if (clampedPage !== currentPage) {
        setCurrentPage(clampedPage);
        onPageChange?.(clampedPage);
      }
    },
    [currentPage, clampPage, onPageChange]
  );

  // 跳转到指定页
  const goToPage = useCallback(
    (page: number) => {
      updatePage(page);
    },
    [updatePage]
  );



  // 当 initialCurrentPage 变化时更新页码
  useEffect(() => {
    updatePage(initialCurrentPage);
  }, [initialCurrentPage]);

  return {
    currentPage,
    totalPages: data.length,
    isLoading,
    setIsLoading,
    goToPage,
    updatePage,
  };
}
