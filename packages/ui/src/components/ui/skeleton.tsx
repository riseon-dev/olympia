import React from 'react';
import { cn } from "../../lib/utils"

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>): React.ReactElement {
  return (
    <div
      className={cn(
        "animate-pulse rounded-base bg-bw border-2 border-border",
        className,
      )}
      {...props}
    />
  )
}

export { Skeleton }
