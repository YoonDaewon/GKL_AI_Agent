"use client";

import { useGetKnowledges } from "@/adaptor/query/xbt/useGetKnowledges";
import { formatDateToLocalTime } from "@/lib/date";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Link from "next/link";

export default function Page() {
  const {
    queryStatus: { isLoading, isError, isSuccess },
    knowledges,
  } = useGetKnowledges();

  const webSources = Object.keys(knowledges?.periodic.sites || {})?.filter(
    (key) => key !== "llms.txt",
  );

  return (
    <div className="flex size-full flex-col gap-10 overflow-y-scroll p-8 pt-4">
      <div className="w-full rounded-3xl border border-border px-6 py-8 shadow-md">
        <div>
          <p className="text-2xl font-bold">
            Twitter Knowledge Learning Status
          </p>
          <p className="text-sm font-light">
            Analyzing conversation patterns and engagement metrics to enhance
            Jessexbt (automatically updates every hours)
          </p>
        </div>
        <div className="flex flex-col gap-4 pt-4">
          <div className="flex flex-col gap-2">
            <div className="">
              <p className="text-lg font-bold">tweets by @jessepollak</p>
            </div>
            <div className="flex">
              <div className="flex flex-col justify-start gap-1 border-l-2 border-border pl-4">
                <div className="flex">
                  <p className="">Total Counts:</p>
                  <p className="whitespace-pre-wrap font-bold">
                    {` ${knowledges?.realtime?.twitter?.["@jessepollak"]?.counts} tweets`}
                  </p>
                </div>
                <div className="flex">
                  <p className="">Updated at:</p>
                  {knowledges?.realtime.twitter["@jessepollak"]
                    .lastReceivedAt && (
                    <p className="whitespace-pre-wrap font-bold">
                      {` ${formatDateToLocalTime(knowledges?.realtime.twitter["@jessepollak"].lastReceivedAt)}`}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="">
              <p className="text-lg font-bold">
                tweets mentioning @jessepollak
              </p>
            </div>
            <div className="flex">
              <div className="flex flex-col justify-start gap-1 border-l-2 border-border pl-4">
                <div className="flex">
                  <p className="">Total Counts:</p>
                  <p className="whitespace-pre-wrap font-bold">
                    {` ${knowledges?.realtime?.twitter?.["@jessepollak +mention"]?.counts} tweets`}
                  </p>
                </div>
                <div className="flex">
                  <p className="">Updated at:</p>
                  {knowledges?.realtime.twitter["@jessepollak +mention"]
                    .lastReceivedAt && (
                    <p className="whitespace-pre-wrap font-bold">
                      {` ${formatDateToLocalTime(knowledges?.realtime.twitter["@jessepollak +mention"].lastReceivedAt)}`}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full rounded-3xl border border-border px-6 py-8 shadow-md">
        <div>
          <p className="text-2xl font-bold">Web Knowledge Learning Status</p>
          <p className="text-sm font-light">
            Analyzing web contents to enhance Jessexbt's understanding of
            Building on Base
          </p>
        </div>
        <div className="flex flex-col gap-4 pt-4">
          {webSources.length > 0 &&
            webSources.map((source, index) => {
              return (
                <div className="flex flex-col gap-2" key={source + index}>
                  <div className="">
                    <p className="text-lg font-bold">{source}</p>
                  </div>
                  <div className="flex w-full">
                    <div className="flex w-full flex-col justify-start gap-1 border-l-2 border-border pl-4">
                      <div className="flex w-full items-center">
                        <p className="">Total web sources:</p>
                        <p className="whitespace-pre-wrap font-bold">
                          {` ${knowledges?.periodic?.sites?.[source]?.counts || 0} urls`}
                        </p>
                      </div>
                      <div className="flex w-full">
                        <p className="">Updated at:</p>
                        <p className="whitespace-pre-wrap font-bold">
                          {` ${knowledges?.periodic?.sites?.[source]?.lastFetchedAt ? formatDateToLocalTime(knowledges?.periodic?.sites?.[source]?.lastFetchedAt) : "-"}`}
                        </p>
                      </div>
                      <div className="flex">
                        {knowledges?.periodic?.sites?.[source]?.urls &&
                          knowledges?.periodic?.sites?.[source]?.urls.length >
                            0 && (
                            <Accordion
                              type="single"
                              collapsible
                              className="w-full"
                            >
                              <AccordionItem value="item-1">
                                <AccordionTrigger className="">
                                  <p className="whitespace-pre-wrap font-bold">
                                    See all sources
                                  </p>
                                </AccordionTrigger>
                                <AccordionContent className="flex flex-col">
                                  {knowledges?.periodic?.sites?.[
                                    source
                                  ]?.urls.map((url, index) => {
                                    return (
                                      <Link
                                        key={url + index}
                                        href={url}
                                        className="cursor-pointer hover:underline"
                                      >
                                        {url}
                                      </Link>
                                    );
                                  })}
                                </AccordionContent>
                              </AccordionItem>
                            </Accordion>
                          )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}
