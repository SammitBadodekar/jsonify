import {
  generateSessionToken,
  createSession,
  setSessionTokenCookie,
} from "@/lib/session";
import { google } from "@/lib/auth";
import { cookies } from "next/headers";

import { decodeIdToken, type OAuth2Tokens } from "arctic";
import { userTable } from "@/db/schema";
import { db } from "@/db";
import { v4 as uuid } from "uuid";
import { eq } from "drizzle-orm";

export async function GET(request: Request): Promise<Response> {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");
  const cookieStore = await cookies();
  const storedState = cookieStore.get("google_oauth_state")?.value ?? null;
  const codeVerifier = cookieStore.get("google_code_verifier")?.value ?? null;
  if (
    code === null ||
    state === null ||
    storedState === null ||
    codeVerifier === null
  ) {
    return new Response(null, {
      status: 302,
      headers: {
        Location: "/login?error=try_again",
      },
    });
  }
  if (state !== storedState) {
    return new Response(null, {
      status: 302,
      headers: {
        Location: "/login?error=try_again",
      },
    });
  }

  let tokens: OAuth2Tokens;
  try {
    tokens = await google.validateAuthorizationCode(code, codeVerifier);
  } catch (e) {
    return new Response(null, {
      status: 400,
    });
  }
  const claims: any = decodeIdToken(tokens.idToken());
  const googleUserId = claims.sub;
  const username = claims.name;

  const existingUser = await db
    .select()
    .from(userTable)
    .where(eq(userTable.googleId, googleUserId));

  if (existingUser?.[0]) {
    const sessionToken = generateSessionToken();
    const session = await createSession(sessionToken, existingUser?.[0]?.id);
    await setSessionTokenCookie(sessionToken, session.expiresAt);
    return new Response(null, {
      status: 302,
      headers: {
        Location: "/",
      },
    });
  }

  const id = uuid();
  const user = await db
    .insert(userTable)
    .values({
      id,
      googleId: googleUserId,
      name: username,
      email: claims.email,
      picture: claims.picture,
    })
    .run();

  const sessionToken = generateSessionToken();
  const session = await createSession(sessionToken, id);
  await setSessionTokenCookie(sessionToken, session.expiresAt);
  return new Response(null, {
    status: 302,
    headers: {
      Location: "/",
    },
  });
}
