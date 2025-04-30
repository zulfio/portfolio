"use client";

import React, { useCallback, useEffect, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { ChevronLeftIcon } from "@heroicons/react/20/solid";
import { Flex, Icon, Text, Title } from "@tremor/react";
import ROUTES from "@/config/ROUTES";

function ValidateOTPForm({ username, setOTPSent }) {
    const router = useRouter();

    const [otp, setOtp] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handleValidateOTP = useCallback(async () => {
        try {
            const req = await signIn("otp", {
                otp,
                username,
                redirect: false,
            });

            if (!!req.error || req.status === 401) {
                setErrorMessage(req.error);
                return;
            }

            router.push(ROUTES.DASHBOARD);
            router.refresh();
        } catch (error) {
            setErrorMessage("Ooops, something went wrong!");
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [otp, username]);

    useEffect(() => {
        otp.length >= 4 && handleValidateOTP();
    }, [otp, handleValidateOTP]);

    return (
        <div>
            <button type="button" onClick={() => setOTPSent(false)} className="absolute left-0 top-0">
                <Icon size="xl" color="gray" icon={ChevronLeftIcon} tooltip="Back" />
            </button>
            <div className="my-7"></div>
            <Flex flexDirection="col" alignItems="center" className="text-center">
                <Image src="/static/whatsapp_icon.png" width={37} height={37} alt="whatsapp icon" className="mb-5" />
                <Title className="font-bold">Enter Verification Code</Title>
                <Text className="text-sm">Verification code has been sent to {username}.</Text>
                <div className="mb-5 mt-7">
                    <input
                        onChange={({ target }) => {
                            const value = target.value.trim().replace(/\D/g, "");
                            setErrorMessage(null);
                            setOtp(value);
                        }}
                        value={otp}
                        maxLength={4}
                        name="otp"
                        type="text"
                        className={`mb-2 w-24 border-0 border-b-2 text-center text-2xl font-bold text-gray-600 focus:ring-0 ${
                            errorMessage ? "border-rose-600" : "border-emerald-600 focus:border-emerald-600"
                        }`}
                    />
                    <Text className="text-sm font-bold text-rose-600">{errorMessage}</Text>
                </div>
            </Flex>

            <Text className="text-center">
                Didn't receive the code?
                <button
                    onClick={() => {
                        setOTPSent(false);
                    }}
                    className="ml-1 font-semibold text-emerald-600"
                    type="button"
                >
                    Resend
                </button>
            </Text>
        </div>
    );
}

export default ValidateOTPForm;
