"use client";

import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Button, Dialog, DialogPanel, MultiSelect, MultiSelectItem, TextInput, Textarea } from "@tremor/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { reqAddRole } from "@/backend/role";
import RoleSchema from "@/lib/validations/Role";
import PERMISSIONS from "@/config/PERMISSIONS";
import toast from "react-hot-toast";
import { PlusIcon } from "@heroicons/react/20/solid";

function AddFormModal({ onAdded = () => { } }) {
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        formState: { errors },
        handleSubmit,
        control,
        reset,
    } = useForm({
        defaultValues: RoleSchema.DefaultValue,
        resolver: zodResolver(RoleSchema.Schema),
    });

    async function handleSave(data) {
        if (isLoading) return;

        setIsLoading(true);
        try {
            const { success, message } = await reqAddRole(data);
            if (!success) throw new Error(message);

            toast.success("Role added successfully");
            reset();
            setIsOpen(false);
            onAdded();
        } catch (error) {
            toast.error(error.message);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="mb-5">
            <Button size="xs" onClick={() => setIsOpen(true)} className="w-full">
                <div className="-ml-3 flex items-center justify-center">
                    <PlusIcon className="mr-1 h-6 w-6" />
                    <span className="inline">Tambah Role</span>
                </div>
            </Button>
            <Dialog open={isOpen} onClose={(val) => setIsOpen(val)} static={true}>
                <DialogPanel className="overflow-visible">
                    <form onSubmit={handleSubmit(handleSave)}>
                        <h3 className="text-lg font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong">
                            Tambah Role
                        </h3>
                        <div className="relative my-5 flex flex-col gap-3">
                            {isLoading && (
                                <div className="absolute z-10 h-full w-full cursor-not-allowed bg-white bg-opacity-50"></div>
                            )}

                            <TextInput
                                {...register("name")}
                                placeholder="name"
                                maxLength="20"
                                error={errors.name}
                                errorMessage={errors.name?.message}
                            />
                            <Controller
                                control={control}
                                name="permissions"
                                render={({ field: { onChange } }) => (
                                    <MultiSelect
                                        placeholder="Permissions"
                                        onValueChange={onChange}
                                        error={errors.permissions}
                                        errorMessage={errors.permissions?.message}
                                    >
                                        {Object.keys(PERMISSIONS).map((permission) =>
                                            Object.keys(PERMISSIONS[permission]).map((subPermission) => (
                                                <MultiSelectItem
                                                    key={PERMISSIONS[permission][subPermission].name}
                                                    value={PERMISSIONS[permission][subPermission].name}
                                                >
                                                    {PERMISSIONS[permission][subPermission].label}
                                                </MultiSelectItem>
                                            )),
                                        )}
                                    </MultiSelect>
                                )}
                            />

                            <Textarea {...register("description")} placeholder="description..." maxLength="100" />
                        </div>
                        <Button className="w-full" type="submit" loading={isLoading}>
                            Save
                        </Button>
                    </form>
                </DialogPanel>
            </Dialog>
        </div>
    );
}

export default AddFormModal;
