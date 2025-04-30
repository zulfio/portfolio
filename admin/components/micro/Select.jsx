"use client";

import { Select, SelectItem } from "@tremor/react";
import { useState } from "react";

const SelectOption = ({ options, children, placeholder = "Pilih" }) => {
  const [selectedOption, setSelectedOption] = useState(options[0]);
  return (
    <Select
      placeholder={placeholder}
      value={selectedOption}
      onValueChange={(val) => setSelectedOption(val)}
      enableClear={true}
      className="w-full w-[200px] z-20"
    >
      {options.map((item, index) => (
        <SelectItem value={item.value} key={index} className="cursor-pointer">
          {children} {item.title}
        </SelectItem>
      ))}
    </Select>
  );
};

export default SelectOption;
