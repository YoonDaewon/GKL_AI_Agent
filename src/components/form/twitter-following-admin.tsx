"use client";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
import { Tag, TagInput } from "emblor";
import { toast } from "sonner";
import { useGetFollowingAccounts } from "@/adaptor/query/agent/useGetFollowingAccounts";
import { useAddFollowingAccount } from "@/adaptor/mutation/agent/useAddFollowingAccount";
import { useDeleteFollowingAccount } from "@/adaptor/mutation/agent/useRemoveFollowingAccount";

const FormSchema = z.object({
  following: z.array(
    z.object({
      id: z.string(),
      text: z.string(),
    }),
  ),
});

export const TwitterFollowingAccountsAdmin = () => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const { followingAccounts } = useGetFollowingAccounts();

  const {
    addFollowingAccount,
    addFollowingAccountAsync,
    addFollowingAccountStatus,
  } = useAddFollowingAccount();
  const {
    deleteFollowingAccount,
    deleteFollowingAccountAsync,
    deleteFollowingAccountStatus,
  } = useDeleteFollowingAccount();

  const [activeTagIndex, setActiveTagIndex] = useState<number | null>(null);

  const { setValue, control } = form;

  const tags = useWatch({
    control,
    name: "following",
    defaultValue: [],
  });

  function removeDuplicates<T>(
    array1: T[],
    array2: T[],
  ): { uniqueToArray1: T[]; uniqueToArray2: T[] } {
    const set1 = new Set(array1);
    const set2 = new Set(array2);

    const uniqueToArray1 = array1.filter((item) => !set2.has(item));
    const uniqueToArray2 = array2.filter((item) => !set1.has(item));

    return { uniqueToArray1, uniqueToArray2 };
  }

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    if (data.following && followingAccounts !== undefined) {
      const tagsWithUsername = data.following.map((tag) => {
        return {
          username: tag.text,
        };
      });
      const cleanTags = removeDuplicates(tagsWithUsername, followingAccounts);

      toast.success("You submitted the following values:", {
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            <code className="text-white">{JSON.stringify(data, null, 2)}</code>
          </pre>
        ),
      });
    }
  };

  const clearAll = async () => {
    const tagTexts = tags.map((tag) => tag.text);
    await removeAccount(tagTexts);

    setValue("following", []);
  };

  const addAccount = async (tag: string) => {
    const toastId = toast.loading("Adding account on following list");

    try {
      const addAccountResult = await addFollowingAccountAsync({
        usernames: [tag],
      });
      toast.success("Successfully added account on following list", {
        id: toastId,
      });
    } catch (addAccountError) {
      toast.error("Failed to add account", { id: toastId });
    }
  };

  const removeAccount = async (tags: string[]) => {
    const toastId = toast.loading("Removing account on following list");

    try {
      const removeAccountResult = await deleteFollowingAccountAsync(tags);

      toast.success("Successfully removed account on following list", {
        id: toastId,
      });
    } catch (removeAccountError) {
      toast.error("Failed to remove account", { id: toastId });
    }
  };

  useEffect(() => {
    if (followingAccounts) {
      const tags = followingAccounts.map((account, index) => {
        return {
          id: account.username + index,
          text: account.username,
        };
      });
      setValue("following", tags);
    }
  }, [followingAccounts]);

  return (
    <section className="flex h-fit min-h-full w-full flex-col gap-4 desktop:flex-row">
      <div className="flex size-full max-h-fit flex-col gap-6 rounded-2xl bg-background px-6 py-8">
        <div className="flex justify-between">
          <div>
            <p className="text-2xl font-bold">Following list</p>
            <p className="text-sm font-light">
              list of influencers agent subscribe for
            </p>
          </div>
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col items-start space-y-8"
          >
            <FormField
              control={form.control}
              name="following"
              render={({ field }) => (
                <FormItem className="flex w-full flex-col items-start">
                  <div className="flex w-full justify-between">
                    <FormLabel className="text-left text-lg">
                      X Accounts to follow
                    </FormLabel>
                    <Button
                      onClick={(event) => {
                        event.preventDefault();
                        clearAll();
                      }}
                    >
                      Clear All
                    </Button>
                  </div>
                  <FormControl className="w-full">
                    <TagInput
                      {...field}
                      placeholder="Enter a username"
                      tags={tags}
                      className="w-full"
                      setTags={(newTags) => {
                        setValue("following", newTags as [Tag, ...Tag[]]);
                      }}
                      activeTagIndex={activeTagIndex}
                      setActiveTagIndex={setActiveTagIndex}
                      inlineTags={false}
                      inputFieldPosition="top"
                      direction="column"
                      size="xl"
                      shape="rounded"
                      interaction="clickable"
                      onTagAdd={(value) => {
                        addAccount(value);
                      }}
                      onTagRemove={(value) => {
                        removeAccount([value]);
                      }}
                    />
                  </FormControl>
                  <FormDescription className="text-left">
                    These are usernames of x accounts that you&apos;re
                    interested in.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
        {/* <div className="flex w-full justify-end">
          <Button type="submit" className="">
            Save
          </Button>
        </div> */}
      </div>
    </section>
  );
};
