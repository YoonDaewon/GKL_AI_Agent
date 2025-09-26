"use client";

import "./markdown.css";
import { GrantProposal } from "@/domain/jessexbt.domain";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { ChevronLeft, CornerDownRight, ExternalLink } from "lucide-react";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useMediaQuery } from "@/hooks/use-media-query";
import { useGetConversation } from "@/adaptor/query/xbt/useGetConversation";
import { formatDateToLocalTime } from "@/lib/date";

import { useState } from "react";
import { Dialog } from "@radix-ui/react-dialog";
import { Button } from "../ui/button";
import { DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";

interface Props {
  proposal?: GrantProposal;
  onOpenChange: (status: boolean) => void;
  isReportViewOpen: boolean;
  unselectProposal: () => void;
  selectedProposal: string | null;
}

// Add custom link component with proper type definitions
const CustomLink = ({
  children,
  ...props
}: React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
  return (
    <a {...props} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  );
};

export const ProposalReport = ({
  proposal,
  onOpenChange,
  isReportViewOpen,
  unselectProposal,
  selectedProposal,
}: Props) => {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogType, setDialogType] = useState<"approve" | "reject">("approve");

  const {
    conversation: conversationDetail,
    queryStatus: { isLoading, isError },
  } = useGetConversation({
    username: "jessepollak",
    targetUsername: proposal?.targetUsername,
    conversationId: proposal?.conversationId || null,
  });

  const handleButtonClick = (type: "approve" | "reject") => {
    setDialogType(type);
    setIsDialogOpen(true);
  };

  if (isDesktop) {
    if (!proposal) {
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
            <div className="flex flex-col items-center justify-center gap-2">
              <p className="text-2xl font-semibold text-foreground">
                Microgrants recommendations by @jessexbt
              </p>
              <p className="text-center text-sm text-muted-foreground">
                Please select a recommendation from the list and conduct
                microgrants
              </p>
            </div>
            <div className="desktop:hidden">
              <Button>View The Proposal List</Button>
            </div>
          </div>
        </div>
      );
    }

    if (proposal) {
      return (
        <div className="flex size-full translate-y-[10px] animate-fadeMoveUp flex-col gap-4 overflow-y-scroll px-4 py-6 opacity-0">
          <div className="flex items-center gap-2 desktop:hidden">
            <ChevronLeft
              className="size-6 cursor-pointer"
              onClick={() => {
                onOpenChange(false);
                unselectProposal();
              }}
            />
            <p className="text-sm font-medium text-foreground">View the list</p>
          </div>
          <div className="flex w-full justify-between pt-4">
            <p className="text-xl font-semibold">Microgrants Recommendation</p>
            <div className="flex items-center gap-2">
              <Button
                variant="default"
                onClick={() => handleButtonClick("approve")}
              >
                Approve
              </Button>
              <Button
                variant="destructive"
                onClick={() => handleButtonClick("reject")}
              >
                Reject
              </Button>
            </div>
          </div>
          <div className="flex w-full flex-col gap-4 rounded-md border border-border p-4 shadow-xl">
            <div className="flex justify-between">
              <div className="flex items-end">
                <div className="flex items-center gap-1">
                  <p className="whitespace-pre-wrap">No. {proposal.id}</p>
                </div>
                {/* <div className="flex items-center gap-1">
                  <p className="text-lg font-semibold">{proposal.id}</p>
                </div> */}
              </div>
              <div
                className="flex cursor-pointer items-center gap-1 hover:underline"
                onClick={() =>
                  window.open(
                    `https://x.com/${conversationDetail?.titleTweet.authorUsername}/status/${conversationDetail?.titleTweet.tweetId}`,
                    "_blank",
                  )
                }
              >
                <p className="whitespace-pre-wrap font-semibold">
                  see contents
                </p>
                <div className="cursor-pointer">
                  <ExternalLink className="size-4" />
                </div>
              </div>
            </div>
            <div className="flex items-end">
              <div className="flex items-center gap-1">
                <CornerDownRight className="size-4" />
                <p className="whitespace-pre-wrap">Candidate: </p>
              </div>
              <div className="flex cursor-pointer items-center gap-1 hover:underline">
                <p className="text-lg font-semibold">
                  @{proposal.targetUsername}
                </p>
                <div className="">
                  <ExternalLink
                    className="size-4"
                    onClick={() =>
                      window.open(
                        `https://x.com/${proposal.targetUsername}`,
                        "_blank",
                      )
                    }
                  />
                </div>
              </div>
            </div>
            <div className="flex items-end">
              <div className="flex items-center gap-1">
                <CornerDownRight className="size-4" />
                <p className="whitespace-pre-wrap">Amount: </p>
              </div>
              <div className="flex cursor-pointer items-center gap-1">
                <p className="text-lg font-semibold">
                  ${proposal.grantAmount} USDC
                </p>
              </div>
            </div>
            <div className="flex flex-col justify-center">
              <div className="flex items-center gap-1">
                <CornerDownRight className="size-4" />
                <p className="whitespace-pre-wrap">Recommendation:</p>
              </div>
              <div className="flex cursor-pointer items-center gap-1">
                <p className="text-lg font-semibold">{proposal.reason}</p>
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1">
                <CornerDownRight className="size-4" />
                <p className="whitespace-pre-wrap">Analysis Report: </p>
              </div>
              <div className="ml-4 rounded-lg bg-slate-50 px-3 py-1 shadow-lg">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                    a: CustomLink,
                  }}
                >
                  {proposal.report}
                </ReactMarkdown>
              </div>
            </div>
            <div className="flex items-center">
              <div className="flex items-center gap-1">
                <CornerDownRight className="size-4" />
                <p className="whitespace-pre-wrap">Nomidated At: </p>
              </div>
              <div className="flex cursor-pointer items-center gap-1">
                <p className="font-semibold">
                  {formatDateToLocalTime(proposal.createdAt)}
                </p>
              </div>
            </div>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogContent className="rounded-md">
              <DialogHeader>
                <DialogTitle>
                  {dialogType === "approve" ? "Approve " : "Reject "}
                  will be available soon
                </DialogTitle>
              </DialogHeader>
              <div className="">
                <p className="text-center text-sm text-muted-foreground">
                  We are currently working on onchain feature for approve and
                  reject a microgrants
                </p>
              </div>
              <div className="flex justify-end">
                <Button onClick={() => setIsDialogOpen(false)}>Close</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      );
    }
  } else if (!isDesktop && !!isReportViewOpen && proposal) {
    return (
      <Sheet open={isReportViewOpen} onOpenChange={onOpenChange}>
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
                  unselectProposal();
                }}
              />
              <p className="text-sm font-medium text-foreground">
                View the list
              </p>
            </div>
            <div className="flex w-full flex-col justify-between gap-2 pt-4 desktop:flex-row desktop:gap-0">
              <p className="text-xl font-semibold">
                Microgrants Recommendation
              </p>
              <div className="flex items-center gap-2">
                <Button
                  variant="default"
                  onClick={() => handleButtonClick("approve")}
                >
                  Approve
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => handleButtonClick("reject")}
                >
                  Reject
                </Button>
              </div>
            </div>
            <div className="flex w-full flex-col gap-4 rounded-md border border-border p-4 shadow-xl">
              <div className="flex justify-between">
                <div className="flex items-end">
                  <div className="flex items-center gap-1">
                    <p className="whitespace-pre-wrap">No. {proposal.id}</p>
                  </div>
                  {/* <div className="flex items-center gap-1">
                  <p className="text-lg font-semibold">{proposal.id}</p>
                </div> */}
                </div>
                <div
                  className="flex cursor-pointer items-center gap-1 hover:underline"
                  onClick={() =>
                    window.open(
                      `https://x.com/${conversationDetail?.titleTweet.authorUsername}/status/${conversationDetail?.titleTweet.tweetId}`,
                      "_blank",
                    )
                  }
                >
                  <p className="whitespace-pre-wrap font-semibold">
                    see contents
                  </p>
                  <div className="cursor-pointer">
                    <ExternalLink className="size-4" />
                  </div>
                </div>
              </div>
              <div className="flex items-end">
                <div className="flex items-center gap-1">
                  <CornerDownRight className="size-4" />
                  <p className="whitespace-pre-wrap">Candidate: </p>
                </div>
                <div className="flex cursor-pointer items-center gap-1 hover:underline">
                  <p className="text-lg font-semibold">
                    @{proposal.targetUsername}
                  </p>
                  <div className="">
                    <ExternalLink
                      className="size-4"
                      onClick={() =>
                        window.open(
                          `https://x.com/${proposal.targetUsername}`,
                          "_blank",
                        )
                      }
                    />
                  </div>
                </div>
              </div>
              <div className="flex items-end">
                <div className="flex items-center gap-1">
                  <CornerDownRight className="size-4" />
                  <p className="whitespace-pre-wrap">Amount: </p>
                </div>
                <div className="flex cursor-pointer items-center gap-1">
                  <p className="text-lg font-semibold">
                    ${proposal.grantAmount} USDC
                  </p>
                </div>
              </div>
              <div className="flex flex-col justify-center">
                <div className="flex items-center gap-1">
                  <CornerDownRight className="size-4" />
                  <p className="whitespace-pre-wrap">Recommendation:</p>
                </div>
                <div className="flex cursor-pointer items-center gap-1">
                  <p className="text-lg font-semibold">{proposal.reason}</p>
                </div>
              </div>
              <div>
                <div className="flex items-center gap-1">
                  <CornerDownRight className="size-4" />
                  <p className="whitespace-pre-wrap">Analysis Report: </p>
                </div>
                <div className="ml-4 rounded-lg bg-slate-50 px-3 py-1 shadow-lg">
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    components={{
                      a: CustomLink,
                    }}
                  >
                    {proposal.report}
                  </ReactMarkdown>
                </div>
              </div>
              <div className="flex items-center">
                <div className="flex items-center gap-1">
                  <CornerDownRight className="size-4" />
                  <p className="whitespace-pre-wrap">Nomidated At: </p>
                </div>
                <div className="flex cursor-pointer items-center gap-1">
                  <p className="font-semibold">
                    {formatDateToLocalTime(proposal.createdAt)}
                  </p>
                </div>
              </div>
            </div>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogContent className="rounded-md">
                <DialogHeader>
                  <DialogTitle>
                    {dialogType === "approve" ? "Approve " : "Reject "}
                    will be available soon
                  </DialogTitle>
                </DialogHeader>
                <div className="">
                  <p className="text-center text-sm text-muted-foreground">
                    We are currently working on onchain feature for approve and
                    reject a microgrants
                  </p>
                </div>
                <div className="flex justify-end">
                  <Button onClick={() => setIsDialogOpen(false)}>Close</Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </SheetContent>
      </Sheet>
    );
  }

  // return (
  //   <>
  //     <div className="flex items-center gap-2">
  //       <Button variant="default" onClick={() => handleButtonClick("approve")}>
  //         Approve
  //       </Button>
  //       <Button
  //         variant="destructive"
  //         onClick={() => handleButtonClick("reject")}
  //       >
  //         Reject
  //       </Button>
  //     </div>

  //     <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
  //       <DialogContent>
  //         <DialogHeader>
  //           <DialogTitle>
  //             {dialogType === "approve" ? "Approval" : "Rejection"} Feature
  //             Coming Soon
  //           </DialogTitle>
  //         </DialogHeader>
  //         <div className="py-4">
  //           <p className="text-sm text-muted-foreground">
  //             The {dialogType} functionality is currently under development and
  //             will be available soon. Please check back later for updates.
  //           </p>
  //         </div>
  //         <div className="flex justify-end">
  //           <Button onClick={() => setIsDialogOpen(false)}>Close</Button>
  //         </div>
  //       </DialogContent>
  //     </Dialog>
  //   </>
  // );
};
