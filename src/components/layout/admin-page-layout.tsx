"use client";

import { useState } from "react";
import { SiMedium, SiTelegram, SiX } from "@icons-pack/react-simple-icons";
import { MediumToTweetAgentSettingPage } from "@/components/page/medium-tweet-agent-setting-page";
import { QnaAgentSettingPage } from "@/components/page/qna-agent-setting-page";
import { RetweetAgentSettingPage } from "@/components/page/retweet-agent-setting-page";
import { TweetQuoteAgentSettingPage } from "@/components/page/tweet-quote-agent-setting-page";
import { MediumToTelegramAgentSettingPage } from "@/components/page/medium-telegram-agent-setting-page";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const agents = {
  MED_TO_TW: "medium-to-twitter",
  MED_TO_TG: "medium-to-telegram",
  TW_QUOTE: "twitter-quote",
  TG_QA: "qa-telegram",
  RETWEET: "retweet",
};

export const AdminPageLayout = () => {
  const [selectedAgent, setSelectedAgent] = useState<string>(agents.MED_TO_TW);

  const selectAgent = (key: string) => {
    setSelectedAgent(key);
  };

  return (
    <div className="flex size-full flex-col gap-4 overflow-y-scroll bg-slate-200 p-8 pt-4">
      <div className="*:not-first:mt-2">
        <Select
          defaultValue={agents.MED_TO_TW}
          value={selectedAgent}
          onValueChange={selectAgent}
        >
          <SelectTrigger
            id="select"
            className="h-auto rounded-lg bg-background ps-2 text-left [&>span]:flex [&>span]:items-center [&>span]:gap-2 [&>span_img]:shrink-0"
          >
            <SelectValue placeholder="Choose a Agent" />
          </SelectTrigger>
          <SelectContent className="[&_*[role=option]>span]:end-2 [&_*[role=option]>span]:start-auto [&_*[role=option]]:pe-8 [&_*[role=option]]:ps-2">
            <SelectItem
              value={agents.MED_TO_TW}
              className="hover:cursor-pointer"
            >
              <span className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  <SiMedium className="size-8" />
                  {/* <ArrowRight className="size-4" />
                  <SiX className="size-4" /> */}
                </div>
                <span>
                  <p className="block font-medium">Medium Agent (Twitter)</p>
                  <p className="mt-0.5 block text-xs text-muted-foreground">
                    agent summarizes medium post into Tweet post
                  </p>
                </span>
              </span>
            </SelectItem>
            <SelectItem
              value={agents.MED_TO_TG}
              className="hover:cursor-pointer"
            >
              <span className="flex items-center gap-2">
                <SiMedium className="size-8" />
                <span>
                  <p className="block font-medium">Medium Agent (Telegram)</p>
                  <p className="mt-0.5 block text-xs text-muted-foreground">
                    agent summarizes medium post into Telegram message
                  </p>
                </span>
              </span>
            </SelectItem>
            <SelectItem
              value={agents.TW_QUOTE}
              className="hover:cursor-pointer"
            >
              <span className="flex items-center gap-2">
                <SiX className="size-8" />
                <span>
                  <p className="block font-medium">Twitter Quote Agent</p>
                  <p className="mt-0.5 block text-xs text-muted-foreground">
                    agent recommends related tweets and contents to quote
                  </p>
                </span>
              </span>
            </SelectItem>
            <SelectItem value={agents.TG_QA} className="hover:cursor-pointer">
              <span className="flex items-center gap-2">
                <SiTelegram className="size-8" />
                <span>
                  <p className="block font-medium">Q&A Agent</p>
                  <p className="mt-0.5 block text-xs text-muted-foreground">
                    agent for Q&A in Telegram
                  </p>
                </span>
              </span>
            </SelectItem>
            <SelectItem value={agents.RETWEET} className="hover:cursor-pointer">
              <span className="flex items-center gap-2">
                <SiX className="size-8" />
                <span>
                  <p className="block font-medium">Retweet Agent</p>
                  <p className="mt-0.5 block text-xs text-muted-foreground">
                    agent re-tweets automatically
                  </p>
                </span>
              </span>
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex w-full">
        {selectedAgent === agents.MED_TO_TW && (
          <MediumToTweetAgentSettingPage />
        )}
        {selectedAgent === agents.MED_TO_TG && (
          <MediumToTelegramAgentSettingPage />
        )}
        {selectedAgent === agents.TW_QUOTE && <TweetQuoteAgentSettingPage />}
        {selectedAgent === agents.TG_QA && <QnaAgentSettingPage />}
        {selectedAgent === agents.RETWEET && <RetweetAgentSettingPage />}
      </div>
    </div>
  );
};
