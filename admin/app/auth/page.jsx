import React from "react";
import Image from "next/image";
import { getServerSession } from "next-auth";
import { Card, Flex, Text } from "@tremor/react";
import { redirect } from "next/navigation";
import AuthForm from "./components/AuthForm";
import { authOptions } from "../api/auth/[...nextauth]/route";
import ROUTES from "@/config/ROUTES";
import { reqGetOptions } from "@/backend/siteOption";

async function Auth() {
    const session = await getServerSession(authOptions);
    if (session?.user) {
        redirect(ROUTES.DASHBOARD);
    }

    const { success, message, options = [{}] } = await reqGetOptions({ fields: ["admin_login_methods"] });
    if (!success) throw new Error(message);

    return (
        <div className="flex min-h-screen justify-center sm:items-center">
            <div className="flex flex-1 flex-col items-center justify-start pt-10 sm:justify-between sm:pt-0">
                <h1 className="mb-10 text-xl font-extrabold text-slate-800 sm:mb-0">
                    Crowdfunding<span className="text-emerald-600">App</span>
                </h1>
                <div className="relative w-full max-w-[20rem] sm:max-w-none">
                    <Image
                        alt="login background"
                        src="/static/login_bg.png"
                        width="737"
                        height="1024"
                        className="mx-auto hidden sm:block"
                        priority
                        style={{ width: "auto", height: "auto" }}
                    />
                    <Flex className="top-0 h-full sm:absolute" justifyContent="center">
                        <Card className="mb-5 max-w-sm sm:mb-0" style={{ boxShadow: "none" }}>
                            <AuthForm loginMethods={JSON.stringify(options[0])} />
                        </Card>
                    </Flex>
                </div>
                <Text className="text-xs">© 2022-{new Date().getFullYear()}, LAZ al-Hilal</Text>
            </div>
        </div>
    );
}

export default Auth;
