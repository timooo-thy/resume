import { headers } from "next/headers";
import Ping from "./ping";
import { Redis } from "@upstash/redis";

const redis = Redis.fromEnv();

type ViewCountProps = {
  slug: string;
};

export default async function ViewCount({ slug }: ViewCountProps) {
  const ip = (await headers()).get("x-forwarded-for") || "127.0.0.1";
  let count = await redis.incr(slug);

  if (await redis.exists(ip)) {
    count = await redis.decr(slug);
  } else {
    await redis.set(ip, "true", {
      ex: 60,
    });
  }

  return (
    <div className="bg-orange-400/90 px-2.5 py-0.5 rounded-lg">
      <Ping />
      <p className="text-sm text-white">
        <span className="font-bold">Views: {count}</span>
      </p>
    </div>
  );
}
