"use client";

import { Badge, Button, Tab, TabGroup, TabList, TextInput, Title } from "@tremor/react";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import DistributionBeneficiarySchema from "@/lib/validations/DistributionBeneficiary";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { reqCreateDistributionBeneficiary } from "@/backend/distributionBeneficiary";
import { ArrowDownIcon, ArrowUpRightIcon, UserIcon, UsersIcon } from "@heroicons/react/20/solid";
import CountrySelectOptions from "@/components/form/CountrySelectOptions";
import ProvinceSelectOptions from "@/components/form/ProvinceSelectOptions";
import CitySelectOptions from "@/components/form/CitySelectOptions";
import SubdistrictSelectOptions from "@/components/form/SubdistrictSelectOptions";

function useCreateDistributionBeneficiary() {
    return useMutation({
        mutationFn: reqCreateDistributionBeneficiary,
    });
}

function AddForm() {
    const queryClient = useQueryClient();

    const [selectedCountry, setSelectedCountry] = useState();
    const [selectedProvince, setSelectedProvince] = useState();
    const [selectedCity, setSelectedCity] = useState();
    const [selectedSubdistrict, setSelectedSubdistrict] = useState();

    const {
        register,
        formState: { errors },
        handleSubmit,
        control,
        reset,
        watch,
    } = useForm({
        resolver: zodResolver(DistributionBeneficiarySchema.Schema),
        defaultValues: DistributionBeneficiarySchema.DefaultValues,
    });

    const { mutate, isPending } = useCreateDistributionBeneficiary();
    const [errorMessage, setErrorMessage] = useState("");

    return (
        <form
            onSubmit={handleSubmit((data) => {
                mutate(data, {
                    onSuccess: () => {
                        queryClient.invalidateQueries({ queryKey: ["distribution_beneficiaries"] });
                        toast.success("Penerima manfaat berhasil ditambahkan");
                        reset();
                        setErrorMessage("");
                        setSelectedSubdistrict(null);
                        setSelectedCity(null);
                        setSelectedProvince(null);
                        setSelectedCountry(null);
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
                <label className="text-sm font-medium text-slate-800">Tipe</label>
                <Controller
                    control={control}
                    name="type"
                    render={({ field: { onChange } }) => {
                        return (
                            <>
                                <TabGroup index={watch("type") === "individual" ? 0 : 1}>
                                    <TabList variant="solid" className="bg-slate-50">
                                        <Tab onClick={() => onChange("individual")}>
                                            <div className="flex items-center">
                                                <UserIcon className="mr-1 h-4 w-4" />
                                                <span className="capitalize">Individual</span>
                                            </div>
                                        </Tab>
                                        <Tab onClick={() => onChange("organization")}>
                                            <div className="flex items-center">
                                                <UsersIcon className="mr-1 h-4 w-4" />
                                                <span className="capitalize">Organisasi</span>
                                            </div>
                                        </Tab>
                                    </TabList>
                                </TabGroup>
                            </>
                        );
                    }}
                />
            </div>
            <div className="mb-6 flex flex-col gap-1">
                <label className="text-sm font-medium text-slate-800">NIK</label>
                <TextInput
                    name="nik"
                    {...register("nik")}
                    maxLength="255"
                    error={errors.nik}
                    errorMessage={errors.nik?.message}
                    autoComplete="off"
                />
            </div>
            <div className="mb-6 flex flex-col gap-1">
                <label className="text-sm font-medium text-slate-800">Nama</label>
                <TextInput
                    name="name"
                    {...register("name")}
                    maxLength="255"
                    error={errors.name}
                    errorMessage={errors.name?.message}
                    autoComplete="off"
                />
            </div>
            <div className="mb-6 flex flex-col gap-1">
                <label className="text-sm font-medium text-slate-800">Jenis Kelamin</label>
                <Controller
                    control={control}
                    name="gender"
                    render={({ field: { onChange } }) => {
                        return (
                            <>
                                <TabGroup index={watch("gender") === "male" ? 0 : 1}>
                                    <TabList variant="solid" className="bg-slate-50">
                                        <Tab onClick={() => onChange("male")}>
                                            <div className="flex items-center">
                                                <ArrowUpRightIcon className="mr-1 h-4 w-4" />
                                                <span className="capitalize">Pria</span>
                                            </div>
                                        </Tab>
                                        <Tab onClick={() => onChange("female")}>
                                            <div className="flex items-center">
                                                <ArrowDownIcon className="mr-1 h-4 w-4" />
                                                <span className="capitalize">Wanita</span>
                                            </div>
                                        </Tab>
                                    </TabList>
                                </TabGroup>
                            </>
                        );
                    }}
                />
            </div>
            <div className="mb-6 flex flex-col gap-1">
                <label className="text-sm font-medium text-slate-800">Nomor HP/WA</label>
                <TextInput
                    name="phoneNumber"
                    {...register("phoneNumber")}
                    maxLength="255"
                    error={errors.phoneNumber}
                    errorMessage={errors.phoneNumber?.message}
                    autoComplete="off"
                />
            </div>
            <div className="mb-6 flex flex-col gap-1">
                <label className="text-sm font-medium text-slate-800">Lokasi Penyaluran</label>
                <Controller
                    control={control}
                    name="address.complete"
                    render={({ field: { onChange, value } }) => (
                        <textarea
                            className="tremor-Textarea-Textarea rounded-tremor-default border-tremor-border bg-tremor-background text-tremor-default text-tremor-content shadow-tremor-input placeholder:text-tremor-content hover:bg-tremor-background-muted focus:border-tremor-brand-subtle focus:ring-tremor-brand-muted dark:border-dark-tremor-border dark:bg-dark-tremor-background dark:text-dark-tremor-content dark:shadow-dark-tremor-input dark:placeholder:text-dark-tremor-content dark:hover:bg-dark-tremor-background-muted focus:dark:border-dark-tremor-brand-subtle focus:dark:ring-dark-tremor-brand-muted flex w-full items-center border px-3 py-2 outline-none transition duration-100 focus:ring-2"
                            rows={4}
                            placeholder="Type..."
                            maxLength="255"
                            value={value}
                            onChange={onChange}
                        />
                    )}
                />
            </div>
            <div className="mb-6 flex flex-col gap-1">
                <label className="text-sm font-medium text-slate-800">Negara</label>
                <Controller
                    control={control}
                    name="address.country"
                    render={({ field: { onChange } }) => (
                        <CountrySelectOptions
                            value={selectedCountry}
                            onValueChange={country => {
                                onChange(country.name);
                                setSelectedCountry(country);
                            }}
                        />
                    )}
                />
            </div>
            <div className="mb-6 flex flex-col gap-1">
                <label className="text-sm font-medium text-slate-800">Provinsi</label>
                <Controller
                    control={control}
                    name="address.province"
                    render={({ field: { onChange } }) => (
                        <ProvinceSelectOptions
                            value={selectedProvince}
                            onValueChange={province => {
                                onChange(province.name);
                                setSelectedProvince(province);
                            }}
                        />
                    )}
                />
            </div>
            <div className="mb-6 flex flex-col gap-1">
                <label className="text-sm font-medium text-slate-800">Kabupaten / Kota</label>
                <Controller
                    control={control}
                    name="address.city"
                    render={({ field: { onChange } }) => (
                        <CitySelectOptions
                            provinceId={selectedProvince?.id}
                            value={selectedCity}
                            onValueChange={city => {
                                onChange(city.name);
                                setSelectedCity(city);
                            }}
                        />
                    )}
                />
            </div>
            <div className="mb-6 flex flex-col gap-1">
                <label className="text-sm font-medium text-slate-800">Kecamatan</label>
                <Controller
                    control={control}
                    name="address.subdistrict"
                    render={({ field: { onChange } }) => (
                        <SubdistrictSelectOptions
                            provinceId={selectedProvince?.id}
                            cityId={selectedCity?.id}
                            value={selectedSubdistrict}
                            onValueChange={subdistrict => {
                                onChange(subdistrict.name);
                                setSelectedSubdistrict(subdistrict);
                            }}
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
