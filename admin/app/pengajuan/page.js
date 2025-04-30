"use client";

import { useState } from "react";
import { Label, Radio, RadioGroup, } from "@headlessui/react";
import { CheckCircleIcon, DocumentCurrencyDollarIcon } from "@heroicons/react/20/solid";
import { Button, Callout, Divider, NumberInput, SearchSelect, SearchSelectItem, TextInput } from "@tremor/react";
import classNames from "@/lib/utils/dom/classNames";
import secureFetch from "@/actions/secureFetch";
import toast from "react-hot-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import FundingApplication from "@/lib/validations/FundingApplication";
import buildErrorMessage from "@/lib/utils/buildErrorMessage";
import { AMOUNT_SOURCES, FUNDING_APPLICATION_PAYMENT_METHODS, FUNDING_APPLICATION_TYPES, MUSTAHIK_TYPES, PROGRAM_TYPES } from "@/config/CONSTANTS";
import ROUTES from "@/config/ROUTES";
import { usePublicEmployees } from "@/lib/hooks/employee.hook";

export default function Example() {
    const [printUrl, setPrintUrl] = useState(null);
    const {
        register,
        formState: { errors, isSubmitting },
        handleSubmit,
        control,
        reset,
    } = useForm({
        resolver: zodResolver(FundingApplication.Schema),
        defaultValues: FundingApplication.DefaultValues,
    });

    const { data: employees = [] } = usePublicEmployees();
    const managers = employees.filter((employee) => employee.position === "manager");

    async function handleCreateFundingApplication(data) {
        try {
            const { fundingApplication, success, message, error } = await secureFetch(`api/v1/funding-application`, {
                cache: "no-store",
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            if (!success) {
                throw new Error(`Gagal membuat mengajuan: ${message || buildErrorMessage(error)}`);
            }

            setPrintUrl(`${window.location.origin}${ROUTES.PRINT_FUNDING_APPLICATION}/${fundingApplication._id}`);
            toast.success("Pengajuan berhasil dibuat");
            reset();
        } catch (error) {
            toast.error(error.message);
        }
    }

    return (
        <div className="bg-gray-50">
            <main className="mx-auto max-w-xl pb-24 pt-7">
                <form className="px-3" onSubmit={handleSubmit((data) => {
                    Object.keys(data).forEach((key) => {
                        if (!data[key]) {
                            delete data[key];
                        }
                    });

                    return handleCreateFundingApplication({
                        ...data,
                        requestDate: new Date().toISOString(),
                    })
                })}>
                    <div className="mt-4 rounded-lg border border-gray-200 bg-white px-5 py-4 shadow-sm">
                        <Divider className="text-2xl font-bold text-slate-800">Formulir Pengajuan</Divider>
                        <div className="mb-10 grid grid-cols-1 gap-y-6">
                            <Controller control={control} name="applicationType" render={({ field: { onChange, value } }) => (
                                <RadioGroup defaultValue="pembayaran" onChange={onChange} value={value}>
                                    <Label className="block text-sm font-medium text-gray-700">Tipe Pengajuan</Label>

                                    <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-x-3 sm:gap-y-3">
                                        {FUNDING_APPLICATION_TYPES.map((tipe, index) => (
                                            <Radio
                                                key={index}
                                                value={tipe}
                                                className="relative flex cursor-pointer rounded-lg border bg-white px-4 py-2 shadow-sm focus:outline-none"
                                            >
                                                {({ checked, active }) => (
                                                    <>
                                                        <span className="flex flex-1">
                                                            <Label
                                                                as="span"
                                                                className="block text-sm font-medium capitalize text-gray-900"
                                                            >
                                                                {tipe.split("_").join(" ")}
                                                            </Label>
                                                        </span>
                                                        {checked ? (
                                                            <CheckCircleIcon
                                                                className="h-5 w-5 text-emerald-600"
                                                                aria-hidden="true"
                                                            />
                                                        ) : null}
                                                        <span
                                                            className={classNames(
                                                                active ? "border" : "border-2",
                                                                checked ? "border-emerald-500" : "border-transparent",
                                                                "pointer-events-none absolute -inset-px rounded-lg",
                                                            )}
                                                            aria-hidden="true"
                                                        />
                                                    </>
                                                )}
                                            </Radio>
                                        ))}
                                    </div>
                                </RadioGroup>
                            )} />

                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Pemohon
                                </label>
                                <div className="mt-1">
                                    <Controller
                                        control={control}
                                        name="employee"
                                        render={({ field: { onChange, value } }) => (
                                            <SearchSelect
                                                value={value}
                                                onValueChange={onChange}
                                                placeholder="Cari nama..."
                                                error={errors.employee}
                                                errorMessage={errors.employee?.message}
                                            >
                                                {employees?.map((employee) => (
                                                    <SearchSelectItem key={employee._id} value={employee._id}>
                                                        {employee.name}
                                                    </SearchSelectItem>
                                                ))}
                                            </SearchSelect>
                                        )}
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Disetujui Oleh
                                </label>
                                <div className="mt-1">
                                    <Controller
                                        control={control}
                                        name="approvedBy"
                                        render={({ field: { onChange, value } }) => (
                                            <SearchSelect
                                                value={value}
                                                onValueChange={onChange}
                                                placeholder="Cari nama..."
                                                error={errors.approvedBy}
                                                errorMessage={errors.approvedBy?.message}
                                            >
                                                {managers?.map((employee) => (
                                                    <SearchSelectItem key={employee._id} value={employee._id}>
                                                        {employee.name}
                                                    </SearchSelectItem>
                                                ))}
                                            </SearchSelect>
                                        )}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="mb-12">
                            <Divider className="text-slate-800">Dana</Divider>

                            <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Jumlah
                                    </label>
                                    <div className="mt-1">
                                        <Controller
                                            control={control}
                                            name="totalAmount"
                                            render={({ field: { onChange } }) => (
                                                <NumberInput
                                                    min={0}
                                                    max={100_000_000_000}
                                                    error={errors.totalAmount}
                                                    errorMessage={errors.totalAmount?.message}
                                                    placeholder="100000"
                                                    onValueChange={onChange}
                                                />
                                            )}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Sumber
                                    </label>
                                    <div className="mt-1">
                                        <Controller
                                            control={control}
                                            name="amountSource"
                                            render={({ field: { onChange, value } }) => (
                                                <SearchSelect
                                                    value={value}
                                                    onValueChange={onChange}
                                                    placeholder="Pilih..."
                                                    error={errors.amountSource}
                                                    errorMessage={errors.amountSource?.message}
                                                >
                                                    {AMOUNT_SOURCES?.map((source) => (
                                                        <SearchSelectItem key={source} value={source} className="capitalize">
                                                            {source.split("_").join(" ")}
                                                        </SearchSelectItem>
                                                    ))}
                                                </SearchSelect>
                                            )}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Program / Dana Untuk
                                    </label>
                                    <div className="mt-1">
                                        <Controller
                                            control={control}
                                            name="program"
                                            render={({ field: { onChange, value } }) => (
                                                <SearchSelect
                                                    value={value}
                                                    onValueChange={onChange}
                                                    placeholder="Pilih..."
                                                    error={errors.program}
                                                    errorMessage={errors.program?.message}
                                                >
                                                    {PROGRAM_TYPES?.map((program) => (
                                                        <SearchSelectItem key={program} value={program} className="capitalize">
                                                            {program.split("_").join(" ")}
                                                        </SearchSelectItem>
                                                    ))}
                                                </SearchSelect>
                                            )}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Mustahik/Asnaf (opsional)
                                    </label>
                                    <div className="mt-1">
                                        <Controller
                                            control={control}
                                            name="mustahik"
                                            render={({ field: { onChange, value } }) => (
                                                <SearchSelect
                                                    value={value}
                                                    onValueChange={onChange}
                                                    placeholder="Pilih..."
                                                >
                                                    {MUSTAHIK_TYPES?.map((mustahik) => (
                                                        <SearchSelectItem key={mustahik} value={mustahik} className="capitalize">
                                                            {mustahik.split("_").join(" ")}
                                                        </SearchSelectItem>
                                                    ))}
                                                </SearchSelect>
                                            )}
                                        />
                                    </div>
                                </div>

                                <div className="sm:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700">
                                        Keterangan
                                    </label>
                                    <div className="mt-1">
                                        <Controller
                                            control={control}
                                            name="description"
                                            render={({ field: { onChange, value } }) => (
                                                <textarea
                                                    className="tremor-Textarea-Textarea flex w-full items-center rounded-tremor-default border border-tremor-border bg-tremor-background px-3 py-2 text-tremor-default text-tremor-content shadow-tremor-input outline-none transition duration-100 placeholder:text-tremor-content hover:bg-tremor-background-muted focus:border-tremor-brand-subtle focus:ring-2 focus:ring-tremor-brand-muted dark:border-dark-tremor-border dark:bg-dark-tremor-background dark:text-dark-tremor-content dark:shadow-dark-tremor-input dark:placeholder:text-dark-tremor-content dark:hover:bg-dark-tremor-background-muted focus:dark:border-dark-tremor-brand-subtle focus:dark:ring-dark-tremor-brand-muted"
                                                    name="description"
                                                    placeholder="..."
                                                    maxLength="500"
                                                    value={value}
                                                    onChange={onChange}
                                                />
                                            )}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mb-7">
                            <Divider className="text-slate-800">Pembayaran</Divider>

                            <div className="mt-4 grid grid-cols-1 gap-y-6 sm:gap-x-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Dibayarkan kepada
                                    </label>
                                    <div className="mt-1">
                                        <TextInput
                                            name="payTo"
                                            {...register("payTo")}
                                            maxLength="100"
                                            error={errors.payTo}
                                            errorMessage={errors.payTo?.message}
                                            autoComplete="off"
                                            placeholder="shopee / tokopedia / pt abc / asep"
                                        />
                                    </div>
                                </div>

                                <Controller control={control} name="paymentMethod" render={({ field: { onChange, value } }) => (
                                    <RadioGroup defaultValue="lainnya" onChange={onChange} value={value}>
                                        <Label className="block text-sm font-medium text-gray-700">Metode Pembayaran</Label>

                                        <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-x-3 sm:gap-y-3">
                                            {FUNDING_APPLICATION_PAYMENT_METHODS.map((method, index) => (
                                                <Radio
                                                    key={index}
                                                    value={method}
                                                    className="relative flex cursor-pointer rounded-lg border bg-white px-4 py-2 shadow-sm focus:outline-none"
                                                >
                                                    {({ checked, active }) => (
                                                        <>
                                                            <span className="flex flex-1">
                                                                <Label
                                                                    as="span"
                                                                    className="block text-sm font-medium capitalize text-gray-900"
                                                                >
                                                                    {method.split("_").join(" ")}
                                                                </Label>
                                                            </span>
                                                            {checked ? (
                                                                <CheckCircleIcon
                                                                    className="h-5 w-5 text-emerald-600"
                                                                    aria-hidden="true"
                                                                />
                                                            ) : null}
                                                            <span
                                                                className={classNames(
                                                                    active ? "border" : "border-2",
                                                                    checked ? "border-emerald-500" : "border-transparent",
                                                                    "pointer-events-none absolute -inset-px rounded-lg",
                                                                )}
                                                                aria-hidden="true"
                                                            />
                                                        </>
                                                    )}
                                                </Radio>
                                            ))}
                                        </div>
                                    </RadioGroup>
                                )} />

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        No VA / No Rekening
                                    </label>
                                    <div className="mt-1">
                                        <TextInput
                                            name="paymentCredentials"
                                            {...register("paymentCredentials")}
                                            maxLength="500"
                                            error={errors.paymentCredentials}
                                            errorMessage={errors.paymentCredentials?.message}
                                            autoComplete="off"
                                            placeholder="1320010601200 / MANDIRI / PT ABC"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {
                            printUrl && (
                                <div className="mb-7">
                                    <Callout title="Pengajuan berhasil dibuat" color="teal">
                                        <a href={printUrl} target="_blank">{printUrl}</a>
                                    </Callout>
                                </div>

                            )
                        }

                        <Button
                            type="submit"
                            icon={DocumentCurrencyDollarIcon}
                            color="emerald"
                            className="w-full"
                            loading={isSubmitting}
                        >
                            Ajukan
                        </Button>
                    </div>
                </form>
            </main>
        </div>
    );
}
