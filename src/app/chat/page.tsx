"use client";

import "../../components/jessexbt/markdown.css";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Send } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useLanguage } from "@/providers/language-provider";

interface Message {
  id: string;
  content: string;
  role: "user" | "assistant";
  timestamp: number;
  sources?: string[];
}

const CustomLink = ({
  children,
  href,
  ...props
}: React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
  const childText =
    typeof children === "string"
      ? children
      : Array.isArray(children) &&
          children.length === 1 &&
          typeof children[0] === "string"
        ? (children[0] as string)
        : null;

  const isBareUrl = () => {
    if (!href) return false;
    if (!childText) return true;
    if (childText.trim() === href.trim()) return true;
    const urlLike = /^(https?:)?\/\//i.test(childText.trim());
    return urlLike;
  };

  const display = href && isBareUrl() ? "Link" : children;

  return (
    <a
      {...props}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      style={{ textDecorationLine: "underline" }}
    >
      {display}
    </a>
  );
};

export default function ChatPage() {
  const { language } = useLanguage();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const eventSourceRef = useRef<EventSource | null>(null);
  const hasReceivedData = useRef(false);
  const currentAssistantMessageRef = useRef<Message | null>(null);
  const assistantMessageIdRef = useRef<string | null>(null);
  const idleTimeoutRef = useRef<number | null>(null);
  // Removed streaming; keeping reference here no longer needed

  // 페이지 로드 시 자동으로 안내 메시지 추가
  useEffect(() => {
    const welcomeMessage: Message = {
      id: "welcome",
      content:
        language === "ko"
          ? "본 서비스는 ChatGPT(4o.mini)를 사용하여 세븐럭 카지노 및 K-Visit 데이터를 기반으로 정보를 제공합니다.\n\n일부 답변은 실제 또는 최신 정보와 다를 수 있습니다."
          : "This service uses ChatGPT(4o.mini) to provide information based on Seven Luck Casino and K-Visit data.\n\nSome responses may differ from actual or latest information.",
      role: "assistant",
      timestamp: Date.now(),
    };
    setMessages([welcomeMessage]);
  }, [language]);

  useEffect(() => {
    if (scrollRef.current) {
      const scrollContainer = scrollRef.current.querySelector(
        "[data-radix-scroll-area-viewport]",
      );
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  }, [messages]);

  const handleSubmit = async (input: string) => {
    // e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      role: "user",
      timestamp: Date.now(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);
    setError(null);
    hasReceivedData.current = false;

    // Close any existing EventSource connection
    if (eventSourceRef.current) {
      eventSourceRef.current.close();
    }

    try {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "",
        role: "assistant",
        timestamp: Date.now(),
      };

      currentAssistantMessageRef.current = assistantMessage;
      assistantMessageIdRef.current = assistantMessage.id;
      setMessages((prev) => [...prev, assistantMessage]);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/jesse-pr-workflow/vector-search/provide-builder-advice-from-knowledge`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ question: input }),
        },
      );

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const contentType = response.headers.get("content-type") || "";
      const data = contentType.includes("application/json")
        ? await response.json()
        : await response.text();

      const fullText =
        typeof data === "string"
          ? data
          : (data.answer ?? data.content ?? data.result ?? data.message ?? "");

      const sources =
        typeof data === "object" && data !== null
          ? (data.source ?? data.sources ?? [])
          : [];

      hasReceivedData.current = true;
      currentAssistantMessageRef.current.content = fullText;
      currentAssistantMessageRef.current.sources = sources;
      setMessages((prev) => {
        const newMessages = [...prev];
        const assistantIndex = newMessages.findIndex(
          (m) => m.id === assistantMessageIdRef.current,
        );
        if (assistantIndex !== -1) {
          const target = newMessages[assistantIndex];
          newMessages[assistantIndex] = {
            ...target,
            content: currentAssistantMessageRef.current?.content || "",
            sources: currentAssistantMessageRef.current?.sources || [],
          };
        }
        return newMessages;
      });

      setIsLoading(false);
      currentAssistantMessageRef.current = null;
      assistantMessageIdRef.current = null;
    } catch (error) {
      console.error("Error fetching answer:", error);
      setError("Failed to fetch answer. Please try again.");
      setIsLoading(false);
      currentAssistantMessageRef.current = null;
      assistantMessageIdRef.current = null;
    }
  };

  useEffect(() => {
    return () => {
      if (eventSourceRef.current) {
        eventSourceRef.current.close();
        eventSourceRef.current = null;
      }
      // Clear any idle timeout on unmount to avoid stray finalize calls
      if (idleTimeoutRef.current) {
        clearTimeout(idleTimeoutRef.current);
        idleTimeoutRef.current = null;
      }
    };
  }, []);

  return (
    <div className="flex h-full flex-col">
      <ScrollArea
        ref={scrollRef}
        className="h-[calc(100svh-48px)] flex-1 overflow-y-scroll px-4 desktop:h-[calc(100svh-64px)]"
      >
        <div className="mx-auto max-w-3xl space-y-4 py-4">
          {messages.map((message) => {
            if (message.content.length > 0) {
              return (
                <div
                  key={message.id}
                  className={cn(
                    "flex w-full items-start gap-2",
                    message.role === "user" ? "justify-end" : "justify-start",
                  )}
                >
                  {message.role === "assistant" && (
                    <Avatar className="size-8">
                      <AvatarImage
                        src="/logo/seven_luck.png"
                        alt="Sevenluck Concierge"
                      />
                      <AvatarFallback>AI</AvatarFallback>
                    </Avatar>
                  )}
                  <div
                    className={cn(
                      "max-w-[90%] whitespace-pre-wrap break-words rounded-lg px-2 py-2",
                      message.role === "user"
                        ? "bg-[#0052FF] text-primary-foreground"
                        : "bg-muted",
                    )}
                  >
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                      components={{
                        a: CustomLink,
                      }}
                    >
                      {message.content}
                    </ReactMarkdown>
                    {message.sources && message.sources.length > 0 && (
                      <div className="mt-3 border-t pt-3">
                        <p className="mb-2 text-sm font-semibold">
                          {language === "ko" ? "출처" : "Source"}:
                        </p>
                        <ul className="space-y-1 text-sm">
                          {message.sources.map((source, index) => (
                            <li key={index} className="text-muted-foreground">
                              <a
                                href={source}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="underline hover:text-foreground"
                              >
                                {source}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              );
            }
            return null;
          })}
          {isLoading && !hasReceivedData.current && (
            <div className="flex w-full justify-start">
              <div className="w-full animate-fadeMoveUp rounded-lg opacity-0">
                <div className="flex w-full items-center gap-2">
                  {/* <Lightbulb className="size-4" /> */}
                  <Avatar className="size-8">
                    <AvatarImage src="/logo/seven_luck.png" alt="Seven Luck" />
                    {/* <AvatarFallback>AI</AvatarFallback> */}
                  </Avatar>
                  <p className="px-2 text-base font-semibold text-black/50">
                    {language === "ko"
                      ? "Sevenluck Concierge가 생각 중입니다..."
                      : "Sevenluck Concierge is thinking..."}
                  </p>
                </div>
              </div>
            </div>
          )}
          {error && (
            <div className="flex justify-center">
              <div className="rounded-lg bg-destructive/10 px-4 py-2 text-destructive">
                {error}
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      <div className="sticky bottom-0 bg-background p-4">
        <form
          onSubmit={(event) => {
            event.preventDefault();
            handleSubmit(input);
          }}
          className="mx-auto flex max-w-3xl items-center gap-2"
        >
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={language === "ko" ? "메시지를 입력하세요." : "Type your message."}
            className="flex-1"
            disabled={isLoading}
          />
          <Button type="submit" size="icon" disabled={isLoading}>
            <Send className="size-4" />
          </Button>
        </form>
      </div>
    </div>
  );
}
