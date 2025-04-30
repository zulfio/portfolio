const { API_URL } = process.env;

import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";

export const GET = async (req) => {
    const searchParams = req.nextUrl.searchParams;
    const ids = searchParams.get('ids');
    const session = await getServerSession(authOptions);

    try {
        if (!ids) {
            return NextResponse.json({ success: false, message: "asset ids is required" }, { status: 400 });
        }

        if (!session) {
            return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
        }

        const req = await fetch(`${API_URL}/api/v1/asset/export-qr-pdf?ids=${ids}`, {
            headers: {
                ...(session && { Authorization: `Bearer ${session.user?.token}` }),
            },
        });

        if (!req.ok) {
            const res = await req.json();
            return NextResponse.json(res, { status: req.status });
        }
        const res = await req.blob();

        return new NextResponse(res, { status: 200, statusText: "OK", headers: { "Content-Type": "application/pdf" } });
    } catch (error) {
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
};