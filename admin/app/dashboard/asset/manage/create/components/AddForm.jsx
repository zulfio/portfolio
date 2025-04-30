"use client";

import { NumberInput, Button, Textarea, Card, Title, TextInput } from "@tremor/react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Asset from "@/lib/validations/Asset";
import General from "./General";
import Detail from "./Detail";
import Purchase from "./Purchase";
import FileManager from "@/components/fileManager";
import { formatIndonesianCurrency } from "@/lib/utils/string";
import { useAddAsset } from "@/lib/hooks/asset.hook";
import toast from "react-hot-toast";
import { ArrowPathIcon } from "@heroicons/react/20/solid";
import { useQueryClient } from "@tanstack/react-query";


const FormAddAssets = () => {
    const queryClient = useQueryClient();

    const {
        register,
        formState: { errors },
        handleSubmit,
        control,
        watch,
        reset,
        setValue
    } = useForm({
        resolver: zodResolver(Asset.Schema),
    });
    const { isPending, mutate } = useAddAsset();
    function handleMutate(data) {
        mutate(data, {
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ["assets"] })
                reset();
                toast.success("Asset berhasil ditambahkan");
            },
            onError: (error) => {
                toast.error(`Gagal menambahkan asset: ${error.message}`);
            },
        });
    }

    const penyusutan = parseInt(watch("economic_life", 0))
        ? (watch("total_units", 0) * watch("price_per_unit", 0)) / (watch("economic_life", 0) * 12)
        : 0;

    return isPending ? (
        <div className="fixed top-0 left-0 z-50 w-full h-full bg-black bg-opacity-50 flex items-center justify-center cursor-progress">
            <ArrowPathIcon className="animate-spin h-10 w-10 text-white" />
        </div>
    ) : (
        <form onSubmit={handleSubmit(handleMutate)}>
            <div className="grid grid-cols-2 gap-5">
                <div className="space-y-6">
                    <General register={register} errors={errors} control={control} watch={watch} setValue={setValue} />
                    <Detail register={register} errors={errors} control={control} />
                    <Purchase register={register} errors={errors} control={control} watch={watch} />
                </div>

                <div className="space-y-6">
                    <Card decoration="top" decorationColor="emerald">
                        <div className="mb-6">
                            <Title className="font-bold">Foto</Title>
                            <p className="text-sm">Anda bisa mengunggah satu foto utama aset di sini.</p>
                        </div>
                        <Controller
                            control={control}
                            name="image"
                            render={({ field: { onChange, value } }) => (
                                <FileManager
                                    onSelect={(files) => onChange(files.map((file) => file._id)[0])}
                                    trigger={value ? "Ganti Foto" : "Pilih Foto"}
                                    selectMultiple={false}
                                    withPreview={true}
                                    type="image"
                                />
                            )}
                        />
                    </Card>
                    <Card decoration="top" decorationColor="emerald">
                        <div className="mb-6">
                            <Title className="font-bold">Lampiran</Title>
                            <p className="text-sm">
                                Anda bisa mengunggah dokumen, invoice, sertifikat, atau foto tambahan di sini.
                            </p>
                        </div>
                        <Controller
                            control={control}
                            name="attachments"
                            render={({ field: { onChange, value } }) => (
                                <FileManager
                                    onSelect={(files) => onChange(files.map((file) => file._id))}
                                    trigger={value ? "Ganti Lampiran" : "Pilih Lampiran"}
                                    selectMultiple={true}
                                    withPreview={true}
                                />
                            )}
                        />
                    </Card>
                    <Card decoration="top" decorationColor="emerald">
                        <Title className="mb-6 font-bold">Keterangan Tambahan</Title>
                        <Controller
                            control={control}
                            name="additionalInfo"
                            render={({ field: { onChange, value } }) => (
                                <Textarea onValueChange={onChange} rows={3} value={value} />
                            )}
                        />
                    </Card>

                    <Card decoration="top" decorationColor="emerald">
                        <div className="mb-6">
                            <Title className="font-bold">Penyusutan</Title>
                            <p className="text-sm">
                                Pada tahun ke berapa harga barang ini menjadi tidak bernilai (nol). Isikan '0' jika
                                nilai aset ini tidak menyusut (misalnya emas atau tanah).
                            </p>
                        </div>
                        <div className="mb-6 flex flex-col gap-1">
                            <label className="text-sm font-medium text-slate-800">Umur Ekonomi (x tahun)</label>
                            <Controller
                                control={control}
                                name="economic_life"
                                render={({ field: { onChange } }) => (
                                    <NumberInput
                                        min={0}
                                        max={99}
                                        error={errors.economic_life}
                                        errorMessage={errors.economic_life?.message}
                                        placeholder="0"
                                        onValueChange={onChange}
                                    />
                                )}
                            />
                        </div>
                        <div className="mb-6 flex flex-col gap-1">
                            <label className="text-sm font-medium text-slate-800">Penyusutan</label>
                            <TextInput disabled value={formatIndonesianCurrency(penyusutan)} />
                        </div>
                    </Card>

                    <Button type="submit" className="w-full" disabled={isPending}>
                        Simpan
                    </Button>
                </div>
            </div>
        </form>
    )

};

export default FormAddAssets;
