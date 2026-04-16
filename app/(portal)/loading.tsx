import Card from "@/components/ui/Card";
import Skeleton, { SkeletonText } from "@/components/ui/Skeleton";

export default function PortalLoading() {
  return (
    <>
      <div className="flex flex-col gap-2">
        <Skeleton className="h-4 w-24" rounded="sm" />
        <Skeleton className="h-8 w-72" rounded="sm" />
        <Skeleton className="h-4 w-96" rounded="sm" />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Card key={i} className="flex flex-col gap-3">
            <Skeleton className="h-3 w-24" rounded="sm" />
            <Skeleton className="h-8 w-20" rounded="sm" />
          </Card>
        ))}
      </div>
      <Card>
        <SkeletonText lines={4} />
      </Card>
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <Card>
          <SkeletonText lines={6} />
        </Card>
        <Card>
          <SkeletonText lines={5} />
        </Card>
      </div>
    </>
  );
}
