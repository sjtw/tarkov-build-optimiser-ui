import React from "react";
import Card from "@/app/ui/card";
import WeaponImage from "@/app/ui/weapon-image";
import Link from "next/link";

interface Props {
  id: string;
  name: string;
  href: string;
  selected?: boolean;
}

function WeaponCard({ id, name, href, selected }: Props) {
  return (
    <Link href={href}>
      <Card className={selected ? "bg-teal-800" : undefined} title={name}>
        <WeaponImage id={id} name={name} />
      </Card>
    </Link>
  );
}

export default WeaponCard;
