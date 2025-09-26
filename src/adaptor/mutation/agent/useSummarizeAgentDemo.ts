import { AgentStyleParams } from "@/domain/agent.domain";
import type {
  HttpErrorResponse,
  MediumServerResponse,
} from "@/domain/http.domain";
import type {
  GeneratedSummarizeDemo,
  SummarizeAgentDemoForm,
} from "@/domain/medium.domain";
import { SummarizeAgentDemoService } from "@/port/agent.port";

import { MediumService } from "@/service/http/medium.service";
import { useMutation } from "@tanstack/react-query";

const { POST } = MediumService;

const GENERATE_TWEET_URL = "/internal-pr-workflow/style-analysis";

const generateSummarizeAgentDemo = async ({
  params,
  form,
}: {
  params: AgentStyleParams;
  form: SummarizeAgentDemoForm;
}) => {
  const { targetMedia, username } = params;
  const response = await POST<GeneratedSummarizeDemo, SummarizeAgentDemoForm>(
    `${GENERATE_TWEET_URL}/${targetMedia}/${username}/override/trial`,
    form,
  );

  return response;
};

export const useGenerateSummarizeAgentDemo = ({
  targetMedia,
  username,
}: AgentStyleParams): SummarizeAgentDemoService => {
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
    MediumServerResponse<GeneratedSummarizeDemo>,
    HttpErrorResponse,
    SummarizeAgentDemoForm
  >({
    mutationFn: (form) =>
      generateSummarizeAgentDemo({ params: { targetMedia, username }, form }),
  });

  return {
    generateSummaryDemo: mutate,
    generateSummaryDemoAsync: mutateAsync,
    generateSummaryDemoStatus: {
      data,
      error,
      status,
      isPending,
      isError,
      isSuccess,
      isPaused,
      isIdle,
    },
    resetGenerateSummaryDemo: reset,
  };
};
