import { createAdminClient } from "@/lib/appwrite/appwrite.config";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { AppwriteException } from "node-appwrite";


export const runtime = "edge";

export async function GET(request: NextRequest) {

  const searchParams = request.nextUrl.searchParams;
  const secret = searchParams.get("secret");
  const userId = searchParams.get("userId");
  if (!secret || !userId) {
    NextResponse.redirect(new URL("/?error=session not found", request.url));
  }

  const { account } = await createAdminClient();
  try {
    const session = await account.createSession(
      userId as string,
      secret as string,
    );
    (await cookies()).set("session", session.secret, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
      expires: new Date(session.expire),
    });

    return NextResponse.redirect(new URL("/dashboard", request.nextUrl));
  } catch (err) {
    if (err instanceof AppwriteException) {
      switch (err.code) {
        case 401:
          return NextResponse.redirect(
            new URL("/?error=unauthorized", request.url),
          );
        case 404:
          return NextResponse.redirect(
            new URL("/?error=not found", request.url),
          );
        default:
          return NextResponse.redirect(
            new URL("/?error=something went wrong", request.url),
          );
      }
    }
    throw err;
  }
}

