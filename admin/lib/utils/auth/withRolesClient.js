import ROUTES from "@/config/ROUTES";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import hasRequiredPermissions from "./hasRequiredPermissions";

export function withRolesClient(Component, requiredPermissions) {
    return function WithRolesWrapper(props) {
        const router = useRouter();
        const { data: session, status } = useSession();
        const [isLoading, setIsLoading] = useState(true);
        const [hasPermission, setHasPermission] = useState(false);

        useEffect(() => {
            if (status === "loading") return;

            try {
                const hasPermission =
                    status === "authenticated" &&
                    hasRequiredPermissions(session.user.role?.permissions, status, requiredPermissions);
                if (!hasPermission) {
                    toast("You do not have permission to access this page.", {
                        icon: "🚫",
                    });
                    router.replace(ROUTES.DASHBOARD);
                    setHasPermission(false);
                    return;
                }

                setHasPermission(true);
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        }, [session, status]); // eslint-disable-line react-hooks/exhaustive-deps

        if (isLoading) {
            return <p>Loading...</p>;
        }

        if (hasPermission) {
            return <Component {...props} />;
        }

        return <p>Unauthorized</p>;
    };
}
