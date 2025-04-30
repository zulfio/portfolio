import { Card, Col, Grid, Metric } from "@tremor/react";
import React from "react";
import AddForm from "./components/AddForm";
import DataTable from "./components/DataTable";
import { Squares2X2Icon } from "@heroicons/react/20/solid";

async function Categories() {
    return (
        <>
            <div className="mb-7 flex items-center gap-3">
                <Squares2X2Icon className="h-6 w-6 text-slate-800" />
                <Metric>Kategori</Metric>
            </div>
            <Card>
                <Grid numItemsSm={1} numItemsLg={8} className="gap-11">
                    <Col numColSpanLg={2} numColSpanSm={1}>
                        <AddForm />
                    </Col>
                    <Col numColSpanLg={6} numColSpanSm={1}>
                        <DataTable />
                    </Col>
                </Grid>
            </Card>
        </>
    );
}

export default Categories;
