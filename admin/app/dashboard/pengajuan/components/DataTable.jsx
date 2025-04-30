"use client";

import { useState } from "react";
import { Card, Table, TableBody, TableCell, TableHead, TableHeaderCell, TableRow } from "@tremor/react";
import Pagination from "@/components/micro/Pagination";
import Filters from "./Filters";
import { useFundingApplications, useUpdateFundingApplication } from "@/lib/hooks/fundingApplication.hook";
import { formatIndonesianCurrency } from "@/lib/utils/string";
import DateAndTime from "date-and-time";
import toTimeAgo from "@/lib/utils/date/toTimeAgo";
import { ChevronDownIcon, PencilSquareIcon } from "@heroicons/react/24/outline";
import ROUTES from "@/config/ROUTES";
import { CheckCircleIcon, PrinterIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

const LIMIT_PER_PAGE = 10;
const SORT_BY = "-createdAt";

function DataTable() {
    const queryClient = useQueryClient();

    const [currentPage, setCurrentPage] = useState(1);
    const [filterQuery, setFilterQuery] = useState({});

    const { data, isSuccess, isError, isLoading } = useFundingApplications({
        page: currentPage,
        limit: LIMIT_PER_PAGE,
        sort: SORT_BY,
        filterQuery: filterQuery,
    });

    const { mutate: mutateFundingApplication } = useUpdateFundingApplication();
    function handleUpdateApproveStatus(_id, data) {
        mutateFundingApplication(
            {
                _id,
                data,
            },
            {
                onSuccess: () => {
                    queryClient.invalidateQueries({
                        queryKey: ["funding-applications"],
                    });
                    queryClient.invalidateQueries({
                        queryKey: ["funding-application", _id],
                    });
                    toast.success("Berhasil merubah status approve", {
                        position: "bottom-right",
                    });
                },
                onError: () => {
                    toast.error("Gagal merubah status approve", {
                        position: "bottom-right",
                    });
                },
            },
        );
    }

    return (
        <Card>
            <Filters
                onFilter={(filterQuery) => {
                    setFilterQuery(filterQuery);
                    setCurrentPage(1);
                }}
            />

            <Table className="my-5">
                <TableHead>
                    <TableRow>
                        <TableHeaderCell className="text-slate-800">Nama</TableHeaderCell>
                        <TableHeaderCell className="text-slate-800">Jumlah</TableHeaderCell>
                        <TableHeaderCell className="text-slate-800">Dibuat Pada</TableHeaderCell>
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
                        </TableRow>
                    )}

                    {isError && (
                        <TableRow>
                            <TableCell colSpan={3}>Gagal mengambil data pengajuan</TableCell>
                        </TableRow>
                    )}

                    {isSuccess &&
                        data.fundingApplications.map((fundingApplication) => (
                            <TableRow key={fundingApplication._id} className="text-slate-700 hover:bg-slate-100">
                                <TableCell>
                                    <div className="flex flex-col items-start justify-between">
                                        <span className="font-bold">{fundingApplication.employee?.name}</span>
                                        <span className="text-xs">{fundingApplication.ppdNumber}</span>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div className="flex flex-col justify-between">
                                        <span className="font-bold">
                                            {formatIndonesianCurrency(fundingApplication.totalAmount)}
                                        </span>
                                        <span className="text-xs capitalize">
                                            {fundingApplication.paymentMethod.split("_").join(" ")}
                                        </span>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div className="flex flex-col justify-between">
                                        <span className="font-medium">
                                            {DateAndTime.format(new Date(fundingApplication.createdAt), "DD MMMM YYYY")}
                                        </span>
                                        <span className="text-xs">{toTimeAgo(fundingApplication.createdAt)}</span>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div className="flex items-center gap-2">
                                        <div className={`w-3 h-3 rounded-full ${fundingApplication.acceptedByManager ? 'bg-green-500' : 'bg-gray-300'}`} />
                                        <div className={`w-3 h-3 rounded-full ${fundingApplication.acceptedByDirector ? 'bg-green-500' : 'bg-gray-300'}`} />
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <Menu as="div" className="relative inline-block text-left">
                                        <div>
                                            <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                                                Atur
                                                <ChevronDownIcon
                                                    aria-hidden="true"
                                                    className="-mr-1 h-5 w-5 text-gray-400"
                                                />
                                            </MenuButton>
                                        </div>

                                        <MenuItems
                                            className="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                                        >
                                            <div className="py-1">
                                                <MenuItem>
                                                    <Link
                                                        href={`${ROUTES.EDIT_FUNDING_APPLICATION}/${fundingApplication._id}`}
                                                        className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none"
                                                    >
                                                        <PencilSquareIcon className="h-5 w-5" />
                                                        Edit
                                                    </Link>
                                                </MenuItem>
                                                <MenuItem>
                                                    <a
                                                        href={`${ROUTES.PRINT_FUNDING_APPLICATION}/${fundingApplication._id}`}
                                                        className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none"
                                                        target="_blank"
                                                    >
                                                        <PrinterIcon className="h-5 w-5" />
                                                        Cetak
                                                    </a>
                                                </MenuItem>
                                            </div>
                                            <div className="pb-1 pt-3">
                                                <span className="mb-1 block px-4 font-bold">Approve:</span>
                                                <MenuItem>
                                                    <button
                                                        onClick={() => {
                                                            handleUpdateApproveStatus(fundingApplication._id, {
                                                                acceptedByManager:
                                                                    !fundingApplication.acceptedByManager,
                                                            });
                                                        }}
                                                        className="flex w-full items-center gap-2 px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none"
                                                    >
                                                        Manager
                                                        {fundingApplication.acceptedByManager && (
                                                            <CheckCircleIcon className="h-5 w-5 text-emerald-700" />
                                                        )}
                                                    </button>
                                                </MenuItem>
                                                <MenuItem>
                                                    <button
                                                        onClick={() => {
                                                            handleUpdateApproveStatus(fundingApplication._id, {
                                                                acceptedByDirector:
                                                                    !fundingApplication.acceptedByDirector,
                                                            });
                                                        }}
                                                        className="flex w-full items-center gap-2 px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none"
                                                    >
                                                        Direktur
                                                        {fundingApplication.acceptedByDirector && (
                                                            <CheckCircleIcon className="h-5 w-5 text-emerald-700" />
                                                        )}
                                                    </button>
                                                </MenuItem>
                                            </div>
                                        </MenuItems>
                                    </Menu>
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
