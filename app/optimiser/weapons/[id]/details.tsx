"use client";

import React from "react";
import { useSearchParams } from "next/navigation";
import Box from "@/app/ui/box";

export function Details({ id }: { id: string }) {
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  return (
    <Box>
      <div>weapon_id: {id}</div>
      <div>prapor_level: {params.get("prapor_level")}</div>
      <div>peacekeeper_level: {params.get("peacekeeper_level")}</div>
      <div>jager_level: {params.get("jaeger_level")}</div>
      <div>mechanic_level: {params.get("mechanic_level")}</div>
      <div>skier_level: {params.get("skier_level")}</div>
    </Box>
  );
}
