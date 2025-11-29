import React from "react";
import clsx from "clsx";
import { Text } from "@/app/components/ui";

type StatLineProps = {
  label: string;
  value: number;
  kind: "ergonomics" | "recoil";
};

export default function StatLine({ label, value, kind }: StatLineProps) {
  const isPositive = value >= 0;
  const tone =
    kind === "ergonomics"
      ? isPositive
        ? "text-[var(--tarkov-accent-strong)]"
        : "text-[var(--tarkov-danger)]"
      : !isPositive
        ? "text-[var(--tarkov-accent-strong)]"
        : "text-[var(--tarkov-danger)]";

  return (
    <div className="flex items-center justify-end gap-1 whitespace-nowrap">
      <Text as="span" variant="label">
        {label}:
      </Text>
      <span className={clsx("text-sm font-semibold", tone)}>
        {value.toFixed(1)}
      </span>
    </div>
  );
}
