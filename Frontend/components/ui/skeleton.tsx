import { cn } from "@/lib/utils";

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "animate-shimmer rounded-2xl bg-[linear-gradient(110deg,rgba(226,232,240,0.55),rgba(248,250,252,0.92),rgba(226,232,240,0.55))] bg-[length:200%_100%] dark:bg-[linear-gradient(110deg,rgba(30,41,59,0.65),rgba(51,65,85,0.88),rgba(30,41,59,0.65))]",
        className,
      )}
      {...props}
    />
  );
}

export { Skeleton };
