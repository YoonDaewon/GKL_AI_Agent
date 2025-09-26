import type {
  Conversation,
  GrantProposal,
  Knowledges,
  TweetConversationDetail,
} from "@/domain/jessexbt.domain";
import type { HttpErrorResponse } from "@/domain/http.domain";
import type { UseQueryResult } from "@tanstack/react-query";

export type ConversationListQuery = UseQueryResult<
  Conversation[],
  HttpErrorResponse
>;

export interface ConversationListQueryService {
  conversations: Pick<ConversationListQuery, "data">["data"];
  fetchConversations: Pick<ConversationListQuery, "refetch">["refetch"];
  queryStatus: Pick<
    ConversationListQuery,
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

export type ConversationQuery = UseQueryResult<
  TweetConversationDetail,
  HttpErrorResponse
>;

export interface ConversationQueryService {
  conversation: Pick<ConversationQuery, "data">["data"];
  fetchConversation: Pick<ConversationQuery, "refetch">["refetch"];
  queryStatus: Pick<
    ConversationQuery,
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

export type KnowledgesQuery = UseQueryResult<Knowledges, HttpErrorResponse>;

export interface KnowledgesQueryService {
  knowledges: Pick<KnowledgesQuery, "data">["data"];
  fetchKnowledges: Pick<KnowledgesQuery, "refetch">["refetch"];
  queryStatus: Pick<
    KnowledgesQuery,
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

export type GrantProposalListQuery = UseQueryResult<
  GrantProposal[],
  HttpErrorResponse
>;

export interface GrantProposalListQueryService {
  proposals: Pick<GrantProposalListQuery, "data">["data"];
  fetchProposals: Pick<GrantProposalListQuery, "refetch">["refetch"];
  queryStatus: Pick<
    GrantProposalListQuery,
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
