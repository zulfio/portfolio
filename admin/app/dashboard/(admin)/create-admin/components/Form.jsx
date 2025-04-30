"use client";

import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, TextInput } from "@tremor/react";
import { EnvelopeIcon, PhoneIcon, UserIcon } from "@heroicons/react/20/solid";
import ROUTES from "@/config/ROUTES";
import { reqAddAdmin } from "@/backend/admin";
import AdminSchema from "@/lib/validations/Admin";
import RoleInput from "@/components/form/RoleInput";
import { useRouter } from "next/navigation";
import GeneratePasswordInput from "@/components/form/GeneratePasswordInput";

function Form() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        formState: { errors },
        handleSubmit,
        control,
        reset,
    } = useForm({
        defaultValues: AdminSchema.DefaultValue,
        resolver: zodResolver(AdminSchema.Schema),
    });

    async function handleSave(body) {
        if (isLoading) return;

        setIsLoading(true);
        try {
            const { success, message, admin } = await reqAddAdmin(body);
            if (!success) throw new Error(message);

            reset();
            document.querySelector(".tremor-SearchSelect-clearIcon")?.parentNode.click();

            toast.success(`Admin ${admin.name} added successfully`);
            router.refresh();
        } catch (error) {
            toast.error(error.message);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <form className="my-5" onSubmit={handleSubmit(handleSave)}>
            <div className="mb-7">
                <div className="mb-2 flex max-w-sm flex-col gap-2">
                    <TextInput
                        {...register("name")}
                        placeholder="Name"
                        type="text"
                        name="name"
                        autoComplete="off"
                        icon={UserIcon}
                        error={errors.name}
                        errorMessage={errors.name?.message}
                        required
                    />
                    <TextInput
                        {...register("email")}
                        placeholder="Email"
                        type="email"
                        name="email"
                        autoComplete="off"
                        icon={EnvelopeIcon}
                        error={errors.email}
                        errorMessage={errors.email?.message}
                        required
                    />
                    <TextInput
                        {...register("phoneNumber")}
                        placeholder="Phone Number"
                        type="text"
                        name="phoneNumber"
                        autoComplete="off"
                        icon={PhoneIcon}
                        error={errors.phoneNumber}
                        errorMessage={errors.phoneNumber?.message}
                        required
                    />
                    <Controller
                        control={control}
                        name="role"
                        render={({ field: { onChange } }) => (
                            <div>
                                <RoleInput onChange={onChange} errors={errors} />
                                <Link href={ROUTES.ROLES} className="text-emerald-700">
                                    <span className="text-xs">Create new role</span>
                                </Link>
                            </div>
                        )}
                    />
                </div>
                <Controller
                    control={control}
                    name="password"
                    render={({ field: { onChange } }) => (
                        <GeneratePasswordInput errorMessage={errors.password?.message} onChange={onChange} isVisible />
                    )}
                />
            </div>
            <div className="flex max-w-sm gap-3">
                <Link href={ROUTES.ADMINS} className="flex-1">
                    <Button type="button" size="sm" className="w-full" variant="secondary">
                        Cancel
                    </Button>
                </Link>
                <Button type="submit" className="flex-1" size="sm" loading={isLoading}>
                    Tambah Admin
                </Button>
            </div>
        </form>
    );
}

export default Form;
