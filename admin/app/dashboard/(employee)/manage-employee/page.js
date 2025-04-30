import Link from "next/link";
import React from "react";
import { Button, Metric } from "@tremor/react";
import DataTable from "./components/DataTable";
import ROUTES from "@/config/ROUTES";

async function Employees() {
    return (
        <div>
            <div className="mb-7 flex items-center gap-5">
                <Metric>Karyawan</Metric>
                <Link href={ROUTES.CREATE_EMPLOYEE}>
                    <Button size="xs">Tambah Karyawan</Button>
                </Link>
            </div>
            <DataTable />
        </div>
    );
}

export default Employees;
