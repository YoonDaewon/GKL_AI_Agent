export type TwitterPost = {
  tweetId: string;
  recommendedText: string;
  text: string;
  url: string;
  tweetCreatedAt: string;
  userName: string;
};

export type TwitterPostQueryResponse = {
  tweets: TwitterPost[];
  total: number;
};

export type QuoteAgentDemoForm = {
  tweetText: string;
  customRule: string;
};

export type GeneratedQuoteDemo = {
  recommendedText: string;
  recommendedTextByTone: string;
  recommendedReason: string;
};

export type FollowingAccounts = {
  username: string;
};
