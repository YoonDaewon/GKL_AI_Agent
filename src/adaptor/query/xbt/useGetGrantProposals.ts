import { JESSEXBT_SERVER_ENDPOINT } from "@/constant/url";
import type { GrantProposal } from "@/domain/jessexbt.domain";
import type {
  HttpErrorResponse,
  JesseXbtServerResponse,
} from "@/domain/http.domain";
import { JessexbtService } from "@/service/http/jessexbt.service";
import { useQuery } from "@tanstack/react-query";
import { GrantProposalListQueryService } from "@/port/jessexbt.port";

const { GET } = JessexbtService;

export const getProposals = async () => {
  const response = await GET<GrantProposal[]>(
    `${JESSEXBT_SERVER_ENDPOINT.GRANTS_PROPOSALS}`,
  );

  return response;
};

export const useGetGrantProposals = (): GrantProposalListQueryService => {
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
    JesseXbtServerResponse<GrantProposal[]>,
    HttpErrorResponse,
    JesseXbtServerResponse<GrantProposal[]>,
    [string]
  >({
    queryKey: [`list-of-all-grant-proposals`],
    queryFn: getProposals,
  });

  return {
    proposals: data,
    fetchProposals: refetch,
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
