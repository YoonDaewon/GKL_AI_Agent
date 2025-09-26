import type {
  HttpErrorResponse,
  MediumServerResponse,
} from "@/domain/http.domain";
import { MediumService } from "@/service/http/medium.service";
import { useQuery } from "@tanstack/react-query";
import type { MediumPost } from "@/domain/medium.domain";
import type { MediumPostQueryService } from "@/port/medium.port";

const { GET } = MediumService;

const POST_URL = "/internal-pr-workflow/medium-posts";

const getMediumPosts = async () => {
  const response = await GET<MediumPost[]>(POST_URL);

  return response;
};

export const useGetMediumPosts = (): MediumPostQueryService => {
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
    MediumServerResponse<MediumPost[]>,
    HttpErrorResponse,
    MediumServerResponse<MediumPost[]>,
    [string]
  >({
    queryKey: [`list-of-medium-posts`],
    queryFn: ({ queryKey }) => getMediumPosts(),
  });

  return {
    mediumPosts: data,
    fetchPosts: refetch,
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
