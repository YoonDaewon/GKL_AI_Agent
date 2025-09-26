import type {
  HttpErrorResponse,
  MediumServerResponse,
} from "@/domain/http.domain";
import { useQuery } from "@tanstack/react-query";
import { QnAQueryService } from "@/port/agent.port";
import { QnA } from "@/domain/agent.domain";
import { MediumService } from "@/service/http/medium.service";
import { MEDIUM_SERVER_VERSION } from "@/constant/url";

const { GET } = MediumService;

export const getQnA = async ({ name }: { name: string }) => {
  const response = await GET<QnA[]>(
    `/${MEDIUM_SERVER_VERSION}/crawler-management/get-all-qna/${name}`,
  );
  return response;
};

export const useGetQnA = ({ name }: { name: string }): QnAQueryService => {
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
    MediumServerResponse<QnA[]>,
    HttpErrorResponse,
    MediumServerResponse<QnA[]>,
    [string, { name: string }]
  >({
    queryKey: [`qna-list-of-${name}`, { name }],
    queryFn: ({ queryKey }) => {
      const [, { name }] = queryKey;
      return getQnA({ name });
    },
  });

  return {
    qna: data,
    fetchQna: refetch,
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
