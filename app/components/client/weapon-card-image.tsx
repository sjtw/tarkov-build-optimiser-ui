"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import clsx from "clsx";

type WeaponCardImageProps = {
  weaponId: string;
  presetId: string;
  name: string;
  className?: string;
};

export default function WeaponCardImage({
  weaponId,
  presetId,
  name,
  className,
}: WeaponCardImageProps) {
  const [failedPreset, setFailedPreset] = useState(false);
  const [failedWeapon, setFailedWeapon] = useState(false);

  useEffect(() => {
    setFailedPreset(false);
    setFailedWeapon(false);
  }, [weaponId, presetId]);

  // Don't try to load images if IDs are missing
  const hasValidPresetId = presetId && presetId.trim() !== "";
  const hasValidWeaponId = weaponId && weaponId.trim() !== "";

  const src =
    !hasValidPresetId || failedPreset
      ? !hasValidWeaponId || failedWeapon
        ? "/file.svg"
        : `/images/tarkov/${weaponId}.webp`
      : `/images/tarkov/${presetId}.webp`;

  return (
    <div
      className={clsx(
        "flex items-center justify-center rounded-xl bg-[var(--tarkov-bg-800)]/80 p-2",
        className,
      )}
    >
      <Image
        src={src}
        alt={`${name} image`}
        width={128}
        height={64}
        className="object-contain"
        onError={() => {
          if (!failedPreset) {
            setFailedPreset(true);
          } else if (!failedWeapon) {
            setFailedWeapon(true);
          }
        }}
      />
    </div>
  );
}
