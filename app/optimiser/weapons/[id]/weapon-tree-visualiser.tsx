import React from "react";
import { Item, Slot, WeaponTree } from "@/app/lib/definitions";

async function ItemBox({ item }: { item: Item }) {
  return (
    <div className="p-4 my-4  bg-neutral-800">
      <div className="flex">
        <div className="flex-1">
          <div>{item.name}</div>
          <div>
            <img src={`/images/tarkov/${item.id}.webp`} alt="" />
          </div>
        </div>
        <div className="flex-1">
          <div>Ergonomics Modifier: {item.ergonomics_modifier}</div>
          <div>Recoil Modifier: {item.recoil_modifier}</div>
        </div>
      </div>
      {item.slots && item.slots.length > 0 && (
        <div className="m-4 p-4">
          {item.slots.map((slot: Slot) => (
            <div className="p-4  bg-neutral-900" key={slot.id}>
              <span className="font-bold">{slot.name}</span>

              {slot.item && <ItemBox item={slot.item} />}
              {!slot.item && <div className="p-4">Empty/Default</div>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function WeaponTreeVisualiser({ weapon }: { weapon: WeaponTree }) {
  return (
    <div className="rounded-md p-4">
      <ul>
        <li>Weapon: {weapon.name}</li>
        <li>Total Ergonomics: {weapon.ergonomics_sum}</li>
        <li>Total Recoil: {weapon.recoil_sum}</li>
      </ul>
      <ItemBox item={weapon} />
    </div>
  );
}

export default WeaponTreeVisualiser;
