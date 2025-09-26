"use client";

import type { TwitterPost } from "@/domain/twitter.domain";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useMediaQuery } from "@/hooks/use-media-query";
import { ChevronLeft, CheckIcon } from "lucide-react";
import { cn } from "@/lib/utils";
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
  isTweetReady: boolean;
  tweets?: TwitterPost[];
  unselectTweet: () => void;
  selectedTweet: string | null;
}
function generateQuoteTweetUrl(tweetUrl: string, text: string): string {
  const encodedText = encodeURIComponent(text);
  return `https://twitter.com/intent/tweet?url=${encodeURIComponent(tweetUrl)}&text=${encodedText}`;
}

export const QuoteRecommend = ({
  onOpenChange,
  isQuoteViewOpen,
  isTweetReady,
  tweets,
  unselectTweet,
  selectedTweet,
}: Props) => {
  const [isQuoteGenerating, setIsQuoteGenerating] = useState<boolean>(false);
  const [quote, setQuote] = useState<string>("");
  const [copied, setCopied] = useState<boolean>(false);

  const isDesktop = useMediaQuery("(min-width: 768px)");

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(quote);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
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

  useEffect(() => {
    if (selectedTweet) {
      const post = tweets?.find((tweet) => tweet.tweetId === selectedTweet);
      if (post) {
        setIsQuoteGenerating(true);
        setQuote(post?.recommendedText);
      }
    } else if (quote) {
      setQuote("");
    }
  }, [selectedTweet]);

  useEffect(() => {
    if (isQuoteGenerating) {
      setTimeout(() => setIsQuoteGenerating(false), 3000);
    }
  }, [isQuoteGenerating]);

  if (isDesktop) {
    if (isQuoteGenerating) {
      return (
        <div className="flex size-full px-4 py-6">
          <div className="flex w-full flex-col items-center justify-center gap-6">
            <div className="w-8/12 bg-background px-4 py-6">
              <IconCloudLoader iconSlugs={slugs} />
            </div>
          </div>
        </div>
      );
    }

    if (!isTweetReady || selectedTweet === null) {
      return (
        <div className="hidden desktop:flex desktop:size-full desktop:px-4 desktop:py-6">
          <div className="flex w-full flex-col items-center justify-center gap-6">
            <div className="bg-primary/10">
              <Image
                src="/logo/celebrity_silhouette.png"
                alt="logo"
                width={80}
                height={80}
              />
            </div>
            <div className="flex flex-col items-center justify-center gap-2">
              <p className="text-2xl font-semibold text-foreground">
                Quoting celebrity tweets
              </p>
              <p className="text-center text-sm text-muted-foreground">
                Please select and click on the feed you want to quote from the
                feed list. AI agent will generate the optimal quote that fits
                the feed.
              </p>
            </div>
            <div className="desktop:hidden">
              <Button>View The Feed List</Button>
            </div>
          </div>
        </div>
      );
    }

    if (!!selectedTweet && !!quote) {
      const tweetPost = tweets?.find(
        (tweet) => tweet.tweetId === selectedTweet,
      );
      return (
        <div className="flex size-full translate-y-[10px] animate-fadeMoveUp flex-col gap-4 px-4 py-6 opacity-0">
          <div className="flex items-center gap-2 desktop:hidden">
            <ChevronLeft
              className="size-6 cursor-pointer"
              onClick={() => {
                onOpenChange(false);
                unselectTweet();
              }}
            />
            <p className="text-sm font-medium text-foreground">
              View the feed list
            </p>
          </div>
          <div className="flex w-full flex-col gap-2">
            <p className="text-xl font-semibold">{`AI Agent's Proposal`}</p>
            {quote && (
              // <Textarea
              //   className="min-h-[320px]"
              //   value={quote}
              //   onChange={(event) => setQuote(event.target.value)}
              // />
              <Typewriter text={quote} onTextChange={modifyRecommendation} />
            )}
          </div>
          <div className="flex items-center gap-4">
            <Button
              className="w-[120px]"
              onClick={() => {
                if (tweetPost) makeQuoteIntentAndDirect(tweetPost);
              }}
            >
              Quote on X
            </Button>

            <Button
              variant="outline"
              size="icon"
              className="w-[120px]"
              onClick={handleCopy}
              aria-label={copied ? "Copied" : "Copy to clipboard"}
              disabled={copied}
            >
              <div
                className={cn(
                  "transition-all",
                  copied ? "scale-100 opacity-100" : "scale-0 opacity-0",
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
                  copied ? "scale-0 opacity-0" : "scale-100 opacity-100",
                )}
              >
                Copy
              </div>
            </Button>
          </div>
        </div>
      );
    }
  } else if (!isDesktop && !!isQuoteViewOpen) {
    const tweetPost = tweets?.find((tweet) => tweet.tweetId === selectedTweet);
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
            <div className="flex size-full translate-y-[10px] animate-fadeMoveUp flex-col gap-4 overflow-y-scroll px-4 py-6 opacity-0">
              <div className="flex items-center gap-2 desktop:hidden">
                <ChevronLeft
                  className="size-6 cursor-pointer"
                  onClick={() => {
                    onOpenChange(false);
                    unselectTweet();
                  }}
                />
                <p className="text-sm font-medium text-foreground">
                  View the feed list
                </p>
              </div>
              <div className="flex w-full flex-col gap-2">
                <p className="text-xl font-semibold">{`AI Agent's Proposal`}</p>
                {/* <Textarea
                  className="min-h-[320px]"
                  value={tweetPost?.recommendedText}
                  readOnly */}
                <Typewriter
                  text={tweetPost?.recommendedText ?? ""}
                  onTextChange={modifyRecommendation}
                />
                {/* /> */}
              </div>
              <div className="flex items-center gap-4">
                <Button
                  className="w-[120px]"
                  onClick={() => {
                    if (tweetPost) makeQuoteIntentAndDirect(tweetPost);
                  }}
                >
                  Quote on X
                </Button>

                <Button
                  variant="outline"
                  size="icon"
                  className="w-[120px]"
                  onClick={handleCopy}
                  aria-label={copied ? "Copied" : "Copy to clipboard"}
                  disabled={copied}
                >
                  <div
                    className={cn(
                      "transition-all",
                      copied ? "scale-100 opacity-100" : "scale-0 opacity-0",
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
                      copied ? "scale-0 opacity-0" : "scale-100 opacity-100",
                    )}
                  >
                    {/* <CopyIcon size={16} aria-hidden="true" /> */}
                    Copy
                  </div>
                </Button>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>
    );
  }
};
