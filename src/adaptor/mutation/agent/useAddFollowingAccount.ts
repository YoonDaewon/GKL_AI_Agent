import { TWITTER_SERVER_ENDPOINT } from "@/constant/url";
import { AddFollowingAccountForm } from "@/domain/agent.domain";
import type {
  HttpErrorResponse,
  TwitterServerResponse,
} from "@/domain/http.domain";
import { AddFollowingAccountService } from "@/port/agent.port";

import { TwitterService } from "@/service/http/twitter.service";
import { useMutation } from "@tanstack/react-query";

const { POST } = TwitterService;

const addFollowingAccount = async ({ usernames }: AddFollowingAccountForm) => {
  const response = await POST<{ command: string }, AddFollowingAccountForm>(
    `${TWITTER_SERVER_ENDPOINT.ADMIN.FOLLOWING}`,
    { usernames },
    {
      onUploadProgress: (progressEvent) => {
        const progress = Math.round(
          (progressEvent.loaded / (progressEvent.total ?? 0)) * 100,
        );
      },
    },
  );

  return response;
};

export const useAddFollowingAccount = (): AddFollowingAccountService => {
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
    TwitterServerResponse<{ command: string }>,
    HttpErrorResponse,
    AddFollowingAccountForm
  >({
    mutationFn: ({ usernames }: AddFollowingAccountForm) =>
      addFollowingAccount({ usernames }),
  });

  return {
    addFollowingAccount: mutate,
    addFollowingAccountAsync: mutateAsync,
    addFollowingAccountStatus: {
      data,
      error,
      status,
      isPending,
      isError,
      isSuccess,
      isPaused,
      isIdle,
    },
    resetAddFollowingAccount: reset,
  };
};
