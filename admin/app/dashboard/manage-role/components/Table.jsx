"use client";

import React, { Fragment, useState } from "react";
import { useRouter } from "next/navigation";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon, EyeIcon, PencilSquareIcon, TrashIcon } from "@heroicons/react/20/solid";
import toast from "react-hot-toast";

import classNames from "@/lib/utils/dom/classNames";
import ROUTES from "@/config/ROUTES";
import Pagination from "@/components/micro/Pagination";
import DeleteModal from "@/components/micro/DeleteModal";
import UpdateFormModal from "./modals/UpdateFormModal";
import DetailModal from "./modals/DetailModal";
import { reqDeleteRole } from "@/backend/role";
import { Card } from "@tremor/react";

function Table({ roles, pagination }) {
    const router = useRouter();

    const [selectedRole, setSelectedRole] = useState({});
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

    const [isDeleting, setIsDeleting] = useState(false);

    function goToPrevPage() {
        router.push(`${ROUTES.ROLES}?page=${pagination.currentPage - 1}`, { scroll: false });
    }

    function goToNextPage() {
        router.push(`${ROUTES.ROLES}?page=${pagination.currentPage + 1}`, { scroll: false });
    }

    function goToPage(page) {
        router.push(`${ROUTES.ROLES}?page=${page}`, { scroll: false });
    }

    async function handleDelete() {
        if (isDeleting) return;

        setIsDeleting(true);

        try {
            const { success, message } = await reqDeleteRole(selectedRole._id);
            if (!success) throw new Error(message || "Failed to delete role");

            setIsDeleteModalOpen(false);
            toast.success("Role deleted successfully.");
            router.refresh();
        } catch (error) {
            toast.error(error.message);
        } finally {
            setIsDeleting(false);
        }
    }

    return (
        <Card className="p-0">
            <DeleteModal
                isModalOpen={isDeleteModalOpen}
                setIsModalOpen={setIsDeleteModalOpen}
                label={selectedRole.name}
                isLoading={isDeleting}
                onDelete={handleDelete}
                title="Role"
            />
            <UpdateFormModal
                props={{
                    isUpdateModalOpen,
                    setIsUpdateModalOpen,
                    selectedRole,
                }}
            />
            <DetailModal
                props={{
                    isDetailModalOpen,
                    setIsDetailModalOpen,
                    selectedRole,
                }}
            />

            <table className="min-w-full border-separate border-spacing-0">
                <thead>
                    <tr>
                        <th
                            scope="col"
                            className="sticky top-16 z-10 border-b border-slate-300 bg-white bg-opacity-75 py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-slate-900 backdrop-blur backdrop-filter sm:pl-6 lg:pl-8"
                        >
                            Name
                        </th>
                        <th
                            scope="col"
                            className="sticky top-16 z-10 border-b border-slate-300 bg-white bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-slate-900 backdrop-blur backdrop-filter"
                        >
                            Permissions
                        </th>
                        <th
                            scope="col"
                            className="sticky top-16 z-10 border-b border-slate-300 bg-white bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-slate-900 backdrop-blur backdrop-filter"
                        ></th>
                    </tr>
                </thead>
                <tbody>
                    {roles.map((role) => (
                        <tr key={role._id}>
                            <td className="w-36 border-b border-slate-100 px-3 py-4 text-sm text-slate-900 sm:w-44 sm:pl-6 lg:pl-8">
                                <span
                                    className="block cursor-pointer font-medium hover:text-slate-600"
                                    onClick={() => setIsDetailModalOpen(true)}
                                >
                                    {role.name}
                                </span>
                            </td>
                            <td className="whitespace-pre-wrap border-b border-slate-100 px-3 py-4 text-sm text-slate-500">
                                <p>{role.permissions?.join(", ")}</p>
                            </td>
                            <td className="border-b border-slate-100 px-3 py-4 text-sm">
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

                                    <Transition
                                        as={Fragment}
                                        enter="transition ease-out duration-100"
                                        enterFrom="transform opacity-0 scale-95"
                                        enterTo="transform opacity-100 scale-100"
                                        leave="transition ease-in duration-75"
                                        leaveFrom="transform opacity-100 scale-100"
                                        leaveTo="transform opacity-0 scale-95"
                                    >
                                        <Menu.Items className="absolute right-0 z-10 mt-2 w-28 origin-top-right divide-y divide-slate-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                            <div className="py-1">
                                                <Menu.Item>
                                                    {({ active }) => (
                                                        <button
                                                            className={classNames(
                                                                active
                                                                    ? "bg-slate-100 text-slate-900"
                                                                    : "text-slate-700",
                                                                "group flex w-full items-center px-4 py-2 text-xs",
                                                            )}
                                                            onClick={() => {
                                                                setSelectedRole(role);
                                                                setIsDetailModalOpen(true);
                                                            }}
                                                        >
                                                            <EyeIcon
                                                                className="mr-3 h-5 w-5 text-slate-500 group-hover:text-slate-600"
                                                                aria-hidden="true"
                                                            />
                                                            Detail
                                                        </button>
                                                    )}
                                                </Menu.Item>
                                                <Menu.Item>
                                                    {({ active }) => (
                                                        <button
                                                            className={classNames(
                                                                active
                                                                    ? "bg-slate-100 text-slate-900"
                                                                    : "text-slate-700",
                                                                "group flex w-full items-center px-4 py-2 text-xs",
                                                            )}
                                                            onClick={() => {
                                                                setSelectedRole(role);
                                                                setIsUpdateModalOpen(true);
                                                            }}
                                                        >
                                                            <PencilSquareIcon
                                                                className="mr-3 h-5 w-5 text-slate-500 group-hover:text-slate-600"
                                                                aria-hidden="true"
                                                            />
                                                            Edit
                                                        </button>
                                                    )}
                                                </Menu.Item>
                                                <Menu.Item>
                                                    {({ active }) => (
                                                        <button
                                                            className={classNames(
                                                                active
                                                                    ? "bg-slate-100 text-slate-900"
                                                                    : "text-slate-700",
                                                                "group flex w-full items-center px-4 py-2 text-xs",
                                                            )}
                                                            onClick={() => {
                                                                setSelectedRole(role);
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
                                                </Menu.Item>
                                            </div>
                                        </Menu.Items>
                                    </Transition>
                                </Menu>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {Math.ceil(pagination.total / pagination.limit) > 1 && (
                <Pagination
                    currentPage={pagination.currentPage}
                    totalItems={pagination.total}
                    perPage={pagination.limit}
                    onPrevious={goToPrevPage}
                    onNext={goToNextPage}
                    onPageChange={goToPage}
                />
            )}
        </Card>
    );
}

export default Table;
