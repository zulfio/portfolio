"use client";

import { Card, Table, TableBody, TableCell, TableHead, TableHeaderCell, TableRow } from "@tremor/react";
import UpdateFormModal from "./UpdateFormModal";
import { useState } from "react";
import Pagination from "@/components/micro/Pagination";
import { useAssetStores } from "@/lib/hooks/assetStore.hook";

const LIMIT_PER_PAGE = 10;
const SORT_BY = "name";

function DataTable() {
    const [currentPage, setCurrentPage] = useState(1);

    const [selectedStore, setSelectedStore] = useState();
    const { data, isSuccess, isError, isLoading } = useAssetStores({
        page: currentPage,
        limit: LIMIT_PER_PAGE,
        sort: SORT_BY,
    });

    return (
        <Card>
            <Table className="my-5">
                <TableHead>
                    <TableRow>
                        <TableHeaderCell className="text-slate-800">TOKO</TableHeaderCell>
                        <TableHeaderCell className="text-slate-800">KETERANGAN</TableHeaderCell>
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
                        </TableRow>
                    )}

                    {isError && (
                        <TableRow>
                            <TableCell colSpan={3}>Failed to fetch asset stores</TableCell>
                        </TableRow>
                    )}

                    {isSuccess &&
                        data.stores.map((store) => (
                            <TableRow
                                key={store._id}
                                className="cursor-pointer hover:bg-slate-100"
                                onClick={() => setSelectedStore(store)}
                            >
                                <TableCell className="font-medium text-slate-700">
                                    <span className="relative z-10 block">{store.name}</span>
                                </TableCell>
                                <TableCell className="whitespace-normal text-slate-600">
                                    <span className="relative z-10 block">{store.description}</span>
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

            {!!selectedStore && (
                <UpdateFormModal
                    isUpdateModalOpen={!!selectedStore}
                    selectedStore={selectedStore}
                    setSelectedStore={setSelectedStore}
                />
            )}
        </Card>
    );
}

export default DataTable;
