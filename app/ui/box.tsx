import React, { ReactNode } from "react";
import clsx from "clsx";

interface Props {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

function Box({ className, children, onClick }: Props): ReactNode {
  return (
    <div
      className={clsx("bg-teal-800 p-2 m-2 rounded-md", className)}
      onChange={onClick}
    >
      {children}
    </div>
  );
}

export default Box;
