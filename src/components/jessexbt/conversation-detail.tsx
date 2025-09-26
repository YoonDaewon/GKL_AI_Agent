"use client";

import { Conversation } from "@/domain/jessexbt.domain";
import Image from "next/image";

import { ChevronLeft, Loader2 } from "lucide-react";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useMediaQuery } from "@/hooks/use-media-query";
import { useGetConversation } from "@/adaptor/query/xbt/useGetConversation";
import { formatDateToLocalTime } from "@/lib/date";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";

interface Props {
  conversation: Conversation | undefined;
  onOpenChange: (status: boolean) => void;
  isQuoteViewOpen: boolean;
  unselectConversation: () => void;
  selectedConversationId: string | null;
}

export const ConversationDetail = ({
  conversation,
  onOpenChange,
  isQuoteViewOpen,
  unselectConversation,
  selectedConversationId,
}: Props) => {
  const [isQuerying, setIsQuerying] = useState<boolean>(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const {
    conversation: conversationDetail,
    fetchConversation,
    queryStatus: { isLoading, isError },
  } = useGetConversation({
    username: "jessepollak",
    targetUsername: conversation?.targetUsername,
    conversationId: selectedConversationId,
  });

  const requestConversationDetail = async () => {
    try {
      setIsQuerying(true);
      await fetchConversation();
      setIsQuerying(false);
    } catch (e) {
    } finally {
      setIsQuerying(false);
    }
  };

  useEffect(() => {
    if (selectedConversationId) {
      setIsQuerying(true);

      requestConversationDetail();
    }
  }, [selectedConversationId]);

  if (isDesktop) {
    if (isQuerying) {
      return (
        <div className="flex size-full items-center justify-center">
          <Loader2 className="size-6 animate-spin" />
        </div>
      );
    }
    if (selectedConversationId == null) {
      return (
        <div className="hidden desktop:flex desktop:size-full desktop:px-4 desktop:py-6">
          <div className="flex w-full flex-col items-center justify-center gap-6">
            <div className="bg-primary/10">
              <Image
                src="/logo/jesse_profile.png"
                alt="logo"
                width={80}
                height={80}
              />
            </div>
            <div className="flex flex-col items-center justify-center">
              <p className="whitespace-pre text-2xl font-semibold text-foreground">
                Conversation by @jessepollak
              </p>
              <p className="text-center text-sm text-muted-foreground">
                (Currently, it's a list of conversations between builders and
                @jessepollk, however, it will be updated to a list of
                conversations between builders and Agent Jesse)
              </p>
              <p className="mt-2 text-center text-sm text-muted-foreground">
                Please select a conversation from the list and click on it to
                see details.
              </p>
            </div>
            <div className="desktop:hidden">
              <Button>View The Conversation List</Button>
            </div>
          </div>
        </div>
      );
    }

    if (conversation && conversationDetail) {
      const tweetConversations = conversationDetail.conversationTweets;

      return (
        <div className="flex size-full translate-y-[10px] animate-fadeMoveUp flex-col gap-4 overflow-y-scroll px-4 py-6 opacity-0">
          <div className="flex items-center gap-2 desktop:hidden">
            <ChevronLeft
              className="size-6 cursor-pointer"
              onClick={() => {
                onOpenChange(false);
                unselectConversation();
              }}
            />
            <p className="text-sm font-medium text-foreground">View the list</p>
          </div>
          <div className="flex w-full pt-4">
            <p className="text-xl font-semibold">Conversation Detail</p>
          </div>
          <div className="flex w-full flex-col gap-10 rounded-md border border-border shadow-xl">
            {conversationDetail.titleTweet &&
              conversationDetail.conversationTweets && (
                <div
                  className="flex cursor-pointer flex-col gap-4"
                  onClick={() =>
                    window.open(
                      `https://x.com/${conversationDetail.titleTweet.authorUsername}/status/${conversationDetail.titleTweet.tweetId}`,
                      "_blank",
                      "noopener,noreferrer",
                    )
                  }
                >
                  <div>
                    <div>
                      <div className="flex flex-col gap-2 p-3">
                        <div className="flex flex-col">
                          <p className="font-semibold opacity-60">
                            {conversationDetail?.titleTweet?.authorUsername}
                          </p>
                        </div>
                        <div>
                          <p className="whitespace-pre-wrap text-base font-semibold">
                            {conversationDetail?.titleTweet?.content}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-[#71767B]">
                            {formatDateToLocalTime(
                              conversationDetail?.titleTweet?.createdAt,
                            )}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col gap-6 border-t border-border px-2 py-3">
                      {tweetConversations?.map((conversation, index) => {
                        return (
                          <div
                            className="flex cursor-pointer flex-col gap-2 py-2 hover:bg-slate-50"
                            key={conversation.tweetId + index}
                            onClick={() =>
                              window.open(
                                `https://x.com/${conversation.authorUsername}/status/${conversation.tweetId}`,
                                "_blank",
                                "noopener,noreferrer",
                              )
                            }
                          >
                            <div className="ml-4 border-l border-black pl-4">
                              <div className="flex items-center gap-1 pb-3">
                                {/* <Avatar>
                                    <AvatarFallback>IMG</AvatarFallback>
                                  </Avatar> */}
                                <p className="font-semibold opacity-60">
                                  {conversation.authorUsername}
                                </p>
                              </div>
                              <div>
                                <p className="whitespace-pre-wrap text-base font-semibold">
                                  {conversation.content}
                                </p>
                              </div>
                              <p className="text-sm text-[#71767B]">
                                {formatDateToLocalTime(conversation.createdAt)}
                              </p>
                            </div>
                            {/* <div className="ml-4 border-l border-red-300 pl-4">
                                <div>id</div>
                                <div>content</div>
                              </div>
                              <div className="ml-4 border-l border-red-300 pl-4">
                                <div>id</div>
                                <div>content</div>
                              </div> */}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  {/* {error && <p className="text-red-500">{error.message}</p>} */}
                  {/* <Button
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
              </Button> */}
                </div>
              )}
          </div>
        </div>
      );
    }
  } else if (!isDesktop && !!isQuoteViewOpen) {
    const tweetConversations = conversationDetail?.conversationTweets;

    return (
      <Sheet open={isQuoteViewOpen} onOpenChange={onOpenChange}>
        <SheetContent side="left" className="h-svh w-screen !p-0">
          <SheetHeader className="hidden">
            <SheetTitle className="hidden">mobile view</SheetTitle>
          </SheetHeader>

          <div className="flex size-full translate-y-[10px] animate-fadeMoveUp flex-col gap-4 overflow-y-scroll px-4 py-6 opacity-0">
            <div className="flex items-center gap-2 desktop:hidden">
              <ChevronLeft
                className="size-6 cursor-pointer"
                onClick={() => {
                  onOpenChange(false);
                  unselectConversation();
                }}
              />
              <p className="text-sm font-medium text-foreground">
                View the list
              </p>
            </div>
            <div className="flex w-full pt-4">
              <p className="text-xl font-semibold">Conversation Detail</p>
            </div>
            <div className="flex w-full flex-col gap-10 rounded-md border border-border shadow-xl">
              {conversationDetail?.titleTweet &&
                conversationDetail?.conversationTweets && (
                  <div
                    className="flex cursor-pointer flex-col gap-4"
                    onClick={() =>
                      window.open(
                        `https://x.com/${conversationDetail.titleTweet.authorUsername}/status/${conversationDetail.titleTweet.tweetId}`,
                        "_blank",
                        "noopener,noreferrer",
                      )
                    }
                  >
                    <div>
                      <div>
                        <div className="flex flex-col gap-2 p-3">
                          <div className="flex flex-col">
                            <p className="font-semibold opacity-60">
                              {conversationDetail?.titleTweet?.authorUsername}
                            </p>
                          </div>
                          <div>
                            <p className="whitespace-pre-wrap text-base font-semibold">
                              {conversationDetail?.titleTweet?.content}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-[#71767B]">
                              {formatDateToLocalTime(
                                conversationDetail?.titleTweet?.createdAt,
                              )}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col gap-6 border-t border-border px-2 py-3">
                        {tweetConversations?.map((conversation, index) => {
                          return (
                            <div
                              className="flex cursor-pointer flex-col gap-2 py-2 hover:bg-slate-50"
                              key={conversation.tweetId + index}
                              onClick={() =>
                                window.open(
                                  `https://x.com/${conversation.authorUsername}/status/${conversation.tweetId}`,
                                  "_blank",
                                  "noopener,noreferrer",
                                )
                              }
                            >
                              <div className="ml-4 border-l border-black pl-4">
                                <div className="flex items-center gap-1 pb-3">
                                  {/* <Avatar>
                                    <AvatarFallback>IMG</AvatarFallback>
                                  </Avatar> */}
                                  <p className="font-semibold opacity-60">
                                    {conversation.authorUsername}
                                  </p>
                                </div>
                                <div>
                                  <p className="whitespace-pre-wrap text-base font-semibold">
                                    {conversation.content}
                                  </p>
                                </div>
                                <p className="text-sm text-[#71767B]">
                                  {formatDateToLocalTime(
                                    conversation.createdAt,
                                  )}
                                </p>
                              </div>
                              {/* <div className="ml-4 border-l border-red-300 pl-4">
                                <div>id</div>
                                <div>content</div>
                              </div>
                              <div className="ml-4 border-l border-red-300 pl-4">
                                <div>id</div>
                                <div>content</div>
                              </div> */}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                    {/* {error && <p className="text-red-500">{error.message}</p>} */}
                    {/* <Button
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
              </Button> */}
                  </div>
                )}
            </div>
          </div>
        </SheetContent>
      </Sheet>
    );
  }

  // return (
  //   <div>
  //     <div>
  //       <div className="flex flex-col gap-2 p-3">
  //         <div>id</div>
  //         <div>content</div>
  //         <div>footer</div>
  //       </div>
  //     </div>
  //     <div>
  //       <div className="flex flex-col px-2 py-3">
  //         <div className="ml-4 border border-red-300 pl-4">
  //           <div>id</div>
  //           <div>content</div>
  //         </div>
  //         <div className="ml-4 border border-red-300 pl-4">
  //           <div>id</div>
  //           <div>content</div>
  //         </div>
  //         <div className="ml-4 border border-red-300 pl-4">
  //           <div>id</div>
  //           <div>content</div>
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  // );
};
