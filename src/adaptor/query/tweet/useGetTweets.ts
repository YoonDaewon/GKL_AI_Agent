import { TWITTER_SERVER_ENDPOINT } from "@/constant/url";
import type {
  TwitterPost,
  TwitterPostQueryResponse,
} from "@/domain/twitter.domain";
import type {
  HttpErrorResponse,
  TwitterServerResponse,
} from "@/domain/http.domain";
import type { TweetQueryService } from "@/port/twitter.port";
import { TwitterService } from "@/service/http/twitter.service";
import { useQuery } from "@tanstack/react-query";

const { GET } = TwitterService;

interface Props {
  date?: number;
  page: number;
  limit?: number;
}

export const getTweets = async ({ date, page, limit = 100 }: Props) => {
  const response = await GET<TwitterPostQueryResponse>(
    // `/${TWITTER_SERVER_ENDPOINT.TWEETS}?page=${page}&limit=${limit}&date=${date}`,
    `/${TWITTER_SERVER_ENDPOINT.TWEETS}?page=${page}&limit=${limit}${date ? `&date=${date}` : ""}`,
  );
  // return [response[0]];
  // const firstFive = response.slice(0, 5);
  // return firstFive;
  return response.tweets;
};

export const useGetTweets = ({
  date,
  page,
  limit,
}: Props): TweetQueryService => {
  const {
    isPending,
    isError,
    status,
    data,
    error,
    failureReason,
    isSuccess,
    isPaused,
    isFetching,
    isLoading,
    refetch,
  } = useQuery<
    TwitterServerResponse<TwitterPost[]>,
    HttpErrorResponse,
    TwitterServerResponse<TwitterPost[]>,
    [string]
  >({
    queryKey: [`list-of-influencer-tweets-at-${date}`],
    queryFn: ({ queryKey }) => getTweets({ date, page, limit }),
  });

  return {
    tweets: data,
    fetchTweet: refetch,
    queryStatus: {
      status,
      error,
      isError,
      isPending,
      isSuccess,
      isPaused,
      isLoading,
      isFetching,
      failureReason,
    },
  };
};
