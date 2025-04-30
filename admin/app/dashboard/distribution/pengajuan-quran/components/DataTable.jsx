"use client";

import { useState } from "react";
import { Card, Table, TableBody, TableCell, TableHead, TableHeaderCell, TableRow } from "@tremor/react";
import Pagination from "@/components/micro/Pagination";
import Filters from "./Filters";
import DateAndTime from "date-and-time";
import toTimeAgo from "@/lib/utils/date/toTimeAgo";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import ROUTES from "@/config/ROUTES";
import { CheckCircleIcon, EyeIcon, TrashIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useDeleteDistributionApplication, useDistributionApplications, useUpdateDistributionApplication } from "@/lib/hooks/distributionApplication.hook";

const LIMIT_PER_PAGE = 10;
const SORT_BY = "-createdAt";

function DataTable() {
    const queryClient = useQueryClient();

    const [currentPage, setCurrentPage] = useState(1);
    const [filterQuery, setFilterQuery] = useState({});

    const { data, isSuccess, isError, isLoading } = useDistributionApplications({
        page: currentPage,
        limit: LIMIT_PER_PAGE,
        sort: SORT_BY,
        filterQuery: filterQuery,
    });

    const { mutate: mutateDelete, isPending: isDeleting } = useDeleteDistributionApplication();
    async function handleDelete(_id) {
        if (isDeleting) return;

        const confirm = window.confirm("Yakin ingin menghapus?");
        if (!confirm) return;

        mutateDelete(_id, {
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ["distribution_applications"] });
                toast.success("Berhasil dihapus");
            },
            onError: (error) => {
                toast.error(error.message);
            },
        });
    }

    const { mutate: mutateUpdate } = useUpdateDistributionApplication();
    function handleUpdateStatus(_id, data) {
        mutateUpdate(
            {
                _id,
                data,
            },
            {
                onSuccess: () => {
                    queryClient.invalidateQueries({
                        queryKey: ["distribution_applications"],
                    });
                    queryClient.invalidateQueries({
                        queryKey: ["distribution_application", _id],
                    });
                    toast.success("Berhasil merubah status", {
                        position: "bottom-right",
                    });
                },
                onError: () => {
                    toast.error("Gagal merubah status", {
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
                        <TableHeaderCell className="hidden md:table-cell">Alamat Pengiriman</TableHeaderCell>
                        <TableHeaderCell className="hidden sm:table-cell">Dibuat Pada</TableHeaderCell>
                        <TableHeaderCell className="hidden md:table-cell"></TableHeaderCell>
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
                            <TableCell colSpan={5}>Gagal mengambil data</TableCell>
                        </TableRow>
                    )}

                    {isSuccess &&
                        data.distributionApplications.map((distributionApplication) => (
                            <TableRow key={distributionApplication._id} className="text-slate-700 hover:bg-slate-100">
                                <TableCell>
                                    <div className="flex flex-col items-start justify-between">
                                        <span className="font-bold">{distributionApplication.name}</span>
                                        <span className="text-xs">{distributionApplication.organization}</span>
                                    </div>
                                </TableCell>
                                <TableCell className="max-w-[200px] whitespace-break-spaces hidden md:table-cell">
                                    <p>{distributionApplication.organizationAddress?.complete} - {distributionApplication.phoneNumber}</p>
                                </TableCell>
                                <TableCell className="hidden sm:table-cell">
                                    <div className="flex flex-col justify-between">
                                        <span className="font-medium">
                                            {DateAndTime.format(new Date(distributionApplication.createdAt), "DD MMMM YYYY")}
                                        </span>
                                        <span className="text-xs">{toTimeAgo(distributionApplication.createdAt)}</span>
                                    </div>
                                </TableCell>
                                <TableCell className="hidden md:table-cell">
                                    <div className="flex items-center gap-2">
                                        <div className={`w-3 h-3 rounded-full ${distributionApplication.statuses?.isCompleteDocumented ? 'bg-orange-500' : 'bg-gray-300'}`} />
                                        <div className={`w-3 h-3 rounded-full ${distributionApplication.statuses?.isApproved ? 'bg-emerald-500' : 'bg-gray-300'}`} />
                                        <div className={`w-3 h-3 rounded-full ${distributionApplication.statuses?.isDistributed ? 'bg-blue-500' : 'bg-gray-300'}`} />
                                        <div className={`w-3 h-3 rounded-full ${distributionApplication.statuses?.isPostDocumented ? 'bg-rose-500' : 'bg-gray-300'}`} />
                                    </div>
                                </TableCell>
                                <TableCell className="md:table-cell flex justify-end">
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
                                                        href={`${ROUTES.DISTRIBUTION_APPLICATION_DETAIL}/${distributionApplication._id}`}
                                                        className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none"
                                                    >
                                                        <EyeIcon className="h-5 w-5" />
                                                        Detail
                                                    </Link>
                                                </MenuItem>
                                                <MenuItem>
                                                    <button
                                                        disabled={isDeleting}
                                                        onClick={() => handleDelete(distributionApplication._id)}
                                                        className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                                                    >
                                                        <TrashIcon className="h-5 w-5" />
                                                        Hapus
                                                    </button>
                                                </MenuItem>
                                                {/* <MenuItem>
                                                    <a
                                                        href="#"
                                                        className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none"
                                                        target="_blank"
                                                    >
                                                        <PrinterIcon className="h-5 w-5" />
                                                        Cetak
                                                    </a>
                                                </MenuItem> */}
                                            </div>
                                            <div className="pb-1 pt-3">
                                                <span className="mb-1 block px-4 font-bold">STEPS:</span>
                                                <MenuItem>
                                                    <button
                                                        onClick={() => {
                                                            handleUpdateStatus(distributionApplication._id, {
                                                                statuses: {
                                                                    ...distributionApplication.statuses,
                                                                    isCompleteDocumented:
                                                                        !distributionApplication.statuses?.isCompleteDocumented,
                                                                }
                                                            });
                                                        }}
                                                        className="flex w-full items-center gap-2 px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none"
                                                    >
                                                        Dok. Pra LENGKAP
                                                        {distributionApplication.statuses?.isCompleteDocumented && (
                                                            <CheckCircleIcon className="h-5 w-5 text-orange-500" />
                                                        )}
                                                    </button>
                                                </MenuItem>
                                                <MenuItem>
                                                    <button
                                                        onClick={() => {
                                                            handleUpdateStatus(distributionApplication._id, {
                                                                statuses: {
                                                                    ...distributionApplication.statuses,
                                                                    isApproved:
                                                                        !distributionApplication.statuses?.isApproved,
                                                                }
                                                            });
                                                        }}
                                                        className="flex w-full items-center gap-2 px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none"
                                                    >
                                                        Approve Pak Andri
                                                        {distributionApplication.statuses?.isApproved && (
                                                            <CheckCircleIcon className="h-5 w-5 text-emerald-500" />
                                                        )}
                                                    </button>
                                                </MenuItem>
                                                <MenuItem>
                                                    <button
                                                        onClick={() => {
                                                            handleUpdateStatus(distributionApplication._id, {
                                                                statuses: {
                                                                    ...distributionApplication.statuses,
                                                                    isDistributed:
                                                                        !distributionApplication.statuses?.isDistributed,
                                                                }
                                                            });
                                                        }}
                                                        className="flex w-full items-center gap-2 px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none"
                                                    >
                                                        Pengiriman Quran
                                                        {distributionApplication.statuses?.isDistributed && (
                                                            <CheckCircleIcon className="h-5 w-5 text-blue-500" />
                                                        )}
                                                    </button>
                                                </MenuItem>
                                                <MenuItem>
                                                    <button
                                                        onClick={() => {
                                                            handleUpdateStatus(distributionApplication._id, {
                                                                statuses: {
                                                                    ...distributionApplication.statuses,
                                                                    isPostDocumented:
                                                                        !distributionApplication.statuses?.isPostDocumented,
                                                                }
                                                            });
                                                        }}
                                                        className="flex w-full items-center gap-2 px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none"
                                                    >
                                                        Dok. Pasca
                                                        {distributionApplication.statuses?.isPostDocumented && (
                                                            <CheckCircleIcon className="h-5 w-5 text-rose-500" />
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
