"use client";

import { Loader, Play } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { set, z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useState } from "react";
import JSONPretty from "react-json-pretty";
import "react-json-pretty/themes/acai.css";
import { toast } from "sonner";
import { useSession } from "@/providers/session-provider";

const FormSchema = z.object({
  raw_data: z.string().nonempty("Raw data cannot be empty"),
  json_schema: z
    .string()
    .nonempty("JSON schema cannot be empty")
    .refine(
      (schema) => {
        try {
          const parsedSchema = JSON.parse(schema); // Parse as JSON
          return typeof parsedSchema === "object" && parsedSchema !== null; // Ensure it's an object
        } catch {
          return false;
        }
      },
      {
        message: "JSON schema must be a valid JSON object",
      }
    ),
});

export default function DataToJson() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      raw_data:
        "To open Google Meet on Safari without being prompted to download the app, follow these steps:\nOpen Safari: Launch the Safari browser on your iOS device.\nNavigate to Google Meet: Type meet.google.com in the address bar and hit enter.\nRequest Desktop Site:\nOnce the Google Meet page loads, tap the AA icon located on the left side of the address bar.\nSelect Request Desktop Site from the dropdown menu. This will load the desktop version of Google Meet, which is more functional than the mobile version.\nJoin a Meeting:\nOn the desktop site, you should see options to either start a new meeting or join an existing one.\nIf joining a meeting, enter the meeting code and click Join.\nGrant Permissions: If prompted, allow Safari to access your microphone and camera to participate in the meeting.\nBy following these steps, you should be able to use Google Meet directly in Safari without needing to download any additional apps1\n4.\n",
      json_schema: JSON.stringify({
        application: {
          type: "string",
        },
        action: {
          type: "string",
        },
        steps: {
          type: "array",
          items: {
            type: "object",
            description: {
              type: "string",
            },
            name: {
              type: "string",
            },
            id: {
              type: "string",
            },
          },
        },
      }),
    },
  });
  const [structuredJson, setStructuredJson] = useState<JSON | undefined>();
  const [loading, setLoading] = useState(false);
  const { session, token, user } = useSession();

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      setLoading(true);
      const Response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/jsonify`,
        {
          data: data.raw_data,
          format: JSON.parse(data.json_schema),
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer JFY_${user?.googleId}`,
            "X-Session-Token": token,
          },
        }
      );
      if (Response?.data?.success) {
        setStructuredJson(Response?.data?.data);
      }
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
      toast.error("Something went wrong, please try again", {
        position: "top-center",
      });
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4"
      >
        <div className="flex w-full flex-col gap-12">
          <FormField
            control={form.control}
            name="raw_data"
            render={({ field }) => (
              <FormItem className="">
                <FormLabel className="text-xl font-bold">Raw data</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder=""
                    rows={5}
                    {...field}
                    className="h-5/6"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="json_schema"
            render={({ field }) => (
              <FormItem className="">
                <FormLabel className="text-xl font-bold">json schema</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder=""
                    rows={5}
                    {...field}
                    className="h-5/6"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="w-full h-full max-h-[90vh]">
          <div className="flex w-full justify-between p-2 items-center">
            <h1 className="text-xl font-bold">Structured JSON</h1>
            <Button
              type="submit"
              className="bg-green-500 hover:bg-green-700 -mt-4"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader className="h-4 w-4 animate-spin" />
                </>
              ) : (
                <>
                  Run <Play className="h-4 w-4" />
                </>
              )}
            </Button>
          </div>
          <JSONPretty
            id="json-pretty"
            data={
              structuredJson ?? {
                application: "Google Meet",
                action: "Open",
                steps: [
                  {
                    description:
                      "Launch the Safari browser on your iOS device.",
                    name: "Open Safari",
                    site: "Safari",
                    company: "Apple",
                  },
                  {
                    description:
                      "Type meet.google.com in the address bar and hit enter.",
                    name: "Navigate to Google Meet",
                    site: "meet.google.com",
                    company: "Google",
                  },
                  {
                    description:
                      "Tap the AA icon located on the left side of the address bar.",
                    name: "Request Desktop Site",
                    site: "AA icon",
                    company: "Apple",
                  },
                  {
                    description:
                      "Select Request Desktop Site from the dropdown menu.",
                    name: "Select Request Desktop Site",
                    site: "Dropdown menu",
                    company: "Apple",
                  },
                  {
                    description:
                      "This will load the desktop version of Google Meet, which is more functional than the mobile version.",
                    name: "Load Desktop Version",
                    site: "Google Meet",
                    company: "Google",
                  },
                  {
                    description:
                      "On the desktop site, you should see options to either start a new meeting or join an existing one.",
                    name: "Join a Meeting",
                    site: "Google Meet",
                    company: "Google",
                  },
                  {
                    description:
                      "If joining a meeting, enter the meeting code and click Join.",
                    name: "Enter Meeting Code",
                    site: "Google Meet",
                    company: "Google",
                  },
                  {
                    description:
                      "If prompted, allow Safari to access your microphone and camera to participate in the meeting.",
                    name: "Grant Permissions",
                    site: "Safari",
                    company: "Apple",
                  },
                ],
              }
            }
            className="h-4/5 bg-[#1e1e1e] p-2 rounded-lg overflow-y-scroll"
          ></JSONPretty>
        </div>
      </form>
    </Form>
  );
}
