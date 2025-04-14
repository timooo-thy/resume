import { headers } from "next/headers";
import Ping from "./ping";
import { Redis } from "@upstash/redis";

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
    <div className="bg-primary/80 px-2.5 py-0.5 rounded-lg">
      <Ping />
      <p className="text-white text-sm md:text-base">
        <span className="font-bold">Views: {count}</span>
      </p>
    </div>
  );
}
