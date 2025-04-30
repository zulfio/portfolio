"use client";

import { Controller, useForm } from "react-hook-form";
import { useUpdateAsset } from "@/lib/hooks/asset.hook";
import { ArrowPathIcon } from "@heroicons/react/20/solid";
import { useParams } from "next/navigation";
import { useDistributionApplication } from "@/lib/hooks/distributionApplication.hook";
import { Button, Card, TextInput, Title } from "@tremor/react";
import { useEffect, useState } from "react";
import ProvinceSelectOptions from "@/components/form/ProvinceSelectOptions";
import CitySelectOptions from "@/components/form/CitySelectOptions";
import SubdistrictSelectOptions from "@/components/form/SubdistrictSelectOptions";
import FileManager from "@/components/fileManager";

const LoadingOverlay = () => {
    return <div className="fixed top-0 left-0 z-50 w-full h-full bg-black bg-opacity-50 flex items-center justify-center cursor-progress">
        <ArrowPathIcon className="animate-spin h-10 w-10 text-white" />
    </div>
}

const EditForm = () => {
    const params = useParams();

    const { data, isSuccess, isError, isLoading } = useDistributionApplication(params.id);

    const {
        register,
        handleSubmit,
        control,
        watch,
        reset,
        setValue
    } = useForm();
    const { isPending } = useUpdateAsset();
    function handleMutate() {
        // return;
        // mutate({
        //     _id: params.id,
        //     data
        // }, {
        //     onSuccess: () => {
        //         reset();
        //         toast.success("Asset berhasil dirubah");
        //         queryClient.invalidateQueries({ queryKey: ["assets"] })
        //         queryClient.invalidateQueries({ queryKey: ["asset", params.id] })
        //     },
        //     onError: (error) => {
        //         toast.error(`Gagal merubah asset: ${error.message}`);
        //     },
        // });
    }

    const [isPopulatingData, setIsPopulatingData] = useState(true);

    useEffect(() => {
        if (isSuccess) {
            const populatedKeys = new Set(["images"]);
            const dataKeys = Object.keys(data);

            const defaultValues = dataKeys.reduce((acc, key) => {
                if (populatedKeys.has(key)) {
                    acc[key] = data[key]?._id;
                }
                else if (key === "images") {
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
    }, [data, isSuccess, reset]);

    if (isLoading || isPopulatingData) {
        return <LoadingOverlay />
    }

    if (isError) {
        return <div>Ooops! Terjadi kesalahan saat mengambil data. Langsung lapor ke si zul please...</div>
    }

    return (
        <form onSubmit={handleSubmit(handleMutate)}>
            {isPending && <LoadingOverlay />}

            <div className="grid grid-cols-2 gap-5">
                <div className="space-y-6">
                    <Card
                        decoration="top"
                        decorationColor="emerald"
                    >
                        <Title className="mb-6 font-bold">Biodata</Title>

                        <div className="mb-6 flex flex-col gap-1">
                            <label className="text-sm font-medium text-slate-800">Nama Pengaju</label>
                            <TextInput
                                name="name"
                                {...register("name")}
                                maxLength="100"
                                autoComplete="off"
                            />
                        </div>

                        <div className="mb-6 flex flex-col gap-1">
                            <label className="text-sm font-medium text-slate-800">Nama Organisasi</label>
                            <TextInput
                                name="organization"
                                {...register("organization")}
                                maxLength="100"
                                autoComplete="off"
                            />
                        </div>

                        <div className="mb-6 flex flex-col gap-1">
                            <label className="text-sm font-medium text-slate-800">Nomor HP</label>
                            <TextInput
                                name="phoneNumber"
                                {...register("phoneNumber")}
                                maxLength="100"
                                autoComplete="off"
                            />
                        </div>
                    </Card>

                    <Card
                        decoration="top"
                        decorationColor="emerald"
                    >
                        <Title className="mb-6 font-bold">Alamat Organisasi</Title>

                        <div className="mb-6 flex flex-col gap-1">
                            <label className="text-sm font-medium text-slate-800">Provinsi</label>
                            <ProvinceSelectOptions
                                value={watch("address.province")}
                                onValueChange={(province) => setValue("address.province", province)}
                            />
                        </div>

                        <div className="mb-6 flex flex-col gap-1">
                            <label className="text-sm font-medium text-slate-800">Kabupaten/Kota</label>
                            <CitySelectOptions
                                provinceId={watch("address.province")?.id}
                                value={watch("address.city")}
                                onValueChange={(city) => setValue("address.city", city)}
                            />
                        </div>

                        <div className="mb-6 flex flex-col gap-1">
                            <label className="text-sm font-medium text-slate-800">Kecamatan</label>
                            <SubdistrictSelectOptions
                                cityId={watch("address.city")?.id}
                                value={watch("address.subdistrict")}
                                onValueChange={(subdistrict) => setValue("address.subdistrict", subdistrict)}
                            />
                        </div>

                        <div className="mb-6 flex flex-col gap-1">
                            <label className="text-sm font-medium text-slate-800">Desa</label>
                            <TextInput
                                name="address.village"
                                {...register("address.village")}
                                maxLength="100"
                                autoComplete="off"
                            />
                        </div>

                        <div className="mb-6 flex flex-col gap-1">
                            <label className="text-sm font-medium text-slate-800">Alamat Lengkap</label>
                            <TextInput
                                name="address.complete"
                                {...register("address.complete")}
                                maxLength="100"
                                autoComplete="off"
                            />
                        </div>
                    </Card>

                    <Card
                        decoration="top"
                        decorationColor="emerald"
                    >
                        <Title className="mb-6 font-bold">Alamat Pengiriman</Title>

                        <div className="mb-6 flex flex-col gap-1">
                            <label className="text-sm font-medium text-slate-800">Alamat Lengkap</label>
                            <textarea
                                className="tremor-Textarea-Textarea rounded-tremor-default border-tremor-border bg-tremor-background text-tremor-default text-tremor-content shadow-tremor-input placeholder:text-tremor-content hover:bg-tremor-background-muted focus:border-tremor-brand-subtle focus:ring-tremor-brand-muted dark:border-dark-tremor-border dark:bg-dark-tremor-background dark:text-dark-tremor-content dark:shadow-dark-tremor-input dark:placeholder:text-dark-tremor-content dark:hover:bg-dark-tremor-background-muted focus:dark:border-dark-tremor-brand-subtle focus:dark:ring-dark-tremor-brand-muted flex w-full items-center border px-3 py-2 outline-none transition duration-100 focus:ring-2"
                                name="description"
                                placeholder="Type..."
                                maxLength="100"
                                onChange={e => setValue("organizationAddress.complete", e.target.value)}
                                defaultValue={data.organizationAddress.complete}
                            />
                        </div>
                    </Card>
                </div>

                <div className="space-y-6">
                    <Card decoration="top" decorationColor="emerald">
                        <div className="mb-6">
                            <Title className="font-bold">Foto</Title>
                        </div>
                        <Controller
                            control={control}
                            name="images"
                            render={({ field: { onChange, value } }) => (
                                <FileManager
                                    defaultValues={data.images}
                                    onSelect={(files) => onChange(files.map((file) => file._id))}
                                    trigger={value ? "Ganti Foto" : "Pilih Foto"}
                                    selectMultiple={true}
                                    withPreview={true}
                                />
                            )}
                        />
                    </Card>

                    <Card decoration="top" decorationColor="emerald">
                        <div className="mb-6">
                            <Title className="font-bold">Video</Title>
                        </div>
                        <Controller
                            control={control}
                            name="videos"
                            render={({ field: { onChange, value } }) => (
                                <FileManager
                                    defaultValues={data.videos}
                                    onSelect={(files) => onChange(files.map((file) => file._id))}
                                    trigger={value ? "Ganti Video" : "Pilih Video"}
                                    selectMultiple={true}
                                    withPreview={true}
                                />
                            )}
                        />
                    </Card>

                    <Button type="button" className="w-full" disabled>
                        Update Aset (coming soon)
                    </Button>
                </div>
            </div>
        </form>
    )

};

export default EditForm;
