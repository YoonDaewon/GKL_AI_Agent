import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RetweetAgentSwitchCard } from "../card/retweet-agent-switch-card";

export const RetweetAgentSettingPage = () => {
  return (
    <div className="size-full">
      <Card className="mt-4 !w-full">
        <CardHeader>
          <CardTitle>Retweet Agent</CardTitle>
          <CardDescription>agent re-tweets automatically</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex flex-col gap-2">
              <div>
                <p className="font-bold">Status</p>
              </div>
              <RetweetAgentSwitchCard />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
