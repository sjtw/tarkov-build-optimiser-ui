import React from "react";
import clsx from "clsx";

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
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  className?: string;
  value?: string;
}

function Select({
  placeholderText,
  options,
  onChange,
  className,
  value,
  ...otherProps
}: SelectProps) {
  return (
    <select
      className={clsx(" text-black bg-gray-300", className)}
      defaultValue=""
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
