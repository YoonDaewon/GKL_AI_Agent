import type {
  HttpErrorResponse,
  MediumServerResponse,
} from "@/domain/http.domain";
import type { GenerateTweetForm, GeneratedTweet } from "@/domain/medium.domain";

import type { GenerateTweetService } from "@/port/medium.port";
import { MediumService } from "@/service/http/medium.service";
import { useMutation } from "@tanstack/react-query";

const { POST } = MediumService;

const GENERATE_TWEET_URL = "/internal-pr-workflow/medium-posts/generate-tweet";

const generateTweet = async (form: GenerateTweetForm) => {
  const response = await POST<GeneratedTweet, GenerateTweetForm>(
    GENERATE_TWEET_URL,
    form,
  );

  return response;
};

export const useGenerateTweet = (): GenerateTweetService => {
  const {
    data,
    error,
    status,
    mutate,
    mutateAsync,
    isPending,
    isError,
    isSuccess,
    isPaused,
    isIdle,
    reset,
  } = useMutation<
    MediumServerResponse<GeneratedTweet>,
    HttpErrorResponse,
    GenerateTweetForm
  >({
    mutationFn: (form) => generateTweet(form),
  });

  return {
    generateTweet: mutate,
    generateTweetAsync: mutateAsync,
    generateTweetStatus: {
      data,
      error,
      status,
      isPending,
      isError,
      isSuccess,
      isPaused,
      isIdle,
    },
    resetGeneratedTweet: reset,
  };
};
