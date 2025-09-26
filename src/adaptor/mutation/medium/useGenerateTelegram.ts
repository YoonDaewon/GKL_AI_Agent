import type {
  HttpErrorResponse,
  MediumServerResponse,
} from "@/domain/http.domain";
import type {
  GenerateTelegramForm,
  GeneratedTelegram,
} from "@/domain/medium.domain";
import type { GenerateTelegramService } from "@/port/medium.port";
import { MediumService } from "@/service/http/medium.service";
import { useMutation } from "@tanstack/react-query";

const { POST } = MediumService;

const GENERATE_TELEGRAM_URL =
  "/internal-pr-workflow/medium-posts/generate-telegram";

const generateTelegram = async (form: GenerateTelegramForm) => {
  const response = await POST<GeneratedTelegram, GenerateTelegramForm>(
    GENERATE_TELEGRAM_URL,
    form,
  );

  return response;
};

export const useGenerateTelegram = (): GenerateTelegramService => {
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
    MediumServerResponse<GeneratedTelegram>,
    HttpErrorResponse,
    GenerateTelegramForm
  >({
    mutationFn: (form) => generateTelegram(form),
  });

  return {
    generateTelegram: mutate,
    generateTelegramAsync: mutateAsync,
    generateTelegramStatus: {
      data,
      error,
      status,
      isPending,
      isError,
      isSuccess,
      isPaused,
      isIdle,
    },
    resetGenerateTelegram: reset,
  };
};
