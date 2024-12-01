import React from "react";
import Box from "@/app/ui/box";

interface Props {
  children: React.ReactNode;
  title?: string;
  className?: string;
}

function Card({ title, className, children }: Props) {
  return (
    <Box className={className}>
      <div className="h-32 font-bold text-center">{title}</div>
      <div className="h-32">{children}</div>
    </Box>
  );
}

export default Card;
