"use client";

import { Badge, Button, SearchSelect, SearchSelectItem, TextInput, Title } from "@tremor/react";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import DistributionProgramSchema from "@/lib/validations/DistributionProgram";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { LAZ_PROGRAM_TYPES } from "@/config/CONSTANTS";
import { reqCreateDistributionProgram } from "@/backend/distributionProgram";
import { useState } from "react";

function useCreateDistributionProgram() {
    return useMutation({
        mutationFn: reqCreateDistributionProgram,
    });
}

function AddForm() {
    const queryClient = useQueryClient();

    const {
        register,
        formState: { errors },
        handleSubmit,
        control,
        reset,
    } = useForm({
        resolver: zodResolver(DistributionProgramSchema.Schema),
    });

    const { mutate, isPending } = useCreateDistributionProgram();
    const [errorMessage, setErrorMessage] = useState("");


    return (
        <form
            onSubmit={handleSubmit((data) => {
                mutate(data, {
                    onSuccess: () => {
                        queryClient.invalidateQueries({ queryKey: ["distribution_programs"] });
                        toast.success("Program berhasil ditambahkan");
                        reset();
                    },
                    onError: (error) => {
                        setErrorMessage(error.message);
                    },
                });
            })}
            className="mb-7 text-slate-800 sm:mb-0"
        >
            <Title className="mb-6 font-bold">Tambah Baru</Title>
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
                            {LAZ_PROGRAM_TYPES.map((program) => (
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

            <div className="mb-6">
                {errorMessage && (
                    <Badge color="rose" className="mb-6">
                        {errorMessage}
                    </Badge>
                )}
            </div>

            <Button size="xs" variant="primary" type="submit" disabled={isPending} className="w-full sm:w-auto">
                Tambah Baru
            </Button>
        </form>
    );
}

export default AddForm;
