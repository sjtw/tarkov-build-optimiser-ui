import React from "react";

function WeaponImage({ id, name }: { id: string; name: string }) {
  return (
    <img
      id={id}
      key={id}
      src={`/images/tarkov/${id}.webp`}
      alt={`${name} image.`}
      className="object-scale-down"
    />
  );
}

export default WeaponImage;
