import { MEDIUM_SERVER_VERSION } from "@/constant/url";
import { UpdateMetadataForm } from "@/domain/agent.domain";
import type {
  HttpErrorResponse,
  MediumServerResponse,
} from "@/domain/http.domain";
import { UpdateAgentMetadataService } from "@/port/agent.port";

import { MediumService } from "@/service/http/medium.service";
import { useMutation } from "@tanstack/react-query";

const { POST } = MediumService;

const updateAgentMetadata = async (form: UpdateMetadataForm, name: string) => {
  const GENERATE_TWEET_URL = `/${MEDIUM_SERVER_VERSION}/crawler-management/update-agent-metadata/${name}`;
  const response = await POST<{ message: string }, UpdateMetadataForm>(
    GENERATE_TWEET_URL,
    form,
  );

  return response;
};

export const useUpdateAgentMetadata = ({
  name,
}: {
  name: string;
}): UpdateAgentMetadataService => {
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
    MediumServerResponse<{ message: string }>,
    HttpErrorResponse,
    UpdateMetadataForm
  >({
    mutationFn: (form) => updateAgentMetadata(form, name),
  });

  return {
    updateMetadata: mutate,
    updateMetadataAsync: mutateAsync,
    updateMetadataStatus: {
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
