import { useUpdateAgentMetadata } from "@/adaptor/mutation/agent/useUpdateAgentMetadata";
import { toast } from "sonner";
import { UpdateMetadataForm } from "@/domain/agent.domain";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useGetAgentMetadata } from "@/adaptor/query/agent/useGetAgentMetadata";
import { StatusSwitchSkeleton } from "@/components/skeleton/status-switch-skeleton";

interface Props {
  name: string;
}

export const AgentSwitchCard = ({ name }: Props) => {
  const {
    agentMetadata,
    fetchAgentMetadata,
    queryStatus: { isFetching, isLoading, isPending },
  } = useGetAgentMetadata({
    name,
  });

  const { updateMetadata, updateMetadataAsync, updateMetadataStatus } =
    useUpdateAgentMetadata({
      name,
    });

  const requestUpdateAgentMetadata = async (status: boolean) => {
    const toastId = toast.loading("Updating Agent status");

    const form: UpdateMetadataForm = {
      isActive: status,
    };
    try {
      await updateMetadataAsync(form);
      toast.success(`Agent ${status ? "activated" : "disabled"}`, {
        id: toastId,
      });
      fetchAgentMetadata();
    } catch (updateAgentStatusError) {
      toast.error("Failed to update agent status", { id: toastId });
    }
  };

  return (
    <div>
      <div className="relative inline-grid h-9 grid-cols-[1fr_1fr] items-center text-sm font-medium">
        {isLoading ? (
          <StatusSwitchSkeleton />
        ) : agentMetadata && agentMetadata.length >= 1 ? (
          <Switch
            id={`${name}-qa-agent`}
            checked={agentMetadata[0].isActive}
            onCheckedChange={requestUpdateAgentMetadata}
            className="peer absolute inset-0 h-9 w-20 rounded-md data-[state=unchecked]:bg-input/50 [&_span]:z-10 [&_span]:h-full [&_span]:w-1/2 [&_span]:rounded-sm [&_span]:transition-transform [&_span]:duration-700 [&_span]:[transition-timing-function:cubic-bezier(0.16,1,0.3,1)] [&_span]:data-[state=checked]:translate-x-full [&_span]:data-[state=checked]:rtl:-translate-x-full"
          />
        ) : (
          <Switch
            id={`${name}-qa-agent-disabled`}
            checked={false}
            onCheckedChange={requestUpdateAgentMetadata}
            className="peer absolute inset-0 h-9 w-20 rounded-md data-[state=unchecked]:bg-input/50 [&_span]:z-10 [&_span]:h-full [&_span]:w-1/2 [&_span]:rounded-sm [&_span]:transition-transform [&_span]:duration-700 [&_span]:[transition-timing-function:cubic-bezier(0.16,1,0.3,1)] [&_span]:data-[state=checked]:translate-x-full [&_span]:data-[state=checked]:rtl:-translate-x-full"
            disabled
          />
        )}
        <span className="pointer-events-none relative ms-0.5 flex items-center justify-center px-2 text-center transition-transform duration-700 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] peer-data-[state=checked]:invisible peer-data-[state=unchecked]:translate-x-full peer-data-[state=unchecked]:rtl:-translate-x-full">
          <span className="text-[10px] font-medium uppercase">Off</span>
        </span>
        <span className="pointer-events-none relative me-0.5 flex items-center justify-center px-2 text-center transition-transform duration-700 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] peer-data-[state=unchecked]:invisible peer-data-[state=checked]:-translate-x-full peer-data-[state=checked]:text-background peer-data-[state=checked]:rtl:translate-x-full">
          <span className="text-[10px] font-medium uppercase">On</span>
        </span>
      </div>
      <Label htmlFor={`${name}-qa-agent`} className="sr-only">
        Labeled switch
      </Label>
    </div>
  );
};
