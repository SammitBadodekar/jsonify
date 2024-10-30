import { Hono } from "hono";
import { handle } from "hono/vercel";
import jsonify from "./jsonify";

export type Env = {
  GROQ_API_KEY: string;
};

const app = new Hono<{ Bindings: Env }>().basePath("/api");

app.route("/jsonify", jsonify);
app.get("/", (c) => {
  return c.json({ success: "true", message: "Server is up and running" });
});

export const GET = handle(app);
export const POST = handle(app);
export const DELETE = handle(app);
export const PUT = handle(app);

export default app as never;
