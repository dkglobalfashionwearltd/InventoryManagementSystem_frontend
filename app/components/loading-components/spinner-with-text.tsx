// components/ui/loading-spinner.tsx
import { cn } from "~/lib/utils";

interface LoadingSpinnerProps {
  className?: string;
  text?: string;
  size?: "sm" | "md" | "lg";
}

export function LoadingSpinner({
  className,
  text = "Dk Global Fashion",
  size = "md",
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: "text-sm",
    md: "text-lg",
    lg: "text-2xl",
  };

  const spinnerSizes = {
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-8 h-8",
  };

  return (
    <div className={cn("flex items-center space-x-3", className)}>
      <div
        className={cn(
          "border-2 border-gray-300 border-t-gray-900 rounded-full animate-spin",
          spinnerSizes[size]
        )}
      />
      <span
        className={cn(
          "font-semibold text-gray-900 dark:text-white",
          sizeClasses[size]
        )}
      >
        {text}
      </span>
    </div>
  );
}
