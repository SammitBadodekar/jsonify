"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { set, z } from "zod";

import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { createApiKey } from "@/app/actions";
import { useRef, useState } from "react";
import { Check, Copy, Loader } from "lucide-react";

const FormSchema = z.object({
  name: z.string().min(2, {
    message: "Key name must be at least 2 characters.",
  }),
});

export default function ApiKeyForm() {
  const [loading, setLoading] = useState(false);
  const [apiKey, setApiKey] = useState("");
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const ref = useRef<HTMLFormElement>(null);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    console.log("data", data.name);
    const { data: actionData } = await createApiKey(data.name);
    console.log("data", data);
    ref.current?.reset();
    setApiKey(actionData?.apiKey);
    form.reset();
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        if (!open) {
          setApiKey("");
          setCopied(false);
          ref.current?.reset();
        }
        console.log("open", open);
        setOpen(open);
      }}
    >
      <DialogTrigger>
        <Button onClick={() => setOpen(true)}>Create new API key</Button>
      </DialogTrigger>
      <DialogContent>
        {apiKey ? (
          <div>
            <div className="flex mb-4 pt-4">
              <Input
                type="text"
                value={apiKey}
                className="flex-grow mr-2"
                aria-label="String to copy"
              />
              <Button
                onClick={() => {
                  navigator.clipboard.writeText(apiKey);
                  toast.success("API key copied to clipboard");
                  setCopied(true);
                }}
                variant="outline"
                className="min-w-[100px]"
              >
                {copied ? (
                  <>
                    <Check className="mr-2 h-4 w-4" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="mr-2 h-4 w-4" />
                    Copy
                  </>
                )}
              </Button>
            </div>
            <p className="text-sm text-gray-600 italic">
              Save this string somewhere safe, you will see it only once
            </p>
          </div>
        ) : (
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-full space-y-6"
              ref={ref}
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Key name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your key name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={loading}>
                {loading ? (
                  <>
                    <Loader className="h-4 w-4 animate-spin" />
                  </>
                ) : (
                  <>Submit</>
                )}
              </Button>
            </form>
          </Form>
        )}
      </DialogContent>
    </Dialog>
  );
}
