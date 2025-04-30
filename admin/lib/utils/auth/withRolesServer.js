import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import ROUTES from "@/config/ROUTES";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import hasRequiredPermissions from "./hasRequiredPermissions";

export function withRolesServer(Component, requiredPermissions) {
    return async function WithRolesWrapper(props) {
        const session = await getServerSession(authOptions);

        const hasPermission = session && hasRequiredPermissions(session.user.role?.permissions, requiredPermissions);
        if (hasPermission) {
            return <Component {...props} />;
        } else {
            redirect(ROUTES.DASHBOARD);
            return null;
        }
    };
}
