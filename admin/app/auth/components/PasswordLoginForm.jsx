"use client";

import ROUTES from "@/config/ROUTES";
import { Button, Flex, Metric, Text, TextInput } from "@tremor/react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

function PasswordLoginForm({ setLoginType, activeLoginMethods }) {
    const router = useRouter();
    const [errorMessage, setErrorMessage] = useState(null);

    async function handleLogin(event) {
        event.preventDefault();

        const { username, password } = event.target;

        try {
            const req = await signIn("password", {
                username: username.value,
                password: password.value,
                redirect: false,
            });

            if (req.error || req.status === 401) {
                setErrorMessage(req.error);
                return;
            }

            router.push(ROUTES.DASHBOARD);
            router.refresh();
        } catch (error) {
            setErrorMessage("Ooops, something went wrong!");
        }
    }

    return (
        <form onSubmit={handleLogin}>
            <Flex justifyContent="between" alignItems="center">
                <Metric>Log In</Metric>
                <a href="#">
                    <Text color="green">Forgot Password?</Text>
                </a>
            </Flex>
            <div className="mb-7 mt-11">
                <TextInput
                    name="username"
                    type="text"
                    className="my-2"
                    placeholder="Phone Number or Email Address"
                    required
                    error={errorMessage}
                />
                <TextInput
                    name="password"
                    type="password"
                    className="my-2"
                    placeholder="Password"
                    required
                    error={errorMessage}
                />
                <Text className="text-sm font-bold text-rose-600">{errorMessage}</Text>
            </div>
            <div className="mb-2">
                <Button type="submit" color="green" size="sm" variant="primary" className="w-full font-bold">
                    LOG IN
                </Button>
            </div>
            {activeLoginMethods.includes("otp") && (
                <div className="flex justify-end">
                    <button onClick={() => setLoginType("otp")} type="button" className="text-right">
                        <Text color="green">Login with OTP</Text>
                    </button>
                </div>
            )}
        </form>
    );
}

export default PasswordLoginForm;
