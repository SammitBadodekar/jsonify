import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { db } from "@/db";
import { apiKeysTable } from "@/db/schema";
import { getCurrentSession } from "@/lib/session";
import { eq } from "drizzle-orm";
import { Trash2 } from "lucide-react";
import ApiKeyForm from "./api-key-form";
import { deleteApiKey } from "@/app/actions";

const getAPIKeys = async () => {
  try {
    const { user } = await getCurrentSession();
    const apiKeys = await db
      .select()
      .from(apiKeysTable)
      .where(eq(apiKeysTable.userId, user?.id!));
    return apiKeys;
  } catch (error) {
    console.error(error);
    return [];
  }
};

const ApiKeys = async () => {
  const keys = await getAPIKeys();

  const getFormattedDate = (date: Date) => {
    return new Date(date).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "2-digit",
    });
  };
  return (
    <div>
      <Table>
        <TableCaption>
          {keys.length > 0
            ? "A list of your API keys"
            : "you don't have any API keys"}
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Name</TableHead>
            <TableHead>Created at</TableHead>
            <TableHead>Last used</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {keys.map((key) => (
            <TableRow key={key.id}>
              <TableCell className="font-medium">{key.name}</TableCell>
              <TableCell>{getFormattedDate(key.createdAt)}</TableCell>
              <TableCell>{getFormattedDate(key.updatedAt)}</TableCell>
              <TableCell align="right">
                <form action={deleteApiKey}>
                  <input type="hidden" name="id" value={key.id} />
                  <Button variant="destructive" size="sm">
                    Delete <Trash2 />
                  </Button>
                </form>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <ApiKeyForm />
    </div>
  );
};

export default ApiKeys;
