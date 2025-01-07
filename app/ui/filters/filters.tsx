import React from "react";
import TraderLevelSelection from "@/app/ui/filters/trader-level-selection";
import CategorySelection from "@/app/ui/filters/category-selection";
import WeaponBrowser from "@/app/ui/weapon-browser";

interface Props {
  selectedId?: string;
}

function Filters({ selectedId }: Props) {
  return (
    <div className="flex h-full">
      <div className="p-4 border-r border-teal-800">
        <h3>Trader Rep</h3>
        <TraderLevelSelection />
      </div>
      <div className="w-72 p-4 border-r border-teal-800 overflow-y-scroll">
        <CategorySelection />
        <WeaponBrowser selectedId={selectedId} />
      </div>
    </div>
  );
}

export default Filters;
