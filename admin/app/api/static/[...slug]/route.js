import { NextResponse } from "next/server";
const { API_URL } = process.env;

export async function GET(request, { params }) {
    const req = await fetch(`${API_URL}/static/${params.slug.join("/")}`);
    const response = new NextResponse(req.body, {
        status: req.status,
        statusText: req.statusText,
        headers: {
            "Content-Type": req.headers.get("Content-Type"),
        },
    });

    return response;
}
