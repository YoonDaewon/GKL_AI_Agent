"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TweetQuoteAgentAdmin } from "@/components/form/tweet-quote-agent-admin";
import { TwitterFollowingAccountsAdmin } from "@/components/form/twitter-following-admin";

export const TweetQuoteAgentSettingPage = () => {
  return (
    <Tabs defaultValue="agent" className="w-full">
      <TabsList className="grid w-fit grid-cols-2">
        <TabsTrigger value="agent">Agent</TabsTrigger>
        <TabsTrigger value="influencer">Influencer</TabsTrigger>
      </TabsList>
      <TabsContent value="agent">
        <TweetQuoteAgentAdmin />
      </TabsContent>
      <TabsContent value="influencer">
        <TwitterFollowingAccountsAdmin />
      </TabsContent>
    </Tabs>
  );
};
