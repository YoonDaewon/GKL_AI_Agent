"use client";

import { LeftPane } from "@/components/layout/left-pane";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useMediaQuery } from "@/hooks/use-media-query";
import { useGetMediumPosts } from "@/adaptor/query/medium/useGetPosts";
import { MediumSkeleton } from "@/components/skeleton/medium-skeleton";
import { MediumPostCard } from "@/components/posts/medium-post-card";
import { RightPane } from "./right-pane";
import { StoryRecommend } from "../quote/story-recommend";

export const MediumPageLayout = () => {
  const [isQuoteViewOpen, setIsQuoteViewOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState<number | null>(null);

  const isDesktop = useMediaQuery("(min-width: 768px)");

  const {
    mediumPosts,
    queryStatus: { isLoading, status },
  } = useGetMediumPosts();

  const selectPost = (id: number) => {
    if (id !== selectedPost) setSelectedPost(id);
    if (!isDesktop) {
      if (!isQuoteViewOpen) setIsQuoteViewOpen(true);
    }
  };

  const unselectPost = () => {
    setSelectedPost(null);
  };

  const changeMobileQuoteView = (status: boolean) => {
    if (status !== isQuoteViewOpen) setIsQuoteViewOpen(status);
  };

  useEffect(() => {
    if (!isDesktop && !!selectedPost && !isQuoteViewOpen) {
      setIsQuoteViewOpen(true);
    }

    if (!!isDesktop && !!selectedPost && !!isQuoteViewOpen) {
      setIsQuoteViewOpen(false);
    }
  }, [isDesktop, selectedPost, isQuoteViewOpen]);

  return (
    <div className="flex h-full divide-x divide-border">
      <div className="flex w-full desktop:h-full desktop:w-[2vw] desktop:min-w-[332px] desktop:max-w-[550px] desktop:grow">
        <LeftPane>
          <div className="flex justify-between">
            <div>
              <Image
                src="/logo/medium_logo.png"
                alt="logo"
                width={90}
                height={20}
              />
            </div>
          </div>
          <div className="flex flex-col gap-3">
            {isLoading ? (
              <>
                <MediumSkeleton />
                <MediumSkeleton />
                <MediumSkeleton />
                <MediumSkeleton />
                <MediumSkeleton />
              </>
            ) : (
              mediumPosts?.map((post) => {
                const shouldOutFocus =
                  selectedPost !== null && selectedPost !== post.id;
                return (
                  <MediumPostCard
                    key={post.id}
                    id={post.id}
                    post={post}
                    shouldOutFocus={shouldOutFocus}
                    onPostClick={selectPost}
                  />
                );
              })
            )}
          </div>
        </LeftPane>
      </div>
      {isDesktop ? (
        <RightPane>
          <StoryRecommend
            onOpenChange={changeMobileQuoteView}
            posts={mediumPosts}
            isQuoteViewOpen={isQuoteViewOpen}
            unselectPost={unselectPost}
            selectedPost={selectedPost}
          />
        </RightPane>
      ) : (
        <div className="flex desktop:hidden">
          <StoryRecommend
            onOpenChange={changeMobileQuoteView}
            posts={mediumPosts}
            isQuoteViewOpen={isQuoteViewOpen}
            unselectPost={unselectPost}
            selectedPost={selectedPost}
          />
        </div>
      )}
    </div>
  );
};
