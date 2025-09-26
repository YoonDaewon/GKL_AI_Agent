import type {
  HttpErrorResponse,
  TwitterServerResponse,
} from "@/domain/http.domain";
import { useQuery } from "@tanstack/react-query";
import { AgentStyle, QuoteAgentStyleParams } from "@/domain/agent.domain";
import { TWITTER_SERVER_ENDPOINT } from "@/constant/url";
import { QuoteAgentStyleQueryService } from "@/port/agent.port";
import { TwitterService } from "@/service/http/twitter.service";

const { GET } = TwitterService;

export const getQuoteAgentStyle = async ({
  username,
}: QuoteAgentStyleParams) => {
  const response = await GET<AgentStyle>(
    `${TWITTER_SERVER_ENDPOINT.ADMIN.QUOTE}/${username}`,
  );
  return response;
};

export const useGetQuoteAgentStyle = ({
  username,
}: QuoteAgentStyleParams): QuoteAgentStyleQueryService => {
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
    TwitterServerResponse<AgentStyle>,
    HttpErrorResponse,
    TwitterServerResponse<AgentStyle>,
    [string, { username: string }]
  >({
    queryKey: [`quote-agent-style-of-${username}`, { username }],
    queryFn: ({ queryKey }) => {
      const [, { username }] = queryKey;
      return getQuoteAgentStyle({ username });
    },
  });

  return {
    quoteAgentStyle: data,
    fetchQuoteAgentStyle: refetch,
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
