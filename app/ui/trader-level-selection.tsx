import React from "react";
import Select, { SelectLabel } from "@/app/ui/select";
import Box from "@/app/ui/box";
import { TraderLevelNames, TraderLevels } from "@/app/lib/definitions";

interface Props {
  onChange: (trader: string, level: string) => void;
  values: TraderLevels;
}

function TraderLevelSelection({ onChange, values }: Props) {
  const levels = [
    { name: "1", value: 1 },
    { name: "2", value: 2 },
    { name: "3", value: 3 },
    { name: "4", value: 4 },
  ];

  return (
    <Box>
      <SelectLabel>Prapor</SelectLabel>
      <Select
        className="w-full mt-2 px-2 py-1"
        placeholderText="Select Prapor level"
        options={levels}
        value={values[TraderLevelNames.Prapor] || ""}
        onChange={(e) => onChange(TraderLevelNames.Prapor, e.target.value)}
      />
      <SelectLabel>Jaeger</SelectLabel>
      <Select
        className="w-full mt-2 px-2 py-1"
        placeholderText="Select Jaeger level"
        options={levels}
        value={values[TraderLevelNames.Jager] || ""}
        onChange={(e) => onChange(TraderLevelNames.Jager, e.target.value)}
      />
      <SelectLabel>Peacekeeper</SelectLabel>
      <Select
        className="w-full mt-2 px-2 py-1"
        placeholderText="Select Peacekeeper level"
        options={levels}
        value={values[TraderLevelNames.Peacekeeper] || ""}
        onChange={(e) => onChange(TraderLevelNames.Peacekeeper, e.target.value)}
      />
      <SelectLabel>Mechanic</SelectLabel>
      <Select
        className="w-full mt-2 px-2 py-1"
        placeholderText="Select Mechanic level"
        options={levels}
        value={values[TraderLevelNames.Mechanic] || ""}
        onChange={(e) => onChange(TraderLevelNames.Mechanic, e.target.value)}
      />
      <SelectLabel>Skier</SelectLabel>
      <Select
        className="w-full mt-2 px-2 py-1"
        placeholderText="Select Skier level"
        options={levels}
        value={values[TraderLevelNames.Skier] || ""}
        onChange={(e) => onChange(TraderLevelNames.Skier, e.target.value)}
      />
    </Box>
  );
}

export default TraderLevelSelection;
