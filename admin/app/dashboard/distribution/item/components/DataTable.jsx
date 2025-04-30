"use client";

import { Card, Table, TableBody, TableCell, TableHead, TableHeaderCell, TableRow } from "@tremor/react";
import UpdateFormModal from "./UpdateFormModal";
import { useState } from "react";
import Pagination from "@/components/micro/Pagination";
import { reqGetDistributionItems } from "@/backend/distributionItem";
import { useQuery } from "@tanstack/react-query";

const LIMIT_PER_PAGE = 10;
const SORT_BY = "name";


export function useDistributionItems(props = {}) {
    const { search, searchQuery } = props;
    const isEnable = search ? searchQuery.length > 0 : true;

    return useQuery({
        enabled: isEnable,
        queryKey: ["distribution_items", props],
        queryFn: async () => {
            const { distributionItems, total, success, message } = await reqGetDistributionItems(props);

            if (!success) {
                throw new Error(`Gagal mengambil data: ${message}`);
            }

            return { distributionItems, total };
        },
        staleTime: 10000,
    });
}

function DataTable() {
    const [currentPage, setCurrentPage] = useState(1);

    const [selectedItem, setSelectedItem] = useState();
    const { data = { distributionItems: [] }, isSuccess, isError, isLoading } = useDistributionItems({
        page: currentPage,
        limit: LIMIT_PER_PAGE,
        sort: SORT_BY,
    });

    return (
        <Card>
            <Table className="my-5">
                <TableHead>
                    <TableRow>
                        <TableHeaderCell className="text-slate-800">Nama</TableHeaderCell>
                        <TableHeaderCell className="text-slate-800">Unit</TableHeaderCell>
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
                            <TableCell colSpan={3}>Gagal mengambil data</TableCell>
                        </TableRow>
                    )}

                    {isSuccess &&
                        data.distributionItems.map((item) => (
                            <TableRow
                                key={item._id}
                                className="cursor-pointer hover:bg-slate-100"
                                onClick={() => setSelectedItem(item)}
                            >
                                <TableCell className="text-slate-700">
                                    <span className="font-medium relative z-10 block">{item.name}</span>
                                </TableCell>
                                <TableCell className="whitespace-normal text-slate-600">
                                    <span className="relative z-10 block">{item.unit}</span>
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

            {!!selectedItem && (
                <UpdateFormModal
                    isUpdateModalOpen={!!selectedItem}
                    selectedItem={selectedItem}
                    setSelectedItem={setSelectedItem}
                />
            )}
        </Card>
    );
}

export default DataTable;
