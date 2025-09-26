export type AgentStyle = {
  tone: string;
  grammar: string;
  punctuation: string;
  overallStyle: string;
  version: number;
  customRule: string;
};

export type AgentStyleParams = {
  targetMedia: string;
  username: string;
};

export type QuoteAgentStyleParams = Pick<AgentStyleParams, "username">;

export type UpdateAgentStyleForm = Pick<AgentStyle, "customRule">;

export type AddFollowingAccountForm = {
  usernames: string[];
};

export type QnA = {
  category: string;
  no: string;
  question: string;
  answer: string;
};

export type UpdateQnAForm = QnA[];

export type AgentMetadata = {
  id: number;
  serviceName: string;
  isActive: boolean;
};
export type UpdateMetadataForm = Pick<AgentMetadata, "isActive">;
export type UpdateCronjobStatusForm = {
  status: boolean;
};
