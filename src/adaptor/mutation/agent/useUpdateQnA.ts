import { MEDIUM_SERVER_VERSION } from "@/constant/url";
import { UpdateQnAForm } from "@/domain/agent.domain";
import type {
  HttpErrorResponse,
  MediumServerResponse,
} from "@/domain/http.domain";
import { UpdateQnAMutationService } from "@/port/agent.port";

import { MediumService } from "@/service/http/medium.service";
import { useMutation } from "@tanstack/react-query";
import { AxiosProgressEvent } from "axios";

const { POST } = MediumService;

const updateQnAList = async (
  items: UpdateQnAForm,
  name: string,
  onPostComplete: (progressEvent: AxiosProgressEvent) => void,
) => {
  const GENERATE_TWEET_URL = `/${MEDIUM_SERVER_VERSION}/crawler-management/import-qna/${name}`;
  const response = await POST<{ message: string }, { items: UpdateQnAForm }>(
    GENERATE_TWEET_URL,
    {
      items,
    },
    {
      onUploadProgress: onPostComplete,
    },
  );

  return response;
};

export const useUpdateQnAList = (name: string): UpdateQnAMutationService => {
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
    {
      items: UpdateQnAForm;
      onPostComplete: (progressEvent: AxiosProgressEvent) => void;
    }
  >({
    mutationFn: ({ items, onPostComplete }) =>
      updateQnAList(items, name, onPostComplete),
  });

  return {
    updateQnA: mutate,
    updateQnAAsync: mutateAsync,
    updateQnAStatus: {
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
