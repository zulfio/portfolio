"use client";

import { useState } from "react";
import { DocumentCurrencyDollarIcon } from "@heroicons/react/20/solid";
import { Button, Callout, Divider, SearchSelect, SearchSelectItem } from "@tremor/react";
import secureFetch from "@/actions/secureFetch";
import toast from "react-hot-toast";
import { Controller, useForm } from "react-hook-form";
import FundingApplication from "@/lib/validations/FundingApplication";
import buildErrorMessage from "@/lib/utils/buildErrorMessage";
import {
    LAZ_DEPARTEMENTS,
} from "@/config/CONSTANTS";
import ROUTES from "@/config/ROUTES";
import { usePublicEmployees } from "@/lib/hooks/employee.hook";
import Program from "./components/Program";
import Beneficiary from "./components/Beneficiary";

export default function DistributionReport() {
    const [printUrl, setPrintUrl] = useState(null);
    const [isCreateNewDistributionBeneficiary, setIsCreateNewDistributionBeneficiary] = useState(false);
    const [isCreateNewProgram, setIsCreateNewProgram] = useState(false);
    const [newProgram, setNewProgram] = useState({
        name: "",
        type: "",
        description: "",
    });

    const [newDistributionBeneficiary, setNewDistributionBeneficiary] = useState({
        type: "individual",
        mustahik: "",
        nik: "",
        name: "",
        gender: "",
        phoneNumber: "",
        address: {
            complete: "",
            country: "",
            province: "",
            city: "",
            subdistrict: "",
            village: "",
        },
    });

    const {
        formState: { errors, isSubmitting },
        handleSubmit,
        control,
        reset,
    } = useForm({
        defaultValues: FundingApplication.DefaultValues,
    });

    const { data: employees = [] } = usePublicEmployees();

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
            <main className="mx-auto max-w-4xl pb-24 pt-7">
                <form
                    className="px-3"
                    onSubmit={handleSubmit((data) => {

                        return handleCreateFundingApplication({
                            ...data,
                            requestDate: new Date().toISOString(),
                        });
                    })}
                >
                    <div className="mt-4 rounded-lg border border-gray-200 bg-white px-5 py-4 shadow-sm">
                        <div className="mb-12">
                            <Divider>
                                <div className="flex flex-col items-center gap-2 text-xl font-bold text-slate-800 sm:flex-row sm:text-2xl">
                                    <span>Formulir Laporan</span>
                                    <span>Program & Pendistribusian</span>
                                </div>
                            </Divider>
                        </div>

                        <div className="mb-16 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Bagian</label>
                                <div className="mt-1">
                                    <Controller
                                        control={control}
                                        name="departement"
                                        render={({ field: { onChange, value } }) => (
                                            <SearchSelect
                                                value={value}
                                                onValueChange={onChange}
                                                error={errors.employee}
                                                errorMessage={errors.employee?.message}
                                                placeholder="Pilih..."
                                            >
                                                {LAZ_DEPARTEMENTS?.map((departement) => (
                                                    <SearchSelectItem key={departement} value={departement}>
                                                        {departement}
                                                    </SearchSelectItem>
                                                ))}
                                            </SearchSelect>
                                        )}
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Penanggung Jawab</label>
                                <div className="mt-1">
                                    <Controller
                                        control={control}
                                        name="pic"
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
                        </div>

                        <Program
                            control={control}
                            errors={errors}
                            isCreateNewProgram={isCreateNewProgram}
                            setIsCreateNewProgram={setIsCreateNewProgram}
                            newProgram={newProgram}
                            setNewProgram={setNewProgram}
                        />

                        <Beneficiary
                            isCreateNew={isCreateNewDistributionBeneficiary}
                            setIsCreateNew={setIsCreateNewDistributionBeneficiary}
                            data={newDistributionBeneficiary}
                            setData={setNewDistributionBeneficiary}
                        />

                        {printUrl && (
                            <div className="mb-7">
                                <Callout title="Pengajuan berhasil dibuat" color="teal">
                                    <a href={printUrl} target="_blank">
                                        {printUrl}
                                    </a>
                                </Callout>
                            </div>
                        )}

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
