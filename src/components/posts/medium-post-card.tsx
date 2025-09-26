"use client";

import { decode } from "he";

import type { MediumPost } from "@/domain/medium.domain";
import { formatDateToLocalTime } from "@/lib/date";
import { Card, CardContent } from "@/components/ui/card";

interface Props {
  post: MediumPost;
  onPostClick: (id: number) => void;
  shouldOutFocus: boolean;
  id: number;
}
export const MediumPostCard: React.FC<Props> = ({
  post,
  shouldOutFocus,
  onPostClick,
}) => {
  const title = decode(post.title);

  const openInNewTab = (url: string) => {
    const newWindow = window.open(url, "_blank", "noopener,noreferrer");
    if (newWindow) newWindow.opener = null;
  };

  const issuedAt = formatDateToLocalTime(post.pubDate);

  return (
    <Card
      className={`cursor-pointer !rounded-md p-3 ${shouldOutFocus && `!opacity-30`} opacity-100 transition-opacity duration-700`}
      onClick={() => onPostClick(post.id)}
    >
      <CardContent className="!p-0">
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-normal leading-5 text-foreground">
                {`@${post.author}`}
              </p>
            </div>
            <div>
              <p className="text-sm font-normal leading-5">{issuedAt}</p>
            </div>
          </div>
          <div>
            <p className="text-base font-bold leading-5 text-foreground">
              {title}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
