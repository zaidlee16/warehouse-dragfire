import React from "react";
import { Card, Skeleton } from "@nextui-org/react";

export default function LoadingSkeleton() {
  return (
    <Card className="w-full h-44 space-y-2 pt-8 pb-8 px-4 rounded-lg">
      <Skeleton className="rounded-lg">
        <div className="h-8 rounded-lg bg-default-300"></div>
      </Skeleton>
      <Skeleton className="rounded-lg">
        <div className="h-24 rounded-lg bg-default-200"></div>
      </Skeleton>
    </Card>
  );
}
