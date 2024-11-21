import { Skeleton } from "./ui/skeleton";

export default function AllPostSkeleton() {
  return (
    <section>
      <div className="min-h-[844px]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Skeleton className="h-[408px] bg-slate-200" />
          <Skeleton className="h-[408px] bg-slate-200" />
          <Skeleton className="h-[408px] bg-slate-200" />
          <Skeleton className="h-[408px] bg-slate-200" />
        </div>
      </div>
    </section>
  );
}
