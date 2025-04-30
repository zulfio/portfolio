"use client";

import { Metric } from "@tremor/react";
import ListAssets from "./components/ListAssets";
import PrintQRs from "./components/PrintQRs";
import { useState } from "react";

function QRPrint() {
    const [assetsToPrint, setAssetsToPrint] = useState([]);

    return (
        <>
            <div className="mb-7">
                <Metric>Print QR Code</Metric>
            </div>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
                <ListAssets setAssetsToPrint={setAssetsToPrint} />
                <PrintQRs assetsToPrint={assetsToPrint} />
            </div>
        </>
    );
}

export default QRPrint;
