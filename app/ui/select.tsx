import React, { ChangeEvent } from "react";
import clsx from "clsx";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

type Option = {
  name: string;
  value: string | number;
};

export function SelectLabel({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <label className={className}>{children}</label>;
}

export interface SelectProps extends React.HTMLProps<HTMLSelectElement> {
  placeholderText: string;
  options: Option[];
  className?: string;
  param: string;
}

function Select({
  placeholderText,
  options,
  className,
  param,
  ...otherProps
}: SelectProps) {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();

  const onChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const params = new URLSearchParams(searchParams);

    params.set(param, e.target.value);
    replace(`${pathname}?${params.toString()}`);
  };

  const value = searchParams.get(param) || "";

  return (
    <select
      className={clsx(" text-black bg-gray-300", className)}
      onChange={onChange}
      value={value}
      {...otherProps}
    >
      <option value="" disabled>
        {placeholderText}
      </option>
      {options.map((o) => (
        <option key={o.value} value={o.value}>
          {o.name}
        </option>
      ))}
    </select>
  );
}

export default Select;
