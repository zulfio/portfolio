"use client";

import { useCallback, useState } from "react";
import { EnvelopeIcon, PhoneIcon } from "@heroicons/react/24/outline";
import { Card, SearchSelect, SearchSelectItem, Textarea, TextInput } from "@tremor/react";
import { Controller, useFormState } from "react-hook-form";
import { useCities, useProvinces, useSubdistrict } from "@/lib/hooks/address.hook.js";

export default function Contact({ control, register, errors }) {
    const { isSubmitted } = useFormState({
        control,
    });

    const { data: provinces } = useProvinces();
    const [selectedProvince, setSelectedProvince] = useState({});

    const { data: cities } = useCities(selectedProvince.id);
    const [selectedCity, setSelectedCity] = useState({});

    const { data: subdistricts } = useSubdistrict(selectedCity.id);

    const MemoizedCompleteAddress = useCallback(() => {
        return (
            <Controller
                control={control}
                name="address.complete"
                render={({ field: { onChange, value } }) => (
                    <Textarea onChange={(e) => onChange(e.target.value)} rows={3} value={value} />
                )}
            />
        );
    }, [isSubmitted, control]);

    const MemoizedProvinceOptions = useCallback(() => {
        return (
            <Controller
                control={control}
                name="address.province"
                render={({ field: { onChange } }) => (
                    <SearchSelect
                        onValueChange={(province) => {
                            province = JSON.parse(province);
                            onChange(province.name);
                            setSelectedProvince(province);
                        }}
                    >
                        {provinces?.map((province) => {
                            return (
                                <SearchSelectItem value={JSON.stringify(province)} key={province.id}>
                                    {province.name}
                                </SearchSelectItem>
                            );
                        })}
                    </SearchSelect>
                )}
            />
        );
    }, [isSubmitted, control, provinces]);

    const MemoizedCityOptions = useCallback(() => {
        return (
            <Controller
                control={control}
                name="address.city"
                render={({ field: { onChange } }) => (
                    <SearchSelect
                        onValueChange={(city) => {
                            city = JSON.parse(city);
                            onChange(city.name);
                            setSelectedCity(city);
                        }}
                        disabled={!selectedProvince.id}
                    >
                        {cities?.map((city) => (
                            <SearchSelectItem value={JSON.stringify(city)} key={city.id}>
                                {city.name}
                            </SearchSelectItem>
                        ))}
                    </SearchSelect>
                )}
            />
        );
    }, [isSubmitted, control, cities, selectedProvince]);

    const MemoizedSubdistrictOptions = useCallback(() => {
        return (
            <Controller
                control={control}
                name="address.subdistrict"
                render={({ field: { onChange } }) => (
                    <SearchSelect
                        onValueChange={(subdistrictName) => {
                            onChange(subdistrictName);
                        }}
                        disabled={!selectedCity.id}
                    >
                        {subdistricts?.map((subdistrict) => (
                            <SearchSelectItem value={subdistrict.name} key={subdistrict.id}>
                                {subdistrict.name}
                            </SearchSelectItem>
                        ))}
                    </SearchSelect>
                )}
            />
        );
    }, [isSubmitted, control, subdistricts, selectedCity]);

    return (
        <Card>
            <h2 className="mb-7 text-xl font-bold text-slate-700">Kontak</h2>
            <div className="grid grid-cols-6 gap-6">
                <div className="col-span-6 sm:col-span-3">
                    <label className="mb-1 block text-sm font-medium text-gray-700">
                        No HP
                    </label>
                    <TextInput
                        name="phone_number"
                        {...register("phone_number")}
                        maxLength="100"
                        error={errors.phone_number}
                        errorMessage={errors.phone_number?.message}
                        autoComplete="off"
                        icon={PhoneIcon}
                        placeholder="082..."
                    />
                </div>

                <div className="col-span-6 sm:col-span-3">
                    <label className="mb-1 block text-sm font-medium text-gray-700">
                        Email
                    </label>
                    <TextInput
                        name="email"
                        type="email"
                        {...register("email")}
                        maxLength="100"
                        error={errors.email}
                        errorMessage={errors.email?.message}
                        autoComplete="off"
                        icon={EnvelopeIcon}
                        required={false}
                    />
                </div>

                <div className="col-span-6">
                    <label className="mb-1 block text-sm font-medium text-gray-700">
                        Alamat Domisili
                    </label>
                    <MemoizedCompleteAddress />
                </div>

                <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                    <label className="mb-1 block text-sm font-medium text-gray-700">
                        Provinsi
                    </label>
                    <MemoizedProvinceOptions />
                </div>

                <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                    <label className="mb-1 block text-sm font-medium text-gray-700">
                        Kabupaten / Kota
                    </label>
                    <MemoizedCityOptions />
                </div>

                <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                    <label className="mb-1 block text-sm font-medium text-gray-700">
                        Kecamatan
                    </label>
                    <MemoizedSubdistrictOptions />
                </div>
            </div>
        </Card>
    );
}
