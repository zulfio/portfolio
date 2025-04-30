"use client";

import { NumberInput, Button, Textarea, Card, Title } from "@tremor/react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Asset from "@/lib/validations/Asset";
import General from "./General";
import Detail from "./Detail";
import FileManager from "@/components/fileManager";
import { useEffect, useState } from "react";
import { useAsset, useUpdateAsset } from "@/lib/hooks/asset.hook";
import toast from "react-hot-toast";
import { ArrowPathIcon } from "@heroicons/react/20/solid";
import { useParams } from "next/navigation";
import dynamic from "next/dynamic";
import { useQueryClient } from "@tanstack/react-query";
const Purchase = dynamic(() => import("./Purchase"), { ssr: false });

const LoadingOverlay = () => {
    return <div className="fixed top-0 left-0 z-50 w-full h-full bg-black bg-opacity-50 flex items-center justify-center cursor-progress">
        <ArrowPathIcon className="animate-spin h-10 w-10 text-white" />
    </div>
}

const EditForm = () => {
    const params = useParams();
    const queryClient = useQueryClient();

    const { data, isSuccess, isError, isLoading: isFetchingAsetDetail } = useAsset(params.id);

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
        defaultValues: Asset.DefaultValues
    });
    const { isPending, mutate } = useUpdateAsset();
    function handleMutate(data) {
        mutate({
            _id: params.id,
            data
        }, {
            onSuccess: () => {
                reset();
                toast.success("Asset berhasil dirubah");
                queryClient.invalidateQueries({ queryKey: ["assets"] })
                queryClient.invalidateQueries({ queryKey: ["asset", params.id] })
            },
            onError: (error) => {
                toast.error(`Gagal merubah asset: ${error.message}`);
            },
        });
    }

    const [isPopulatingData, setIsPopulatingData] = useState(true);

    useEffect(() => {
        if (isSuccess) {
            const populatedKeys = new Set(["author", "location", "category", "sub_category", "brand", "store", "image"]);
            const dataKeys = Object.keys(data);

            const defaultValues = dataKeys.reduce((acc, key) => {
                if (populatedKeys.has(key)) {
                    acc[key] = data[key]?._id;
                }
                else if (key === "attachments") {
                    acc[key] = data[key].map((attachment) => attachment._id);
                }
                else {
                    acc[key] = data[key];
                }

                return acc;
            }, {});

            reset(defaultValues);
            setIsPopulatingData(false);
        }
    }, [data, isSuccess, isFetchingAsetDetail, reset]);

    if (isFetchingAsetDetail || isPopulatingData) {
        return <LoadingOverlay />
    }

    if (isError) {
        return <div>Ooops! Terjadi kesalahan saat mengambil data aset. Langsung lapor ke si zul please...</div>
    }

    return (
        <form onSubmit={handleSubmit(handleMutate)}>
            {isPending && <LoadingOverlay />}

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
                            render={({ field: { onChange, value } }) =>
                            (
                                <FileManager
                                    defaultValues={data.image ? [data.image] : []}
                                    onSelect={(files) => onChange(files.map((file) => file._id)[0])}
                                    trigger={value ? "Ganti Foto" : "Pilih Foto"}
                                    selectMultiple={false}
                                    withPreview={true}
                                    type="image"
                                />
                            )
                            }
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
                                    defaultValues={data.attachments}
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
                                render={({ field: { onChange, value } }) => (
                                    <NumberInput
                                        value={value}
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
                    </Card>

                    <Button type="submit" className="w-full" disabled={isPending}>
                        Update Aset
                    </Button>
                </div>
            </div>
        </form>
    )

};

export default EditForm;
