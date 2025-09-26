import { TWITTER_SERVER_ENDPOINT } from "@/constant/url";
import type {
  HttpErrorResponse,
  TwitterServerResponse,
} from "@/domain/http.domain";
import { DeleteFollowingAccountService } from "@/port/agent.port";

import { TwitterService } from "@/service/http/twitter.service";
import { useMutation } from "@tanstack/react-query";

const { DELETE } = TwitterService;

const deleteFollowingAccount = async ({
  usernames,
}: {
  usernames: string[];
}) => {
  const usernamesParams = usernames.reduce((acc, current, index) => {
    if (index === 0) {
      const parameter = `?usernames=${current}`;
      return parameter;
    }
    return `${acc}&usernames=${current}`;
  }, "");
  const response = await DELETE<{ command: string }>(
    `${TWITTER_SERVER_ENDPOINT.ADMIN.FOLLOWING}${usernamesParams}`,
  );

  return response;
};

export const useDeleteFollowingAccount = (): DeleteFollowingAccountService => {
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
    string[]
  >({
    mutationFn: (usernames: string[]) => deleteFollowingAccount({ usernames }),
  });

  return {
    deleteFollowingAccount: mutate,
    deleteFollowingAccountAsync: mutateAsync,
    deleteFollowingAccountStatus: {
      data,
      error,
      status,
      isPending,
      isError,
      isSuccess,
      isPaused,
      isIdle,
    },
    resetDeleteFollowingAccount: reset,
  };
};
