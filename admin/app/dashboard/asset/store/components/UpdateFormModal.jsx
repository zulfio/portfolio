"use client";

import { Controller, useForm } from "react-hook-form";
import { Button, Dialog, DialogPanel, TextInput, Title } from "@tremor/react";

import { zodResolver } from "@hookform/resolvers/zod";
import FileManager from "@/components/fileManager";
import toast from "react-hot-toast";
import { reqDeleteAssetStore, reqUpdateAssetStore } from "@/backend/assetStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import AssetStoreSchema from "@/lib/validations/AssetStore";

function useUpdateAssetStore() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: reqUpdateAssetStore,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["asset_stores"] }),
    });
}

function useDeleteAssetStore() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: reqDeleteAssetStore,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["asset_stores"] }),
    });
}

function UpdateFormModal({ isUpdateModalOpen, setSelectedStore, selectedStore }) {
    const {
        register,
        formState: { errors },
        handleSubmit,
        control,
        reset,
    } = useForm({
        defaultValues: selectedStore,
        resolver: zodResolver(AssetStoreSchema.Schema),
    });

    const { mutate: mutateUpdate, isPending: isUpdating } = useUpdateAssetStore();
    const { mutate: mutateDelete, isPending: isDeleting } = useDeleteAssetStore();

    function handleClose() {
        reset();
        setSelectedStore(null);
    }

    return (
        <Dialog open={isUpdateModalOpen} onClose={handleClose}>
            <DialogPanel className="overflow-visible">
                <form
                    onSubmit={handleSubmit((data) => {
                        mutateUpdate(
                            {
                                _id: selectedStore._id,
                                data,
                            },
                            {
                                onSuccess: () => {
                                    toast.success("Store updated successfully");
                                    handleClose();
                                },
                                onError: (error) => {
                                    toast.error(error.message);
                                },
                            },
                        );
                    })}
                    className="mb-7 text-slate-800 sm:mb-0"
                >
                    <Title className="mb-6 font-bold">Update {selectedStore.name}</Title>
                    <div className="mb-6 flex flex-col gap-1">
                        <label className="text-sm font-medium text-slate-800">Nama</label>
                        <TextInput
                            name="name"
                            {...register("name")}
                            maxLength="100"
                            error={errors.name}
                            errorMessage={errors.name?.message}
                            autoComplete="off"
                        />
                    </div>
                    <div className="mb-6 flex flex-col gap-1">
                        <label className="text-sm font-medium text-slate-800">Alamat</label>
                        <TextInput
                            name="address"
                            {...register("address")}
                            maxLength="100"
                            error={errors.address}
                            errorMessage={errors.address?.message}
                            autoComplete="off"
                        />
                    </div>
                    <div className="mb-6 flex flex-col gap-1">
                        <label className="text-sm font-medium text-slate-800">Nomor HP</label>
                        <TextInput
                            name="phoneNumber"
                            {...register("phoneNumber")}
                            maxLength="100"
                            error={errors.phoneNumber}
                            errorMessage={errors.phoneNumber?.message}
                            autoComplete="off"
                        />
                    </div>
                    <div className="mb-6 flex flex-col gap-1">
                        <label className="text-sm font-medium text-slate-800">Email</label>
                        <TextInput
                            name="email"
                            {...register("email")}
                            maxLength="100"
                            error={errors.email}
                            errorMessage={errors.email?.message}
                            autoComplete="off"
                            type="email"
                        />
                    </div>
                    <div className="mb-6 flex flex-col gap-1">
                        <label className="text-sm font-medium text-slate-800">Nama Petugas</label>
                        <TextInput
                            name="officerName"
                            {...register("officerName")}
                            maxLength="100"
                            error={errors.officerName}
                            errorMessage={errors.officerName?.message}
                            autoComplete="off"
                        />
                    </div>
                    <div className="mb-6 flex flex-col gap-1">
                        <label className="text-sm font-medium text-slate-800">Keterangan</label>
                        <Controller
                            control={control}
                            name="description"
                            render={({ field: { onChange, value } }) => (
                                <textarea
                                    className="tremor-Textarea-Textarea flex w-full items-center rounded-tremor-default border border-tremor-border bg-tremor-background px-3 py-2 text-tremor-default text-tremor-content shadow-tremor-input outline-none transition duration-100 placeholder:text-tremor-content hover:bg-tremor-background-muted focus:border-tremor-brand-subtle focus:ring-2 focus:ring-tremor-brand-muted dark:border-dark-tremor-border dark:bg-dark-tremor-background dark:text-dark-tremor-content dark:shadow-dark-tremor-input dark:placeholder:text-dark-tremor-content dark:hover:bg-dark-tremor-background-muted focus:dark:border-dark-tremor-brand-subtle focus:dark:ring-dark-tremor-brand-muted"
                                    name="description"
                                    placeholder="Type..."
                                    maxLength="100"
                                    value={value}
                                    onChange={onChange}
                                />
                            )}
                        />
                    </div>
                    <div className="mb-6 flex flex-col gap-1">
                        <label className="text-sm font-medium text-slate-800">Icon</label>
                        <Controller
                            control={control}
                            name="iconURL"
                            render={({ field: { onChange, value } }) => (
                                <>
                                    {value && (
                                        <div className="relative mb-3 max-w-96">
                                            <img
                                                src={`${process.env.NEXT_PUBLIC_STATIC_PATH}/${value}`}
                                                alt="Cover image"
                                                style={{
                                                    maxWidth: "100%",
                                                }}
                                            />
                                        </div>
                                    )}
                                    <div className="flex items-center gap-3">
                                        {value && (
                                            <Button
                                                variant="light"
                                                type="button"
                                                color="rose"
                                                size="xs"
                                                onClick={() => onChange(null)}
                                            >
                                                Remove
                                            </Button>
                                        )}
                                        <FileManager
                                            onSelect={(file) => onChange(file.path)}
                                            trigger={value ? "Ganti Icon" : "Pilih Icon"}
                                            selectMultiple={false}
                                            type="image"
                                        />
                                    </div>
                                </>
                            )}
                        />
                    </div>
                    <Button
                        size="xs"
                        variant="primary"
                        type="submit"
                        disabled={isUpdating}
                        className="mr-3 w-full sm:w-auto"
                    >
                        Perbarui
                    </Button>
                    {!selectedStore.children?.length && (
                        <Button
                            size="xs"
                            variant="secondary"
                            color="rose"
                            type="button"
                            className="w-full sm:w-auto"
                            disabled={isDeleting}
                            onClick={() => {
                                mutateDelete(selectedStore._id, {
                                    onSuccess: () => {
                                        toast.success("Store deleted successfully");
                                        handleClose();
                                    },
                                    onError: (error) => {
                                        toast.error(error.message);
                                    },
                                });
                            }}
                        >
                            Hapus
                        </Button>
                    )}
                </form>
            </DialogPanel>
        </Dialog>
    );
}

export default UpdateFormModal;
