import { Tab, TabGroup, TabList, TextInput } from "@tremor/react";
import { Controller } from "react-hook-form";

const securityOptions = ["none", "ssl", "tls"];

const Credentials = ({ register, errors, control }) => {
    return (
        <div className="flex flex-wrap gap-11 text-slate-800">
            <div className="w-full max-w-sm">
                <h2 className="mb-2 block text-xl font-bold">Email</h2>

                <div className="flex flex-col gap-4">
                    <div>
                        <div className="mb-1">
                            <span className="block text-sm font-bold">From Name</span>
                        </div>
                        <TextInput
                            name="email.fromName"
                            {...register("email.fromName")}
                            maxLength="100"
                            error={errors.email?.fromName}
                            errorMessage={errors.email?.fromName?.message}
                            placeholder="Admin"
                        />
                    </div>

                    <div>
                        <div className="mb-1">
                            <span className="block text-sm font-bold">From Email</span>
                        </div>
                        <TextInput
                            name="email.fromEmail"
                            {...register("email.fromEmail")}
                            maxLength="100"
                            error={errors.email?.fromEmail}
                            errorMessage={errors.email?.fromEmail?.message}
                            placeholder="noreply@gmail.com"
                            type="email"
                        />
                    </div>

                    <div>
                        <div className="mb-1">
                            <span className="block text-sm font-bold">Host</span>
                        </div>
                        <TextInput
                            name="email.host"
                            {...register("email.host")}
                            maxLength="100"
                            error={errors.email?.host}
                            errorMessage={errors.email?.host?.message}
                            placeholder="smtp.example.com"
                        />
                    </div>

                    <div>
                        <div className="mb-1">
                            <span className="block text-sm font-bold">Port</span>
                        </div>
                        <TextInput
                            name="email.port"
                            {...register("email.port")}
                            maxLength="100"
                            error={errors.email?.port}
                            errorMessage={errors.email?.port?.message}
                            placeholder="587"
                            type="number"
                        />
                    </div>

                    <div>
                        <div className="mb-1">
                            <span className="block text-sm font-bold">Security</span>
                        </div>
                        <Controller
                            control={control}
                            name="email.security"
                            render={({ field: { onChange, value } }) => (
                                <TabGroup
                                    onIndexChange={(index) => onChange(securityOptions[index])}
                                    defaultIndex={securityOptions.indexOf(value)}
                                >
                                    <TabList variant="solid">
                                        {securityOptions.map((security) => (
                                            <Tab key={security} value={security}>
                                                {security.toUpperCase()}
                                            </Tab>
                                        ))}
                                    </TabList>
                                </TabGroup>
                            )}
                        />
                    </div>

                    <div>
                        <div className="mb-1">
                            <span className="block text-sm font-bold">With Authentication?</span>
                        </div>
                        <Controller
                            control={control}
                            name="email.withAuth"
                            render={({ field: { onChange, value } }) => (
                                <TabGroup onIndexChange={(index) => onChange(index === 1)} defaultIndex={value ? 1 : 0}>
                                    <TabList variant="solid">
                                        <Tab value={false}>No</Tab>
                                        <Tab value={true}>Yes</Tab>
                                    </TabList>
                                </TabGroup>
                            )}
                        />
                    </div>

                    <div>
                        <div className="mb-1">
                            <span className="block text-sm font-bold">Username</span>
                        </div>
                        <TextInput
                            name="email.username"
                            {...register("email.username")}
                            maxLength="100"
                            error={errors.email?.username}
                            errorMessage={errors.email?.username?.message}
                            placeholder="username"
                        />
                    </div>

                    <div>
                        <div className="mb-1">
                            <span className="block text-sm font-bold">Password</span>
                        </div>
                        <TextInput
                            name="email.password"
                            {...register("email.password")}
                            maxLength="100"
                            error={errors.email?.password}
                            errorMessage={errors.email?.password?.message}
                            placeholder="password"
                            type="password"
                        />
                    </div>
                </div>
            </div>
            <div className="w-full max-w-sm">
                <h2 className="mb-2 block text-xl font-bold">SMS</h2>

                <div className="mb-4 max-w-sm">
                    <div className="mb-1">
                        <span className="block text-sm font-bold">Twilio SID</span>
                    </div>
                    <TextInput
                        name="twilio.accountSid"
                        {...register("twilio.accountSid")}
                        maxLength="100"
                        error={errors.twilio?.accountSid}
                        errorMessage={errors.twilio?.accountSid?.message}
                        placeholder="your_account_sid"
                    />
                </div>

                <div className="mb-4 max-w-sm">
                    <div className="mb-1">
                        <span className="block text-sm font-bold">Twilio Token</span>
                    </div>
                    <TextInput
                        name="twilio.authToken"
                        {...register("twilio.authToken")}
                        maxLength="100"
                        error={errors.twilio?.authToken}
                        errorMessage={errors.twilio?.authToken?.message}
                        placeholder="your_auth_token"
                    />
                </div>

                <div className="mb-4 max-w-sm">
                    <div className="mb-1">
                        <span className="block text-sm font-bold">Twilio Phone Number (sender)</span>
                    </div>
                    <TextInput
                        name="twilio.from"
                        {...register("twilio.from")}
                        maxLength="100"
                        error={errors.twilio?.from}
                        errorMessage={errors.twilio?.from?.message}
                        placeholder="+1234567890"
                    />
                </div>
            </div>
        </div>
    );
};

export default Credentials;
