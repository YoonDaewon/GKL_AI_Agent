import type {
  GeneratedSocialContent,
  GeneratedTelegram,
  GeneratedTweet,
  GenerateSocialContentForm,
  GenerateTelegramForm,
  GenerateTrialTweetForm,
  GenerateTweetForm,
  MediumPost,
} from "@/domain/medium.domain";
import type {
  HttpErrorResponse,
  MediumServerResponse,
} from "@/domain/http.domain";
import type { UseMutationResult, UseQueryResult } from "@tanstack/react-query";

export type MediumQuery = UseQueryResult<
  MediumServerResponse<MediumPost[]>,
  HttpErrorResponse
>;

export interface MediumPostQueryService {
  mediumPosts: Pick<MediumQuery, "data">["data"];
  fetchPosts: Pick<MediumQuery, "refetch">["refetch"];
  queryStatus: Pick<
    MediumQuery,
    | "status"
    | "error"
    | "isPending"
    | "isError"
    | "isSuccess"
    | "isPaused"
    | "isFetching"
    | "isLoading"
    | "failureReason"
  >;
}

export type GenerateTweetMutation = UseMutationResult<
  MediumServerResponse<GeneratedTweet>,
  HttpErrorResponse,
  GenerateTweetForm
>;

export interface GenerateTweetService {
  generateTweet: Pick<GenerateTweetMutation, "mutate">["mutate"];
  generateTweetAsync: Pick<GenerateTweetMutation, "mutateAsync">["mutateAsync"];
  generateTweetStatus: Pick<
    GenerateTweetMutation,
    | "data"
    | "error"
    | "status"
    | "isPending"
    | "isError"
    | "isSuccess"
    | "isPaused"
    | "isIdle"
  >;
  resetGeneratedTweet: Pick<GenerateTweetMutation, "reset">["reset"];
}

export type GenerateTelegramMutation = UseMutationResult<
  MediumServerResponse<GeneratedTelegram>,
  HttpErrorResponse,
  GenerateTelegramForm
>;

export interface GenerateTelegramService {
  generateTelegram: Pick<GenerateTelegramMutation, "mutate">["mutate"];
  generateTelegramAsync: Pick<
    GenerateTelegramMutation,
    "mutateAsync"
  >["mutateAsync"];
  generateTelegramStatus: Pick<
    GenerateTelegramMutation,
    | "data"
    | "error"
    | "status"
    | "isPending"
    | "isError"
    | "isSuccess"
    | "isPaused"
    | "isIdle"
  >;
  resetGenerateTelegram: Pick<GenerateTelegramMutation, "reset">["reset"];
}

export type GenerateSocialContentMutation = UseMutationResult<
  MediumServerResponse<GeneratedSocialContent>,
  HttpErrorResponse,
  GenerateSocialContentForm
>;

export interface GenerateSocialContentService {
  generateSocialContent: Pick<
    GenerateSocialContentMutation,
    "mutate"
  >["mutate"];
  generateSocialContentAsync: Pick<
    GenerateSocialContentMutation,
    "mutateAsync"
  >["mutateAsync"];
  generateSocialContentStatus: Pick<
    GenerateSocialContentMutation,
    | "data"
    | "error"
    | "status"
    | "isPending"
    | "isError"
    | "isSuccess"
    | "isPaused"
    | "isIdle"
  >;
}

export type GenerateTrialTweetMutation = UseMutationResult<
  MediumServerResponse<GeneratedTweet>,
  HttpErrorResponse,
  GenerateTrialTweetForm
>;

export interface GenerateTrialTweetService {
  generateTrialTweet: Pick<GenerateTrialTweetMutation, "mutate">["mutate"];
  generateTrialTweetAsync: Pick<
    GenerateTrialTweetMutation,
    "mutateAsync"
  >["mutateAsync"];
  generateTrialTweetStatus: Pick<
    GenerateTrialTweetMutation,
    | "data"
    | "error"
    | "status"
    | "isPending"
    | "isError"
    | "isSuccess"
    | "isPaused"
    | "isIdle"
  >;
  resetGeneratedTrialTweet: Pick<GenerateTrialTweetMutation, "reset">["reset"];
}
