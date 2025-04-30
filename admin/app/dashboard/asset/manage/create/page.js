import { Button, Metric } from "@tremor/react";
import AddForm from "./components/AddForm";
import ROUTES from "@/config/ROUTES";
import Link from "next/link";

function AddAssets() {
    return (
        <>
            <div className="mb-7 flex justify-between items-center gap-5">
                <Metric >Tambah Aset</Metric>
                <Link href={ROUTES.ASSETS}>
                    <Button color="slate" size="xs">Kembali</Button>
                </Link>
            </div>
            <AddForm />
        </>
    );
}

export default AddAssets;
