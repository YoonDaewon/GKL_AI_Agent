import type {
  HttpErrorResponse,
  TwitterServerResponse,
} from "@/domain/http.domain";
import { useQuery } from "@tanstack/react-query";
import { CronjobStatusQueryService } from "@/port/agent.port";

import { TwitterService } from "@/service/http/twitter.service";

const { GET } = TwitterService;

export const getCronjobStatus = async () => {
  const response = await GET<boolean>(`/x/get_cron_job_status`);
  return response;
};

export const useGetCronjobStatus = (): CronjobStatusQueryService => {
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
    TwitterServerResponse<boolean>,
    HttpErrorResponse,
    TwitterServerResponse<boolean>,
    [string]
  >({
    queryKey: [`cron-job-status`],
    queryFn: ({ queryKey }) => {
      return getCronjobStatus();
    },
  });

  return {
    cronjobStatus: data,
    fetchCronjobStatus: refetch,
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
