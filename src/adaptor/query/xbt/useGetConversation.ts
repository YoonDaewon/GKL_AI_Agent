import { JESSEXBT_SERVER_ENDPOINT } from "@/constant/url";
import type {
  HttpErrorResponse,
  JesseXbtServerResponse,
} from "@/domain/http.domain";
import { TweetConversationDetail } from "@/domain/jessexbt.domain";
import type { ConversationQueryService } from "@/port/jessexbt.port";
import { JessexbtService } from "@/service/http/jessexbt.service";
import { useQuery } from "@tanstack/react-query";

const { GET } = JessexbtService;

interface Props {
  username: string;
  targetUsername?: string;
  conversationId: string | null;
}

export const getConversation = async ({
  username,
  targetUsername,
  conversationId,
}: Props) => {
  const response = await GET<TweetConversationDetail>(
    `${JESSEXBT_SERVER_ENDPOINT.CONVERSATION_DETAIL}?username=${username}&targetUsername=${targetUsername}&conversationId=${conversationId}`,
  );

  const filteredAndSortedConversationTweets = response.conversationTweets
    ?.filter((tweet) => {
      return tweet.tweetId !== response.titleTweet?.tweetId;
    })
    ?.sort((a, b) => {
      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    });

  return {
    titleTweet: response.titleTweet,
    conversationTweets: filteredAndSortedConversationTweets,
  };
};

export const useGetConversation = ({
  username = "jessepollak",
  targetUsername,
  conversationId,
}: Props): ConversationQueryService => {
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
    JesseXbtServerResponse<TweetConversationDetail>,
    HttpErrorResponse,
    JesseXbtServerResponse<TweetConversationDetail>,
    [string]
  >({
    queryKey: [
      `conversation-detail-of-${conversationId}-from-${targetUsername}-to-${username}`,
    ],
    queryFn: () =>
      getConversation({ username, targetUsername, conversationId }),
    enabled: !!conversationId && !!targetUsername,
    // enabled: false,
  });

  return {
    conversation: data,
    fetchConversation: refetch,
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
