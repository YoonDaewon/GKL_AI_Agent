import {
  AgentStyle,
  AgentStyleParams,
  UpdateAgentStyleForm,
} from "@/domain/agent.domain";
import type {
  HttpErrorResponse,
  MediumServerResponse,
} from "@/domain/http.domain";
import { UpdateAgentStyleMutationService } from "@/port/agent.port";

import { MediumService } from "@/service/http/medium.service";
import { useMutation } from "@tanstack/react-query";

const { POST } = MediumService;

const updateAgentStyle = async (
  params: AgentStyleParams,
  form: UpdateAgentStyleForm,
) => {
  const GENERATE_TWEET_URL = `/internal-pr-workflow/style-analysis/${params.targetMedia}/${params.username}/override`;
  const response = await POST<AgentStyle, UpdateAgentStyleForm>(
    GENERATE_TWEET_URL,
    form,
  );

  return response;
};

export const useUpdateAgentStyle = (): UpdateAgentStyleMutationService => {
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
  } = useMutation<
    MediumServerResponse<AgentStyle>,
    HttpErrorResponse,
    {
      params: AgentStyleParams;
      form: UpdateAgentStyleForm;
    }
  >({
    mutationFn: ({ params, form }) => updateAgentStyle(params, form),
  });

  return {
    updateAgentStyle: mutate,
    updateAgentStyleAsync: mutateAsync,
    updateAgentStyleStatus: {
      data,
      error,
      status,
      isPending,
      isError,
      isSuccess,
      isPaused,
      isIdle,
    },
  };
};
