"use client";

import { formatDateToLocalTime } from "@/lib/date";
import { Card, CardContent } from "@/components/ui/card";
import { GrantProposal } from "@/domain/jessexbt.domain";
import { cn } from "@/lib/utils";

interface Props {
  post: GrantProposal;
  onPostClick: (id: string) => void;
  shouldOutFocus: boolean;
}

export const ProposalSummaryCard: React.FC<Props> = ({
  post,
  shouldOutFocus,
  onPostClick,
}) => {
  const issuedAt = post ? formatDateToLocalTime(post.createdAt) : "-";

  return (
    <div className="relative">
      <div className="absolute -right-2 -top-2 z-10 rotate-12">
        <div className="flex items-center justify-center rounded-md bg-[#0052FF] px-2 py-1 text-xs font-bold text-primary-foreground shadow-md">
          ${post.grantAmount} USDC
        </div>
      </div>
      <Card
        className={cn(
          "cursor-pointer !rounded-md p-3 opacity-100 transition-opacity duration-700",
          shouldOutFocus && "!opacity-30",
        )}
        onClick={() => onPostClick(post.id.toString())}
      >
        <CardContent className="!p-0">
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-normal leading-5 text-foreground">
                  {`@${post.targetUsername}`}
                </p>
              </div>
              <div>
                <p className="text-sm font-normal leading-5">{issuedAt}</p>
              </div>
            </div>
            <div>
              <p className="text-base font-bold leading-5 text-foreground">
                {post.reason}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
