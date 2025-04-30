"use client";

import { useEffect, useState } from "react";
import { SearchSelect, SearchSelectItem } from "@tremor/react";
import { Cog6ToothIcon } from "@heroicons/react/20/solid";
import { reqGetRoles } from "@/backend/role";

/**
 * RoleInput component represents a form input for selecting a role.
 *
 * @param {Object} props - The component props.
 * @param {Function} props.onChange - The function to be called when the selected role changes.
 * @param {Object} props.errors - ZOD errors object from useForm.
 * @param {string} props.defaultValue - The default value for the input.
 * @returns {JSX.Element} The RoleInput component.
 */
function RoleInput({ onChange, errors, defaultValue }) {
    const [roles, setRoles] = useState([]);
    const [isFetchingFailed, setIsFetchingFailed] = useState(false);

    useEffect(() => {
        (async () => {
            const { success, message, roles } = await reqGetRoles({ limit: -1, fields: "name,description" });
            if (!success) {
                setIsFetchingFailed(true);
                console.error(message);
                return;
            }

            setRoles(roles);
        })();
    }, []);

    return isFetchingFailed ? (
        <div className="text-sm font-medium text-red-500">
            Failed to fetch roles. <button onClick={() => window.location.reload()}>Please try again</button>.
        </div>
    ) : (
        <SearchSelect
            defaultValue={defaultValue}
            placeholder="Role"
            onValueChange={onChange}
            icon={Cog6ToothIcon}
            error={errors.role}
            errorMessage={errors.role?.message}
        >
            {roles.map((role) => {
                return (
                    <SearchSelectItem key={role._id} value={role._id}>
                        {role.name}
                    </SearchSelectItem>
                );
            })}
        </SearchSelect>
    );
}

export default RoleInput;
