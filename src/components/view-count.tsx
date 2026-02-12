import { headers } from "next/headers";
import { Redis } from "@upstash/redis";
import { EyeIcon } from "lucide-react";

const redis = Redis.fromEnv();

type ViewCountProps = {
  slug: string;
  readTime: number;
};

export default async function ViewCount({ slug, readTime }: ViewCountProps) {
  const ip = (await headers()).get("x-forwarded-for") || "127.0.0.1";
  let count = await redis.incr(slug);

  if (await redis.exists(ip + slug)) {
    count = await redis.decr(slug);
  } else {
    await redis.set(ip + slug, "true", {
      ex: readTime * 60,
    });
  }

  return (
    <span className="flex items-center">
      <EyeIcon className="mr-2 h-4 w-4" />
      {count} VIEWS
    </span>
  );
}
