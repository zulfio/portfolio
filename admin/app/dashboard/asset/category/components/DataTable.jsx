"use client";

import { Card, Table, TableBody, TableCell, TableHead, TableHeaderCell, TableRow } from "@tremor/react";
import UpdateFormModal from "./UpdateFormModal";
import { Fragment, useState } from "react";
import { useAssetCategories } from "@/lib/hooks/assetCategory.hook";

function DataTable() {
    const { data, isSuccess, isError, isLoading } = useAssetCategories();
    const [selectedCategory, setSelectedCategory] = useState();

    return (
        <Card>
            <Table className="my-5">
                <TableHead>
                    <TableRow>
                        <TableHeaderCell className="text-slate-800">KATEGORI</TableHeaderCell>
                        <TableHeaderCell className="text-slate-800">SUB-KATEGORI</TableHeaderCell>
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
                            <TableCell>
                                <div className="h-6 w-24 animate-pulse rounded bg-gray-200"></div>
                            </TableCell>
                        </TableRow>
                    )}

                    {isError && (
                        <TableRow>
                            <TableCell colSpan={3}>Failed to fetch categories</TableCell>
                        </TableRow>
                    )}

                    {isSuccess &&
                        data?.map((category) => (
                            <Fragment key={category._id}>
                                <TableRow
                                    className="cursor-pointer bg-slate-50 hover:bg-slate-100"
                                    onClick={() => setSelectedCategory(category)}
                                >
                                    <TableCell className="font-medium text-slate-700">
                                        <span className="relative z-10 block">{category.name}</span>
                                    </TableCell>
                                    <TableCell className="whitespace-normal text-slate-600">
                                        <span className="relative z-10 block">-</span>
                                    </TableCell>
                                    <TableCell className="whitespace-normal text-slate-600">
                                        <span className="relative z-10 block">{category.description}</span>
                                    </TableCell>
                                </TableRow>
                                {category.children?.map((subCategory) => (
                                    <TableRow
                                        key={subCategory._id}
                                        className="cursor-pointer hover:bg-slate-100"
                                        onClick={() => setSelectedCategory(subCategory)}
                                    >
                                        <TableCell className="whitespace-normal text-slate-600">
                                            <span className="relative z-10 block">-</span>
                                        </TableCell>
                                        <TableCell className="font-medium text-slate-700">
                                            <span className="relative z-10 block">{subCategory.name}</span>
                                        </TableCell>

                                        <TableCell className="whitespace-normal text-slate-600">
                                            <span className="relative z-10 block">{subCategory.description}</span>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </Fragment>
                        ))}
                </TableBody>
            </Table>

            {!!selectedCategory && (
                <UpdateFormModal
                    isUpdateModalOpen={!!selectedCategory}
                    selectedCategory={selectedCategory}
                    setSelectedCategory={setSelectedCategory}
                />
            )}
        </Card>
    );
}

export default DataTable;
