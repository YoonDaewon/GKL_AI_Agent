import type { FollowingAccounts, TwitterPost } from "@/domain/twitter.domain";
import type {
  HttpErrorResponse,
  TwitterServerResponse,
} from "@/domain/http.domain";
import type { UseQueryResult } from "@tanstack/react-query";

export type TweetQuery = UseQueryResult<
  TwitterServerResponse<TwitterPost[]>,
  HttpErrorResponse
>;

export interface TweetQueryService {
  tweets: Pick<TweetQuery, "data">["data"];
  fetchTweet: Pick<TweetQuery, "refetch">["refetch"];
  queryStatus: Pick<
    TweetQuery,
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

export type FollowingAccountsQuery = UseQueryResult<
  TwitterServerResponse<FollowingAccounts[]>,
  HttpErrorResponse
>;

export interface FollowingAccountsQueryService {
  followingAccounts: Pick<FollowingAccountsQuery, "data">["data"];
  fetchFollowingAccounts: Pick<FollowingAccountsQuery, "refetch">["refetch"];
  queryStatus: Pick<
    FollowingAccountsQuery,
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
