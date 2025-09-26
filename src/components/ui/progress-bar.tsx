import { cn } from "@/lib/utils";

interface ProgressBarProps extends React.ComponentPropsWithoutRef<"div"> {
  progress: number;
}

export const ProgressBar = ({ progress, className }: ProgressBarProps) => {
  return (
    <div className="relative h-1">
      <div className="absolute inset-y-0 left-0 size-full rounded-full bg-gray-200" />
      <div
        style={{
          width: `${progress}%`,
        }}
        className={cn(
          "absolute bottom-0 left-0 top-0 h-full rounded-full bg-purple-500 transition-all duration-150",
          className,
        )}
      />
      <div className="absolute inset-y-0 left-0 flex size-full items-center justify-center" />
    </div>
  );
};
