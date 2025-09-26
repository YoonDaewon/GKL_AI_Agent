import { TWITTER_SERVER_ENDPOINT } from "@/constant/url";
import type {
  HttpErrorResponse,
  TwitterServerResponse,
} from "@/domain/http.domain";
import {
  GeneratedQuoteDemo,
  QuoteAgentDemoForm,
} from "@/domain/twitter.domain";
import { QuoteAgentDemoService } from "@/port/agent.port";

import { TwitterService } from "@/service/http/twitter.service";
import { useMutation } from "@tanstack/react-query";

const { POST } = TwitterService;

const generateQuoteAgentDemo = async ({
  username,
  form,
}: {
  username: string;
  form: QuoteAgentDemoForm;
}) => {
  const response = await POST<GeneratedQuoteDemo, QuoteAgentDemoForm>(
    `${TWITTER_SERVER_ENDPOINT.ADMIN.QUOTE_TRIAL}/${username}/override/trial`,
    form,
  );

  return response;
};

export const useGenerateQuoteAgentDemo = ({
  username,
}: {
  username: string;
}): QuoteAgentDemoService => {
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
    TwitterServerResponse<GeneratedQuoteDemo>,
    HttpErrorResponse,
    QuoteAgentDemoForm
  >({
    mutationFn: (form) => generateQuoteAgentDemo({ username, form }),
  });

  return {
    generateQuoteDemo: mutate,
    generateQuoteDemoAsync: mutateAsync,
    generateQuoteDemoStatus: {
      data,
      error,
      status,
      isPending,
      isError,
      isSuccess,
      isPaused,
      isIdle,
    },
    resetGenerateQuoteDemo: reset,
  };
};
