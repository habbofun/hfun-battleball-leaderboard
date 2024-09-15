import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
  /*
   * Serverside Environment variables, not available on the client.
   * Will throw if you access these variables on the client.
   */
  server: {
    UPSTASH_REDIS_REST_URL: z.string().url(),
    UPSTASH_REDIS_REST_TOKEN: z.string().min(1),
    DATABASE_URL: z.string().url(),
    RESEND_KEY: z.string().min(1),
    JWT_SECRET: z.string().min(1),
    AUTH_URL: z.string().url(),
  },
  /*
   * Due to how Next.js bundles environment variables on Edge and Client,
   * we need to manually destructure them to make sure all are included in bundle.
   *
   * 💡 You'll get type errors if not all variables from `server` & `client` are included here.
   */
  runtimeEnv: {
    UPSTASH_REDIS_REST_URL: process.env.UPSTASH_REDIS_REST_URL,
    UPSTASH_REDIS_REST_TOKEN: process.env.UPSTASH_REDIS_REST_TOKEN,
    DATABASE_URL: process.env.DATABASE_URL,
    RESEND_KEY: process.env.RESEND_KEY,
    JWT_SECRET: process.env.JWT_SECRET,
    AUTH_URL: process.env.AUTH_URL,
  },
});
