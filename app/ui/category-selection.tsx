"use client";

import React from "react";
import Select, { SelectLabel, SelectProps } from "@/app/ui/select";
import Box from "@/app/ui/box";

interface Props {
  categories: SelectProps["options"];
  setCategory: (selectedCategory: string | null) => void;
}

function CategorySelection({ categories, setCategory }: Props) {
  return (
    <Box>
      <SelectLabel>Categories</SelectLabel>
      <Select
        className="w-full mt-2 px-2 py-1"
        placeholderText="Select weapon category"
        options={categories}
        onChange={(e) =>
          e.target.value !== "" ? setCategory(e.target.value) : null
        }
      />
    </Box>
  );
}

export default CategorySelection;
