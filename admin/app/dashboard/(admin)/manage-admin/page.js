import Link from "next/link";
import React from "react";
import { Button, Metric } from "@tremor/react";
import DataTable from "./components/DataTable";
import ROUTES from "@/config/ROUTES";
import { reqGetAdmins } from "@/backend/admin";
import { reqGetRoles } from "@/backend/role";

async function Admins({ searchParams }) {
    let { page, role, search } = searchParams;
    page = isNaN(page) ? 1 : Math.abs(parseInt(page));
    const limit = 10;

    const [getAdminsResponse, getRolesResponse] = await Promise.all([
        reqGetAdmins({
            page: page,
            limit,
            role,
            search,
        }),
        reqGetRoles({ limit: -1 }),
    ]);

    if (!getAdminsResponse.success) {
        throw new Error(getAdminsResponse.message);
    }

    if (!getRolesResponse.success) {
        throw new Error(getRolesResponse.message);
    }

    const { admins, total } = getAdminsResponse;
    const { roles } = getRolesResponse;

    return (
        <div>
            <div className="mb-7 flex items-center gap-5">
                <Metric>Admins</Metric>
                <Link href={ROUTES.CREATE_ADMIN}>
                    <Button size="xs">Tambah Admin</Button>
                </Link>
            </div>
            <DataTable
                data={JSON.stringify({
                    roles,
                    currentRole: role,
                    admins,
                    pagination: {
                        total: total,
                        currentPage: page,
                        limit,
                    },
                })}
            />
        </div>
    );
}

export default Admins;
