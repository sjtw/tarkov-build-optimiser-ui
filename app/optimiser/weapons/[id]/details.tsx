"use client";

import React from "react";
import Box from "@/app/ui/box";

interface Props {
  id: string;
  status: string;
  name: string;
}

export function EvaluationStatus({ status, name }: Props) {
  return (
    <Box>
      {status === "Pending" &&
        `${name} currently queued for evaluation, come back later.`}
      {status === "InProgress" &&
        `{name} is currently in progress for this weapon.`}
      {status === "Failed" && `Evaluation failed for {name}.`}
      {/*<div>weapon_id: {id}</div>*/}
      {/*<div>prapor_level: {params.get("prapor_level")}</div>*/}
      {/*<div>peacekeeper_level: {params.get("peacekeeper_level")}</div>*/}
      {/*<div>jager_level: {params.get("jaeger_level")}</div>*/}
      {/*<div>mechanic_level: {params.get("mechanic_level")}</div>*/}
      {/*<div>skier_level: {params.get("skier_level")}</div>*/}
    </Box>
  );
}
