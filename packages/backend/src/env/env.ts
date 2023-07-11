import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z.union([
    z.literal('local'),
    z.literal('develop'),
    z.literal('production'),
  ]),
});

const rawEnv = envSchema.parse(process.env);

export const env = {
  ...rawEnv,
  isLocal: rawEnv.NODE_ENV === 'local',
};
