"use client";

import { useEffect, useState } from "react";
import { Select, SelectItem } from "@tremor/react";
import getMonthName from "@/lib/utils/date/getMonthName";

function DateFilter({ value = "", onChange = () => {}, data = [] }) {
    const [options, setOptions] = useState([]);

    useEffect(() => {
        const options = data.map((item) => {
            const [year, month] = item.split("/");
            return {
                title: `${year} ${getMonthName(month)}`,
                value: item,
            };
        });

        setOptions(options);
    }, [data]);

    return (
        <Select placeholder="All dates" value={value} onValueChange={(val) => onChange(val)} enableClear={true}>
            {options.map((item, index) => (
                <SelectItem value={item.value} key={index} className="cursor-pointer">
                    {item.title}
                </SelectItem>
            ))}
        </Select>
    );
}

export default DateFilter;
