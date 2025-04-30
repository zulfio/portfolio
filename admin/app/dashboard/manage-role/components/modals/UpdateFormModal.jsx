"use client";

import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Button, Dialog, DialogPanel, MultiSelect, MultiSelectItem, TextInput, Textarea } from "@tremor/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { reqUpdateRole } from "@/backend/role";
import RoleSchema from "@/lib/validations/Role";
import PERMISSIONS from "@/config/PERMISSIONS";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

function UpdateFormModal({ props: { isUpdateModalOpen, setIsUpdateModalOpen, selectedRole } }) {
    const router = useRouter();

    const {
        register,
        formState: { errors },
        handleSubmit,
        control,
        reset,
    } = useForm({
        defaultValues: {
            name: selectedRole.name,
            permissions: selectedRole.permissions,
            description: selectedRole.description,
        },
        resolver: zodResolver(RoleSchema.Schema),
    });
    const [isLoading, setIsLoading] = useState(false);

    async function handleUpdate(data) {
        if (isLoading) return;

        setIsLoading(true);
        try {
            const { success, message } = await reqUpdateRole(selectedRole._id, data);
            if (!success) throw new Error(message);

            toast.success("Role updated successfully");
            reset();
            router.refresh();
        } catch (error) {
            toast.error(error.message);
        } finally {
            setIsLoading(false);
        }
    }

    function handleClose(isClose) {
        setIsUpdateModalOpen(isClose);
        reset();
    }

    return (
        <Dialog open={isUpdateModalOpen} onClose={handleClose}>
            <DialogPanel className="overflow-visible">
                <form onSubmit={handleSubmit(handleUpdate)}>
                    <h3 className="text-lg font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong">
                        Update Role: {selectedRole.name}
                    </h3>
                    <div className="relative my-5 flex flex-col gap-3">
                        {isLoading && (
                            <div className="absolute z-10 h-full w-full cursor-not-allowed bg-white bg-opacity-50"></div>
                        )}

                        <TextInput
                            {...register("name")}
                            placeholder="Name"
                            maxLength="20"
                            error={errors.name}
                            errorMessage={errors.name?.message}
                            defaultValue={selectedRole.name}
                        />
                        <Controller
                            control={control}
                            name="permissions"
                            defaultValue={selectedRole.permissions}
                            render={({ field: { onChange } }) => (
                                <MultiSelect
                                    placeholder="Permissions"
                                    onValueChange={onChange}
                                    error={errors.permissions}
                                    errorMessage={errors.permissions?.message}
                                    defaultValue={selectedRole.permissions}
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

                        <Textarea
                            {...register("description")}
                            placeholder="Description..."
                            maxLength="100"
                            defaultValue={selectedRole.description}
                        />
                    </div>
                    <Button className="w-full" type="submit" loading={isLoading}>
                        Save Changes
                    </Button>
                </form>
            </DialogPanel>
        </Dialog>
    );
}

export default UpdateFormModal;
