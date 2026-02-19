import { Skeleton } from "./ui/skeleton";

export default function AllPostSkeleton() {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-1 gap-12 md:gap-20 mb-20">
        {[1, 2, 3, 4].map((i) => (
          <article
            key={i}
            className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start"
          >
            <Skeleton className="aspect-[16/10] rounded-md" />
            <div className="flex flex-col h-full justify-center gap-4">
              <div className="flex gap-2">
                <Skeleton className="h-6 w-20 rounded-full" />
                <Skeleton className="h-6 w-16 rounded-full" />
              </div>
              <Skeleton className="h-10 w-3/4" />
              <div className="flex items-center gap-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-1" />
                <Skeleton className="h-4 w-28" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
              </div>
              <Skeleton className="h-5 w-28" />
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
