"use client";

import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import Panel from "@/app/ui/panel";
import { WeaponPresetContext } from "@/app/ui/weapon-preset-context";
import {
  CATEGORY_PARAM,
  DEFAULT_TRADER_LEVEL,
  TRADER_LEVELS,
  WEAPON_NAME_PARAM,
  WEAPON_PARAM,
  WEAPON_PRESET_PARAM,
} from "@/app/optimiser-v2/constants";
import { TraderLevelNames } from "@/app/lib/definitions";
import clsx from "clsx";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import WeaponCardImage from "@/app/optimiser-v2/_components/weapon-card-image";
import Image from "next/image";

type FilterRailProps = {
  category?: string;
  weaponId?: string;
};

const levelValues = ["1", "2", "3", "4"];

export default function FilterRail({ category, weaponId }: FilterRailProps) {
  const { presetsByCategory, status } = useContext(WeaponPresetContext);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [searchTerm, setSearchTerm] = useState("");

  const categories = useMemo(() => {
    return Object.keys(presetsByCategory)
      .sort()
      .map((key) => ({
        label: key,
        value: key,
      }));
  }, [presetsByCategory]);

  const activeCategory = category || categories[0]?.value;

  const updateParams = useCallback(
    (updates: Record<string, string | undefined>) => {
      const params = new URLSearchParams(searchParams.toString());
      Object.entries(updates).forEach(([key, value]) => {
        if (!value) {
          params.delete(key);
        } else {
          params.set(key, value);
        }
      });

      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [pathname, router, searchParams],
  );

  useEffect(() => {
    if (!category && categories[0]) {
      updateParams({ [CATEGORY_PARAM]: categories[0].value });
    }
  }, [categories, category, updateParams]);

  const setTraderLevel = useCallback(
    (param: TraderLevelNames, value: string) => {
      updateParams({ [param]: value });
    },
    [updateParams],
  );

  const selectWeapon = useCallback(
    (id?: string, name?: string, presetId?: string) => {
      updateParams({
        [WEAPON_PARAM]: id,
        [WEAPON_NAME_PARAM]: name,
        [WEAPON_PRESET_PARAM]: presetId,
      });
    },
    [updateParams],
  );

  const filteredWeapons = useMemo(() => {
    if (!activeCategory) {
      return [];
    }
    const presets = presetsByCategory[activeCategory] || [];
    if (!searchTerm) {
      return presets;
    }
    const lower = searchTerm.toLowerCase();
    return presets.filter((preset) =>
      preset.name.toLowerCase().includes(lower),
    );
  }, [activeCategory, presetsByCategory, searchTerm]);

  return (
    <Panel className="space-y-6">
      <div className="flex flex-wrap items-baseline justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.35em] text-[var(--tarkov-text-muted)]">
            Tarkov Optimiser
          </p>
          <h1 className="text-3xl font-semibold text-white">Build Visualiser</h1>
        </div>
        <button
          onClick={() => {
            setSearchTerm("");
            const defaults: Record<string, string | undefined> = {
              [CATEGORY_PARAM]: categories[0]?.value,
              [WEAPON_PARAM]: undefined,
              [WEAPON_NAME_PARAM]: undefined,
              [WEAPON_PRESET_PARAM]: undefined,
            };
            TRADER_LEVELS.forEach(({ param }) => {
              defaults[param] = DEFAULT_TRADER_LEVEL;
            });
            updateParams(defaults);
          }}
          className="rounded-full border border-[var(--tarkov-border-strong)]/60 px-4 py-2 text-xs uppercase tracking-widest text-[var(--tarkov-highlight)] transition hover:border-[var(--tarkov-highlight)] hover:text-white"
        >
          Reset Filters
        </button>
      </div>
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,2fr)]">
        <div className="space-y-4">
          <h2 className="text-sm uppercase tracking-widest text-[var(--tarkov-text-muted)]">
            Trader Levels
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {TRADER_LEVELS.map(({ label, param, image }) => (
              <LevelSelector
                key={param}
                label={label}
                param={param}
                image={image}
                onSelect={setTraderLevel}
              />
            ))}
          </div>
        </div>
        <div className="space-y-4">
          <h2 className="text-sm uppercase tracking-widest text-[var(--tarkov-text-muted)]">
            Weapon Catalogue
          </h2>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest text-[var(--tarkov-text-muted)]">
                Category
              </label>
              <select
                className="w-full rounded-xl border border-[var(--tarkov-border-strong)] bg-[var(--tarkov-bg-800)]/90 px-3 py-2 text-sm text-white focus:border-[var(--tarkov-highlight)] focus:outline-none"
                value={activeCategory || ""}
                onChange={(event) =>
                  updateParams({ [CATEGORY_PARAM]: event.target.value })
                }
              >
                {categories.map((cat) => (
                  <option key={cat.value} value={cat.value} className="bg-[var(--tarkov-bg-800)] text-black">
                    {cat.label}
                  </option>
            ))}
          </select>
        </div>
        <div className="space-y-2">
          <label className="text-xs uppercase tracking-widest text-[var(--tarkov-text-muted)]">
            Search
          </label>
          <div className="relative">
            <input
              type="text"
              placeholder="Enter weapon name"
              className="w-full rounded-xl border border-[var(--tarkov-border-strong)] bg-[var(--tarkov-bg-800)]/90 px-3 py-2 pr-10 text-sm text-white placeholder:text-[var(--tarkov-text-muted)] focus:border-[var(--tarkov-highlight)] focus:outline-none"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
            />
            {searchTerm && (
              <button
                type="button"
                onClick={() => setSearchTerm("")}
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full border border-[var(--tarkov-border)] bg-[var(--tarkov-panel-muted)]/70 px-2 text-xs text-[var(--tarkov-text-muted)] transition hover:text-white"
              >
                ✕
              </button>
            )}
          </div>
        </div>
      </div>
          <div className="max-h-[360px] space-y-2 overflow-y-auto pr-2">
            {status === "pending" && (
              <p className="text-sm text-[var(--tarkov-text-muted)]">
                Loading presets...
              </p>
            )}
            {status === "error" && (
              <p className="text-sm text-[var(--tarkov-danger)]">
                Failed to load weapons.
              </p>
            )}
            {status === "complete" && filteredWeapons.length === 0 && (
              <p className="text-sm text-[var(--tarkov-text-muted)]">
                No weapons match your filters.
              </p>
            )}
            {filteredWeapons.map((preset) => (
              <button
                key={preset.id}
                onClick={() =>
                  selectWeapon(
                    preset.properties.baseItem.id,
                    preset.name,
                    preset.id,
                  )
                }
                className={clsx(
                  "flex w-full items-center gap-3 rounded-2xl border px-3 py-3 text-left transition",
                  weaponId === preset.properties.baseItem.id
                    ? "border-[var(--tarkov-highlight)] bg-[var(--tarkov-panel-muted)]/70 shadow-[0_0_35px_rgba(61,213,243,0.15)]"
                    : "border-[var(--tarkov-border)] bg-[var(--tarkov-panel-muted)]/30 hover:border-[var(--tarkov-border-strong)] hover:bg-[var(--tarkov-panel-muted)]/60",
                )}
              >
                <WeaponCardImage
                  weaponId={preset.properties.baseItem.id}
                  presetId={preset.id}
                  name={preset.name}
                  className="w-24"
                />
                <div>
                  <div className="text-sm font-semibold text-white">
                    {preset.name}
                  </div>
                  <p className="text-xs text-[var(--tarkov-text-muted)]">
                    {preset.properties.baseItem.name}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </Panel>
  );
}

type LevelSelectorProps = {
  label: string;
  param: TraderLevelNames;
  image: string;
  onSelect: (param: TraderLevelNames, value: string) => void;
};

function LevelSelector({ label, param, image, onSelect }: LevelSelectorProps) {
  const searchParams = useSearchParams();
  const value = searchParams.get(param) || DEFAULT_TRADER_LEVEL;

  return (
    <div className="flex items-stretch gap-3 rounded-2xl border border-[var(--tarkov-border)] bg-[var(--tarkov-panel-muted)]/60 p-3">
      <div className="relative aspect-square flex-shrink-0 self-stretch overflow-hidden rounded-xl border border-[var(--tarkov-border)] bg-[var(--tarkov-panel)]">
        <Image
          src={image}
          alt={label}
          fill
          sizes="80px"
          className="object-cover"
        />
      </div>
      <div className="flex flex-1 flex-col gap-2">
        <div className="text-xs uppercase tracking-widest text-[var(--tarkov-text-muted)]">
          {label}
        </div>
        <div className="grid grid-cols-4 gap-2">
          {levelValues.map((level) => (
            <button
              key={level}
              onClick={() => onSelect(param, level)}
              className={clsx(
                "rounded-lg border px-2 py-1 text-sm transition",
                value === level
                  ? "border-[var(--tarkov-accent)] bg-[var(--tarkov-accent)]/20 text-white"
                  : "border-[var(--tarkov-border)] text-[var(--tarkov-text-muted)] hover:border-[var(--tarkov-border-strong)] hover:text-white",
              )}
            >
              {level}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
