import { Metric } from "@tremor/react";
import Form from "./components/Form";

async function Settings() {
    return (
        <>
            <div className="mb-7 flex items-center gap-5">
                <Metric>Site Settings</Metric>
            </div>
            <Form />
        </>
    );
}

export default Settings;
