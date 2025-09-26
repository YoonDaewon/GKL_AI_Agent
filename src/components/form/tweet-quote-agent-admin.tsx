"use client";

import { useEffect, useState } from "react";
import { AgentStyle } from "@/domain/agent.domain";
import { toast } from "sonner";
import { Typewriter } from "@/components/ui/typewrite";
import { useGetQuoteAgentStyle } from "@/adaptor/query/agent/useGetQuoteAgentStyle";
import { useUpdateQuoteAgentStyle } from "@/adaptor/mutation/agent/useUpdateQuoteAgentStyle";
import { useGetTweets } from "@/adaptor/query/tweet/useGetTweets";
import { useGenerateQuoteAgentDemo } from "@/adaptor/mutation/agent/useQuoteAgentDemo";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { DotsLoader2 } from "@/components/loader/dots-loader";
import { TweetSkeleton } from "@/components/skeleton/tweet-skeleton";
import { dateToUnixTimestamp, getDayBefore } from "../layout/tweet-page-layout";

const defaultDate = dateToUnixTimestamp(getDayBefore(new Date(), 3));

export const TweetQuoteAgentAdmin = () => {
  const [agentStyle, setAgentStyle] = useState<AgentStyle | null>(null);
  const [focusedPane, setFocusedPane] = useState<"left" | "right">("left");
  const [selectedSample, setSelectedSample] = useState<string | null>(null);

  const { quoteAgentStyle, fetchQuoteAgentStyle } = useGetQuoteAgentStyle({
    username: "henrychang10000",
  });
  const {
    tweets,
    queryStatus: { isLoading: isTweetsLoading },
  } = useGetTweets({ date: defaultDate, page: 1, limit: 3 });

  const { updateQuoteAgentStyleAsync } = useUpdateQuoteAgentStyle();

  const {
    generateQuoteDemo,
    generateQuoteDemoStatus: {
      data: generatedTrialQuote,
      isPending: isGeneratingTrialQuote,
      isError: isGeneratingTrialTweetError,
      isSuccess: isGeneratingTrialTweetSuccess,
    },
    resetGenerateQuoteDemo,
  } = useGenerateQuoteAgentDemo({
    username: "henrychang10000",
  });

  const resetTrial = () => {
    if (focusedPane === "right") {
      setFocusedPane("left");
    }

    if (generatedTrialQuote) {
      resetGenerateQuoteDemo();
    }
    if (selectedSample !== null) {
      setSelectedSample(null);
    }
  };

  const modifyAgentStyle = (id: keyof AgentStyle, value: string) => {
    if (agentStyle) {
      resetTrial();
      setAgentStyle({
        ...agentStyle,
        [id]: value,
      });
    }
  };

  const requestUpdateAgentStyle = async () => {
    if (agentStyle) {
      const toastId = toast.loading("Updating Agent Style");
      try {
        const updateResult = await updateQuoteAgentStyleAsync({
          params: { targetMedia: "tweet", username: "henrychang10000" },
          form: agentStyle,
        });

        fetchQuoteAgentStyle();
        toast.success("Successfully updated", { id: toastId });
      } catch (e) {
        console.error({ e });
        toast.error("Failed to update agent style", { id: toastId });
      } finally {
      }
    }
  };

  const requestGenerateQuoteTrial = async (id: string) => {
    if (id && posts) {
      const targetTweet = posts.find((post) => post.tweetId === id);

      if (targetTweet) {
        setSelectedSample(id);

        setFocusedPane("right");

        generateQuoteDemo({
          tweetText: targetTweet.text,
          customRule: agentStyle?.customRule || "",
        });
      }
    }
  };

  const posts = tweets || [];
  // const posts = useMemo(() => tweets?.slice(0, 3), [tweets]);

  useEffect(() => {
    if (quoteAgentStyle) setAgentStyle(quoteAgentStyle);
  }, [quoteAgentStyle]);

  return (
    <div className="flex h-fit min-h-full w-full flex-col gap-4 desktop:flex-row">
      <div
        className={`flex size-full max-h-fit flex-col rounded-2xl bg-background px-6 py-8 transition-[flex-basis] duration-500 ease-in-out ${
          focusedPane === "right" &&
          (!!generatedTrialQuote || !!isGeneratingTrialQuote)
            ? "desktop:basis-1/3"
            : "desktop:basis-2/3"
        } `}
      >
        <div className="flex justify-between">
          <div>
            <p className="text-2xl font-bold">Twitter Quote Agent</p>
            <p className="text-sm font-light">
              agent recommends related tweets and contents to quote
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-3 pt-4">
          <div className="*:not-first:mt-2">
            <Label htmlFor="medium-twitter-agent-rules">Rule</Label>
            <Textarea
              className="min-h-[120px]"
              value={agentStyle?.customRule}
              onChange={(e) => modifyAgentStyle("customRule", e.target.value)}
            />
          </div>
          <div className="*:not-first:mt-2">
            <Label htmlFor="medium-twitter-agent-rules">Tone</Label>
            <Textarea
              className="min-h-[80px]"
              disabled
              readOnly
              value={agentStyle?.tone}
            />
          </div>
          <div className="*:not-first:mt-2">
            <Label htmlFor="medium-twitter-agent-rules">Grammar</Label>
            <Textarea
              className="min-h-[80px]"
              disabled
              readOnly
              value={agentStyle?.grammar}
            />
          </div>
          <div className="*:not-first:mt-2">
            <Label htmlFor="medium-twitter-agent-rules">Punctuation</Label>
            <Textarea
              className="min-h-[80px]"
              disabled
              readOnly
              value={agentStyle?.punctuation}
            />
          </div>
          <div className="*:not-first:mt-2">
            <Label htmlFor="medium-twitter-agent-rules">Overall Style</Label>
            <Textarea
              className="min-h-[80px]"
              disabled
              readOnly
              value={agentStyle?.overallStyle}
            />
          </div>
          <div className="flex justify-end">
            <Button onClick={requestUpdateAgentStyle}>Save</Button>
          </div>
        </div>
      </div>
      <div
        className={`flex max-h-fit w-full flex-col gap-8 transition-[flex-basis] duration-500 ease-in-out ${
          focusedPane === "right" &&
          (!!generatedTrialQuote || !!isGeneratingTrialQuote)
            ? "desktop:basis-2/3"
            : "desktop:basis-1/3"
        }`}
      >
        <div className="rounded-3xl bg-background px-6 py-8">
          <div>
            <p className="text-2xl font-bold">Sandbox</p>
            <p className="text-sm font-light">
              try out the agent with applied style by click one of example
              Medium post.
            </p>
          </div>
          <div className="flex flex-col gap-2 pt-4">
            {isTweetsLoading ? (
              <TweetSkeleton />
            ) : (
              posts &&
              posts.map((post) => {
                return (
                  <div
                    key={`sample-tweet-post-#-${post.tweetId}`}
                    className={`cursor-pointer rounded-lg border border-input px-4 py-2 ${selectedSample === null ? "opacity-100" : selectedSample && selectedSample === post.tweetId ? "opacity-100" : "opacity-30"}`}
                    onClick={() => requestGenerateQuoteTrial(post.tweetId)}
                  >
                    <p
                      className="text-base font-bold"
                      dangerouslySetInnerHTML={{ __html: post.text }}
                    />
                  </div>
                );
              })
            )}
          </div>
          {(!!generatedTrialQuote || !!isGeneratingTrialQuote) && (
            <div className="pt-8">
              <div className="flex w-full flex-col gap-4 desktop:flex-row">
                <div className="flex basis-full flex-col gap-1 rounded-lg desktop:w-[45%]">
                  <Label>Before</Label>
                  {isGeneratingTrialQuote ? (
                    <div className="my-4 flex justify-start">
                      <DotsLoader2 />
                    </div>
                  ) : (
                    generatedTrialQuote?.recommendedText && (
                      <div className="flex flex-col gap-1">
                        <div className="w-full min-w-[40px] rounded-2xl border border-ring bg-transparent p-4 font-semibold">
                          <Typewriter
                            delay={1}
                            texts={[generatedTrialQuote.recommendedText]}
                          />
                        </div>
                      </div>
                    )
                  )}
                </div>

                <div className="flex basis-full flex-col gap-1 rounded-lg desktop:w-[45%]">
                  <Label>After</Label>
                  {isGeneratingTrialQuote ? (
                    <div className="my-4 flex justify-start">
                      <DotsLoader2 />
                    </div>
                  ) : (
                    generatedTrialQuote?.recommendedTextByTone && (
                      <div className="flex flex-col gap-1">
                        <div className="w-full min-w-[40px] rounded-2xl border border-ring bg-slate-300 p-4 font-semibold">
                          <Typewriter
                            delay={1}
                            texts={[generatedTrialQuote.recommendedTextByTone]}
                          />
                        </div>
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
