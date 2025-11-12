// components/ui/loading-gradient.tsx
import { cn } from "~/lib/utils";

interface LoadingGradientProps {
  className?: string;
  text?: string;
}

export function LoadingGradient({
  className,
  text = "Dk Global Fashion",
}: LoadingGradientProps) {
  return (
    <div className={cn("inline-block", className)}>
      <div className="text-2xl font-bold bg-gradient-to-r from-gray-900 via-gray-600 to-gray-900 bg-[length:200%_100%] bg-clip-text text-transparent animate-gradient-flow">
        {text}
      </div>
    </div>
  );
}
