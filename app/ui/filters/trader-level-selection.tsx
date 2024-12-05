"use client";

import React from "react";
import { TraderLevelNames } from "@/app/lib/definitions";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import clsx from "clsx";
import Box from "@/app/ui/box";

interface LevelButtonParams {
  onClick: () => void;
  text: string;
  selected: boolean;
}

function LevelButton({ selected, onClick, text }: LevelButtonParams) {
  return (
    <button
      onClick={onClick}
      className={clsx(
        "hover:bg-sky-500 h-8 w-8 mr-0 border-teal-800 border",
        selected && "bg-teal-600",
      )}
    >
      {text}
    </button>
  );
}

interface LevelButtonGroupParams {
  param: string;
  label: string;
}

function LevelButtonGroup({ param, label }: LevelButtonGroupParams) {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();

  const onChange = (value: string) => {
    const params = new URLSearchParams(searchParams);

    params.set(param, value);
    replace(`${pathname}?${params.toString()}`);
  };

  const value = searchParams.get(param) || "1";

  return (
    <Box className="m-1 p-1">
      <h4>{label}</h4>
      <LevelButton
        onClick={() => onChange("1")}
        selected={value === "1"}
        text="1"
      />
      <LevelButton
        onClick={() => onChange("2")}
        selected={value === "2"}
        text="2"
      />
      <LevelButton
        onClick={() => onChange("3")}
        selected={value === "3"}
        text="3"
      />
      <LevelButton
        onClick={() => onChange("4")}
        selected={value === "4"}
        text="4"
      />
    </Box>
  );
}

function TraderLevelSelection() {
  return (
    <>
      <div>
        <LevelButtonGroup label="Prapor" param={TraderLevelNames.Prapor} />
        <LevelButtonGroup
          label="Peacekeeper"
          param={TraderLevelNames.Peacekeeper}
        />
        <LevelButtonGroup label="Mechanic" param={TraderLevelNames.Mechanic} />
        <LevelButtonGroup label="Skier" param={TraderLevelNames.Skier} />
        <LevelButtonGroup label="Jaeger" param={TraderLevelNames.Jaeger} />
      </div>
    </>
  );
}

export default TraderLevelSelection;
