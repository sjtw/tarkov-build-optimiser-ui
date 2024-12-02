import React from "react";
import { Item, Slot, WeaponTree } from "@/app/lib/definitions";
import { getItemImages } from "@/app/lib/tarkov-api";

async function ItemBox({ item }: { item: Item }) {
  const imageData = await getItemImages([item.id]);
  return (
    <div className="p-4">
      <div className="flex">
        <div className="flex-1">
          <div className="font-bold">{item.name}</div>
          <div>Ergonomics Modifier: {item.ergonomics_modifier}</div>
          <div>Recoil Modifier: {item.recoil_modifier}</div>
        </div>
        <div className="flex-1">
          <div>
            <img src={imageData[0].image} alt="" />
          </div>
        </div>
      </div>
      {item.slots.length > 0 && (
        <div className="m-4">
          {item.slots.map((slot: Slot) => (
            <div className="p-4 border" key={slot.id}>
              {slot.name}

              {slot.item && <ItemBox item={slot.item} />}
              {!slot.item && <div className="p-4">Empty</div>}
            </div>
          ))}
        </div>
      )}
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
