import type {
  HttpErrorResponse,
  MediumServerResponse,
} from "@/domain/http.domain";
import type {
  GenerateTweetForm,
  GenerateTelegramForm,
  GeneratedTweet,
  GeneratedTelegram,
  GenerateSocialContentForm,
  GeneratedSocialContent,
} from "@/domain/medium.domain";
import type { GenerateSocialContentService } from "@/port/medium.port";
import { MediumService } from "@/service/http/medium.service";
import { useMutation } from "@tanstack/react-query";

const { POST } = MediumService;

const GENERATE_TWEET_URL = "/internal-pr-workflow/medium-posts/generate-tweet";
const GENERATE_TELEGRAM_URL =
  "/internal-pr-workflow/medium-posts/generate-telegram";

const generateTelegram = async (form: GenerateTelegramForm) => {
  const response = await POST<GeneratedTelegram, GenerateTelegramForm>(
    GENERATE_TELEGRAM_URL,
    form,
  );

  return response;
};

const generateTweet = async (form: GenerateTweetForm) => {
  const response = await POST<GeneratedTweet, GenerateTweetForm>(
    GENERATE_TWEET_URL,
    form,
  );

  return response;
};
const generateSocialContent = async (form: GenerateSocialContentForm) => {
  const twitterResponse = await generateTweet(form.twitter);
  const telegramResponse = await generateTelegram(form.telegram);

  return {
    twitter: twitterResponse,
    telegram: telegramResponse,
  };
};

export const useGenerateSocialContents = (): GenerateSocialContentService => {
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
    MediumServerResponse<GeneratedSocialContent>,
    HttpErrorResponse,
    GenerateSocialContentForm
  >({
    mutationFn: (form) => generateSocialContent(form),
  });

  return {
    generateSocialContent: mutate,
    generateSocialContentAsync: mutateAsync,
    generateSocialContentStatus: {
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
