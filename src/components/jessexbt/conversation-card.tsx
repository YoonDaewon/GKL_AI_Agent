"use client";

import { formatDateToLocalTime } from "@/lib/date";
import { Card, CardContent } from "@/components/ui/card";
import { Conversation } from "@/domain/jessexbt.domain";

interface Props {
  post: Conversation;
  onPostClick: (id: Conversation) => void;
  shouldOutFocus: boolean;
  id: string;
}
export const ConversationCard: React.FC<Props> = ({
  post,
  shouldOutFocus,
  onPostClick,
}) => {
  const openInNewTab = (url: string) => {
    const newWindow = window.open(url, "_blank", "noopener,noreferrer");
    if (newWindow) newWindow.opener = null;
  };

  const issuedAt = formatDateToLocalTime(post.updatedAt);

  return (
    <Card
      className={`cursor-pointer !rounded-md p-3 ${shouldOutFocus && `!opacity-30`} opacity-500 transition-opacity duration-100`}
      onClick={() => onPostClick(post)}
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
              {post.summary}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
