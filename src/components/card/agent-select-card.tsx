import { Label } from "@/components/ui/label";
import { RadioGroupItem } from "@/components/ui/radio-group";
import { SiMedium, SiX } from "@icons-pack/react-simple-icons";
import { ArrowRightIcon } from "lucide-react";

interface Props {
  value: string;
  id: string;
}

export const AgentSelectCard = ({ value, id }: Props) => {
  return (
    <div className="has-data-[state=checked]:border-ring relative flex w-full items-start gap-2 rounded-md border border-input p-4 shadow-sm outline-none">
      <RadioGroupItem
        value={value}
        id={id}
        aria-describedby={`${id}-description`}
        className="order-1 after:absolute after:inset-0"
      />
      <div className="flex grow flex-col items-start gap-3">
        <div className="flex items-center gap-4">
          <SiMedium />
          <ArrowRightIcon />
          <SiX />
        </div>
        <div className="grid grow gap-2">
          <Label htmlFor={id}>
            Label{" "}
            <span className="text-xs font-normal leading-[inherit] text-muted-foreground">
              (Sublabel)
            </span>
          </Label>
          <p id={id} className="text-xs text-muted-foreground">
            You can use this card with a label and a description.
          </p>
        </div>
      </div>
    </div>
  );
};
