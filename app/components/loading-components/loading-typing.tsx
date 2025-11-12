// components/ui/loading-typing.tsx
import { cn } from "~/lib/utils";

interface LoadingTypingProps {
  className?: string;
  text?: string;
}

export function LoadingTyping({
  className,
  text = "Dk Global Fashion",
}: LoadingTypingProps) {
  return (
    <div className={cn("flex items-center space-x-2", className)}>
      <div className="flex space-x-1">
        {text.split("").map((char, index) => (
          <span
            key={index}
            className="text-3xl font-medium text-gray-900 dark:text-white animate-typing"
            style={{
              animationDelay: `${index * 0.1}s`,
            }}
          >
            {char === " " ? "\u00A0" : char}
          </span>
        ))}
      </div>
      <div className="w-1 h-6 bg-gray-900 dark:bg-white animate-blink" />
    </div>
  );
}
