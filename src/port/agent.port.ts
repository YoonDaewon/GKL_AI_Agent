import type {
  HttpErrorResponse,
  MediumServerResponse,
  TwitterServerResponse,
} from "@/domain/http.domain";
import type { UseQueryResult, UseMutationResult } from "@tanstack/react-query";
import {
  AddFollowingAccountForm,
  AgentMetadata,
  AgentStyle,
  AgentStyleParams,
  QnA,
  UpdateAgentStyleForm,
  UpdateCronjobStatusForm,
  UpdateMetadataForm,
  UpdateQnAForm,
} from "@/domain/agent.domain";
import {
  GeneratedSummarizeDemo,
  SummarizeAgentDemoForm,
} from "@/domain/medium.domain";
import {
  GeneratedQuoteDemo,
  QuoteAgentDemoForm,
} from "@/domain/twitter.domain";
import { AxiosProgressEvent } from "axios";

export type AgentStyleQuery = UseQueryResult<
  MediumServerResponse<AgentStyle>,
  HttpErrorResponse
>;

export interface AgentStyleQueryService {
  agentStyle: Pick<AgentStyleQuery, "data">["data"];
  fetchAgentStyle: Pick<AgentStyleQuery, "refetch">["refetch"];
  queryStatus: Pick<
    AgentStyleQuery,
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

export type QuoteAgentStyleQuery = UseQueryResult<
  TwitterServerResponse<AgentStyle>,
  HttpErrorResponse
>;

export interface QuoteAgentStyleQueryService {
  quoteAgentStyle: Pick<QuoteAgentStyleQuery, "data">["data"];
  fetchQuoteAgentStyle: Pick<QuoteAgentStyleQuery, "refetch">["refetch"];
  queryStatus: Pick<
    QuoteAgentStyleQuery,
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

export type UpdateAgentStyleMutation = UseMutationResult<
  MediumServerResponse<AgentStyle>,
  HttpErrorResponse,
  {
    params: AgentStyleParams;
    form: UpdateAgentStyleForm;
  }
>;

export interface UpdateAgentStyleMutationService {
  updateAgentStyle: Pick<UpdateAgentStyleMutation, "mutate">["mutate"];
  updateAgentStyleAsync: Pick<
    UpdateAgentStyleMutation,
    "mutateAsync"
  >["mutateAsync"];
  updateAgentStyleStatus: Pick<
    UpdateAgentStyleMutation,
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

export type UpdateQuoteAgentStyleMutation = UseMutationResult<
  TwitterServerResponse<AgentStyle>,
  HttpErrorResponse,
  {
    params: AgentStyleParams;
    form: UpdateAgentStyleForm;
  }
>;

export interface UpdateQuoteAgentStyleMutationService {
  updateQuoteAgentStyle: Pick<
    UpdateQuoteAgentStyleMutation,
    "mutate"
  >["mutate"];
  updateQuoteAgentStyleAsync: Pick<
    UpdateQuoteAgentStyleMutation,
    "mutateAsync"
  >["mutateAsync"];
  updateQuoteAgentStyleStatus: Pick<
    UpdateQuoteAgentStyleMutation,
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

export type SummarizeAgentDemoMutation = UseMutationResult<
  MediumServerResponse<GeneratedSummarizeDemo>,
  HttpErrorResponse,
  SummarizeAgentDemoForm
>;

export interface SummarizeAgentDemoService {
  generateSummaryDemo: Pick<SummarizeAgentDemoMutation, "mutate">["mutate"];
  generateSummaryDemoAsync: Pick<
    SummarizeAgentDemoMutation,
    "mutateAsync"
  >["mutateAsync"];
  generateSummaryDemoStatus: Pick<
    SummarizeAgentDemoMutation,
    | "data"
    | "error"
    | "status"
    | "isPending"
    | "isError"
    | "isSuccess"
    | "isPaused"
    | "isIdle"
  >;
  resetGenerateSummaryDemo: Pick<SummarizeAgentDemoMutation, "reset">["reset"];
}

export type QuoteAgentDemoMutation = UseMutationResult<
  TwitterServerResponse<GeneratedQuoteDemo>,
  HttpErrorResponse,
  QuoteAgentDemoForm
>;

export interface QuoteAgentDemoService {
  generateQuoteDemo: Pick<QuoteAgentDemoMutation, "mutate">["mutate"];
  generateQuoteDemoAsync: Pick<
    QuoteAgentDemoMutation,
    "mutateAsync"
  >["mutateAsync"];
  generateQuoteDemoStatus: Pick<
    QuoteAgentDemoMutation,
    | "data"
    | "error"
    | "status"
    | "isPending"
    | "isError"
    | "isSuccess"
    | "isPaused"
    | "isIdle"
  >;
  resetGenerateQuoteDemo: Pick<QuoteAgentDemoMutation, "reset">["reset"];
}

export type DeleteFollowingAccountMutation = UseMutationResult<
  TwitterServerResponse<{ command: string }>,
  HttpErrorResponse,
  string[]
>;

export interface DeleteFollowingAccountService {
  deleteFollowingAccount: Pick<
    DeleteFollowingAccountMutation,
    "mutate"
  >["mutate"];
  deleteFollowingAccountAsync: Pick<
    DeleteFollowingAccountMutation,
    "mutateAsync"
  >["mutateAsync"];
  deleteFollowingAccountStatus: Pick<
    DeleteFollowingAccountMutation,
    | "data"
    | "error"
    | "status"
    | "isPending"
    | "isError"
    | "isSuccess"
    | "isPaused"
    | "isIdle"
  >;
  resetDeleteFollowingAccount: Pick<
    DeleteFollowingAccountMutation,
    "reset"
  >["reset"];
}

export type AddFollowingAccountMutation = UseMutationResult<
  TwitterServerResponse<{ command: string }>,
  HttpErrorResponse,
  AddFollowingAccountForm
>;

export interface AddFollowingAccountService {
  addFollowingAccount: Pick<AddFollowingAccountMutation, "mutate">["mutate"];
  addFollowingAccountAsync: Pick<
    AddFollowingAccountMutation,
    "mutateAsync"
  >["mutateAsync"];
  addFollowingAccountStatus: Pick<
    AddFollowingAccountMutation,
    | "data"
    | "error"
    | "status"
    | "isPending"
    | "isError"
    | "isSuccess"
    | "isPaused"
    | "isIdle"
  >;
  resetAddFollowingAccount: Pick<AddFollowingAccountMutation, "reset">["reset"];
}

export type QnAQuery = UseQueryResult<
  MediumServerResponse<QnA[]>,
  HttpErrorResponse
>;

export interface QnAQueryService {
  qna: Pick<QnAQuery, "data">["data"];
  fetchQna: Pick<QnAQuery, "refetch">["refetch"];
  queryStatus: Pick<
    QnAQuery,
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

export type UpdateQnAMutation = UseMutationResult<
  MediumServerResponse<{ message: string }>,
  HttpErrorResponse,
  {
    items: UpdateQnAForm;
    onPostComplete: (progressEvent: AxiosProgressEvent) => void;
  }
>;

export interface UpdateQnAMutationService {
  updateQnA: Pick<UpdateQnAMutation, "mutate">["mutate"];
  updateQnAAsync: Pick<UpdateQnAMutation, "mutateAsync">["mutateAsync"];
  updateQnAStatus: Pick<
    UpdateQnAMutation,
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

export type AgentMetadataQuery = UseQueryResult<
  MediumServerResponse<AgentMetadata[]>,
  HttpErrorResponse
>;

export interface AgentMetadataQueryService {
  agentMetadata: Pick<AgentMetadataQuery, "data">["data"];
  fetchAgentMetadata: Pick<AgentMetadataQuery, "refetch">["refetch"];
  queryStatus: Pick<
    AgentMetadataQuery,
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

export type UpdateAgentMetadata = UseMutationResult<
  MediumServerResponse<{ message: string }>,
  HttpErrorResponse,
  UpdateMetadataForm
>;

export interface UpdateAgentMetadataService {
  updateMetadata: Pick<UpdateAgentMetadata, "mutate">["mutate"];
  updateMetadataAsync: Pick<UpdateAgentMetadata, "mutateAsync">["mutateAsync"];
  updateMetadataStatus: Pick<
    UpdateAgentMetadata,
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

export type CronjobStatusQuery = UseQueryResult<
  MediumServerResponse<boolean>,
  HttpErrorResponse
>;

export interface CronjobStatusQueryService {
  cronjobStatus: Pick<CronjobStatusQuery, "data">["data"];
  fetchCronjobStatus: Pick<CronjobStatusQuery, "refetch">["refetch"];
  queryStatus: Pick<
    CronjobStatusQuery,
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

export type UpdateCronjobStatus = UseMutationResult<
  TwitterServerResponse<string>,
  HttpErrorResponse,
  UpdateCronjobStatusForm
>;

export interface UpdateCronjobStatusService {
  updateCronjobStatus: Pick<UpdateCronjobStatus, "mutate">["mutate"];
  updateCronjobStatusAsync: Pick<
    UpdateCronjobStatus,
    "mutateAsync"
  >["mutateAsync"];
  updateCronjobStatusStatus: Pick<
    UpdateCronjobStatus,
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
