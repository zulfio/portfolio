import { Card, Col, Grid, Metric } from "@tremor/react";
import React from "react";
import AddForm from "./components/AddForm";
import DataTable from "./components/DataTable";
import { ArrowPathRoundedSquareIcon } from "@heroicons/react/20/solid";

async function DistributionProgram() {
    return (
        <>
            <div className="mb-7 flex items-center gap-3">
                <ArrowPathRoundedSquareIcon className="h-6 w-6 text-slate-800" />
                <Metric>Program Pendistribusian</Metric>
            </div>
            <Card>
                <Grid numItemsSm={1} numItemsLg={8} className="gap-11">
                    <Col numColSpanLg={2} numColSpanSm={1}>
                        <AddForm />
                    </Col>
                    <Col numColSpanLg={6} numColSpanSm={1} className="p-1">
                        <DataTable />
                    </Col>
                </Grid>
            </Card>
        </>
    );
}

export default DistributionProgram;
