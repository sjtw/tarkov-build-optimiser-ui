import React from "react";
import Filters from "@/app/ui/filters/filters";
import { getWeaponDefaultPresets } from "@/app/lib/tarkov-api";

async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const presets = await getWeaponDefaultPresets();

  return (
    <div className="flex pb-0 h-full">
      <Filters presets={presets} selectedId={id} />
      <div className="flex-grow overflow-y-scroll p-4">{children}</div>
    </div>
  );
}

export default Layout;
