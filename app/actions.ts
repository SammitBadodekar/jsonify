"use server";
import { db } from "@/db";
import { apiKeysTable } from "@/db/schema";
import {
  deleteSessionTokenCookie,
  getCurrentSession,
  invalidateSession,
} from "@/lib/session";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { v4 as uuid } from "uuid";

interface ActionResult {
  error: string | null;
  data?: Record<string, any>;
}

export async function logout(): Promise<ActionResult> {
  const { session } = await getCurrentSession();
  if (!session) {
    return {
      error: "Unauthorized",
    };
  }

  await invalidateSession(session.id);
  await deleteSessionTokenCookie();
  return redirect("/login");
}

export async function createApiKey(name: string): Promise<ActionResult> {
  const { session, user } = await getCurrentSession();
  if (!session || !user) {
    return { error: "Unauthorized" };
  }

  const API_KEY = `JFY_${user.googleId}_${uuid()}`;
  const hashedKey = await hashApiKey(API_KEY);

  await db.insert(apiKeysTable).values({
    id: uuid(),
    name,
    userId: user.id,
    key: hashedKey,
    createdAt: new Date(),
    updatedAt: new Date(),
  });
  revalidatePath("/dashboard/api-keys");

  return {
    data: {
      apiKey: API_KEY,
    },
    error: null,
  };
}

export async function deleteApiKey(formData: FormData): Promise<void> {
  try {
    await db
      .delete(apiKeysTable)
      .where(eq(apiKeysTable.id, formData.get("id")?.toString()!));
    revalidatePath("/dashboard/api-keys");
  } catch (error) {
    console.error(error);
  }
}

async function hashApiKey(apiKey: string) {
  const encoder = new TextEncoder();
  const data = encoder.encode(apiKey);

  // Hash the API key using SHA-256
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);

  // Convert the ArrayBuffer to a hexadecimal string for storage
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashedKey = hashArray
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");

  return hashedKey;
}
