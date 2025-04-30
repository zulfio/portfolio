"use client";

import { Card, Table, TableBody, TableCell, TableHead, TableHeaderCell, TableRow } from "@tremor/react";
import UpdateFormModal from "./UpdateFormModal";
import { useState } from "react";
import Pagination from "@/components/micro/Pagination";
import { useDistributionPrograms } from "@/lib/hooks/distributionProgram.hook";

const LIMIT_PER_PAGE = 10;
const SORT_BY = "name";

function DataTable() {
    const [currentPage, setCurrentPage] = useState(1);

    const [selectedProgram, setSelectedProgram] = useState();
    const { data: distributionPrograms = { data: [], total: 0 }, isSuccess, isError, isLoading } = useDistributionPrograms({
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
                        <TableHeaderCell className="text-slate-800">Deskripsi</TableHeaderCell>
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
                        distributionPrograms.data.map((program) => (
                            <TableRow
                                key={program._id}
                                className="cursor-pointer hover:bg-slate-100"
                                onClick={() => setSelectedProgram(program)}
                            >
                                <TableCell className="text-slate-700">
                                    <span className="font-medium relative z-10 block">{program.name}</span>
                                    <span className="relative z-10 block">{program.type}</span>
                                </TableCell>
                                <TableCell className="whitespace-normal text-slate-600">
                                    <span className="relative z-10 block">{program.description}</span>
                                </TableCell>
                            </TableRow>
                        ))}
                </TableBody>
            </Table>

            <Pagination
                currentPage={currentPage}
                totalItems={distributionPrograms.total}
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
