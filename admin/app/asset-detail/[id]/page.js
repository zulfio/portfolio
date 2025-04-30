import { formatIndonesianCurrency } from "@/lib/utils/string";

const dynamic = "force-dynamic"; // eslint-disable-line no-unused-vars

async function AssetDetail({ params }) {
    const req = await fetch(`${process.env.API_URL}/api/v1/asset/${params.id}`, {
        method: "GET",
        cache: "no-store",
    });
    const { success, asset, message } = await req.json();

    if (!success) {
        throw new Error(`Gagal mengambil data asset: ${message}`);
    }

    return (
        <div className="px-3 sm:px-10">
            <div className="my-7">
                <h1 className="text-center text-2xl font-bold text-slate-700 sm:text-3xl">{asset.category?.name}</h1>
            </div>
            <div className="mb-12">
                {asset.image ? (
                    <a href={asset.image.s3Url} target="_blank" rel="noreferrer">
                        <img
                            className="mx-auto w-full max-w-3xl"
                            src={asset.image.s3Url}
                        />
                    </a>
                ) : (
                    <img className="mx-auto" src="https://placehold.co/600x400?text=Image%20Not%20Found" alt="" />
                )}
            </div>
            <div className="mb-12">
                <div className="mb-3 flex h-12 items-center justify-center rounded bg-slate-800 text-lg font-semibold text-white">
                    <h3>Aset</h3>
                </div>
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
                            <th className="w-32 text-sm font-semibold sm:w-48">Sub Kategori</th>
                            <th className="font-normal">{asset.sub_category?.name}</th>
                        </tr>
                        <tr className="text-left text-slate-800">
                            <th className="w-32 text-sm font-semibold sm:w-48">Keterangan</th>
                            <th className="font-normal">{asset.description}</th>
                        </tr>
                        <tr className="text-left text-slate-800">
                            <th className="w-32 text-sm font-semibold sm:w-48">Penanggung Jawab</th>
                            <th className="font-normal">{asset.author?.name}</th>
                        </tr>
                        <tr className="text-left text-slate-800">
                            <th className="w-32 text-sm font-semibold sm:w-48">Lokasi</th>
                            <th className="font-normal">{asset.location?.name}</th>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div className="mb-12">
                <div className="mb-3 flex h-12 items-center justify-center rounded bg-slate-800 text-lg font-semibold text-white">
                    <h3>Detil Aset</h3>
                </div>
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
                            <th className="w-32 text-sm font-semibold sm:w-48">Tahun Produksi</th>
                            <th className="font-normal">{asset.production_year}</th>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div className="mb-12">
                <div className="mb-3 flex h-12 items-center justify-center rounded bg-slate-800 text-lg font-semibold text-white">
                    <h3>Pembelian</h3>
                </div>
                <table>
                    <tbody>
                        <tr className="text-left text-slate-800">
                            <th className="w-32 text-sm font-semibold sm:w-48">Tanggal</th>
                            <th className="font-normal">
                                {asset.purchase_date ? new Date(asset.purchase_date).toLocaleDateString() : "-"}
                            </th>
                        </tr>
                        <tr className="text-left text-slate-800">
                            <th className="w-32 text-sm font-semibold sm:w-48">Distributor</th>
                            <th className="font-normal">{asset.store?.name}</th>
                        </tr>
                        <tr className="text-left text-slate-800">
                            <th className="w-32 text-sm font-semibold sm:w-48">Jumlah</th>
                            <th className="font-normal">{asset.total_units}</th>
                        </tr>
                        <tr className="text-left text-slate-800">
                            <th className="w-32 text-sm font-semibold sm:w-48">Harga Beli</th>
                            <th className="font-normal">{formatIndonesianCurrency(asset.price_per_unit)}</th>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default AssetDetail;
