import React from "react";
import { Stack, Text } from "@/app/optimiser-v2/_components/ui";

export default function NodeMeta({
  label,
  title,
  subtitle,
  media,
}: {
  label: string;
  title: string;
  subtitle: string;
  media: React.ReactNode;
}) {
  return (
    <div className="flex min-w-0 flex-1 items-center gap-4">
      {media}
      <Stack gap="xs" className="min-w-0">
        <Text variant="label">{label}</Text>
        <h3 className="truncate text-xl font-semibold text-white">{title}</h3>
        <Text variant="subtle" className="truncate">
          {subtitle}
        </Text>
      </Stack>
    </div>
  );
}
