"use client";

import type { TwitterPost } from "@/domain/twitter.domain";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useMediaQuery } from "@/hooks/use-media-query";
import { ChevronLeft, CheckIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import type { MediumPost } from "@/domain/medium.domain";
import { useGenerateSocialContents } from "@/adaptor/mutation/medium/useGenerateSocialContents";
import { IconCloudLoader } from "@/components/loader/icon-cloud-loader";
import { Typewriter } from "@/components/typewriter/typewriter";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

const slugs = [
  "twitter",
  "telegram",
  "medium",
  "discord",
  "twitch",
  "tiktok",
  "instagram",
  "youtube",
  "facebook",
  "linkedin",
  "snapchat",
  "reddit",
  "kakao",
  "line",
  "farcaster",
];
interface Props {
  onOpenChange: (status: boolean) => void;
  isQuoteViewOpen: boolean;
  posts?: MediumPost[];
  unselectPost: () => void;
  selectedPost: number | null;
}
function generateQuoteTweetUrl(tweetUrl: string, text: string): string {
  const encodedText = encodeURIComponent(text);
  return `https://twitter.com/intent/tweet?url=${encodeURIComponent(tweetUrl)}&text=${encodedText}`;
}

export const StoryRecommend = ({
  onOpenChange,
  isQuoteViewOpen,
  posts,
  unselectPost,
  selectedPost,
}: Props) => {
  const [isQuoteGenerating, setIsQuoteGenerating] = useState<boolean>(false);
  const [quote, setQuote] = useState<string>("");
  const [hasTweetCopied, setHasTweetCopied] = useState<boolean>(false);
  const [hasTelegramCopied, setHasTelegramCopied] = useState<boolean>(false);

  const {
    generateSocialContent,
    generateSocialContentAsync,
    generateSocialContentStatus: { data, isPending, status, error },
  } = useGenerateSocialContents();

  const isDesktop = useMediaQuery("(min-width: 768px)");

  const handleCopyTweetStory = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setHasTweetCopied(true);
      setTimeout(() => setHasTweetCopied(false), 1500);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  const handleCopyTelegramStory = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setHasTelegramCopied(true);
      setTimeout(() => setHasTelegramCopied(false), 1500);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  const makeQuoteIntentAndDirect = (tweet: TwitterPost) => {
    const url = generateQuoteTweetUrl(tweet.url, quote);
    window.open(url, "_blank");
  };

  const modifyRecommendation = (text: string) => {
    setQuote(text);
  };

  const requestSocialContents = async (id: number) => {
    try {
      await generateSocialContentAsync({
        twitter: {
          mediumPostId: id,
          tweetStyleUsername: "henrychang10000",
        },
        telegram: {
          mediumPostId: id,
          telegramStyleUsername: "cross_protocol",
        },
      });
    } catch (e) {
    } finally {
      setIsQuoteGenerating(false);
    }
  };

  useEffect(() => {
    if (selectedPost) {
      const post = posts?.find((post) => post.id === selectedPost);

      if (post) {
        setIsQuoteGenerating(true);

        requestSocialContents(post.id);
      }
    } else if (quote) {
      setQuote("");
    }
  }, [selectedPost]);

  if (isDesktop) {
    if (isQuoteGenerating) {
      return (
        <div className="flex size-full px-4 py-6">
          <div className="flex w-full flex-col items-center justify-center">
            <div className="w-8/12 bg-background px-4 py-6">
              <IconCloudLoader iconSlugs={slugs} />
            </div>
          </div>
        </div>
      );
    }

    if (selectedPost === null) {
      return (
        <div className="hidden desktop:flex desktop:size-full desktop:px-4 desktop:py-6">
          <div className="flex w-full flex-col items-center justify-center gap-6">
            <div className="bg-primary/10">
              <Image
                src="/logo/medium_logo_2.png"
                alt="logo"
                width={80}
                height={80}
              />
            </div>
            <div className="flex flex-col items-center justify-center gap-2">
              <p className="text-2xl font-semibold text-foreground">
                Summarize Medium
              </p>
              <p className="text-center text-sm text-muted-foreground">
                Please select a story from the list and click on it to
                summarize. AI agent will generate a suitable summary.
              </p>
            </div>
            <div className="desktop:hidden">
              <Button>View The Feed List</Button>
            </div>
          </div>
        </div>
      );
    }

    if (selectedPost) {
      return (
        <div className="flex size-full translate-y-[10px] animate-fadeMoveUp flex-col gap-4 overflow-y-scroll px-4 py-6 opacity-0">
          <div className="flex items-center gap-2 desktop:hidden">
            <ChevronLeft
              className="size-6 cursor-pointer"
              onClick={() => {
                onOpenChange(false);
                unselectPost();
              }}
            />
            <p className="text-sm font-medium text-foreground">
              View the feed list
            </p>
          </div>
          <div className="flex w-full pt-4">
            <p className="text-xl font-semibold">{`AI Agent's Proposal`}</p>
          </div>
          <div className="flex w-full flex-col gap-10 pt-6">
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <Image
                  src="/logo/twitter_logo.png"
                  alt="logo"
                  width={32}
                  height={32}
                />
                <p className="text-base font-bold leading-5 text-foreground">
                  X(Twitter)
                </p>
              </div>
              {data?.twitter && (
                <Typewriter
                  text={data?.twitter.content}
                  onTextChange={modifyRecommendation}
                />
              )}
              {error && <p className="text-red-500">{error.message}</p>}
              <Button
                size="icon"
                className="w-[120px]"
                onClick={() =>
                  data?.twitter.content &&
                  handleCopyTweetStory(data?.twitter.content)
                }
                aria-label={hasTweetCopied ? "Copied" : "Copy to clipboard"}
                disabled={!!error}
              >
                <div
                  className={cn(
                    "transition-all",
                    hasTweetCopied
                      ? "scale-100 opacity-100"
                      : "scale-0 opacity-0",
                  )}
                >
                  <CheckIcon
                    className="stroke-blue-500"
                    size={16}
                    aria-hidden="true"
                  />
                </div>
                <div
                  className={cn(
                    "absolute transition-all",
                    hasTweetCopied
                      ? "scale-0 opacity-0"
                      : "scale-100 opacity-100",
                  )}
                >
                  Copy
                </div>
              </Button>
            </div>
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <Image
                  src="/logo/telegram_logo.png"
                  alt="logo"
                  width={32}
                  height={32}
                />
                <p className="text-base font-bold leading-5 text-foreground">
                  Telegram
                </p>
              </div>
              {data?.telegram && (
                <Typewriter
                  text={data?.telegram.content}
                  onTextChange={modifyRecommendation}
                />
              )}
              {error && <p className="text-red-500">{error.message}</p>}
              <Button
                size="icon"
                className="w-[120px]"
                onClick={() =>
                  data?.telegram.content &&
                  handleCopyTelegramStory(data?.telegram.content)
                }
                aria-label={hasTelegramCopied ? "Copied" : "Copy to clipboard"}
                disabled={!!error}
              >
                <div
                  className={cn(
                    "transition-all",
                    hasTelegramCopied
                      ? "scale-100 opacity-100"
                      : "scale-0 opacity-0",
                  )}
                >
                  <CheckIcon
                    className="stroke-blue-500"
                    size={16}
                    aria-hidden="true"
                  />
                </div>
                <div
                  className={cn(
                    "absolute transition-all",
                    hasTelegramCopied
                      ? "scale-0 opacity-0"
                      : "scale-100 opacity-100",
                  )}
                >
                  Copy
                </div>
              </Button>
            </div>
          </div>
        </div>
      );
    }
  } else if (!isDesktop && !!isQuoteViewOpen) {
    return (
      <Sheet open={isQuoteViewOpen} onOpenChange={onOpenChange}>
        <SheetContent side="left" className="h-svh w-screen !p-0">
          <SheetHeader className="hidden">
            <SheetTitle className="hidden">mobile view</SheetTitle>
          </SheetHeader>

          {isQuoteGenerating ? (
            <div className="flex size-full flex-col items-center justify-center gap-6 !px-4 !py-6">
              <div className="w-8/12 bg-background">
                <IconCloudLoader iconSlugs={slugs} />
              </div>
            </div>
          ) : (
            <div className="flex size-full h-full flex-col overflow-y-scroll !px-4 !py-6">
              <div className="flex items-center gap-2 desktop:hidden">
                <ChevronLeft
                  className="size-6 cursor-pointer"
                  onClick={() => {
                    onOpenChange(false);
                    unselectPost();
                  }}
                />
                <p className="text-sm font-medium text-foreground">
                  View the feed list
                </p>
              </div>
              <div className="flex w-full pt-4">
                <p className="text-xl font-semibold">{`AI Agent's Proposal`}</p>
              </div>
              <div className="flex w-full flex-col gap-10 pt-6">
                <div className="flex translate-y-[10px] animate-fadeMoveUp flex-col gap-4 opacity-0">
                  <div className="flex items-center gap-2">
                    <Image
                      src="/logo/twitter_logo.png"
                      alt="logo"
                      width={32}
                      height={32}
                    />
                    <p className="text-base font-bold leading-5 text-foreground">
                      X(Twitter)
                    </p>
                  </div>
                  {data?.twitter && (
                    <Typewriter
                      text={data?.twitter.content}
                      onTextChange={modifyRecommendation}
                    />
                  )}
                  {error && <p className="text-red-500">{error.message}</p>}
                  <Button
                    size="icon"
                    className="w-[120px]"
                    onClick={() =>
                      data?.twitter.content &&
                      handleCopyTweetStory(data?.twitter.content)
                    }
                    aria-label={hasTweetCopied ? "Copied" : "Copy to clipboard"}
                    disabled={!!error}
                  >
                    <div
                      className={cn(
                        "transition-all",
                        hasTweetCopied
                          ? "scale-100 opacity-100"
                          : "scale-0 opacity-0",
                      )}
                    >
                      <CheckIcon
                        className="stroke-blue-500"
                        size={16}
                        aria-hidden="true"
                      />
                    </div>
                    <div
                      className={cn(
                        "absolute transition-all",
                        hasTweetCopied
                          ? "scale-0 opacity-0"
                          : "scale-100 opacity-100",
                      )}
                    >
                      Copy
                    </div>
                  </Button>
                </div>
                <div className="flex translate-y-[10px] animate-fadeMoveUp flex-col gap-4 opacity-0">
                  <div className="flex items-center gap-2">
                    <Image
                      src="/logo/telegram_logo.png"
                      alt="logo"
                      width={32}
                      height={32}
                    />
                    <p className="text-base font-bold leading-5 text-foreground">
                      Telegram
                    </p>
                  </div>
                  {data?.telegram && (
                    <Typewriter
                      text={data?.telegram.content}
                      onTextChange={modifyRecommendation}
                    />
                  )}
                  {error && <p className="text-red-500">{error.message}</p>}
                  <Button
                    size="icon"
                    className="w-[120px]"
                    onClick={() =>
                      data?.telegram.content &&
                      handleCopyTelegramStory(data?.telegram.content)
                    }
                    aria-label={
                      hasTelegramCopied ? "Copied" : "Copy to clipboard"
                    }
                    disabled={!!error}
                  >
                    <div
                      className={cn(
                        "transition-all",
                        hasTelegramCopied
                          ? "scale-100 opacity-100"
                          : "scale-0 opacity-0",
                      )}
                    >
                      <CheckIcon
                        className="stroke-blue-500"
                        size={16}
                        aria-hidden="true"
                      />
                    </div>
                    <div
                      className={cn(
                        "absolute transition-all",
                        hasTelegramCopied
                          ? "scale-0 opacity-0"
                          : "scale-100 opacity-100",
                      )}
                    >
                      Copy
                    </div>
                  </Button>
                </div>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>
    );
  }
};
