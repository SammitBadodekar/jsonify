import { redis } from "@/lib/redis";
import { getCurrentSession } from "@/lib/session";
import { Progress } from "@/components/ui/progress";

export const dynamic = "force-dynamic";

export default async function UsagePage() {
  const { user } = await getCurrentSession();

  const usage: string | null = await redis.get(`usage:${user?.googleId}`);
  console.log("user", user, usage);
  return (
    <div className="flex flex-col gap-4 p-4">
      <div>
        <h2 className="text-xl font-bold">Usage</h2>
        <p className="text-sm text-gray-600 italic">
          Usage of your API keys in last 24 hours
        </p>
      </div>
      <div className="w-1/2">
        <Progress value={parseInt(usage || "1")} max={100} className="h-3" />
        <p className="text-sm text-gray-600">{usage ?? 0}/100</p>
      </div>
    </div>
  );
}
