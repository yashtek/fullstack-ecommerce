import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(req: NextRequest) {
    const accessToken = req.cookies.get("accessToken")?.value;
    const isAdminRoutes = req.nextUrl.pathname.startsWith("/admin");

    if (isAdminRoutes && !accessToken) {
        return NextResponse.redirect(new URL("/", req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/admin/:path*"],
}