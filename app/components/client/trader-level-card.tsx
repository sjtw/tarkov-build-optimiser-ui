"use client";

import React from "react";
import Image from "next/image";
import clsx from "clsx";
import Surface from "@/app/components/ui/surface";
import Stack from "@/app/components/ui/stack";
import Text from "@/app/components/ui/text";
import Button from "@/app/components/ui/button";

type TraderLevelCardProps = {
  label: string;
  image: string;
  selectedValue: string;
  levels: string[];
  onSelect: (value: string) => void;
};

export default function TraderLevelCard({
  label,
  image,
  selectedValue,
  levels,
  onSelect,
}: TraderLevelCardProps) {
  return (
    <Surface variant="panel" className="flex items-stretch gap-3 p-3">
      <div className="relative aspect-square flex-shrink-0 self-stretch overflow-hidden rounded-xl border border-[var(--tarkov-border)] bg-[var(--tarkov-panel)]">
        <Image src={image} alt={label} fill sizes="80px" className="object-cover" />
      </div>
      <Stack gap="sm" className="flex-1">
        <Text variant="label">{label}</Text>
        <div className="grid grid-cols-4 gap-2" role="group" aria-label={`${label} levels`}>
          {levels.map((level) => (
            <Button
              key={level}
              variant="pill"
              aria-label={`Set ${label} to level ${level}`}
              aria-pressed={selectedValue === level}
              onClick={() => onSelect(level)}
              className={clsx(
                selectedValue === level
                  ? "border-[var(--tarkov-highlight)]"
                  : undefined,
              )}
            >
              {level}
            </Button>
          ))}
        </div>
      </Stack>
    </Surface>
  );
}
