import React from "react";

function WeaponImage({ url }: { url: string }) {
  return <img src={url} className="aspect-auto h-16" />;
}

export default WeaponImage;
