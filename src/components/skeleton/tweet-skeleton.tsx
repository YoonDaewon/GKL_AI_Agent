import { Skeleton } from "@/components/ui/skeleton";

export const TweetSkeleton = () => {
  return (
    <div className="flex min-w-[300px] max-w-[550px] flex-col space-y-3 rounded-xl border border-border bg-white p-4">
      <div className="flex h-fit gap-1">
        <Skeleton className="size-12 rounded-full bg-twitter-grey" />
        <div className="flex flex-col justify-center space-y-2">
          <Skeleton className="h-4 w-[100px] bg-twitter-grey" />
          <Skeleton className="h-4 w-[150px] bg-twitter-grey" />
        </div>
      </div>
      <div className="flex size-full flex-col gap-1">
        <Skeleton className="w-12/12 h-6 bg-twitter-grey" />
        <Skeleton className="h-6 w-11/12 bg-twitter-grey" />
        <Skeleton className="h-6 w-6/12 bg-twitter-grey" />
      </div>
    </div>
  );
};
