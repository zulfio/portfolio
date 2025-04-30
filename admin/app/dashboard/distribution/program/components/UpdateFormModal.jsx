"use client";

import { Controller, useForm } from "react-hook-form";
import { Button, Dialog, DialogPanel, SearchSelect, SearchSelectItem, TextInput, Title } from "@tremor/react";

import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { PROGRAM_TYPES } from "@/config/CONSTANTS";
import DistributionProgramSchema from "@/lib/validations/DistributionProgram";
import { reqDeleteDistributionProgram, reqUpdateDistributionProgram } from "@/backend/distributionProgram";

function useUpdateDistributionProgram() {
    return useMutation({
        mutationFn: reqUpdateDistributionProgram,
    });
}

function useDeleteDistributionProgram() {
    return useMutation({
        mutationFn: reqDeleteDistributionProgram,
    });
}

function UpdateFormModal({ isUpdateModalOpen, setSelectedProgram, selectedProgram }) {
    const queryClient = useQueryClient();

    const {
        register,
        formState: { errors },
        handleSubmit,
        control,
        reset,
    } = useForm({
        defaultValues: selectedProgram,
        resolver: zodResolver(DistributionProgramSchema.Schema),
    });

    const { mutate: mutateUpdate, isPending: isUpdating } = useUpdateDistributionProgram();
    const { mutate: mutateDelete, isPending: isDeleting } = useDeleteDistributionProgram();

    function handleClose() {
        reset();
        setSelectedProgram(null);
    }

    return (
        <Dialog open={isUpdateModalOpen} onClose={handleClose}>
            <DialogPanel className="overflow-visible">
                <form
                    onSubmit={handleSubmit((data) => {
                        mutateUpdate(
                            {
                                _id: selectedProgram._id,
                                data,
                            },
                            {
                                onSuccess: () => {
                                    queryClient.invalidateQueries({ queryKey: ["distribution_programs"] });
                                    queryClient.invalidateQueries({ queryKey: ["distribution_program", selectedProgram._id] });
                                    toast.success("Program berhasil diperbarui");
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
                    <Title className="mb-6 font-bold">Update {selectedProgram.name}</Title>
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
                        <label className="text-sm font-medium text-slate-800">Tipe</label>
                        <Controller
                            control={control}
                            name="type"
                            render={({ field: { onChange, value } }) => (
                                <SearchSelect
                                    value={value || ""}
                                    onValueChange={onChange}
                                    placeholder="Pilih..."
                                    error={errors.type}
                                    errorMessage={errors.type?.message}
                                >
                                    {PROGRAM_TYPES.map((program) => (
                                        <SearchSelectItem key={program} value={program} className="capitalize">
                                            {program.split("_").join(" ")}
                                        </SearchSelectItem>
                                    ))}
                                </SearchSelect>
                            )}
                        />
                    </div>
                    <div className="mb-6 flex flex-col gap-1">
                        <label className="text-sm font-medium text-slate-800">Deskripsi</label>
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
                    <Button
                        size="xs"
                        variant="primary"
                        type="submit"
                        disabled={isUpdating}
                        className="mr-3 w-full sm:w-auto"
                    >
                        Perbarui
                    </Button>
                    {!selectedProgram.children?.length && (
                        <Button
                            size="xs"
                            variant="secondary"
                            color="rose"
                            type="button"
                            className="w-full sm:w-auto"
                            disabled={isDeleting}
                            onClick={() => {
                                mutateDelete(selectedProgram._id, {
                                    onSuccess: () => {
                                        queryClient.invalidateQueries({ queryKey: ["distribution_programs"] });
                                        queryClient.invalidateQueries({ queryKey: ["distribution_program", selectedProgram._id] });
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
