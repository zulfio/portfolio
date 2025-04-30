"use client";

import { Card, Table, TableBody, TableCell, TableHead, TableHeaderCell, TableRow } from "@tremor/react";
import UpdateFormModal from "./UpdateFormModal";
import { useState } from "react";
import Pagination from "@/components/micro/Pagination";
import { useQuery } from "@tanstack/react-query";
import { reqGetDistributionBeneficiaries } from "@/backend/distributionBeneficiary";

const LIMIT_PER_PAGE = 4;
const SORT_BY = "name";

export function useDistributionBeneficiary(props = {}) {
    const { search, searchQuery } = props;
    const isEnable = search ? searchQuery.length > 0 : true;

    return useQuery({
        enabled: isEnable,
        queryKey: ["distribution_beneficiaries", props],
        queryFn: async () => {
            const { distributionBeneficiaries, total, success, message } = await reqGetDistributionBeneficiaries(props);

            if (!success) {
                throw new Error(`Gagal mengambil data: ${message}`);
            }

            return { distributionBeneficiaries, total };
        },
        staleTime: 10000,
    });
}

function DataTable() {
    const [currentPage, setCurrentPage] = useState(1);

    const [selectedProgram, setSelectedProgram] = useState();
    const { data = { distributionBeneficiaries: [] }, isSuccess, isError, isLoading } = useDistributionBeneficiary({
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
                        <TableHeaderCell className="text-slate-800">No HP/WA</TableHeaderCell>
                        <TableHeaderCell className="text-slate-800">Alamat</TableHeaderCell>
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
                        </TableRow>
                    )}

                    {isError && (
                        <TableRow>
                            <TableCell colSpan={3}>Gagal mengambil data</TableCell>
                        </TableRow>
                    )}

                    {isSuccess &&
                        data.distributionBeneficiaries.map((benificiary) => (
                            <TableRow
                                key={benificiary._id}
                                className="cursor-pointer hover:bg-slate-100"
                                onClick={() => setSelectedProgram(benificiary)}
                            >
                                <TableCell className="text-slate-700">
                                    <span className="font-medium relative z-10 block">{benificiary.name}</span>
                                    <span className="relative z-10 block">{benificiary.type}</span>
                                </TableCell>
                                <TableCell className="whitespace-normal text-slate-600">
                                    <span className="relative z-10 block">{benificiary.phoneNumber}</span>
                                </TableCell>
                                <TableCell className="whitespace-normal text-slate-600">
                                    <span className="relative z-10 block">{benificiary.address?.complete}</span>
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

            {!!selectedProgram && (
                <UpdateFormModal
                    isUpdateModalOpen={!!selectedProgram}
                    selectedProgram={selectedProgram}
                    setSelectedProgram={setSelectedProgram}
                />
            )}
        </Card>
    );
}

export default DataTable;
