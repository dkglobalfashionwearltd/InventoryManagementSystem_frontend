// components/ui/loading-pulse.tsx
import { cn } from "~/lib/utils";

interface LoadingPulseProps {
  className?: string;
  text?: string;
}

export function LoadingPulse({
  className,
  text = "Dk Global Fashion",
}: LoadingPulseProps) {
  return (
    <div className={cn("flex flex-col items-center space-y-4", className)}>
      <div className="text-2xl font-bold text-gray-900 dark:text-white animate-pulse">
        {text}
      </div>
      <div className="flex space-x-1">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="w-2 h-2 bg-gray-900 dark:bg-white rounded-full animate-bounce"
            style={{ animationDelay: `${i * 0.1}s` }}
          />
        ))}
      </div>
    </div>
  );
}
