import { MultiSelect, MultiSelectItem, Switch } from "@tremor/react";
import { Controller } from "react-hook-form";

const User = ({ errors, control }) => {
    return (
        <div className="text-slate-800">
            <div className="mb-5 flex items-center gap-5">
                <span className="block text-base font-bold">Allow user registration?</span>
                <Controller
                    control={control}
                    name="allow_registration"
                    render={({ field: { onChange } }) => (
                        <Switch
                            onChange={onChange}
                            error={errors.allow_registration}
                            errorMessage={errors.allow_registration?.message}
                        />
                    )}
                />
            </div>

            <div className="mb-5 max-w-sm">
                <div className="mb-1">
                    <span className="block text-base font-bold">User login method</span>
                </div>
                <Controller
                    control={control}
                    name="user_login_methods"
                    render={({ field: { onChange, value } }) => (
                        <MultiSelect
                            value={value}
                            onValueChange={(val) => onChange(val.length ? val : null)}
                            error={errors.user_login_methods}
                            errorMessage={errors.user_login_methods?.message}
                        >
                            {[
                                {
                                    name: "OTP",
                                    value: "otp",
                                },
                                {
                                    name: "Password",
                                    value: "password",
                                },
                                {
                                    name: "Social",
                                    value: "social",
                                },
                            ].map((method, index) => (
                                <MultiSelectItem key={index} value={method.value} className="cursor-pointer">
                                    {method.name}
                                </MultiSelectItem>
                            ))}
                        </MultiSelect>
                    )}
                />
            </div>

            <div className="mb-5 max-w-sm">
                <div className="mb-1">
                    <span className="block text-base font-bold">Admin login method</span>
                </div>
                <Controller
                    control={control}
                    name="admin_login_methods"
                    render={({ field: { onChange, value } }) => (
                        <MultiSelect
                            value={value}
                            onValueChange={(val) => onChange(val.length ? val : null)}
                            error={errors.admin_login_methods}
                            errorMessage={errors.admin_login_methods?.message}
                        >
                            {[
                                {
                                    name: "OTP",
                                    value: "otp",
                                },
                                {
                                    name: "Password",
                                    value: "password",
                                },
                            ].map((method, index) => (
                                <MultiSelectItem key={index} value={method.value} className="cursor-pointer">
                                    {method.name}
                                </MultiSelectItem>
                            ))}
                        </MultiSelect>
                    )}
                />
            </div>
        </div>
    );
};

export default User;
