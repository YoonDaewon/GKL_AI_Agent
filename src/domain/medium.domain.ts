export type MediumPost = {
  id: number;
  title: string;
  link: string;
  pubDate: string;
  author: string;
  imageUrls: string[];
};

export type GenerateTweetForm = {
  mediumPostId: number;
  tweetStyleUsername: string;
};
export type GeneratedTweet = {
  content: string;
  hashtags: string[];
};

export type GeneratedSummarizeDemo = {
  content: string;
  hashtags?: string[];
};

export type GenerateTelegramForm = {
  mediumPostId: number;
  telegramStyleUsername: string;
};
export type GeneratedTelegram = {
  content: string;
};

export type GenerateSocialContentForm = {
  twitter: GenerateTweetForm;
  telegram: GenerateTelegramForm;
};
export type GeneratedSocialContent = {
  twitter: GeneratedTweet;
  telegram: GeneratedTelegram;
};

export type GenerateTrialTweetForm = {
  customRule: string;
  mediumPostId: number;
};

export type SummarizeAgentDemoForm = {
  mediumPostId: number;
  customRule: string;
};
