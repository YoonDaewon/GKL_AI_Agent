"use client";

import { LeftPane } from "@/components/layout/left-pane";
import { RightPane } from "@/components/layout/right-pane";
import Image from "next/image";
import { useGetTweets } from "@/adaptor/query/tweet/useGetTweets";
import { useEffect, useMemo, useState } from "react";
import { useMediaQuery } from "@/hooks/use-media-query";
import { TweetSkeleton } from "@/components/skeleton/tweet-skeleton";
import { TweetPost } from "@/components/posts/tweet-post";
import { QuoteRecommend } from "@/components/quote/quote-recommend";
import { CalendarIcon, ChevronDown, SearchSlashIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { subDays } from "date-fns";
import { TwitterPost } from "@/domain/twitter.domain";
import { usePagination } from "@/hooks/usePagination";
import { toGMTMidnight } from "@/lib/utils/date";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";

const defaultLimit = 5;
const timeZone = "UTC";

export function getDayBefore(now: Date, amount: number): Date {
  // For all other days, get previous day in UTC
  const todayAtExact = new Date(
    // Date.UTC(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    0, // hours
    0, // minutes
    0, // seconds
    0, // milliseconds
    // ),
  );

  const dayBeforeInGMT = subDays(todayAtExact, amount);

  return dayBeforeInGMT;
}

export function dateToUnixTimestamp(date: Date): number {
  // return date.getTime();

  return Math.floor(date.getTime() / 1000);
}

const defaultDate = getDayBefore(new Date(), 1);
export const TweetPageLayout = () => {
  const [data, setData] = useState<TwitterPost[]>([]);
  // const [searchDate, setSearchDate] = useState<Date>(defaultDate);
  const [searchDate, setSearchDate] = useState<Date | undefined>();

  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const [isQuoteViewOpen, setIsQuoteViewOpen] = useState(false);
  const [selectedTweet, setSelectedTweet] = useState<string | null>(null);
  const [isTweetReady, setIsTweetReady] = useState(false);

  const isDesktop = useMediaQuery("(min-width: 768px)");

  const selectedDate = useMemo(() => {
    if (!searchDate) return undefined;
    return dateToUnixTimestamp(toGMTMidnight(searchDate));
  }, [searchDate]);

  const {
    tweets,
    queryStatus: { isFetching, status },
  } = useGetTweets({ date: selectedDate, page: 1 });

  const { currentPage, loadMore, canNextPage, reset } =
    usePagination<TwitterPost>(1, defaultLimit, tweets);

  const selectTweet = (id: string) => {
    if (id !== selectedTweet) setSelectedTweet(id);
    if (!isDesktop) {
      if (!isQuoteViewOpen) setIsQuoteViewOpen(true);
    }
  };

  const unselectTweet = () => {
    setSelectedTweet(null);
  };

  const changeMobileQuoteView = (status: boolean) => {
    if (status !== isQuoteViewOpen) setIsQuoteViewOpen(status);
  };

  const markTweeetWidgetReady = (id: string) => {
    setIsTweetReady(true);
  };

  const selectDate = (date: Date) => {
    setSearchDate(date);
    setIsCalendarOpen(false);
    unselectTweet();
    reset();
    setIsTweetReady(false);
    setData([]);
  };

  const resetQuoteLogic = () => {
    unselectTweet();
    setIsTweetReady(false);
  };

  const laodMoreTweets = () => {
    resetQuoteLogic();
    loadMore();
    const container = document.getElementById("left-pane");
    if (container) {
      setTimeout(() => {
        container.scrollTo({
          top: container.scrollHeight,
          behavior: "smooth",
        });
      }, 1000);
    }
  };

  useEffect(() => {
    if (!isDesktop && !!selectedTweet && !isQuoteViewOpen) {
      setIsQuoteViewOpen(true);
    }

    if (!!isDesktop && !!selectedTweet && !!isQuoteViewOpen) {
      setIsQuoteViewOpen(false);
    }
  }, [isDesktop, selectedTweet, isQuoteViewOpen]);

  useEffect(() => {
    if (tweets) {
      const start = (currentPage - 1) * defaultLimit;
      const end = defaultLimit * currentPage;
      const tweetPosts = tweets?.slice(start, end) || [];

      setData([...data, ...tweetPosts]);
    }
  }, [tweets, currentPage]);

  return (
    <div className="flex h-full divide-x divide-border">
      <div className="flex w-full desktop:h-full desktop:w-[2vw] desktop:min-w-[332px] desktop:max-w-[550px] desktop:grow">
        <LeftPane>
          <div className="flex w-full justify-between">
            <div className="flex w-full items-center justify-between">
              <Image
                src="/logo/twitter_logo.png"
                alt="logo"
                width={32}
                height={32}
              />
              <div>
                <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      id="calendar"
                      variant="outline"
                      className={cn(
                        "group w-full justify-between border-input bg-background !p-2 font-normal outline-none outline-offset-0 hover:bg-background focus-visible:outline-[3px]",
                        !searchDate && "text-muted-foreground",
                      )}
                    >
                      <CalendarIcon
                        size={16}
                        className="shrink-0 text-muted-foreground/80 transition-colors group-hover:text-foreground"
                        aria-hidden="true"
                      />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-2" align="start">
                    <Calendar
                      mode="single"
                      disabled={(date) => {
                        return date > new Date();
                      }}
                      selected={searchDate}
                      onSelect={(date) => {
                        if (date) {
                          selectDate(date);
                        }
                      }}
                      // timeZone="UTC"
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            {isFetching ? (
              <>
                <TweetSkeleton />
                <TweetSkeleton />
                <TweetSkeleton />
                <TweetSkeleton />
                <TweetSkeleton />
              </>
            ) : data?.length === 0 ? (
              <div
                className={cn(
                  "flex flex-col items-center justify-center gap-4 px-4 py-12",
                )}
              >
                <div className="absolute bg-primary/10">
                  <Image
                    src="/logo/celebrity_silhouette.png"
                    alt="logo"
                    width={80}
                    height={80}
                    className="opacity-10"
                  />
                  <SearchSlashIcon className="absolute left-0 top-0 size-20 animate-smooth-move-shake" />
                </div>
                <div className="relative top-[88px] flex flex-col items-center justify-center gap-2">
                  <p className="text-2xl font-semibold text-foreground">
                    No tweets found
                  </p>
                  <p className="whitespace-pre-line text-center text-sm text-muted-foreground">
                    We couldn't find what you searched for. Try searching again
                    with different date
                  </p>
                </div>
              </div>
            ) : (
              data?.map((tweet, index, array) => {
                const shouldOutFocus =
                  selectedTweet !== null && selectedTweet !== tweet.tweetId;
                const lastTweet = data[array.length - 1];
                return (
                  <TweetPost
                    key={tweet.tweetId}
                    id={tweet.tweetId}
                    tweet={tweet}
                    shouldOutFocus={shouldOutFocus}
                    onPostClick={selectTweet}
                    onTweetReady={markTweeetWidgetReady}
                    isTweetReady={isTweetReady}
                    lastTweetId={lastTweet.tweetId}
                  />
                );
              })
            )}
          </div>
          {data?.length > 0 && canNextPage && isTweetReady && (
            <Button
              onClick={laodMoreTweets}
              className="w-full py-[10px]"
              variant="ghost"
            >
              <div className="flex items-center gap-2">
                <ChevronDown size={16} />
                <p>See more</p>
              </div>
            </Button>
          )}
        </LeftPane>
      </div>
      <RightPane>
        <QuoteRecommend
          onOpenChange={changeMobileQuoteView}
          isTweetReady={isTweetReady}
          tweets={tweets}
          isQuoteViewOpen={isQuoteViewOpen}
          unselectTweet={unselectTweet}
          selectedTweet={selectedTweet}
        />
      </RightPane>
      <div className="flex desktop:hidden">
        <QuoteRecommend
          onOpenChange={changeMobileQuoteView}
          isTweetReady={isTweetReady}
          tweets={tweets}
          isQuoteViewOpen={isQuoteViewOpen}
          unselectTweet={unselectTweet}
          selectedTweet={selectedTweet}
        />
      </div>
    </div>
  );
};
