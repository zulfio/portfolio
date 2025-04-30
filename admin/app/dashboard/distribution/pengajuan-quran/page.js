import React from "react";
import { Metric } from "@tremor/react";
import DataTable from "./components/DataTable";

async function ManageDistributionApplication() {
    return (
        <div>
            <div className="mb-7 flex items-center gap-5">
                <Metric>Daftar Pengajuan Quran</Metric>
            </div>
            <DataTable />
        </div>
    );
}

export default ManageDistributionApplication;
