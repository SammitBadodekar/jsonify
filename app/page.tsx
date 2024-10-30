import Image from "next/image";
import { generateSessionToken, createSession } from "@/lib/session";
import { db } from "@/db";
import { userTable } from "@/db/schema";

export default async function Home() {
  try {
    const token = generateSessionToken();
    const userId: any = await db
      .insert(userTable)
      .values({
        id: Math.floor(Math.random() * 10000),
      })
      .run();
    console.log({ token, userId: userId.lastInsertRowid });
    const session = await createSession(token, userId.lastInsertRowid);
  } catch (error) {
    console.log("error", error);
  }

  // setSessionTokenCookie(token);
  return (
    <main className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      hello
    </main>
  );
}
