import type {
  HttpErrorResponse,
  MediumServerResponse,
} from "@/domain/http.domain";
import { useQuery } from "@tanstack/react-query";
import { AgentStyleQueryService } from "@/port/agent.port";
import { AgentStyle, AgentStyleParams } from "@/domain/agent.domain";
import { MediumService } from "@/service/http/medium.service";

const { GET } = MediumService;

export const getAgentStyle = async ({
  targetMedia,
  username,
}: AgentStyleParams) => {
  const response = await GET<AgentStyle>(
    `/internal-pr-workflow/style-analysis/${targetMedia}/${username}`,
  );
  return response;
};

export const useGetAgentStyle = ({
  targetMedia,
  username,
}: AgentStyleParams): AgentStyleQueryService => {
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
    MediumServerResponse<AgentStyle>,
    HttpErrorResponse,
    MediumServerResponse<AgentStyle>,
    [string, { targetMedia: string; username: string }]
  >({
    queryKey: [
      `agent-style-of-${targetMedia}-${username}`,
      { targetMedia, username },
    ],
    queryFn: ({ queryKey }) => {
      const [, { targetMedia, username }] = queryKey;
      return getAgentStyle({ targetMedia, username });
    },
  });

  return {
    agentStyle: data,
    fetchAgentStyle: refetch,
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
