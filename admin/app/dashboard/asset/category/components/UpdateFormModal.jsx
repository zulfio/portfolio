"use client";

import { Controller, useForm } from "react-hook-form";
import { Button, Dialog, DialogPanel, SearchSelect, SearchSelectItem, TextInput, Title } from "@tremor/react";

import { zodResolver } from "@hookform/resolvers/zod";
import AssetCategory from "@/lib/validations/AssetCategory";
import FileManager from "@/components/fileManager";
import toast from "react-hot-toast";
import { useDeleteAssetCategory, useParentsAssetCategory, useUpdateAssetCategory } from "@/lib/hooks/assetCategory.hook";
import { useQueryClient } from "@tanstack/react-query";


function UpdateFormModal({ isUpdateModalOpen, selectedCategory, setSelectedCategory }) {
    const queryClient = useQueryClient();

    const {
        register,
        formState: { errors },
        handleSubmit,
        control,
        reset,
    } = useForm({
        defaultValues: selectedCategory,
        resolver: zodResolver(AssetCategory.Schema),
    });

    const { mutate: mutateUpdate, isPending: isUpdating } = useUpdateAssetCategory();
    const { mutate: mutateDelete, isPending: isDeleting } = useDeleteAssetCategory();
    const { data: parents } = useParentsAssetCategory();

    function handleMutateUpdate(data) {
        mutateUpdate(
            {
                _id: selectedCategory._id,
                data,
            },
            {
                onSuccess: () => {
                    queryClient.invalidateQueries({ queryKey: ["asset_categories"] });
                    toast.success("Category updated successfully");
                    handleClose();
                },
                onError: (error) => {
                    toast.error(error.message);
                },
            },
        );
    }

    function handleMutateDelete() {
        mutateDelete(selectedCategory._id, {
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ["asset_categories"] })
                toast.success("Category deleted successfully");
                handleClose();
            },
            onError: (error) => {
                toast.error(error.message);
            },
        });
    }

    function handleClose() {
        setSelectedCategory(null);
        reset();
    }

    return (
        <Dialog open={isUpdateModalOpen} onClose={handleClose}>
            <DialogPanel className="overflow-visible">
                <form
                    onSubmit={handleSubmit(handleMutateUpdate)}
                    className="mb-7 text-slate-800 sm:mb-0"
                >
                    <Title className="mb-6 font-bold">Update {selectedCategory.name}</Title>
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
                    {!selectedCategory.children?.length && (
                        <div className="mb-6 flex flex-col gap-1">
                            <label className="text-sm font-medium text-slate-800">Induk Kategori (opsional)</label>
                            <Controller
                                control={control}
                                name="parent"
                                render={({ field: { onChange, value } }) => (
                                    <SearchSelect
                                        defaultValue={value}
                                        onValueChange={(val) => onChange(val)}
                                        error={errors.parent}
                                        errorMessage={errors.parent?.message}
                                    >
                                        {parents?.map((parent) => (
                                            <SearchSelectItem
                                                key={parent._id}
                                                value={parent._id}
                                                className="cursor-pointer"
                                            >
                                                {parent.name}
                                            </SearchSelectItem>
                                        ))}
                                    </SearchSelect>
                                )}
                            />
                        </div>
                    )}
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
                                                onClick={() => onChange("")}
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
                    {!selectedCategory.children?.length && (
                        <Button
                            size="xs"
                            variant="secondary"
                            color="rose"
                            type="button"
                            className="w-full sm:w-auto"
                            disabled={isDeleting}
                            onClick={handleMutateDelete}
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
