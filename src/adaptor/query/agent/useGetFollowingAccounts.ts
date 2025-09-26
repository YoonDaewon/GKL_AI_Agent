import type {
  HttpErrorResponse,
  TwitterServerResponse,
} from "@/domain/http.domain";
import { useQuery } from "@tanstack/react-query";
import { TWITTER_SERVER_ENDPOINT } from "@/constant/url";
import { TwitterService } from "@/service/http/twitter.service";
import { FollowingAccountsQueryService } from "@/port/twitter.port";
import { FollowingAccounts } from "@/domain/twitter.domain";

const { GET } = TwitterService;

export const getFollowingAccounts = async () => {
  const response = await GET<FollowingAccounts[]>(
    `${TWITTER_SERVER_ENDPOINT.ADMIN.FOLLOWING}`,
  );
  return response;
};

export const useGetFollowingAccounts = (): FollowingAccountsQueryService => {
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
    TwitterServerResponse<FollowingAccounts[]>,
    HttpErrorResponse,
    TwitterServerResponse<FollowingAccounts[]>,
    [string]
  >({
    queryKey: [`following-accounts`],
    queryFn: ({ queryKey }) => {
      return getFollowingAccounts();
    },
  });

  return {
    followingAccounts: data,
    fetchFollowingAccounts: refetch,
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
