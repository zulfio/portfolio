"use client";

import React, { useEffect, useState } from "react";
import Table from "./Table";
import Information from "./Information";
import AddFormModal from "./modals/AddFormModal";
import { useRouter } from "next/navigation";
import ROUTES from "@/config/ROUTES";
import { Card } from "@tremor/react";

function DataTable({ data }) {
    const router = useRouter();

    const [roles, setRoles] = useState([]);
    const [pagination, setPagination] = useState({});

    useEffect(() => {
        const parsedData = JSON.parse(data);

        setRoles(parsedData.roles);
        setPagination(parsedData.pagination);
    }, [data]);

    return (
        <>
            <div className="order-last col-span-1 sm:order-first sm:col-span-2">
                <Table roles={roles} pagination={pagination} />
            </div>
            <div className="col-span-1 sm:col-span-1">
                <Card>
                    <AddFormModal
                        onAdded={() => {
                            router.push(`${ROUTES.ROLES}?page=1`, { scroll: false });
                            router.refresh();
                        }}
                    />
                    <Information />
                </Card>
            </div>
        </>
    );
}

export default DataTable;
