"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Controller, useForm } from "react-hook-form";
import { Button, TextInput } from "@tremor/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { EnvelopeIcon, PhoneIcon, UserIcon } from "@heroicons/react/20/solid";
import ROUTES from "@/config/ROUTES";
import { reqUpdateAdmin } from "@/backend/admin";
import AdminSchema from "@/lib/validations/Admin";
import RoleInput from "@/components/form/RoleInput";
import GeneratePasswordInput from "@/components/form/GeneratePasswordInput";

function Form(props) {
    const admin = JSON.parse(props.admin);

    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        formState: { errors },
        handleSubmit,
        control,
    } = useForm({
        defaultValues: {
            ...admin,
            role: admin.role._id,
        },
        resolver: zodResolver(AdminSchema.Schema),
    });

    async function handleSave(body) {
        if (isLoading) return;

        setIsLoading(true);
        try {
            const response = await reqUpdateAdmin(admin._id, body);
            if (!response.success) throw new Error("Failed to update admin");

            toast.success(`Admin ${response.admin.name} updated successfully`);
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
                        render={({ field: { onChange, value } }) => (
                            <div>
                                <RoleInput
                                    onChange={(val) => {
                                        onChange(val);
                                    }}
                                    errors={errors}
                                    defaultValue={value}
                                />
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
                        <GeneratePasswordInput errorMessage={errors.password?.message} onChange={onChange} />
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
                    Save
                </Button>
            </div>
        </form>
    );
}

export default Form;
