"use client";

import React, { useContext } from "react";
import { useSearchParams } from "next/navigation";
import Box from "@/app/ui/box";
import { WeaponPresetContext } from "@/app/ui/weapon-preset-context";

interface Props {
  id: string;
  status: string;
}

export function EvaluationStatus({ id, status }: Props) {
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const { weaponsById } = useContext(WeaponPresetContext);
  const name = weaponsById[id]?.name;
  return (
    <Box>
      {status === "Pending" &&
        `${name} currently queued for evaluation, come back later.`}
      {status === "InProgress" &&
        `{name} is currently in progress for this weapon.`}
      {status === "Failed" && `Evaluation failed for {name}.`}
      <div>weapon_id: {id}</div>
      <div>prapor_level: {params.get("prapor_level")}</div>
      <div>peacekeeper_level: {params.get("peacekeeper_level")}</div>
      <div>jager_level: {params.get("jaeger_level")}</div>
      <div>mechanic_level: {params.get("mechanic_level")}</div>
      <div>skier_level: {params.get("skier_level")}</div>
    </Box>
  );
}
