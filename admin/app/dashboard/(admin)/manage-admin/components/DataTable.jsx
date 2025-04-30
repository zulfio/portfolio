"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Card, Switch, Table, TableBody, TableCell, TableHead, TableHeaderCell, TableRow } from "@tremor/react";
import { Menu, MenuItem, MenuItems } from "@headlessui/react";
import toast from "react-hot-toast";
import { ChevronDownIcon, PencilSquareIcon, TrashIcon } from "@heroicons/react/20/solid";
import classNames from "@/lib/utils/dom/classNames";
import Pagination from "@/components/micro/Pagination";
import RoleFilter from "./RoleFilter";
import ROUTES from "@/config/ROUTES";
import useDebouncedCallback from "@/lib/hooks/useDebouncedCallback";
import { reqDeleteAdmin, reqUpdateAdmin } from "@/backend/admin";
import DeleteModal from "@/components/micro/DeleteModal";
import SearchInput from "@/components/form/SearchInput";

function ToggleStatus({ isActive, onChange = () => { } }) {
    const debounceUpdate = useDebouncedCallback((status) => {
        onChange(status);
    }, 700);

    return <Switch defaultChecked={isActive} onChange={debounceUpdate} />;
}

function DataTable({ data }) {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [loading, setLoading] = useState(false);

    const [roles, setRoles] = useState([]);
    const [selectedRole, setSelectedRole] = useState("");

    const [admins, setAdmins] = useState([]);
    const [pagination, setPagination] = useState({});

    const [selectedAdmin, setSelectedAdmin] = useState(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    function getEndPoint(queries = []) {
        const END_POINT = new URLSearchParams();

        queries.forEach((query) => {
            const value = searchParams.get(query);
            if (value) {
                END_POINT.append(query, value);
            }
        });

        return END_POINT.toString();
    }

    function goToPrevPage() {
        const END_POINT = `${ROUTES.ADMINS}?page=${pagination.currentPage - 1}&${getEndPoint(["role", "search"])}`;
        router.push(END_POINT, { scroll: false });
    }

    function goToNextPage() {
        const END_POINT = `${ROUTES.ADMINS}?page=${pagination.currentPage + 1}&${getEndPoint(["role", "search"])}`;
        router.push(END_POINT, { scroll: false });
    }

    function goToPage(page) {
        const END_POINT = `${ROUTES.ADMINS}?page=${page}&${getEndPoint(["role", "search"])}`;
        router.push(END_POINT, { scroll: false });
    }

    function filterByRole(role) {
        let END_POINT;
        if (!role) {
            END_POINT = `${ROUTES.ADMINS}?page=1&${getEndPoint(["search"])}`;
        } else {
            END_POINT = `${ROUTES.ADMINS}?page=1&role=${role}&${getEndPoint(["search"])}`;
        }
        router.push(END_POINT, { scroll: false });
    }

    function searchByName(name) {
        let END_POINT;
        if (!name) {
            END_POINT = `${ROUTES.ADMINS}?page=1&${getEndPoint(["role"])}`;
        }

        if (name.length > 3) {
            END_POINT = `${ROUTES.ADMINS}?page=1&search=${name}&${getEndPoint(["role"])}`;
        }

        END_POINT && router.push(END_POINT, { scroll: false });
    }

    async function updateStatus(id, status) {
        setLoading(true);
        try {
            const { success } = await reqUpdateAdmin(id, { isActive: status });
            if (!success) throw new Error("Failed to update admin status");

            toast.success("Admin status updated successfully", {
                position: "bottom-right",
            });
        } catch (error) {
            toast.error("Failed to update admin status", {
                position: "bottom-right",
            });
        } finally {
            setLoading(false);
        }
    }

    async function deleteAdmin(id) {
        setLoading(true);
        try {
            const { success } = await reqDeleteAdmin(id);
            if (!success) throw new Error("Failed to delete admin");

            router.refresh();
            toast.success("Admin deleted successfully", {
                position: "top-center",
            });
        } catch (error) {
            toast.error("Failed to delete an admin", {
                position: "top-center",
            });
        } finally {
            setLoading(false);
            setIsDeleteModalOpen(false);
            setSelectedAdmin(null);
        }
    }

    useEffect(() => {
        const parsedData = JSON.parse(data);

        setRoles(parsedData.roles);
        setSelectedRole(parsedData.currentRole);
        setAdmins(parsedData.admins);
        setPagination(parsedData.pagination);
    }, [data]);

    return (
        <Card>
            <div className="relative">
                {loading && (
                    <div className="absolute z-30 flex h-full w-full cursor-not-allowed items-center justify-center bg-white bg-opacity-90"></div>
                )}

                <div className="flex flex-wrap items-center justify-center gap-5 border-b px-7 py-5 sm:justify-between sm:gap-0">
                    <div className="z-20 flex items-center gap-3">
                        <RoleFilter
                            roles={roles}
                            value={selectedRole}
                            onChange={(val) => {
                                setSelectedRole(val);
                                filterByRole(val);
                            }}
                        />
                    </div>
                    <div className="max-w-sm">
                        <SearchInput onSearch={searchByName} />
                    </div>
                </div>
                {!admins.length ? (
                    <div className="flex items-center justify-center py-10">
                        <p className="text-sm text-gray-500">Oops! no admins found</p>
                    </div>
                ) : (
                    <Table className="my-5">
                        <TableHead>
                            <TableRow>
                                <TableHeaderCell
                                    scope="col"
                                    className="text-slate-800"
                                >
                                    Name
                                </TableHeaderCell>
                                <TableHeaderCell
                                    scope="col"
                                    className="text-slate-800"
                                >
                                    Email
                                </TableHeaderCell>
                                <TableHeaderCell
                                    scope="col"
                                    className="text-slate-800"
                                >
                                    Role
                                </TableHeaderCell>
                                <TableHeaderCell
                                    scope="col"
                                    className="text-slate-800"
                                >
                                    Active
                                </TableHeaderCell>
                                <TableHeaderCell
                                    scope="col"
                                    className="text-slate-800"
                                ></TableHeaderCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {admins.map((admin) => (
                                <TableRow key={admin._id}>
                                    <TableCell className="break-all border-b border-gray-100 py-3 pl-5 pr-3 text-sm font-medium text-gray-900 sm:pl-7">
                                        {admin.name}
                                    </TableCell>
                                    <TableCell className="hidden border-b border-gray-100 px-4 py-3 text-sm font-medium text-gray-900 lg:table-cell">
                                        {admin.email}
                                    </TableCell>
                                    <TableCell className="hidden border-b border-gray-100 px-4 py-3 text-sm font-medium text-gray-900 sm:table-cell">
                                        {admin.role?.name}
                                    </TableCell>
                                    <TableCell className="hidden border-b border-gray-100 px-4 py-3 text-sm font-medium text-gray-900 sm:table-cell">
                                        <ToggleStatus
                                            admin={admin}
                                            isActive={admin.isActive}
                                            onChange={(status) => updateStatus(admin._id, status)}
                                        />
                                    </TableCell>
                                    <TableCell className="border-b border-gray-100 px-4 py-3 text-sm font-medium text-gray-900">
                                        <Menu as="div" className="relative inline-block text-left">
                                            <div>
                                                <Menu.Button className="flex w-full items-center justify-center gap-x-1 rounded-md bg-white px-2 py-1 text-xs font-semibold text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 hover:bg-slate-50">
                                                    <span className="hidden sm:block">Manage</span>
                                                    <ChevronDownIcon
                                                        className="mt-0 h-5 w-5 text-slate-400 sm:-mr-1"
                                                        aria-hidden="true"
                                                    />
                                                </Menu.Button>
                                            </div>

                                            <MenuItems className="absolute right-0 z-10 mt-2 w-28 origin-top-right divide-y divide-slate-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                <div className="py-1">
                                                    <MenuItem>
                                                        {({ focus }) => (
                                                            <Link
                                                                href={`${ROUTES.EDIT_ADMIN}/${admin._id}`}
                                                                className={classNames(
                                                                    focus
                                                                        ? "bg-slate-100 text-slate-900"
                                                                        : "text-slate-700",
                                                                    "group flex w-full items-center px-4 py-2 text-xs",
                                                                )}
                                                            >
                                                                <PencilSquareIcon
                                                                    className="mr-3 h-5 w-5 text-slate-500 group-hover:text-slate-600"
                                                                    aria-hidden="true"
                                                                />
                                                                Edit
                                                            </Link>
                                                        )}
                                                    </MenuItem>
                                                    <MenuItem>
                                                        {({ focus }) => (
                                                            <button
                                                                className={classNames(
                                                                    focus
                                                                        ? "bg-slate-100 text-slate-900"
                                                                        : "text-slate-700",
                                                                    "group flex w-full items-center px-4 py-2 text-xs",
                                                                )}
                                                                onClick={() => {
                                                                    setSelectedAdmin(admin);
                                                                    setIsDeleteModalOpen(true);
                                                                }}
                                                            >
                                                                <TrashIcon
                                                                    className="mr-3 h-5 w-5 text-slate-500 group-hover:text-slate-600"
                                                                    aria-hidden="true"
                                                                />
                                                                Delete
                                                            </button>
                                                        )}
                                                    </MenuItem>
                                                </div>
                                            </MenuItems>
                                        </Menu>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                )}
                {Math.ceil(pagination.total / pagination.limit) > 1 && (
                    <Pagination
                        currentPage={pagination.currentPage}
                        totalItems={pagination.total}
                        perPage={pagination.limit}
                        onNext={goToNextPage}
                        onPrevious={goToPrevPage}
                        onPageChange={goToPage}
                    />
                )}
            </div>
            <DeleteModal
                isModalOpen={isDeleteModalOpen}
                setIsModalOpen={setIsDeleteModalOpen}
                label={selectedAdmin?.name}
                title="Admin"
                isLoading={loading}
                onDelete={() => deleteAdmin(selectedAdmin?._id)}
            />
        </Card>
    );
}

export default DataTable;
