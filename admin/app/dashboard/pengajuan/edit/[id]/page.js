import { Button, Card, Metric } from "@tremor/react";
import Link from "next/link";
import ROUTES from "@/config/ROUTES";
import dynamic from "next/dynamic";
const UpdateForm = dynamic(() => import("./components/UpdateForm"), { ssr: false });
const FundingApplicationUpdateHistory = dynamic(() => import("./components/FundingApplicationUpdateHistory"), { ssr: false });

async function UpdateEmployee() {
    return (
        <div>
            <div className="mb-7 flex items-center justify-between gap-5">
                <Metric>Update Pengajuan</Metric>
                <Link href={ROUTES.FUNDING_APPLICATION}>
                    <Button
                        size="xs"
                        variant="primary"
                        color="slate"
                        type="button"
                        className="flex w-full items-center gap-1 sm:w-auto"
                    >
                        <span>Kembali</span>
                    </Button>
                </Link>
            </div>
            <div className="lg:grid lg:grid-cols-12 lg:gap-x-5">
                <UpdateForm />
                <aside className="px-2 py-6 sm:px-6 lg:col-span-4 lg:px-0 lg:py-0">
                    <Card className="space-y-1 sm:sticky sm:top-10">
                        <h4 className="text-lg font-bold text-slate-800 mb-5">History</h4>
                        <FundingApplicationUpdateHistory />
                    </Card>
                </aside>
            </div>
        </div>
    );
}

export default UpdateEmployee;
