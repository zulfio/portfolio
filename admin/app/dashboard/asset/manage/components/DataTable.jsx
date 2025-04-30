"use client";

import { useEffect, useState } from "react";
import { Button, Card, Table, TableBody, TableCell, TableHead, TableHeaderCell, TableRow } from "@tremor/react";
import Pagination from "@/components/micro/Pagination";
import { useQueryClient } from "@tanstack/react-query";
import DateTime from "date-and-time";
import toast from "react-hot-toast";
import { useAssets, useDeleteAssets } from "@/lib/hooks/asset.hook";
import {
    ChevronDoubleDownIcon,
    ClockIcon,
    PencilSquareIcon,
    QrCodeIcon,
    ShoppingCartIcon,
} from "@heroicons/react/20/solid";
import { formatIndonesianCurrency } from "@/lib/utils/string";
import generateAssetShrink from "@/lib/utils/data/generateAssetShrink";
import ROUTES from "@/config/ROUTES";
import Link from "next/link";
import QRModal from "./QRModal";
import Filters from "./Filters";

const LIMIT_PER_PAGE = 20;
const SORT_BY = "-createdAt";

function ShrinkCell({ asset }) {
    const shrinkAge = generateAssetShrink(asset);

    return (
        <div className="flex flex-col justify-between gap-1">
            <div className="flex items-center gap-1">
                <ShoppingCartIcon className="h-4 w-4" />
                <span>{formatIndonesianCurrency(asset.price_per_unit)}</span>
            </div>
            <div className="flex items-center gap-1">
                <ChevronDoubleDownIcon className="h-4 w-4" />
                <span>{formatIndonesianCurrency(shrinkAge.totalShrink)}</span>
            </div>
            <div className="flex items-center gap-1">
                <ClockIcon className="h-4 w-4" />
                <span>{formatIndonesianCurrency(shrinkAge.currentValue)}</span>
            </div>
        </div>
    );
}

function DataTable() {
    const queryClient = useQueryClient();

    const [selectedAssets, setSelectedAssets] = useState([]);
    const [selectedAsset, setSelectedAsset] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [filterQuery, setFilterQuery] = useState({
        category: "",
        sub_category: "",
        brand: "",
        store: "",
        location: "",
    });

    const { data, isSuccess, isError, isLoading } = useAssets({
        page: currentPage,
        limit: LIMIT_PER_PAGE,
        sort: SORT_BY,
        filterQuery: filterQuery,
    });
    const { mutate: mutateDelete, isPending: pendingDelete } = useDeleteAssets();

    function handleMutateDelete() {
        if (!selectedAssets.length) return;

        mutateDelete(
            selectedAssets.map((asset) => asset._id),
            {
                onSuccess: () => {
                    queryClient.invalidateQueries({ queryKey: ["assets"] });
                    toast.success(`${selectedAssets.length} Aset berhasil dihapus`);
                    setSelectedAssets([]);
                },
                onError: (error) => {
                    toast.error(error.message);
                },
            },
        );
    }

    useEffect(() => {
        setSelectedAssets([]);
    }, [currentPage]);

    return (
        <Card>
            <Filters
                onFilter={(filterQuery) => {
                    setFilterQuery(filterQuery);
                    setCurrentPage(1);
                }}
            />

            <div className="my-5 flex justify-center">
                {selectedAssets.length > 0 && (
                    <Button
                        size="xs"
                        variant="primary"
                        color="rose"
                        type="button"
                        className="w-full sm:w-auto"
                        disabled={pendingDelete}
                        onClick={handleMutateDelete}
                    >
                        Hapus {selectedAssets.length} Aset
                    </Button>
                )}
            </div>

            <Table className="my-5">
                <TableHead>
                    <TableRow>
                        <TableHeaderCell className="text-slate-800">
                            <input
                                id="comments"
                                type="checkbox"
                                className="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-600"
                                checked={selectedAssets.length === data?.assets.length}
                                onChange={(e) => {
                                    if (e.target.checked) {
                                        setSelectedAssets(data.assets);
                                    } else {
                                        setSelectedAssets([]);
                                    }
                                }}
                            />
                        </TableHeaderCell>
                        <TableHeaderCell className="text-slate-800">Nama Aset</TableHeaderCell>
                        <TableHeaderCell className="text-slate-800">Kode</TableHeaderCell>
                        <TableHeaderCell className="text-slate-800">Merk & Tipe</TableHeaderCell>
                        <TableHeaderCell className="text-slate-800">Penyusutan</TableHeaderCell>
                        <TableHeaderCell className="text-slate-800"></TableHeaderCell>
                        <TableHeaderCell></TableHeaderCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {isLoading && (
                        <TableRow>
                            <TableCell>
                                <div className="h-6 w-24 animate-pulse rounded bg-gray-200"></div>
                            </TableCell>
                            <TableCell>
                                <div className="h-6 w-24 animate-pulse rounded bg-gray-200"></div>
                            </TableCell>
                            <TableCell>
                                <div className="h-6 w-24 animate-pulse rounded bg-gray-200"></div>
                            </TableCell>
                            <TableCell>
                                <div className="h-6 w-24 animate-pulse rounded bg-gray-200"></div>
                            </TableCell>
                            <TableCell>
                                <div className="h-6 w-24 animate-pulse rounded bg-gray-200"></div>
                            </TableCell>
                            <TableCell>
                                <div className="h-6 w-24 animate-pulse rounded bg-gray-200"></div>
                            </TableCell>
                        </TableRow>
                    )}

                    {isError && (
                        <TableRow>
                            <TableCell colSpan={3}>Failed to fetch assets</TableCell>
                        </TableRow>
                    )}

                    {isSuccess &&
                        data.assets.map((asset) => (
                            <TableRow key={asset._id} className="text-slate-700 hover:bg-slate-100">
                                <TableCell className="w-12">
                                    <input
                                        id="comments"
                                        type="checkbox"
                                        className="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-600"
                                        checked={selectedAssets.some((selected) => selected._id === asset._id)}
                                        onChange={(e) => {
                                            if (e.target.checked) {
                                                setSelectedAssets((prev) => [...prev, asset]);
                                            } else {
                                                setSelectedAssets((prev) =>
                                                    prev.filter((selected) => selected._id !== asset._id),
                                                );
                                            }
                                        }}
                                    />
                                </TableCell>
                                <TableCell>
                                    <div className="flex flex-col items-start justify-between">
                                        <Link href={`${ROUTES.ASSET_DETAIL}/${asset._id}`} className="font-bold">
                                            {asset.name}
                                        </Link>
                                        <Link href={`${ROUTES.ASSET_DETAIL}/${asset._id}`} className="text-xs">
                                            {asset.category?.name} - {asset.sub_category?.name}
                                        </Link>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div className="flex flex-col justify-between">
                                        <Link href={`${ROUTES.ASSET_DETAIL}/${asset._id}`} className="font-medium">
                                            {asset.code}
                                        </Link>
                                        <span className="text-xs">
                                            Tanggal Pembelian:{" "}
                                            {asset.purchase_date
                                                ? DateTime.format(new Date(asset.purchase_date), "DD MMM YYYY")
                                                : "-"}
                                        </span>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div className="flex flex-col justify-between">
                                        <span className="font-medium">{asset.brand?.name}</span>
                                        <span className="text-xs">{asset.type}</span>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <ShrinkCell asset={asset} />
                                </TableCell>
                                <TableCell className="">
                                    <div
                                        className="h-10 w-10 cursor-pointer rounded-md bg-white p-1 shadow"
                                        onClick={() => setSelectedAsset(asset)}
                                    >
                                        <QrCodeIcon className="h-full w-full text-slate-800" />
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <Link href={`${ROUTES.EDIT_ASSET}/${asset._id}`}>
                                        <Button size="xs" variant="primary" color="blue">
                                            <div className="flex items-center gap-2">
                                                <PencilSquareIcon className="h-4 w-4" />
                                                Edit
                                            </div>
                                        </Button>
                                    </Link>
                                </TableCell>
                            </TableRow>
                        ))}
                </TableBody>
            </Table>

            <Pagination
                currentPage={currentPage}
                totalItems={data?.total || 0}
                onNext={() => setCurrentPage((prev) => prev + 1)}
                onPrevious={() => setCurrentPage((prev) => prev - 1)}
                perPage={LIMIT_PER_PAGE}
                onPageChange={(page) => setCurrentPage(page)}
            />

            <QRModal isOpen={!!selectedAsset} setIsOpen={setSelectedAsset} asset={selectedAsset} />
        </Card>
    );
}

export default DataTable;
