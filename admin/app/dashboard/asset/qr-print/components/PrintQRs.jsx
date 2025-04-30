"use client";

import { PrinterIcon, QrCodeIcon } from "@heroicons/react/20/solid";
import { Button, Card, Title } from "@tremor/react";

function PrintQRs({ assetsToPrint }) {

    async function handlePrint() {
        const downloadUrl = "/api/asset/export?ids=" + assetsToPrint.map((asset) => asset._id).join(",");
        window.open(downloadUrl, "_blank");
    }

    return (
        <Card decoration="top" decorationColor="slate">
            <div className="mb-6">
                <Title className="font-bold">Daftar Print QRCode</Title>
                <p className="text-sm">
                    Pastikan printer sudah terhubung dan siap digunakan.
                </p>
            </div>

            <div className="mb-6 flex flex-col gap-3">
                {assetsToPrint.map((asset) => (
                    <Card className="flex items-center justify-between gap-3 p-2" key={asset._id}>
                        <div className="h-10 w-10 rounded-md bg-white p-1 shadow">
                            <QrCodeIcon className="h-full w-full text-slate-800" />
                        </div>
                        <div className="flex-1">
                            <h3 className="text-sm font-bold">{asset.name}</h3>
                            <p className="text-xs">
                                {asset.category?.name} - {asset.sub_category?.name}
                            </p>
                        </div>
                    </Card>
                ))}
            </div>

            <div className="flex justify-center">
                <Button color="emerald" icon={PrinterIcon} onClick={handlePrint} disabled={!assetsToPrint.length}>
                    Download / Print PDF
                </Button>
            </div>
        </Card>
    );
}

export default PrintQRs;
