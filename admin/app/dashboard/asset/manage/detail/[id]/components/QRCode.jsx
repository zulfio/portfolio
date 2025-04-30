"use client";

import { Card } from "@tremor/react";

function QRCode({ asset }) {
    asset = JSON.parse(asset);

    return (
        <Card className="p-0">
            <a download={`${asset?.name}.png`} href={asset.qrData} className="outline-none focus:outline-none">
                <img src={asset.qrData} alt="QR Code" className="h-auto w-96" />
            </a>
        </Card>
    )
}

export default QRCode