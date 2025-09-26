"use client";

import { LeftPane } from "@/components/layout/left-pane";
import { useEffect, useState, useMemo } from "react";
import { useMediaQuery } from "@/hooks/use-media-query";
import { MediumSkeleton } from "@/components/skeleton/medium-skeleton";
import { useGetConversations } from "@/adaptor/query/xbt/useGetConversationList";
import { ConversationCard } from "@/components/jessexbt/conversation-card";
import { RightPane } from "@/components/layout/right-pane";
import { ConversationDetail } from "@/components/jessexbt/conversation-detail";
import { Conversation } from "@/domain/jessexbt.domain";

export default function Page() {
  const [isConversationViewOpen, setIsConversationViewOpen] = useState(false);
  const [selectedConversationId, setSelectedConversationId] = useState<
    string | null
  >(null);
  const [selectedConversation, setSelectedConversation] = useState<
    number | null
  >(null);

  const isDesktop = useMediaQuery("(min-width: 768px)");

  const {
    conversations,
    queryStatus: { isLoading, status },
  } = useGetConversations();

  const selectConversation = (conversation: Conversation) => {
    if (conversation.conversationId !== selectedConversationId)
      setSelectedConversationId(conversation.conversationId);
    setSelectedConversation(conversation.id);
    if (!isDesktop) {
      if (!isConversationViewOpen) setIsConversationViewOpen(true);
    }
  };

  const unselectConversation = () => {
    setSelectedConversationId(null);
    setSelectedConversation(null);
  };

  const changeMobileQuoteView = (status: boolean) => {
    if (status !== isConversationViewOpen) setIsConversationViewOpen(status);
  };

  useEffect(() => {
    if (!isDesktop && !!selectedConversationId && !isConversationViewOpen) {
      setIsConversationViewOpen(true);
    }

    if (!!isDesktop && !!selectedConversationId && !!isConversationViewOpen) {
      setIsConversationViewOpen(false);
    }
  }, [isDesktop, selectedConversationId, isConversationViewOpen]);

  const targetConversation = useMemo(
    () =>
      conversations
        ? conversations?.find(
            (conversation) => conversation.id === selectedConversation,
          )
        : undefined,
    [conversations, selectedConversation],
  );

  return (
    <div className="flex h-full divide-x divide-border">
      <div className="flex w-full desktop:h-full desktop:w-[2vw] desktop:min-w-[332px] desktop:max-w-[550px] desktop:grow">
        <LeftPane>
          <div className="flex justify-between">
            <div>
              <p className="text-lg font-bold">Conversations by @jessepollak</p>
              <div className="flex items-center gap-1">
                <p className="whitespace-pre-wrap text-sm text-muted-foreground">
                  {/* (list of conversations between builders and @jessepollak) */}
                  {`base on conversations below, Agent Jesse analyzes and learns how to communicate and give advice to builders. If you want to try out how smart Agent Jesse is, you can refer `}
                  <a
                    className="cursor-pointer underline"
                    href="/chat"
                    target="_blank"
                  >
                    to this page.
                  </a>
                </p>
              </div>
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
              conversations?.map((conversation, index) => {
                const shouldOutFocus =
                  selectedConversationId !== null &&
                  selectedConversation !== conversation.id;
                return (
                  <ConversationCard
                    key={
                      conversation.conversationId +
                      conversation.updatedAt +
                      conversation.targetUsername +
                      index
                    }
                    id={conversation.conversationId}
                    post={conversation}
                    shouldOutFocus={shouldOutFocus}
                    onPostClick={selectConversation}
                  />
                );
              })
            )}
          </div>
        </LeftPane>
      </div>
      {isDesktop ? (
        <RightPane>
          {/* <StoryRecommend
            onOpenChange={changeMobileQuoteView}
            posts={mediumPosts}
            isConversationViewOpen={isConversationViewOpen}
            unselectedConversationId={unselectedConversationId}
            selectedConversationId={selectedConversationId}
          /> */}
          <ConversationDetail
            conversation={targetConversation}
            onOpenChange={changeMobileQuoteView}
            isQuoteViewOpen={isConversationViewOpen}
            unselectConversation={unselectConversation}
            selectedConversationId={selectedConversationId}
          />
        </RightPane>
      ) : (
        <RightPane>
          {/* <StoryRecommend
          onOpenChange={changeMobileQuoteView}
          posts={mediumPosts}
          isConversationViewOpen={isConversationViewOpen}
          unselectedConversationId={unselectedConversationId}
          selectedConversationId={selectedConversationId}
        /> */}
          <ConversationDetail
            conversation={targetConversation}
            onOpenChange={changeMobileQuoteView}
            isQuoteViewOpen={isConversationViewOpen}
            unselectConversation={unselectConversation}
            selectedConversationId={selectedConversationId}
          />
        </RightPane>
      )}
    </div>
  );
}
