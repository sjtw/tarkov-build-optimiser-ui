"use client";

import React, { useContext } from "react";
import Select, { SelectLabel } from "@/app/ui/select";
import { WeaponPresetContext } from "@/app/ui/weapon-preset-context";

function CategorySelection() {
  const weapons = useContext(WeaponPresetContext);
  const categories = Object.keys(weapons.weaponsByCategory).map((k) => ({
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
