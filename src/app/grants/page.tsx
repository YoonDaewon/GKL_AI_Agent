"use client";

import { LeftPane } from "@/components/layout/left-pane";
import { useEffect, useState } from "react";
import { useMediaQuery } from "@/hooks/use-media-query";
import { MediumSkeleton } from "@/components/skeleton/medium-skeleton";
import { RightPane } from "@/components/layout/right-pane";
import { useGetGrantProposals } from "@/adaptor/query/xbt/useGetGrantProposals";
import { ProposalReport } from "@/components/jessexbt/proposal-report";
import { ProposalSummaryCard } from "@/components/jessexbt/proposal-summary-card";

export default function Page() {
  const [isReportViewOpen, setIsReportViewOpen] = useState(false);
  const [selectedProposal, setSelectedProposal] = useState<string | null>(null);

  const isDesktop = useMediaQuery("(min-width: 768px)");

  const {
    proposals,
    queryStatus: { isLoading, status },
  } = useGetGrantProposals();

  const selectProposal = (id: string) => {
    if (id !== selectedProposal) setSelectedProposal(id);
    if (!isDesktop) {
      if (!isReportViewOpen) setIsReportViewOpen(true);
    }
  };

  const unselectProposal = () => {
    setSelectedProposal(null);
  };

  const changeMobileQuoteView = (status: boolean) => {
    if (status !== isReportViewOpen) setIsReportViewOpen(status);
  };

  useEffect(() => {
    if (!isDesktop && !!selectedProposal && !isReportViewOpen) {
      setIsReportViewOpen(true);
    }

    if (!!isDesktop && !!selectedProposal && !!isReportViewOpen) {
      setIsReportViewOpen(false);
    }
  }, [isDesktop, selectedProposal, isReportViewOpen]);

  const targetProposal = proposals?.find(
    (proposal) => proposal.id === Number(selectedProposal),
  );

  return (
    <div className="flex h-full divide-x divide-border">
      <div className="flex w-full desktop:h-full desktop:w-[2vw] desktop:min-w-[332px] desktop:max-w-[550px] desktop:grow">
        <LeftPane>
          <div className="flex justify-between">
            <div>
              <p className="text-lg font-bold">
                Microgrants recommended by jessexbt
              </p>
              <p className="text-sm">
                Below is the list of microgrant recommendations by Agent Jesse.
                Select to see and conduct microgrants. Agent Jesse updates
                recommendations every hour.
              </p>
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
              proposals?.map((proposal, index) => {
                const shouldOutFocus =
                  selectedProposal !== null &&
                  selectedProposal !== proposal?.id?.toString();
                if (proposal)
                  return (
                    <ProposalSummaryCard
                      key={
                        proposal.id +
                        proposal.conversationId +
                        proposal.targetUsername +
                        proposal.ownerUsername +
                        index
                      }
                      post={proposal}
                      shouldOutFocus={shouldOutFocus}
                      onPostClick={selectProposal}
                    />
                  );

                return null;
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
            isReportViewOpen={isReportViewOpen}
            unselectedProposal={unselectedProposal}
            selectedProposal={selectedProposal}
          /> */}
          <ProposalReport
            proposal={targetProposal}
            onOpenChange={changeMobileQuoteView}
            isReportViewOpen={isReportViewOpen}
            unselectProposal={unselectProposal}
            selectedProposal={selectedProposal}
          />
        </RightPane>
      ) : (
        <RightPane>
          {/* <StoryRecommend
          onOpenChange={changeMobileQuoteView}
          posts={mediumPosts}
          isReportViewOpen={isReportViewOpen}
          unselectedProposal={unselectedProposal}
          selectedProposal={selectedProposal}
        /> */}
          <ProposalReport
            proposal={targetProposal}
            onOpenChange={changeMobileQuoteView}
            isReportViewOpen={isReportViewOpen}
            unselectProposal={unselectProposal}
            selectedProposal={selectedProposal}
          />
        </RightPane>
      )}
    </div>
  );
}
