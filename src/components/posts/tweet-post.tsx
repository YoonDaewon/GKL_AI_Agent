import { TwitterTweetEmbed } from "react-twitter-embed";
import { TweetSkeleton } from "@/components/skeleton/tweet-skeleton";
import type { TwitterPost } from "@/domain/twitter.domain";

interface Props {
  tweet: TwitterPost;
  onPostClick?: (id: string) => void;
  shouldOutFocus: boolean;
  id: string;
  lastTweetId: string;
  onTweetReady: (id: string) => void;
  isTweetReady: boolean;
}

export const TweetPost = ({
  tweet,
  id,
  lastTweetId,
  shouldOutFocus,
  onPostClick,
  onTweetReady,
  isTweetReady,
}: Props) => {
  return (
    <div
      className={`relative left-0 top-0 h-fit min-w-[300px] max-w-[550px] rounded-xl [&>div]:[&>div]:opacity-100 [&>div]:[&>div]:transition-opacity [&>div]:[&>div]:duration-700 ${shouldOutFocus && `[&>div]:[&>div]:!opacity-30`}`}
    >
      <TwitterTweetEmbed
        tweetId={id}
        options={{
          style: {
            backgroundColor: "red",
          },
        }}
        onLoad={() => {
          if (tweet) {
            if (lastTweetId === tweet.tweetId) onTweetReady(tweet.tweetId);
          }
        }}
        placeholder={<TweetSkeleton />}
      />
      <div
        className={`transparent absolute left-0 top-0 size-full ${!isTweetReady ? "cursor-wait" : "cursor-pointer"}`}
        onClick={(event) => {
          if (isTweetReady) {
            onPostClick?.(tweet.tweetId);
          }
          event.stopPropagation();
        }}
      />
    </div>
  );
};
