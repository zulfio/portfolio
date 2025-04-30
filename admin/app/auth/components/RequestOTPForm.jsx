"use client";

import { useState } from "react";
import { Button, Metric, Text, TextInput } from "@tremor/react";
import ValidateOTPForm from "./ValidateOTPForm";
import { reqOTP } from "@/backend/auth";

function RequestOTPForm({ setLoginType, activeLoginMethods }) {
    const [username, setUsername] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [otpSent, setOTPSent] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();
        if (loading) return;

        setLoading(true);

        try {
            const { success, message } = await reqOTP(username);
            if (!success) throw new Error(message);

            setOTPSent(true);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }

    return otpSent ? (
        <ValidateOTPForm username={username} setOTPSent={setOTPSent} />
    ) : (
        <form onSubmit={handleSubmit}>
            <Metric>Log In</Metric>
            <div className="mb-7 mt-11">
                <TextInput
                    name="username"
                    type="text"
                    className="my-2"
                    placeholder="Phone Number or Email Address"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    error={error}
                    errorMessage={error}
                />
            </div>
            <div className="mb-2">
                <Button
                    type="submit"
                    color="green"
                    size="sm"
                    variant="primary"
                    className="w-full font-bold"
                    disabled={loading}
                >
                    Next
                </Button>
            </div>
            {activeLoginMethods.includes("password") && (
                <div className="flex justify-end">
                    <button onClick={() => setLoginType("password")} type="button" className="text-right">
                        <Text color="green">Login with Password</Text>
                    </button>
                </div>
            )}
        </form>
    );
}

export default RequestOTPForm;
