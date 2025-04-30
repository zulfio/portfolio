"use client";

import dynamic from "next/dynamic";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import EmployeeSchema from "@/lib/validations/Employee";
import { zodResolver } from "@hookform/resolvers/zod";
import { reqUpdateEmployee } from "@/backend/employee";
import buildErrorMessage from "@/lib/utils/buildErrorMessage";
import Contact from "./Contact";
import Document from "./Document";
import { useRouter } from "next/navigation";
const Profile = dynamic(() => import("./Profile"), { ssr: false });
const JobStatus = dynamic(() => import("./JobStatus"), { ssr: false });

function EditForm(props) {
    const employee = JSON.parse(props.employee);
    const router = useRouter();

    const {
        register,
        formState: { errors },
        handleSubmit,
        control,
    } = useForm({
        resolver: zodResolver(EmployeeSchema.Schema),
        defaultValues: (() => {
            return {
                ...employee,
                profile_picture: employee.profile_picture?._id,
                signature: employee.signature?._id,
                other_documents: employee.other_documents.map((doc) => doc._id),
            };
        })()
    });

    function useUpdateEmployee() {
        return useMutation({
            mutationFn: reqUpdateEmployee,
            onSuccess: (data) => {
                if (!data.success) {
                    throw new Error(buildErrorMessage(data.error || data.message));
                }

                toast.success("Karyawan berhasil diubah");
                router.refresh();
            },
        });
    }
    const { mutate } = useUpdateEmployee();

    return (
        <form
            onSubmit={handleSubmit((data) => {
                mutate(
                    {
                        _id: employee._id,
                        data,
                    }
                );
            })}
            className="space-y-6 sm:px-6 lg:col-span-9 lg:px-0"
        >
            <div id="profil">
                <Profile defaultValue={employee} control={control} register={register} errors={errors} />
            </div>

            <div id="kontak">
                <Contact control={control} register={register} errors={errors} employee={employee} />
            </div>

            <div id="dokumen">
                <Document defaultValue={employee} control={control} register={register} errors={errors} />
            </div>

            <div id="status">
                <JobStatus control={control} />
            </div>

            <div className="mt-4">
                <button
                    type="submit"
                    className="inline-flex w-full justify-center rounded-md border border-transparent bg-emerald-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 sm:col-start-2 sm:text-sm"
                >
                    Update Karyawan
                </button>
            </div>
        </form>
    );
}

export default EditForm;
