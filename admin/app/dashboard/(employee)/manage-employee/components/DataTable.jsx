"use client";

import { useState } from "react";
import { Card, Table, TableBody, TableCell, TableHead, TableHeaderCell, TableRow } from "@tremor/react";
import Pagination from "@/components/micro/Pagination";
import SearchInput from "@/components/form/SearchInput";
import classNames from "@/lib/utils/dom/classNames";
import { DEPARTEMENT_COLORS } from "@/config/CONSTANTS";
import DateTime from "date-and-time";
import { useRouter } from "next/navigation";
import ROUTES from "@/config/ROUTES";
import { useEmployees } from "@/lib/hooks/employee.hook";

const LIMIT_PER_PAGE = 20;
const SORT_BY = "name";

// function useDeleteEmloyees() {
//     const queryClient = useQueryClient();

//     return useMutation({
//         mutationFn: reqDeleteEmployees,
//         onSuccess: (data) => {
//             if (!data.success) {
//                 throw new Error(buildErrorMessage(data.error || data.message));
//             }

//             queryClient.invalidateQueries({ queryKey: ["employees"] });
//         },
//     });
// }

function DataTable() {
    const router = useRouter();

    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);

    const { data, isSuccess, isError, isLoading } = useEmployees({
        page: currentPage,
        limit: LIMIT_PER_PAGE,
        sort: SORT_BY,
        search: searchQuery,
    });
    // const { mutate: mutateDelete, isPending: pendingDelete } = useDeleteEmloyees();

    async function searchEmployeeByName(keyword) {
        keyword = keyword.trim();

        if (keyword.length > 3 || keyword.length === 0) {
            setSearchQuery(keyword);
            setCurrentPage(1);
        }
    }

    return (
        <Card>
            <SearchInput placeholder="Cari nama karyawan" onSearch={searchEmployeeByName} />

            <Table className="my-5">
                <TableHead>
                    <TableRow>
                        <TableHeaderCell className="text-slate-800">Nama</TableHeaderCell>
                        <TableHeaderCell className="text-slate-800">Departemen</TableHeaderCell>
                        <TableHeaderCell className="text-slate-800">Divisi</TableHeaderCell>
                        <TableHeaderCell className="text-slate-800">Bergabung Sejak</TableHeaderCell>
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
                        </TableRow>
                    )}

                    {isError && (
                        <TableRow>
                            <TableCell colSpan={3}>Failed to fetch employees</TableCell>
                        </TableRow>
                    )}

                    {isSuccess &&
                        data.employees.map((employee) => (
                            <TableRow key={employee._id} className="hover:bg-slate-100">
                                <TableCell className="font-medium text-slate-800">
                                    <span
                                        className="cursor-pointer"
                                        onClick={() => router.push(`${ROUTES.UPDATE_EMPLOYEE}/${employee._id}`)}
                                    >
                                        {employee.name}
                                    </span>
                                </TableCell>
                                <TableCell className="whitespace-normal">
                                    <span
                                        className={classNames(
                                            DEPARTEMENT_COLORS[employee.department]?.text,
                                            DEPARTEMENT_COLORS[employee.department]?.bg,
                                            "rounded px-2 py-1",
                                        )}
                                    >
                                        {employee.department}
                                    </span>
                                </TableCell>
                                <TableCell className="whitespace-normal text-slate-600">{employee.division}</TableCell>
                                <TableCell className="whitespace-normal text-slate-600">
                                    {employee.join_at
                                        ? DateTime.format(new Date(employee.join_at), "DD MMM YYYY")
                                        : "-"}
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
        </Card>
    );
}

export default DataTable;
