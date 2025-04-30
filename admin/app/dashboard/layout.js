import DashboardLayout from "@/components/layouts/DashboardLayout.jsx";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";

export const metadata = {
    title: "Dashboard",
};

export default async function layout({ children }) {
    const session = await getServerSession(authOptions);

    return (
        <DashboardLayout
            session={JSON.stringify({
                user: {
                    name: session.user.name,
                    email: session.user.email,
                    image: session.user.image,
                    role: session.user.role,
                },
            })}
        >
            {children}
        </DashboardLayout>
    );
}
