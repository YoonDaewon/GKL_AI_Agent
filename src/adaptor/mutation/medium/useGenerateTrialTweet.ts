import { AgentStyleParams } from "@/domain/agent.domain";
import type {
  HttpErrorResponse,
  MediumServerResponse,
} from "@/domain/http.domain";
import type {
  GenerateTrialTweetForm,
  GeneratedTweet,
} from "@/domain/medium.domain";

import type { GenerateTrialTweetService } from "@/port/medium.port";
import { MediumService } from "@/service/http/medium.service";
import { useMutation } from "@tanstack/react-query";

const { POST } = MediumService;

const GENERATE_TWEET_URL = "/internal-pr-workflow/style-analysis";

const generateTrialTweet = async ({
  params,
  form,
}: {
  params: AgentStyleParams;
  form: GenerateTrialTweetForm;
}) => {
  const { targetMedia, username } = params;
  const response = await POST<GeneratedTweet, GenerateTrialTweetForm>(
    `${GENERATE_TWEET_URL}/${targetMedia}/${username}/override/trial`,
    form,
  );

  return response;
};

export const useGenerateTrialTweet = ({
  targetMedia,
  username,
}: AgentStyleParams): GenerateTrialTweetService => {
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
    GenerateTrialTweetForm
  >({
    mutationFn: (form) =>
      generateTrialTweet({ params: { targetMedia, username }, form }),
  });

  return {
    generateTrialTweet: mutate,
    generateTrialTweetAsync: mutateAsync,
    generateTrialTweetStatus: {
      data,
      error,
      status,
      isPending,
      isError,
      isSuccess,
      isPaused,
      isIdle,
    },
    resetGeneratedTrialTweet: reset,
  };
};
