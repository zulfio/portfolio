"use client";

import toTimeAgo from '@/lib/utils/date/toTimeAgo';
import toIndonesianFormat from '@/lib/utils/date/toIndonesianFormat';
import { Card, NumberInput, SearchSelect, SearchSelectItem, TextInput } from '@tremor/react'
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import FundingApplication from '@/lib/validations/FundingApplication';
import { useEffect } from 'react';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { CheckCircleIcon, ChevronDownIcon, EyeIcon } from '@heroicons/react/20/solid';
import { useFundingApplication, useUpdateFundingApplication } from '@/lib/hooks/fundingApplication.hook';
import { useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useParams } from 'next/navigation';
import LoadingOverlay from '@/components/micro/LoadingOverlay';
import { AMOUNT_SOURCES, FUNDING_APPLICATION_PAYMENT_METHODS, FUNDING_APPLICATION_TYPES } from '@/config/CONSTANTS';
import ROUTES from '@/config/ROUTES';

function UpdateForm() {
    const params = useParams();
    const queryClient = useQueryClient();
    const { data: fundingApplication, isSuccess, isLoading } = useFundingApplication(params.id);

    const {
        register,
        formState: { errors },
        handleSubmit,
        control,
        reset,
    } = useForm({
        resolver: zodResolver(FundingApplication.Schema),
        defaultValues: FundingApplication.DefaultValues,
    });

    const { mutate: mutateFundingApplication } = useUpdateFundingApplication();
    function handleUpdateApproveStatus(data) {
        mutateFundingApplication(
            {
                _id: params.id,
                data,
            },
            {
                onSuccess: () => {
                    queryClient.invalidateQueries({ queryKey: ["funding-applications"] });
                    queryClient.invalidateQueries({ queryKey: ["funding-application", params.id] });
                    toast.success("Berhasil merubah status approve", {
                        position: "bottom-right",
                    });
                },
                onError: () => {
                    toast.error("Gagal merubah status approve", {
                        position: "bottom-right",
                    });
                },
            },
        );
    }

    async function handleUpdateData(data) {
        mutateFundingApplication(
            {
                _id: params.id,
                data,
            },
            {
                onSuccess: () => {
                    queryClient.invalidateQueries({ queryKey: ["funding-applications"] });
                    queryClient.invalidateQueries({ queryKey: ["funding-application", params.id] });
                    toast.success("Berhasil merubah data", {
                        position: "bottom-right",
                    });
                },
                onError: () => {
                    toast.error("Gagal merubah data", {
                        position: "bottom-right",
                    });
                },
            },
        );
    }

    useEffect(() => {
        if (!isLoading && isSuccess) {
            const populatedKeys = new Set(["employee", "approvedBy"]);
            const dataKeys = Object.keys(fundingApplication);

            const defaultValues = dataKeys.reduce((acc, key) => {
                if (populatedKeys.has(key)) {
                    acc[key] = fundingApplication[key]?._id;
                }
                else {
                    acc[key] = fundingApplication[key];
                }

                return acc;
            }, {});

            reset(defaultValues);
        }
    }, [isSuccess, isLoading, fundingApplication, reset])

    useEffect(() => {
        if (Object.keys(errors).length > 1) {
            toast.error("Gagal merubah data, periksa pesan error!")
        }
    }, [errors])

    return (
        <Card className="space-y-6 lg:col-span-8">
            {
                isLoading && <LoadingOverlay />
            }

            {
                !isLoading && (
                    <form onSubmit={handleSubmit(handleUpdateData)}>
                        <div className="px-4 py-5 sm:px-6 flex justify-between flex-wrap gap-3">
                            <div>
                                <h2
                                    id="applicant-information-title"
                                    className="text-lg font-medium leading-6 text-gray-900 flex items-center"
                                >
                                    <span className="mr-2">{fundingApplication.employee?.name || "deleted data"} - </span>
                                    <span>
                                        {fundingApplication.employee?.division || "deleted data"}
                                    </span>
                                </h2>
                                <p className="mt-1 max-w-2xl text-xs text-gray-500">
                                    <span className="font-bold mr-2">
                                        {toTimeAgo(fundingApplication.createdAt)}
                                    </span>
                                    <span>- {toIndonesianFormat(fundingApplication.createdAt)}</span>
                                </p>
                            </div>
                            <Menu as="div" className="relative inline-block text-left flex-1 sm:flex-none">
                                <MenuButton className="inline-flex w-full sm:w-auto justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                                    Approve
                                    <ChevronDownIcon
                                        aria-hidden="true"
                                        className="-mr-1 h-5 w-5 text-gray-400"
                                    />
                                </MenuButton>
                                <MenuItems
                                    transition
                                    className="absolute right-0 z-10 mt-2 w-full sm:w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                                >
                                    <div className="pb-1 pt-3">
                                        <MenuItem>
                                            <button
                                                onClick={() => {
                                                    handleUpdateApproveStatus({
                                                        acceptedByManager: !fundingApplication.acceptedByManager,
                                                    });
                                                }}
                                                className="flex w-full items-center gap-2 px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none"
                                            >
                                                Manager
                                                {fundingApplication.acceptedByManager && (
                                                    <CheckCircleIcon className="h-5 w-5 text-emerald-700" />
                                                )}
                                            </button>
                                        </MenuItem>
                                        <MenuItem>
                                            <button
                                                onClick={() => {
                                                    handleUpdateApproveStatus({
                                                        acceptedByDirector: !fundingApplication.acceptedByDirector,
                                                    });
                                                }}
                                                className="flex w-full items-center gap-2 px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none"
                                            >
                                                Direktur
                                                {fundingApplication.acceptedByDirector && (
                                                    <CheckCircleIcon className="h-5 w-5 text-emerald-700" />
                                                )}
                                            </button>
                                        </MenuItem>
                                    </div>
                                </MenuItems>
                            </Menu>
                        </div>
                        <div className="border-t border-gray-200 px-4 py-5 sm:px-6 grid grid-cols-1 gap-1 sm:gap-7 sm:grid-cols-2">
                            <div className="flex flex-col gap-5">
                                <div>
                                    <label
                                        className="block text-sm font-semibold text-slate-700"
                                    >
                                        Keterangan Pengajuan Dana
                                    </label>
                                    <div className="mt-1">
                                        <Controller
                                            control={control}
                                            name="description"
                                            render={({ field: { onChange, value } }) => (
                                                <textarea
                                                    className="tremor-Textarea-Textarea flex w-full items-center rounded-tremor-default border border-tremor-border bg-tremor-background px-3 py-2 text-tremor-default text-tremor-content shadow-tremor-input outline-none transition duration-100 placeholder:text-tremor-content hover:bg-tremor-background-muted focus:border-tremor-brand-subtle focus:ring-2 focus:ring-tremor-brand-muted dark:border-dark-tremor-border dark:bg-dark-tremor-background dark:text-dark-tremor-content dark:shadow-dark-tremor-input dark:placeholder:text-dark-tremor-content dark:hover:bg-dark-tremor-background-muted focus:dark:border-dark-tremor-brand-subtle focus:dark:ring-dark-tremor-brand-muted"
                                                    name="description"
                                                    placeholder="Type..."
                                                    maxLength="500"
                                                    value={value}
                                                    onChange={onChange}
                                                />
                                            )}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <div className="flex justify-between items-start gap-2">
                                        <div className="flex-1">
                                            <label
                                                className="block text-sm font-semibold text-slate-700 mb-1"
                                            >
                                                Dari Dana
                                            </label>
                                            <Controller
                                                control={control}
                                                name="amountSource"
                                                render={({ field: { onChange, value } }) => (
                                                    <SearchSelect className="uppercase" value={value} onValueChange={onChange}>
                                                        {
                                                            AMOUNT_SOURCES.map(amount_source => (
                                                                <SearchSelectItem key={amount_source} value={amount_source}>{amount_source}</SearchSelectItem>
                                                            ))
                                                        }
                                                    </SearchSelect>
                                                )}
                                            />
                                        </div>
                                        <div className="flex-1">
                                            <label
                                                className="block text-sm font-semibold text-slate-700 mb-1"
                                            >
                                                Tipe Pengajuan
                                            </label>
                                            <Controller
                                                control={control}
                                                name="applicationType"
                                                render={({ field: { onChange, value } }) => (
                                                    <SearchSelect className="uppercase" value={value} onValueChange={onChange}>
                                                        {
                                                            FUNDING_APPLICATION_TYPES.map(applicationType => (
                                                                <SearchSelectItem key={applicationType} value={applicationType}>{applicationType}</SearchSelectItem>
                                                            ))
                                                        }
                                                    </SearchSelect>
                                                )}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <label
                                        className="block text-sm font-semibold text-slate-700"
                                    >
                                        Dana Untuk
                                    </label>
                                    <div className="mt-1">
                                        <TextInput
                                            value={fundingApplication.program}
                                            className="my-2"
                                            placeholder="Password"
                                            disabled
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col gap-5">
                                <div>
                                    <label
                                        className="block text-sm font-semibold text-slate-700"
                                    >
                                        Total Pengajuan
                                    </label>
                                    <div className="mt-1">
                                        <Controller
                                            control={control}
                                            name="totalAmount"
                                            render={({ field: { onChange, value } }) => (
                                                <NumberInput
                                                    value={value}
                                                    min={0}
                                                    error={errors.totalAmount}
                                                    errorMessage={errors.totalAmount?.message}
                                                    placeholder="0"
                                                    onValueChange={onChange}
                                                />
                                            )}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label
                                        className="block text-sm font-semibold text-slate-700"
                                    >
                                        Dibayarkan Kepada
                                    </label>
                                    <div className="mt-1">
                                        <TextInput
                                            {...register("payTo")}
                                            placeholder="dibayarkan kepada?"
                                            name="payTo"
                                            autoComplete="off"
                                            error={errors.payTo}
                                            errorMessage={errors.payTo?.message}
                                            required
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label
                                        className="block text-sm font-semibold text-slate-700"
                                    >
                                        Informasi Rekening
                                    </label>
                                    <div className="mt-1">
                                        <TextInput
                                            {...register("paymentCredentials")}
                                            placeholder="nomor rekening / va"
                                            name="paymentCredentials"
                                            autoComplete="off"
                                            error={errors.paymentCredentials}
                                            errorMessage={errors.paymentCredentials?.message}
                                            required
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label
                                        className="block text-sm font-semibold text-slate-700"
                                    >
                                        Type Pembayaran
                                    </label>
                                    <div className="mt-1">
                                        <Controller
                                            control={control}
                                            name="paymentMethod"
                                            render={({ field: { onChange, value } }) => (
                                                <SearchSelect className="uppercase" value={value} onValueChange={onChange}>
                                                    {
                                                        FUNDING_APPLICATION_PAYMENT_METHODS.map(paymentMethod => (
                                                            <SearchSelectItem key={paymentMethod} value={paymentMethod}>{paymentMethod}</SearchSelectItem>
                                                        ))
                                                    }
                                                </SearchSelect>
                                            )}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <button
                            type='submit'
                            className="block w-full bg-slate-100 px-4 py-4 text-center text-lg font-medium text-slate-600 hover:text-slate-50 hover:bg-slate-700 sm:rounded-b-lg transition duration-200 ease-in-out"
                        >
                            Update
                        </button>
                        <a
                            href={`${ROUTES.PRINT_FUNDING_APPLICATION}/${params.id}`}
                            target="_blank"
                            className="w-full bg-slate-800 px-4 py-4 text-center text-lg font-medium text-white sm:rounded-b-lg flex items-center justify-center gap-2"
                        >
                            <EyeIcon className="w-6" />
                            Lihat
                        </a>
                    </form>
                )
            }
        </Card>
    )
}

export default UpdateForm