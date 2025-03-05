"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import Image from "next/image";
import { ReactNode } from "react";

import { ArticleApi } from "@/api/article";
import useInfiniteScroll from "@/hooks/use-infinite-scroll";
import { ApiResponse, Article, Pagination } from "@/types";
import { flatInfinityArray } from "@/utils/helpers";

import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { ScrollArea } from "../ui/scroll-area";

interface Props {
  trigger?: ReactNode;
  value?: string[];
  onChange?: (value: string[]) => void;
}

function ArticlePicker({ trigger }: Props) {
  const infinite = useInfiniteQuery({
    queryKey: ["articles-infiniy"],
    queryFn: async ({ pageParam }): Promise<ApiResponse> => {
      try {
        return await ArticleApi.get({
          page: pageParam,
          limit: 50,
        });
      } catch (error) {
        console.error("🚀 ~ queryFn:async ~ error:", error);
        throw new Error("Failed to fetch articles!");
      }
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage: ApiResponse) => {
      const pagination = lastPage.pagination as Pagination;
      return lastPage.pagination
        ? pagination.page < pagination.totalPages
          ? pagination.page + 1
          : undefined
        : undefined;
    },
    getPreviousPageParam: (lastPage: ApiResponse) => {
      const pagination = lastPage.pagination as Pagination;
      return lastPage.pagination
        ? pagination.page > 1
          ? pagination.page - 1
          : undefined
        : undefined;
    },
  });

  const ref = useInfiniteScroll(infinite);
  const data = flatInfinityArray(infinite.data);

  return (
    <Dialog>
      <DialogTrigger asChild>
        {trigger ? (
          trigger
        ) : (
          <Button className="w-full" variant="outline">
            <Plus />
          </Button>
        )}
      </DialogTrigger>
      <DialogContent>
        <ScrollArea className="max-h-[350px]">
          {data.length
            ? data.map((item: Article) => (
                <div key={item._id} className="rounded border p-2">
                  <div className="flex items-center gap-x-2">
                    <Image
                      src={item.thumbnail.url}
                      alt={item.title}
                      className="aspect-video h-20 rounded object-cover object-center"
                    />
                    <div className="space-y-3">
                      <div className="space-y-1">
                        <h3 className="line-clamp-1 font-semibold">
                          {item.title}
                        </h3>
                        <p className="line-clamp-2 text-sm">
                          {item.description}
                        </p>
                      </div>
                      <p className="line-clamp-1 text-sm">
                        {item.author.fullName}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            : null}
          <div ref={ref}></div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}

export default ArticlePicker;
