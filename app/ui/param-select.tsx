import React from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Select from "@/app/ui/select";

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

function ParamSelect({
  placeholderText,
  options,
  className,
  param,
}: SelectProps) {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();

  const onChange = (newValue: string) => {
    const params = new URLSearchParams(searchParams);

    params.set(param, newValue);
    replace(`${pathname}?${params.toString()}`);
  };

  const value = searchParams.get(param) || "";

  return (
    <Select
      placeholderText={placeholderText}
      options={options}
      value={value}
      className={className}
      onChange={onChange}
    />
  );
}

export default ParamSelect;
