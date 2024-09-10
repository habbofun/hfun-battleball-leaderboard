'use server';

import { AuthError } from 'next-auth';

import { z } from 'zod';

import { checkExistingUser } from '@/data/check-existing-user';
import { registerSchema } from '@/schemas';
import { createUser } from '@/server/actions/auth/register/create-user';
import { validateRegistrationData } from '@/server/actions/auth/register/validate-registration-data';
import { signIn } from '@/server/auth';

export const registerAction = async (
  formData: z.infer<typeof registerSchema>,
) => {
  try {
    const validationResult = await validateRegistrationData(formData);
    if ('error' in validationResult) return validationResult;

    const { data } = validationResult;

    const existingUserCheck = await checkExistingUser(data.email);
    if ('error' in existingUserCheck) return existingUserCheck;

    await createUser(data.email, data.password, data.name);

    await signIn('credentials', {
      email: data.email,
      password: data.password,
      redirect: false,
    });

    return { success: true };
  } catch (error) {
    if (error instanceof AuthError) {
      return { error: error.cause?.err?.message };
    }
    return { error: 'Something went wrong - 500' };
  }
};
