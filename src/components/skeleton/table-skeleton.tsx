import { Skeleton } from "@/components/ui/skeleton";

export const TableSkeleton = () => {
  return (
    <div className="rounded-md border">
      <div className="flex flex-col gap-1">
        <div className="flex gap-2 border-b p-2">
          <Skeleton className="h-10 w-2/12 bg-twitter-grey" />
          <Skeleton className="h-10 w-1/12 bg-twitter-grey" />
          <Skeleton className="h-10 w-3/12 bg-twitter-grey" />
          <Skeleton className="h-10 w-4/12 bg-twitter-grey" />
          <Skeleton className="h-10 w-2/12 bg-twitter-grey" />
        </div>
        <div className="flex gap-2 border-b p-2">
          <Skeleton className="h-10 w-2/12 bg-twitter-grey" />
          <Skeleton className="h-10 w-1/12 bg-twitter-grey" />
          <Skeleton className="h-10 w-3/12 bg-twitter-grey" />
          <Skeleton className="h-10 w-4/12 bg-twitter-grey" />
          <Skeleton className="h-10 w-2/12 bg-twitter-grey" />
        </div>
        <div className="flex gap-2 border-b p-2">
          <Skeleton className="h-10 w-2/12 bg-twitter-grey" />
          <Skeleton className="h-10 w-1/12 bg-twitter-grey" />
          <Skeleton className="h-10 w-3/12 bg-twitter-grey" />
          <Skeleton className="h-10 w-4/12 bg-twitter-grey" />
          <Skeleton className="h-10 w-2/12 bg-twitter-grey" />
        </div>
        <div className="flex gap-2 border-b p-2">
          <Skeleton className="h-10 w-2/12 bg-twitter-grey" />
          <Skeleton className="h-10 w-1/12 bg-twitter-grey" />
          <Skeleton className="h-10 w-3/12 bg-twitter-grey" />
          <Skeleton className="h-10 w-4/12 bg-twitter-grey" />
          <Skeleton className="h-10 w-2/12 bg-twitter-grey" />
        </div>
        <div className="flex gap-2 border-b p-2">
          <Skeleton className="h-10 w-2/12 bg-twitter-grey" />
          <Skeleton className="h-10 w-1/12 bg-twitter-grey" />
          <Skeleton className="h-10 w-3/12 bg-twitter-grey" />
          <Skeleton className="h-10 w-4/12 bg-twitter-grey" />
          <Skeleton className="h-10 w-2/12 bg-twitter-grey" />
        </div>
        <div className="flex gap-2 border-b p-2">
          <Skeleton className="h-10 w-2/12 bg-twitter-grey" />
          <Skeleton className="h-10 w-1/12 bg-twitter-grey" />
          <Skeleton className="h-10 w-3/12 bg-twitter-grey" />
          <Skeleton className="h-10 w-4/12 bg-twitter-grey" />
          <Skeleton className="h-10 w-2/12 bg-twitter-grey" />
        </div>
      </div>
    </div>
  );
};
