import Link from "next/link";
import React from "react";
import { Button, Metric } from "@tremor/react";
import DataTable from "./components/DataTable";
import ROUTES from "@/config/ROUTES";

async function ManageAssets() {
    return (
        <div>
            <div className="mb-7 flex items-center gap-5">
                <Metric>Daftar Aset</Metric>
                <Link href={ROUTES.CREATE_ASSET}>
                    <Button size="xs">Tambah Baru</Button>
                </Link>
            </div>
            <DataTable />
        </div>
    );
}

export default ManageAssets;
