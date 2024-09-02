import { withRateLimit } from "@/lib/ratelimit-middleware";
import { NextRequest, NextResponse } from "next/server";

async function healthcheckHandler(req: NextRequest) {
    return NextResponse.json(
        { status: "ok", message: "https://hfun.info" },
        { status: 200 }
    );
}

export const GET = (req: NextRequest) => withRateLimit(req, healthcheckHandler);
