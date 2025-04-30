import { Metric } from "@tremor/react";
import React from "react";
import Form from "./components/Form";

async function AddAdmin() {
    return (
        <div>
            <div className="sm:flex sm:items-center">
                <Metric>Tambah Admin</Metric>
            </div>
            <Form />
        </div>
    );
}

export default AddAdmin;
