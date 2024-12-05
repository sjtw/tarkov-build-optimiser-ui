import React from "react";
import Box from "@/app/ui/box";
import clsx from "clsx";

interface Props {
  children: React.ReactNode;
  title?: string;
  className?: string;
}

function Card({ title, children, className }: Props) {
  return (
    <Box
      className={clsx(
        "my-4 p-2 overflow-scroll hover:bg-teal-950 flex flex-col text-sm border border-teal-600 rounded-md",
        className,
      )}
    >
      <div className="h-8 font-bold text-center mb-2">{title}</div>
      <div className="flex h-24 justify-center">{children}</div>
    </Box>
  );
}

export default Card;
