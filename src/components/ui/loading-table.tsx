"use client";

import { ClassValue } from "clsx";

import { Skeleton } from "./skeleton";

interface Props {
  rows: number;
  columns: number;
  className?: ClassValue;
}

// Array.from({ length: n }, (_, i) => i + 1)

function LoadingTable({ columns, rows }: Props) {
  return (
    <div className="space-y-2">
      {Array.from({ length: rows }, (_, index) => index + 1).map((i) => (
        <div
          key={i}
          className="grid gap-2"
          style={{
            gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
          }}
        >
          {Array.from({ length: columns }, (_, i) => i + 1).map((i) => (
            <div key={i}>
              <Skeleton className="h-8 rounded" />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default LoadingTable;
