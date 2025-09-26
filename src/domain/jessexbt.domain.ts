export type Conversation = {
  id: number;
  summary: string;
  conversationId: string;
  ownerUsername: string;
  targetUsername: string;
  updatedAt: string;
};

export type TweetConversation = {
  tweetId: string;
  content: string;
  createdAt: string;
  authorUsername: string;
};

export type TweetConversationDetail = {
  titleTweet: TweetConversation;
  conversationTweets: TweetConversation[];
};

export type Knowledges = {
  realtime: {
    twitter: {
      "@jessepollak": {
        counts: string;
        lastReceivedAt: string;
      };
      "@jessepollak +mention": {
        counts: string;
        lastReceivedAt: string;
      };
      "@jessexbt": {
        counts: string;
        lastReceivedAt: string;
      };
      "@jessexbt +mention": {
        counts: string;
        lastReceivedAt: string;
      };
    };
  };
  periodic: {
    sites: {
      [key: string]: {
        counts: string;
        urls: string[];
        lastFetchedAt: string;
      };
    };
  };
};

export type GrantProposal = {
  id: number;
  conversationId: string;
  ownerUsername: string;
  targetUsername: string;
  report: string;
  reason: string;
  grantAmount: string;
  isGranted: boolean;
  isConfirmed: boolean;
  createdAt: string;
};
