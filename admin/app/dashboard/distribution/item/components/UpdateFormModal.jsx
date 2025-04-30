"use client";

import { useForm } from "react-hook-form";
import { Button, Dialog, DialogPanel, TextInput, Title } from "@tremor/react";

import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { reqDeleteDistributionItem, reqUpdateDistributionItem } from "@/backend/distributionItem";
import DistributionItemSchema from "@/lib/validations/DistributionItem";

function useUpdateDistributionItem() {
    return useMutation({
        mutationFn: reqUpdateDistributionItem,
    });
}

function useDeleteDistributionItem() {
    return useMutation({
        mutationFn: reqDeleteDistributionItem,
    });
}

function UpdateFormModal({ isUpdateModalOpen, setSelectedItem, selectedItem }) {
    const queryClient = useQueryClient();

    const {
        register,
        formState: { errors },
        handleSubmit,
        reset,
    } = useForm({
        defaultValues: selectedItem,
        resolver: zodResolver(DistributionItemSchema.Schema),
    });

    const { mutate: mutateUpdate, isPending: isUpdating } = useUpdateDistributionItem();
    const { mutate: mutateDelete, isPending: isDeleting } = useDeleteDistributionItem();

    function handleClose() {
        reset();
        setSelectedItem(null);
    }

    return (
        <Dialog open={isUpdateModalOpen} onClose={handleClose}>
            <DialogPanel className="overflow-visible">
                <form
                    onSubmit={handleSubmit((data) => {
                        mutateUpdate(
                            {
                                _id: selectedItem._id,
                                data,
                            },
                            {
                                onSuccess: () => {
                                    queryClient.invalidateQueries({ queryKey: ["distribution_items"] });
                                    queryClient.invalidateQueries({ queryKey: ["distribution_item", selectedItem._id] });
                                    toast.success("Item berhasil diperbarui");
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
                    <Title className="mb-6 font-bold">Update {selectedItem.name}</Title>
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
                        <label className="text-sm font-medium text-slate-800">Unit</label>
                        <TextInput
                            name="unit"
                            {...register("unit")}
                            maxLength="255"
                            error={errors.unit}
                            errorMessage={errors.unit?.message}
                            autoComplete="off"
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
                    {!selectedItem.children?.length && (
                        <Button
                            size="xs"
                            variant="secondary"
                            color="rose"
                            type="button"
                            className="w-full sm:w-auto"
                            disabled={isDeleting}
                            onClick={() => {
                                mutateDelete(selectedItem._id, {
                                    onSuccess: () => {
                                        queryClient.invalidateQueries({ queryKey: ["distribution_items"] });
                                        queryClient.invalidateQueries({ queryKey: ["distribution_item", selectedItem._id] });
                                        toast.success("Berhasil dihapus");
                                        handleClose();
                                    },
                                    onError: ({ message }) => {
                                        toast.error(message);
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
