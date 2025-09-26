import { TWITTER_SERVER_ENDPOINT } from "@/constant/url";
import {
  AgentStyle,
  AgentStyleParams,
  UpdateAgentStyleForm,
} from "@/domain/agent.domain";
import type {
  HttpErrorResponse,
  TwitterServerResponse,
} from "@/domain/http.domain";
import { UpdateQuoteAgentStyleMutationService } from "@/port/agent.port";

import { TwitterService } from "@/service/http/twitter.service";
import { useMutation } from "@tanstack/react-query";

const { POST } = TwitterService;

const updateQuoteAgentStyle = async (
  params: AgentStyleParams,
  form: UpdateAgentStyleForm,
) => {
  const response = await POST<AgentStyle, UpdateAgentStyleForm>(
    `${TWITTER_SERVER_ENDPOINT.ADMIN.QUOTE_OVERRIDE}/${params.username}/override`,
    form,
  );

  return response;
};

export const useUpdateQuoteAgentStyle =
  (): UpdateQuoteAgentStyleMutationService => {
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
      TwitterServerResponse<AgentStyle>,
      HttpErrorResponse,
      {
        params: AgentStyleParams;
        form: UpdateAgentStyleForm;
      }
    >({
      mutationFn: ({ params, form }) => updateQuoteAgentStyle(params, form),
    });

    return {
      updateQuoteAgentStyle: mutate,
      updateQuoteAgentStyleAsync: mutateAsync,
      updateQuoteAgentStyleStatus: {
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
