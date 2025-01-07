import React from "react";
import Filters from "@/app/ui/filters/filters";
import WeaponPresetProvider from "@/app/ui/weapon-preset-context";

async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div className="flex pb-0 h-full">
      <WeaponPresetProvider>
        <Filters selectedId={id} />
      </WeaponPresetProvider>
      <div className="flex-grow overflow-y-scroll p-4">{children}</div>
    </div>
  );
}

export default Layout;
