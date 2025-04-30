"use client";

import { useForm } from "react-hook-form";
import EmployeeSchema from "@/lib/validations/Employee";
import { zodResolver } from "@hookform/resolvers/zod";
import Profile from "./Profile";
import Contact from "./Contact";
import Document from "./Document";
import JobStatus from "./JobStatus";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { reqAddEmployee } from "@/backend/employee";
import buildErrorMessage from "@/lib/utils/buildErrorMessage";
import toast from "react-hot-toast";
import LoadingOverlay from "@/components/micro/LoadingOverlay";

function useAddEmloyee() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: reqAddEmployee,
        onSuccess: (data) => {
            if (!data.success) {
                throw new Error(buildErrorMessage(data.error || data.message));
            }

            queryClient.invalidateQueries({ queryKey: ["employees"] });
        },
    });
}

function AddForm() {
    const {
        register,
        formState: { errors },
        handleSubmit,
        control,
        reset,
    } = useForm({
        resolver: zodResolver(EmployeeSchema.Schema),
        defaultValues: EmployeeSchema.DefaultValues,
    });

    const { mutate, isPending } = useAddEmloyee();

    return isPending ? (
        <LoadingOverlay />
    ) : (
        <form
            onSubmit={handleSubmit((data) => {
                mutate(data, {
                    onSuccess: () => {
                        toast.success("Berhasil ditambahkan");
                        reset();
                    },
                    onError: (error) => {
                        toast.error(error.message);
                    },
                });
            })}
            className="space-y-6 sm:px-6 lg:col-span-9 lg:px-0"
        >
            <div id="profil">
                <Profile control={control} register={register} errors={errors} />
            </div>

            <div id="kontak">
                <Contact control={control} register={register} errors={errors} />
            </div>

            <div id="dokumen">
                <Document control={control} register={register} errors={errors} />
            </div>

            <div id="status">
                <JobStatus control={control} />
            </div>

            <div className="mt-4">
                <button
                    type="submit"
                    className="inline-flex w-full justify-center rounded-md border border-transparent bg-emerald-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 sm:col-start-2 sm:text-sm"
                >
                    Tambah Karyawan
                </button>
            </div>
        </form>
    );
}

export default AddForm;
