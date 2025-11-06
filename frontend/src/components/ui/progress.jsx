import React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";
import { cn } from "@/lib/utils";

const Progress = React.forwardRef(({ className, value = 0, ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    className={cn(
      "relative h-4 w-full overflow-hidden rounded-full bg-gray-200", // base background
      className
    )}
    {...props}
  >
    <ProgressPrimitive.Indicator
      className="h-full bg-black transition-all duration-300 ease-in-out" // black progress bar
      style={{ width: `${value}%` }} // set width instead of translate
    />
  </ProgressPrimitive.Root>
));

Progress.displayName = ProgressPrimitive.Root.displayName;

export { Progress };
