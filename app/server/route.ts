import { Hono } from "hono";
import { handle } from "hono/vercel";
import jsonify from "./jsonify";
import { cors } from "hono/cors";
import { Redis } from "@upstash/redis/cloudflare";
import { env } from "hono/adapter";

export type Env = {
  GROQ_API_KEY: string;
  UPSTASH_REDIS_REST_TOKEN: string;
  UPSTASH_REDIS_REST_URL: string;
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
