import { cn } from "@/lib/utils";

interface Props {
  className?: string;
  children: React.ReactNode;
}

function Container({ className, children }: Props) {
  return (
    <div
      className={cn(
        "w-full h-full flex justify-center overflow-hidden",
        className
      )}
    >
      <div className="p-6 space-y-8 flex flex-col h-full overflow-hidden max-w-md w-full">
        {children}
      </div>
    </div>
  );
}

export default Container;
