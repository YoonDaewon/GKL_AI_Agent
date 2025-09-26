import { JESSEXBT_SERVER_ENDPOINT } from "@/constant/url";
import type { Conversation } from "@/domain/jessexbt.domain";
import type {
  HttpErrorResponse,
  JesseXbtServerResponse,
} from "@/domain/http.domain";
import type { ConversationListQueryService } from "@/port/jessexbt.port";
import { JessexbtService } from "@/service/http/jessexbt.service";
import { useQuery } from "@tanstack/react-query";

const { GET } = JessexbtService;

export const getConversations = async () => {
  const response = await GET<Conversation[]>(
    `${JESSEXBT_SERVER_ENDPOINT.CONVERSATIONS}`,
  );

  return response;
};

export const useGetConversations = (): ConversationListQueryService => {
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
    JesseXbtServerResponse<Conversation[]>,
    HttpErrorResponse,
    JesseXbtServerResponse<Conversation[]>,
    [string]
  >({
    queryKey: [`list-of-conversations`],
    queryFn: getConversations,
  });

  return {
    conversations: data,
    fetchConversations: refetch,
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
