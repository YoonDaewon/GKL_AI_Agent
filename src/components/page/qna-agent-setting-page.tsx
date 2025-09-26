import { useGetQnA } from "@/adaptor/query/agent/useGetQnA";
import FileInput from "@/components/input/file-input";
import { QnaTable } from "@/components/table/qna-table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { AgentSwitchCard } from "@/components/card/agent-switch-card";

export const QnaAgentSettingPage = () => {
  const {
    qna,
    fetchQna,
    queryStatus: { isFetching: isQnaFetching },
  } = useGetQnA({ name: "Cross" });

  return (
    <div className="size-full">
      <Card className="mt-4 !w-full">
        <CardHeader>
          <CardTitle>Q&A Agent</CardTitle>
          <CardDescription>agent for Q&A in Telegram</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex flex-col gap-2">
              <div>
                <p className="font-bold">Status</p>
              </div>
              <AgentSwitchCard name="Cross" />
            </div>
            <Separator />
            <div className="flex flex-col gap-2">
              <div>
                <p className="font-bold">Q&A Data</p>
                <p className="text-sm text-muted-foreground">
                  upload file to update Q&A data
                </p>
              </div>
              <div className="flex flex-col gap-6">
                <FileInput fetchQna={fetchQna} isQnaFetching={isQnaFetching} />
                <QnaTable qnaList={qna} isQnaFetching={isQnaFetching} />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      {/* </div> */}
      {/* </div> */}
      {/* <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingUser ? "Edit" : "Create New"}</DialogTitle>
            <DialogDescription>
              Please fill out the form below to{" "}
              {editingUser ? "update the data" : "create a new data"}.
            </DialogDescription>
          </DialogHeader>
          <div>
            <UserForm
              onSubmit={editingUser ? handleUpdate : handleCreate}
              initialData={editingUser}
            />
          </div>
        </DialogContent>
      </Dialog> */}
    </div>
  );
};
