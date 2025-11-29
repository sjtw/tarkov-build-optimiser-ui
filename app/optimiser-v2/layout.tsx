import React from "react";
import type { Metadata } from "next";
import WeaponPresetProvider from "@/app/ui/weapon-preset-context";

export const metadata: Metadata = {
  title: "Optimiser V2",
  description: "Visualise Escape From Tarkov weapon builds with style.",
};

export default function OptimiserV2Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <WeaponPresetProvider>
      <div className="optimiser-v2-shell">{children}</div>
    </WeaponPresetProvider>
  );
}
