import { Hono } from "hono";
import { handle } from "hono/vercel";
import jsonify from "./jsonify";
import { cors } from "hono/cors";
import { Redis } from "@upstash/redis/cloudflare";
import { env } from "hono/adapter";
import { hashString } from "@/lib/utils";
import { apiKeysTable, sessionTable, userTable } from "@/db/schema";
import { and, eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/libsql";
import { getCurrentSession } from "@/lib/session";
import { encodeHexLowerCase } from "@oslojs/encoding";
import { sha256 } from "@oslojs/crypto/sha2";

export type Env = {
  GROQ_API_KEY: string;
  UPSTASH_REDIS_REST_TOKEN: string;
  UPSTASH_REDIS_REST_URL: string;
  TURSO_AUTH_TOKEN: string;
  TURSO_CONNECTION_URL: string;
};

const app = new Hono<{ Bindings: Env }>().basePath("/api");
app.use(
  "*",
  cors({
    origin: "*", // Allow all origins
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Allow common HTTP methods
    allowHeaders: ["Content-Type", "Authorization"], // Specify allowed headers
  })
);

// Rate limiting middleware
app.use(async (c, next) => {
  try {
    const API_KEY = c.req.header("Authorization")?.split(" ")[1];
    const sessionToken = c.req.header("X-Session-Token");

    if (!API_KEY) {
      return c.json(
        { success: false, message: "Missing API key" },
        { status: 401 }
      );
    }

    const user_google_id = API_KEY.split("_")[1];
    if (!user_google_id) {
      return c.json(
        { success: false, message: "Invalid API key" },
        { status: 401 }
      );
    }
    const {
      UPSTASH_REDIS_REST_URL,
      UPSTASH_REDIS_REST_TOKEN,
      TURSO_AUTH_TOKEN,
      TURSO_CONNECTION_URL,
    } = env(c);
    const db = drizzle({
      connection: { url: TURSO_CONNECTION_URL, authToken: TURSO_AUTH_TOKEN },
    });
    const redis = new Redis({
      url: UPSTASH_REDIS_REST_URL,
      token: UPSTASH_REDIS_REST_TOKEN,
    });
    const key = `usage:${user_google_id}`;
    const usage: string | null = await redis.get(key);

    if (sessionToken) {
      const sessionId = encodeHexLowerCase(
        sha256(new TextEncoder().encode(sessionToken))
      );
      const result = await db
        .select({ user: userTable, session: sessionTable })
        .from(sessionTable)
        .innerJoin(userTable, eq(sessionTable.userId, userTable.id))
        .where(eq(sessionTable.id, sessionId));
      if (result.length < 1) {
        return c.json(
          { success: false, message: "Invalid session token" },
          { status: 401 }
        );
      }
      const { user, session } = result[0];

      if (!user || !session) {
        return c.json(
          { success: false, message: "Invalid session token" },
          { status: 401 }
        );
      }
    } else {
      const hashedKey = await hashString(API_KEY);

      const apiKey = await db
        .select({
          id: apiKeysTable.id,
          key: apiKeysTable.key,
        })
        .from(apiKeysTable)
        .where(and(eq(apiKeysTable.key, hashedKey)))
        .get();

      if (!apiKey) {
        return c.json(
          { success: false, message: "Invalid API key" },
          { status: 401 }
        );
      }
      await db
        .update(apiKeysTable)
        .set({ updatedAt: new Date() })
        .where(eq(apiKeysTable.id, apiKey.id));
    }

    if (usage) {
      const currentUsage = parseInt(usage);
      if (currentUsage >= 100) {
        return c.json(
          { success: false, message: "Rate limit exceeded" },
          { status: 429 }
        );
      } else {
        redis.incr(key);
      }
    } else {
      await redis.set(key, "1", {
        ex: 60 * 60 * 24, // 1 day
      });
    }
    await next();
  } catch (error) {
    return c.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
});

app.route("/jsonify", jsonify);
app.get("/", async (c) => {
  return c.json({
    success: "true",
    message: "Server is up and running",
  });
});

export const GET = async () => {
  return new Response("hono js");
};
export const POST = async () => {
  return new Response("hono js");
};
export const PUT = async () => {
  return new Response("hono js");
};
export const DELETE = async () => {
  return new Response("hono js");
};
export default app as never;

//29462629ce4d9bc0caecea6f15ee0408dbdb780b405659f1aff3f2247972558e
//29462629ce4d9bc0caecea6f15ee0408dbdb780b405659f1aff3f2247972558e
//74de90daa7a01ef9fc1e776e94f1a97557da8dd0660393ab0bbb33fabeb4220d
