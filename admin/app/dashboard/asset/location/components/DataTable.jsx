"use client";

import { useState } from "react";
import { Card, Table, TableBody, TableCell, TableHead, TableHeaderCell, TableRow } from "@tremor/react";
import UpdateFormModal from "./UpdateFormModal";
import { useAssetLocations } from "@/lib/hooks/assetLocation.hook";

function DataTable() {
    const { data, isSuccess, isError, isLoading } = useAssetLocations();
    const [selectedLocation, setSelectedLocation] = useState();

    return (
        <Card>
            <Table className="my-5">
                <TableHead>
                    <TableRow>
                        <TableHeaderCell className="text-slate-800">LOKASI</TableHeaderCell>
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
                            <TableCell colSpan={3}>Failed to fetch asset locations</TableCell>
                        </TableRow>
                    )}

                    {isSuccess &&
                        data?.map((location) => (
                            <TableRow
                                key={location._id}
                                className="cursor-pointer hover:bg-slate-100"
                                onClick={() => setSelectedLocation(location)}
                            >
                                <TableCell className="font-medium text-slate-700">
                                    <span className="relative z-10 block">{location.name}</span>
                                </TableCell>
                                <TableCell className="whitespace-normal text-slate-600">
                                    <span className="relative z-10 block">{location.description}</span>
                                </TableCell>
                            </TableRow>
                        ))}
                </TableBody>
            </Table>

            {!!selectedLocation && (
                <UpdateFormModal
                    isUpdateModalOpen={!!selectedLocation}
                    selectedLocation={selectedLocation}
                    setSelectedLocation={setSelectedLocation}
                />
            )}
        </Card>
    );
}

export default DataTable;
