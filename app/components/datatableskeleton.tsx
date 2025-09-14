import { Skeleton } from "./ui/skeleton";
import { Separator } from "./ui/separator";

export function DataTableSkeleton() {
  return (
    <div className="w-full">
      <div className="flex justify-between items-center">
        <Skeleton className="h-10 w-32" />
        <Skeleton className="h-10 w-24" />
      </div>
      <Separator className="mt-4" />
      <div className="mt-4">
        {Array.from({ length: 5 }).map((_, index) => (
          <div key={index} className="flex flex-col gap-4">
            <Skeleton className="h-8 w-full mb-2" />
          </div>
        ))}
      </div>
      <div className="flex justify-between mt-4">
        <Skeleton className="h-10 w-32" />
        <Skeleton className="h-10 w-52" />
      </div>
    </div>
  );
}
