"use client";

import React from "react";
import Select, { SelectLabel } from "@/app/ui/select";
import { GroupedWeaponPresets } from "@/app/lib/definitions";

interface Props {
  presets: GroupedWeaponPresets;
}

function CategorySelection({ presets }: Props) {
  const categories = Object.keys(presets).map((k) => ({
    value: k,
    name: k,
  }));

  return (
    <>
      <SelectLabel>Weapon Category</SelectLabel>
      <Select
        className="mt-2 mx-4 px-2 py-1"
        placeholderText="Select weapon category"
        options={categories}
        param={"weapon_category"}
      />
    </>
  );
}

export default CategorySelection;
