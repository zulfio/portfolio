"use client";

import React from "react";
import { Select, SelectItem } from "@tremor/react";

function RoleFilter({ value = "", roles = [], onChange = () => {} }) {
    return (
        <div className="max-w-sm">
            <Select value={value} onValueChange={onChange} placeholder="All role" enableClear={true}>
                {roles.map((role) => (
                    <SelectItem key={role._id} value={role._id} className="cursor-pointer">
                        {role.name}
                    </SelectItem>
                ))}
            </Select>
        </div>
    );
}

export default RoleFilter;
