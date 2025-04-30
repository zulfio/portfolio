import { Button, Metric } from "@tremor/react";
import EditForm from "./components/EditForm";
import ROUTES from "@/config/ROUTES";
import Link from "next/link";

async function EditAsset() {
    return (
        <>
            <div className="mb-7 flex justify-between items-center gap-5">
                <Metric>Update Aset</Metric>
                <Link href={ROUTES.ASSETS}>
                    <Button color="slate" size="xs">Kembali</Button>
                </Link>
            </div>
            <EditForm />
        </>
    );
}

export default EditAsset;
