"use client";

import ROUTES from "@/config/ROUTES";
import { Metric } from "@tremor/react";
import { signOut } from "next-auth/react";
import { useEffect, useState } from "react";

function SignOut({ params }) {
    const [countdown, setCountdown] = useState(5);

    useEffect(() => {
        const interval = setInterval(() => {
            setCountdown((prev) => {
                return prev > 0 ? prev - 1 : 0;
            })
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (countdown === 0) {
            signOut({
                redirect: true,
                callbackUrl: ROUTES.SIGN_IN,
            });
        }
    }, [countdown]);

    return (
        <div className="flex h-screen w-screen flex-col items-center justify-center gap-3 text-slate-800">
            {params.type === "unauthorized" && <Metric>Sesi Anda telah berakhir. Silakan masuk kembali untuk melanjutkan.</Metric>}
            {params.type === "forbidden" && (
                <>
                    <Metric>Anda tidak memiliki izin untuk mengakses halaman ini.</Metric>
                    <Metric>Silakan hubungi administrator untuk informasi lebih lanjut.</Metric>
                </>
            )}

            <Metric className="animate-pulse">Keluar dalam {countdown} detik</Metric>
        </div>
    );
}

export default SignOut;
