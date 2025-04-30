import { Metric } from "@tremor/react";
import React from "react";
import DataTable from "./components/DataTable";
import { reqGetRoles } from "@/backend/role";

async function ManageRole({ searchParams }) {
    let { page } = searchParams;
    page = isNaN(page) ? 1 : Math.abs(parseInt(page));
    const limit = 10;

    const { success, roles, total } = await reqGetRoles({
        page: page,
        limit,
    });

    if (!success) throw new Error("Failed to fetch roles");

    return (
        <div>
            <div className="mb-5 flex items-center justify-between gap-5">
                <Metric>Roles</Metric>
            </div>
            <div className="relative grid grid-cols-1 gap-5 sm:grid-cols-3">
                <DataTable
                    data={JSON.stringify({
                        roles: roles,
                        pagination: {
                            total: total,
                            currentPage: page,
                            limit,
                        },
                    })}
                />
            </div>
        </div>
    );
}

export default ManageRole;
