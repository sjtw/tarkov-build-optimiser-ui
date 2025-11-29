"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import clsx from "clsx";

type TarkovImageProps = {
  itemId: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
};

export default function TarkovImage({
  itemId,
  alt,
  width = 96,
  height = 96,
  className,
}: TarkovImageProps) {
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    setFailed(false);
  }, [itemId]);

  // Don't try to load image if itemId is missing
  const shouldUseFallback = !itemId || itemId.trim() === "" || failed;

  return (
    <div
      className={clsx(
        "flex items-center justify-center rounded-xl bg-[var(--tarkov-panel-muted)]/80 p-2",
        className,
      )}
    >
      <Image
        alt={alt}
        src={shouldUseFallback ? "/file.svg" : `/images/tarkov/${itemId}.webp`}
        width={width}
        height={height}
        className="object-contain"
        onError={() => {
          if (!failed) {
            setFailed(true);
          }
        }}
      />
    </div>
  );
}
