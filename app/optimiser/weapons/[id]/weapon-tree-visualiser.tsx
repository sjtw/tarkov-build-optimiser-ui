import React from "react";
import { Item, Slot, WeaponTree } from "@/app/lib/definitions";
import { getItemImages } from "@/app/lib/tarkov-api";

async function ItemBox({ item }: { item: Item }) {
  const imageData = await getItemImages([item.id]);
  console.log(imageData);
  return (
    <div className="p-4">
      <ul className="p-2">
        <li className="font-bold">{item.name}</li>
        <li>
          <img src={imageData[0].image} alt="" />
        </li>
        <li>Ergonomics Modifier: {item.ergonomics_modifier}</li>
        <li>Recoil Modifier: {item.recoil_modifier}</li>
      </ul>
      Slots
      <div className="m-4">
        {item.slots.map((slot: Slot) => (
          <div className="p-4 border" key={slot.id}>
            {slot.name}

            {slot.item && <ItemBox item={slot.item} />}
            {!slot.item && <div className="p-4">Empty</div>}
          </div>
        ))}
      </div>
    </div>
  );
}

function WeaponTreeVisualiser({ weapon }: { weapon: WeaponTree }) {
  return (
    <div>
      <ul>
        <li>Build Type: {weapon.build_type}</li>
        <li>Ergonomics: {weapon.ergonomics_sum}</li>
        <li>Recoil: {weapon.recoil_sum}</li>
      </ul>
      <ItemBox item={weapon.build} />
    </div>
  );
}

export default WeaponTreeVisualiser;
