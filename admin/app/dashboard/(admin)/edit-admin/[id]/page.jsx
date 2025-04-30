import React from "react";
import { Metric } from "@tremor/react";
import Form from "./components/Form";
import { getAdminById } from "@/backend/admin";

async function EditAdmin({ params }) {
    const { success, admin, message } = await getAdminById(params.id);
    if (!success) throw new Error(message);

    return (
        <div>
            <div className="sm:flex sm:items-center">
                <Metric>Update Admin</Metric>
            </div>
            <Form admin={JSON.stringify(admin)} />
        </div>
    );
}

export default EditAdmin;
