import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export const MediumSkeleton = () => {
  return (
    <div className="flex h-full min-w-[300px] max-w-[550px]">
      <Card className="h-fit w-full bg-white p-3">
        <CardContent className="!p-0">
          <div className="flex flex-col gap-2">
            <div>
              <Skeleton className="h-3 w-2/12 bg-twitter-grey" />
            </div>
            <div className="flex flex-col gap-[2px]">
              <Skeleton className="h-4 w-11/12 bg-twitter-grey" />
              <Skeleton className="h-4 w-4/12 bg-twitter-grey" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
