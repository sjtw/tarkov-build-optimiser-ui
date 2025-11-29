import React from "react";
import clsx from "clsx";

const variantMap = {
  body: "text-sm text-white",
  subtle: "text-sm text-[var(--tarkov-text-muted)]",
  label: "text-xs uppercase tracking-widest text-[var(--tarkov-text-muted)]",
  meta: "text-xs uppercase tracking-[0.35em] text-[var(--tarkov-text-muted)]",
} as const;

type TextProps<T extends React.ElementType> = {
  as?: T;
  variant?: keyof typeof variantMap;
  className?: string;
  children: React.ReactNode;
};

export default function Text<T extends React.ElementType = "p">({
  as,
  variant = "body",
  className,
  children,
  ...props
}: TextProps<T> &
  Omit<React.ComponentPropsWithoutRef<T>, keyof TextProps<T>>) {
  const Component = as || "p";

  return (
    <Component className={clsx(variantMap[variant], className)} {...props}>
      {children}
    </Component>
  );
}
