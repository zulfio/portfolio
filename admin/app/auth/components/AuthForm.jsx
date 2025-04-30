"use client";

import React, { useState } from "react";
import RequestOTPForm from "./RequestOTPForm";
import PasswordLoginForm from "./PasswordLoginForm";

function AuthForm(props) {
    let activeLoginMethods = props.loginMethods ? JSON.parse(props.loginMethods).value : [];
    const [loginType, setLoginType] = useState(activeLoginMethods[0]);

    return (
        <div>
            {activeLoginMethods.includes("otp") && loginType === "otp" && (
                <RequestOTPForm setLoginType={setLoginType} activeLoginMethods={activeLoginMethods} />
            )}
            {activeLoginMethods.includes("password") && loginType === "password" && (
                <PasswordLoginForm setLoginType={setLoginType} activeLoginMethods={activeLoginMethods} />
            )}
        </div>
    );
}

export default AuthForm;
