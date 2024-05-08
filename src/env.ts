import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
  emptyStringAsUndefined: false,
  isServer: typeof window === 'undefined',
  skipValidation: true,
  server: {
    SECRET_TOKEN: z.string().min(1),
  },
  client: {
    NEXT_PUBLIC_ACCESS_TOKEN: z.string().min(1),
  },
  experimental__runtimeEnv: {
    NEXT_PUBLIC_ACCESS_TOKEN: process.env.NEXT_PUBLIC_ACCESS_TOKEN,
  },
});
