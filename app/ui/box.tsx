import React, { ReactNode } from "react";
import clsx from "clsx";

interface Props {
  children: ReactNode;
  className?: string;
}

function Box({ className, children }: Props): ReactNode {
  return <div className={clsx("rounded-md", className)}>{children}</div>;
}

export default Box;
