"use client";

import { InfiniteData, UseInfiniteQueryResult } from "@tanstack/react-query";
import { useEffect, useRef } from "react";

import { ApiResponse } from "@/types";

function useInfiniteScroll(
  query: UseInfiniteQueryResult<InfiniteData<ApiResponse>>
) {
  const loadMoreRef = useRef<HTMLDivElement | null>(null);
  const { hasNextPage, fetchNextPage } = query;

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 1.0 }
    );

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => {
      if (loadMoreRef.current) {
        observer.unobserve(loadMoreRef.current);
      }
    };
  }, [hasNextPage, fetchNextPage]);

  return loadMoreRef;
}

export default useInfiniteScroll;
