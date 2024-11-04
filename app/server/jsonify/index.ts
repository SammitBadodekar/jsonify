import { z } from "zod";
import Groq from "groq-sdk";
import { EXAMPLE_PROMPT, EXAMPLE_ANSWER } from "./example";
import { jsonSchemaToZod } from "./helpers";
import { Hono } from "hono";
import { env } from "hono/adapter";
import { Env } from "../route";

type PromiseExecutor<T> = (
  resolve: (value: T) => void,
  reject: (reason?: any) => void
) => void;

class RetryablePromise<T> extends Promise<T> {
  static async retry<T>(
    retries: number,
    executor: PromiseExecutor<T>
  ): Promise<T> {
    return new RetryablePromise<T>(executor).catch((error) => {
      console.error(`Retrying due to error: ${error}`);
      return retries > 0
        ? RetryablePromise.retry(retries - 1, executor)
        : RetryablePromise.reject(error);
    });
  }
}

const app = new Hono();

app.post("/", async (c) => {
  const { GROQ_API_KEY } = env<Env>(c);
  const groq = new Groq({ apiKey: GROQ_API_KEY });

  const body = await c.req.json();

  const genericSchema = z.object({
    data: z.string(),
    format: z.object({}).passthrough(),
  });

  const { data, format } = genericSchema.parse(body);

  const dynamicSchema = jsonSchemaToZod(format);

  const content = `DATA: \n"${data}"\n\n-----------\nExpected JSON format: ${JSON.stringify(
    format,
    null,
    2
  )}\n\n-----------\nValid JSON output in expected format:`;

  const validationResult = await RetryablePromise.retry<string>(
    3,
    async (resolve, reject) => {
      try {
        const res = await groq.chat.completions.create({
          model: "llama3-groq-70b-8192-tool-use-preview",
          messages: [
            {
              role: "assistant",
              content:
                "You are an AI that converts unstructured data into the attached JSON format. You respond with nothing but valid JSON based on the input data. Your output should DIRECTLY be valid JSON, nothing added before or after. You will begin right with the opening curly brace and end with the closing curly brace. Only if you absolutely cannot determine a field, use the value null.",
            },
            {
              role: "user",
              content: EXAMPLE_PROMPT,
            },
            {
              role: "system",
              content: EXAMPLE_ANSWER,
            },
            {
              role: "user",
              content,
            },
          ],
        });

        const text = res.choices[0].message.content;
        const validationResult = dynamicSchema.parse(JSON.parse(text || ""));

        return resolve(validationResult);
      } catch (err) {
        reject(err);
      }
    }
  );

  return c.json(
    {
      success: true,
      message: "Successfully converted data to json",
      data: validationResult,
    },
    { status: 200 }
  );
});

export default app;
