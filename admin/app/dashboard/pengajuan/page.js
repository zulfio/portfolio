import React from "react";
import { Button, Metric } from "@tremor/react";
import DataTable from "./components/DataTable";
import ROUTES from "@/config/ROUTES";

async function ManageAssets() {
    return (
        <div>
            <div className="mb-7 flex items-center gap-5">
                <Metric>Daftar Pengajuan Dana</Metric>
                <a href={ROUTES.CREATE_FUNDING_APPLICATION} target="_blank">
                    <Button size="xs">Buat Pengajuan Dana</Button>
                </a>
            </div>
            <DataTable />
        </div>
    );
}

export default ManageAssets;
