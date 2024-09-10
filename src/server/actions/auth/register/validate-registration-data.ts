'use server';

import { z } from 'zod';

import { registerSchema } from '@/schemas';

export async function validateRegistrationData(
  formData: z.infer<typeof registerSchema>,
) {
  const result = registerSchema.safeParse(formData);
  if (!result.success) {
    return { error: 'Invalid data' };
  }
  return { data: result.data, success: true };
}
