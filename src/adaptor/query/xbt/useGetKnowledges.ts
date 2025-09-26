import { JESSEXBT_SERVER_ENDPOINT } from "@/constant/url";
import type {
  HttpErrorResponse,
  JesseXbtServerResponse,
} from "@/domain/http.domain";
import { Knowledges } from "@/domain/jessexbt.domain";
import type { KnowledgesQueryService } from "@/port/jessexbt.port";
import { JessexbtService } from "@/service/http/jessexbt.service";
import { useQuery } from "@tanstack/react-query";

const { GET } = JessexbtService;

export const getKnowledges = async () => {
  const response = await GET<Knowledges>(
    `${JESSEXBT_SERVER_ENDPOINT.KNOWLEDGES}`,
  );

  return response;
};

export const useGetKnowledges = (): KnowledgesQueryService => {
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
    JesseXbtServerResponse<Knowledges>,
    HttpErrorResponse,
    JesseXbtServerResponse<Knowledges>,
    [string]
  >({
    queryKey: [`get-all-knowledges`],
    queryFn: getKnowledges,
  });

  return {
    knowledges: data,
    fetchKnowledges: refetch,
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
