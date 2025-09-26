import { UpdateCronjobStatusForm } from "@/domain/agent.domain";
import type {
  HttpErrorResponse,
  TwitterServerResponse,
} from "@/domain/http.domain";
import { UpdateCronjobStatusService } from "@/port/agent.port";

import { TwitterService } from "@/service/http/twitter.service";
import { useMutation } from "@tanstack/react-query";

const { POST } = TwitterService;

const updateCronjobStatus = async (form: UpdateCronjobStatusForm) => {
  const { status } = form;
  const endpoint = `/x/${status ? "enable" : "disable"}_cron_job`;

  const response = await POST<string, UpdateCronjobStatusForm>(endpoint, form);

  return response;
};

export const useUpdateCronjobStatus = (): UpdateCronjobStatusService => {
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
    TwitterServerResponse<string>,
    HttpErrorResponse,
    UpdateCronjobStatusForm
  >({
    mutationFn: (form) => updateCronjobStatus(form),
  });

  return {
    updateCronjobStatus: mutate,
    updateCronjobStatusAsync: mutateAsync,
    updateCronjobStatusStatus: {
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
