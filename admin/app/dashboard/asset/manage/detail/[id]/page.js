import { Card, Metric, Tab, TabGroup, TabList } from "@tremor/react";
import { formatIndonesianCurrency } from "@/lib/utils/string";
import generateAssetShrink from "@/lib/utils/data/generateAssetShrink";
import Attachments from "./components/Attachments";
import dynamic from "next/dynamic";
const QRCode = dynamic(() => import("./components/QRCode"), { ssr: false });

async function AssetDetail({ params }) {
    const req = await fetch(`${process.env.API_URL}/api/v1/asset/${params.id}?withQR=true`, {
        method: "GET",
        cache: "no-store",
    });
    const { success, asset, message } = await req.json();

    if (!success) {
        throw new Error(`Gagal mengambil data asset: ${message}`);
    }

    const assetShrink = generateAssetShrink(asset);

    return (
        <>
            <div className="mb-7 flex items-center justify-between gap-5">
                <Metric>{asset.name}</Metric>
            </div>

            <div className="grid grid-cols-2 gap-5">
                <div>
                    <Card className="mb-7 overflow-hidden p-0">
                        <div className="flex h-12 items-center bg-slate-800 px-5 text-lg font-semibold text-white">
                            <h3>Aset</h3>
                        </div>
                        <div className="p-5">
                            <table>
                                <tbody>
                                    <tr className="text-left text-slate-800">
                                        <th className="w-32 text-sm font-semibold sm:w-48">Nama Aset</th>
                                        <th className="font-normal">{asset.name}</th>
                                    </tr>
                                    <tr className="text-left text-slate-800">
                                        <th className="w-32 text-sm font-semibold sm:w-48">Kode Aset</th>
                                        <th className="font-normal">{asset.code}</th>
                                    </tr>
                                    <tr className="text-left text-slate-800">
                                        <th className="w-32 text-sm font-semibold sm:w-48">Kategori</th>
                                        <th className="font-normal">{asset.category?.name}</th>
                                    </tr>
                                    <tr className="text-left text-slate-800">
                                        <th className="w-32 text-sm font-semibold sm:w-48">Keterangan</th>
                                        <th className="font-normal">{asset.description}</th>
                                    </tr>
                                    <tr className="text-left text-slate-800">
                                        <th className="w-32 text-sm font-semibold sm:w-48">Penanggung Jawab</th>
                                        <th className="font-normal">{asset.author?.name}</th>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </Card>
                    <Card className="mb-7 overflow-hidden p-0">
                        <div className="flex h-12 items-center bg-slate-800 px-5 text-lg font-semibold text-white">
                            <h3>FOTO & QR-CODE</h3>
                        </div>
                        <div className="flex items-start gap-5 p-5">
                            <Card className="p-0">
                                {asset.image ? (
                                    <img src={asset.image.s3Url} alt="" />
                                ) : (
                                    <img
                                        className="w-full"
                                        src="https://placehold.co/600x400?text=Image%20Not%20Found"
                                        alt=""
                                    />
                                )}
                            </Card>
                            <QRCode asset={JSON.stringify(asset)} />
                        </div>
                    </Card>
                    <Card className="mb-7 overflow-hidden p-0">
                        <div className="flex h-12 items-center bg-slate-800 px-5 text-lg font-semibold text-white">
                            <h3>Lampiran</h3>
                        </div>
                        <div className="flex items-start gap-5 p-5">
                            <Attachments data={JSON.stringify(asset.attachments || [])} />
                        </div>
                    </Card>
                    <Card className="mb-7 overflow-hidden p-0">
                        <div className="flex h-12 items-center bg-slate-800 px-5 text-lg font-semibold text-white">
                            <h3>Detail Aset</h3>
                        </div>
                        <div className="p-5">
                            <table>
                                <tbody>
                                    <tr className="text-left text-slate-800">
                                        <th className="w-32 text-sm font-semibold sm:w-48">Merk</th>
                                        <th className="font-normal">{asset.brand?.name}</th>
                                    </tr>
                                    <tr className="text-left text-slate-800">
                                        <th className="w-32 text-sm font-semibold sm:w-48">Tipe</th>
                                        <th className="font-normal">{asset.type}</th>
                                    </tr>
                                    <tr className="text-left text-slate-800">
                                        <th className="w-32 text-sm font-semibold sm:w-48">Produsen</th>
                                        <th className="font-normal">{asset.manufacturer}</th>
                                    </tr>
                                    <tr className="text-left text-slate-800">
                                        <th className="w-32 text-sm font-semibold sm:w-48">No.Seri / Kode Produksi</th>
                                        <th className="font-normal">{asset.serial_number}</th>
                                    </tr>
                                    <tr className="text-left text-slate-800">
                                        <th className="w-32 text-sm font-semibold sm:w-48">Tahun Produksi</th>
                                        <th className="font-normal">{asset.production_year}</th>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </Card>
                    <Card className="mb-7 overflow-hidden p-0">
                        <div className="flex h-12 items-center bg-slate-800 px-5 text-lg font-semibold text-white">
                            <h3>Pembelian</h3>
                        </div>
                        <div className="p-5">
                            <table>
                                <tbody>
                                    <tr className="text-left text-slate-800">
                                        <th className="w-32 text-sm font-semibold sm:w-48">Tanggal Pembelian</th>
                                        <th className="font-normal">
                                            {asset.purchase_date
                                                ? new Date(asset.purchase_date).toLocaleDateString()
                                                : "-"}{" "}
                                        </th>
                                    </tr>
                                    <tr className="text-left text-slate-800">
                                        <th className="w-32 text-sm font-semibold sm:w-48">Toko / Distributor</th>
                                        <th className="font-normal">{asset.store?.name}</th>
                                    </tr>
                                    <tr className="text-left text-slate-800">
                                        <th className="w-32 text-sm font-semibold sm:w-48">No. Invoice</th>
                                        <th className="font-normal">{asset.invoice_number}</th>
                                    </tr>
                                    <tr className="text-left text-slate-800">
                                        <th className="w-32 text-sm font-semibold sm:w-48">Jumlah</th>
                                        <th className="font-normal">{asset.total_units}</th>
                                    </tr>
                                    <tr className="text-left text-slate-800">
                                        <th className="w-32 text-sm font-semibold sm:w-48">Harga Satuan</th>
                                        <th className="font-normal">
                                            {formatIndonesianCurrency(asset.price_per_unit)}
                                        </th>
                                    </tr>

                                    <tr className="text-left text-slate-800">
                                        <th className="w-32 text-sm font-semibold sm:w-48">Harga Total</th>
                                        <th className="font-normal">
                                            {formatIndonesianCurrency(asset.total_units * asset.price_per_unit)}
                                        </th>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </Card>
                    <Card className="mb-7 overflow-hidden p-0">
                        <div className="flex h-12 items-center bg-slate-800 px-5 text-lg font-semibold text-white">
                            <h3>Penyusutan</h3>
                        </div>
                        <div className="p-5">
                            <table>
                                <tbody>
                                    <tr className="text-left text-slate-800">
                                        <th className="w-32 text-sm font-semibold sm:w-48">Umur Ekonomi</th>
                                        <th className="font-normal">{asset.economic_life} tahun</th>
                                    </tr>
                                    <tr className="text-left text-slate-800">
                                        <th className="w-32 text-sm font-semibold sm:w-48">Usia Aset</th>
                                        <th className="font-normal">{assetShrink.assetAgeInMonth} bulan</th>
                                    </tr>
                                    <tr className="text-left text-slate-800">
                                        <th className="w-32 text-sm font-semibold sm:w-48">Penyusutan</th>
                                        <th className="font-normal">
                                            {formatIndonesianCurrency(assetShrink.shrinkPerMonth)}
                                        </th>
                                    </tr>
                                    <tr className="text-left text-slate-800">
                                        <th className="w-32 text-sm font-semibold sm:w-48">Total Penyusutan</th>
                                        <th className="font-normal">
                                            {formatIndonesianCurrency(assetShrink.totalShrink)}
                                        </th>
                                    </tr>
                                    <tr className="text-left text-slate-800">
                                        <th className="w-32 text-sm font-semibold sm:w-48">Nilai Sekarang</th>
                                        <th className="font-normal">
                                            {formatIndonesianCurrency(assetShrink.currentValue)}
                                        </th>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </Card>
                </div>

                <Card>
                    <TabGroup className="border-b">
                        <TabList variant="solid">
                            <Tab value="1">Riwayat</Tab>
                            <Tab value="2">Agenda</Tab>
                            <Tab value="3">Keuangan</Tab>
                            <Tab value="4">Jurnal</Tab>
                        </TabList>
                    </TabGroup>
                </Card>
            </div>
        </>
    );
}

export default AssetDetail;
