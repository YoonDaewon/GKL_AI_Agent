import type {
  HttpErrorResponse,
  MediumServerResponse,
} from "@/domain/http.domain";
import { useQuery } from "@tanstack/react-query";
import { AgentMetadataQueryService } from "@/port/agent.port";
import { AgentMetadata } from "@/domain/agent.domain";
import { MediumService } from "@/service/http/medium.service";
import { MEDIUM_SERVER_VERSION } from "@/constant/url";

const { GET } = MediumService;

export const getAgentMetadata = async ({ name }: { name: string }) => {
  const response = await GET<AgentMetadata[]>(
    `/${MEDIUM_SERVER_VERSION}/crawler-management/get-agent-metadata/${name}`,
  );
  return response;
};

export const useGetAgentMetadata = ({
  name,
}: {
  name: string;
}): AgentMetadataQueryService => {
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
    MediumServerResponse<AgentMetadata[]>,
    HttpErrorResponse,
    MediumServerResponse<AgentMetadata[]>,
    [string, { name: string }]
  >({
    queryKey: [`qa-agent-metadata-of-${name}`, { name }],
    queryFn: ({ queryKey }) => {
      const [, { name }] = queryKey;
      return getAgentMetadata({ name });
    },
  });

  return {
    agentMetadata: data,
    fetchAgentMetadata: refetch,
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
