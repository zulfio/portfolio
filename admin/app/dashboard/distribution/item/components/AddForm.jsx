"use client";

import { Badge, Button, TextInput, Title } from "@tremor/react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { reqCreateDistributionItem } from "@/backend/distributionItem";
import { useState } from "react";
import DistributionItemSchema from "@/lib/validations/DistributionItem";

function useCreateDistributionItem() {
    return useMutation({
        mutationFn: reqCreateDistributionItem,
    });
}

function AddForm() {
    const queryClient = useQueryClient();

    const {
        register,
        formState: { errors },
        handleSubmit,
        reset,
    } = useForm({
        resolver: zodResolver(DistributionItemSchema.Schema),
    });

    const { mutate, isPending } = useCreateDistributionItem();
    const [errorMessage, setErrorMessage] = useState("");


    return (
        <form
            onSubmit={handleSubmit((data) => {
                mutate(data, {
                    onSuccess: () => {
                        queryClient.invalidateQueries({ queryKey: ["distribution_items"] });
                        toast.success("Item berhasil ditambahkan");
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
