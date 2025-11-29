import React from "react";
import clsx from "clsx";

const gapMap = {
  none: "gap-0",
  xs: "gap-1",
  sm: "gap-2",
  md: "gap-3",
  lg: "gap-4",
} as const;

type StackProps = {
  gap?: keyof typeof gapMap;
  className?: string;
  children: React.ReactNode;
};

export default function Stack({ gap = "md", className, children }: StackProps) {
  return (
    <div className={clsx("flex flex-col", gapMap[gap], className)}>{children}</div>
  );
}
