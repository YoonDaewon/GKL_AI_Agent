import { useGetAgentStyle } from "@/adaptor/query/agent/useGetAgentStyle";

import { useEffect, useState, useMemo } from "react";
import { AgentStyle } from "@/domain/agent.domain";
import { useUpdateAgentStyle } from "@/adaptor/mutation/agent/useUpdateAgentStyle";
import { toast } from "sonner";
import { useGetMediumPosts } from "@/adaptor/query/medium/useGetPosts";
import { Typewriter } from "@/components/ui/typewrite";
import { useGenerateTelegram } from "@/adaptor/mutation/medium/useGenerateTelegram";
import { useGenerateSummarizeAgentDemo } from "@/adaptor/mutation/agent/useSummarizeAgentDemo";
import { MediumSkeleton } from "@/components/skeleton/medium-skeleton";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { DotsLoader2 } from "@/components/loader/dots-loader";
import { MediumPostCard } from "../posts/medium-post-card";

export const MediumToTelegramAgentSettingPage = () => {
  const [agentStyle, setAgentStyle] = useState<AgentStyle | null>(null);
  const [focusedPane, setFocusedPane] = useState<"left" | "right">("left");
  const [selectedSample, setSelectedSample] = useState<number | null>(null);
  const [hasStreamContentCompleted, setHasStreamContentCompleted] =
    useState(false);

  const { agentStyle: agentStyleData, fetchAgentStyle } = useGetAgentStyle({
    targetMedia: "telegram",
    username: "cross_protocol",
  });
  const {
    mediumPosts,
    queryStatus: { isLoading: isMediumLoading },
  } = useGetMediumPosts();

  const { updateAgentStyleAsync } = useUpdateAgentStyle();

  const {
    generateTelegram,
    generateTelegramAsync,
    generateTelegramStatus: {
      data: generatedTelegram,
      isPending: isGeneratingTelegram,
    },
    resetGenerateTelegram,
  } = useGenerateTelegram();
  const {
    generateSummaryDemoAsync,
    generateSummaryDemo,
    generateSummaryDemoStatus: {
      data: generatedSummaryDemo,
      isPending: isGeneratingSummaryDemo,
      isError: isGeneratingTrialTweetError,
      isSuccess: isGeneratingTrialTweetSuccess,
    },
    resetGenerateSummaryDemo,
  } = useGenerateSummarizeAgentDemo({
    targetMedia: "telegram",
    username: "cross_protocol",
  });

  const resetTrial = () => {
    if (focusedPane === "right") {
      setFocusedPane("left");
    }
    if (generatedTelegram) {
      resetGenerateTelegram();
    }
    if (generatedSummaryDemo) {
      resetGenerateSummaryDemo();
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
        const updateResult = await updateAgentStyleAsync({
          params: { targetMedia: "telegram", username: "cross_protocol" },
          form: agentStyle,
        });

        fetchAgentStyle();
        toast.success("Successfully updated", { id: toastId });
      } catch (e) {
        console.error({ e });
        toast.error("Failed to update agent style", { id: toastId });
      } finally {
      }
    }
  };

  const requestGenerateTelegram = async (id: number) => {
    if (id) {
      setSelectedSample(id);
      setFocusedPane("right");

      generateTelegram({
        mediumPostId: id,
        telegramStyleUsername: "cross_protocol",
      });

      generateSummaryDemo({
        mediumPostId: id,
        customRule: agentStyle?.customRule || "",
      });
    }
  };

  const posts = useMemo(() => mediumPosts?.slice(0, 3), [mediumPosts]);

  useEffect(() => {
    if (agentStyleData) setAgentStyle(agentStyleData);
  }, [agentStyleData]);
  return (
    <div className="flex h-fit min-h-full w-full flex-col gap-4 desktop:flex-row">
      <div
        className={`flex size-full max-h-fit flex-col rounded-2xl bg-background px-6 py-8 transition-[flex-basis] duration-500 ease-in-out ${
          focusedPane === "right" &&
          (!!generatedTelegram ||
            !!generatedSummaryDemo ||
            !!isGeneratingTelegram ||
            !!isGeneratingSummaryDemo)
            ? "desktop:basis-1/3"
            : "desktop:basis-2/3"
        } `}
      >
        <div className="flex justify-between">
          <div>
            <p className="text-2xl font-bold">Medium Agent (Telegram)</p>
            <p className="text-sm font-light">
              agent summarizes medium post into Telegram
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
          (!!generatedTelegram ||
            !!generatedSummaryDemo ||
            !!isGeneratingTelegram ||
            !!isGeneratingSummaryDemo)
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
            {isMediumLoading ? (
              <MediumSkeleton />
            ) : (
              posts &&
              posts.map((post) => {
                const shouldOutFocus =
                  selectedSample !== null && selectedSample !== post.id;
                return (
                  <MediumPostCard
                    key={`sample-medium-post-#-${post.id}`}
                    post={post}
                    shouldOutFocus={shouldOutFocus}
                    onPostClick={requestGenerateTelegram}
                    id={post.id}
                  />
                );
              })
            )}
          </div>
          {(!!generatedTelegram ||
            !!generatedSummaryDemo ||
            !!isGeneratingTelegram ||
            !!isGeneratingSummaryDemo) && (
            <div className="pt-8">
              <div className="flex w-full flex-col gap-4 desktop:flex-row">
                <div className="flex basis-full flex-col gap-1 rounded-lg desktop:w-[45%]">
                  <Label>Before</Label>
                  {isGeneratingTelegram ? (
                    <div className="my-4 flex justify-start">
                      <DotsLoader2 />
                    </div>
                  ) : (
                    generatedTelegram && (
                      <div className="flex flex-col gap-1">
                        <div className="w-full min-w-[40px] rounded-2xl border border-ring bg-transparent p-4 font-semibold">
                          <Typewriter
                            delay={1}
                            texts={[generatedTelegram.content]}
                          />
                        </div>
                      </div>
                    )
                  )}
                </div>

                <div className="flex basis-full flex-col gap-1 rounded-lg desktop:w-[45%]">
                  <Label>After</Label>
                  {isGeneratingSummaryDemo ? (
                    <div className="my-4 flex justify-start">
                      <DotsLoader2 />
                    </div>
                  ) : (
                    generatedSummaryDemo && (
                      <div className="flex flex-col gap-1">
                        <div className="w-full min-w-[40px] rounded-2xl border border-ring bg-slate-300 p-4 font-semibold">
                          <Typewriter
                            delay={1}
                            texts={[generatedSummaryDemo.content]}
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
