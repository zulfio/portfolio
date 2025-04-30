"use client";

import { Button, TextInput, Title } from "@tremor/react";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import FileManager from "@/components/fileManager";
import AssetBrandSchema from "@/lib/validations/AssetBrand";
import { useAddAssetBrand } from "@/lib/hooks/assetBrand.hook";
import { useQueryClient } from "@tanstack/react-query";

function AddForm() {
    const queryClient = useQueryClient();

    const {
        register,
        formState: { errors },
        handleSubmit,
        control,
        reset,
    } = useForm({
        resolver: zodResolver(AssetBrandSchema.Schema),
    });

    const { mutate, isPending } = useAddAssetBrand();
    function handleMutate(data) {
        mutate(data, {
            onSuccess: () => {
                reset();
                queryClient.invalidateQueries({ queryKey: ["asset_brands"] })
                toast.success("Merk berhasil ditambahkan");
            },
            onError: (error) => {
                toast.error(error.message);
            },
        });
    }

    return (
        <form
            onSubmit={handleSubmit(handleMutate)}
            className="mb-7 text-slate-800 sm:mb-0"
        >
            <Title className="mb-6 font-bold">Tambah Merk Baru</Title>
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
            <Button size="xs" variant="primary" type="submit" disabled={isPending} className="w-full sm:w-auto">
                Tambah Merk Baru
            </Button>
        </form>
    );
}

export default AddForm;
