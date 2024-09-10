import { z } from 'zod';
import { object, string } from 'zod';

export const loginSchema = object({
  email: string({ required_error: 'Email is required' })
    .min(1, 'Email is required')
    .email('Invalid email'),
  password: string({ required_error: 'Password is required' })
    .min(1, 'Password is required')
    .min(6, 'Password must be more than 6 characters')
    .max(32, 'Password must be less than 32 characters'),
  code: z.optional(string()),
});

export const registerSchema = object({
  name: string({ required_error: 'Name is required' })
    .min(3, 'Name must be more than 3 characters')
    .max(32, 'Name must be less than 32 characters'),
  email: string({ required_error: 'Email is required' })
    .min(1, 'Email is required')
    .email('Invalid email'),
  password: string({ required_error: 'Password is required' })
    .min(1, 'Password is required')
    .min(6, 'Password must be more than 6 characters')
    .max(32, 'Password must be less than 32 characters'),
  confirmPassword: string({ required_error: 'Confirm password is required' })
    .min(1, 'Confirm password is required')
    .min(6, 'Confirm password must be more than 6 characters')
    .max(32, 'Confirm password must be less than 32 characters'),
});

export const resetPasswordSchema = object({
  email: string({ required_error: 'Email is required' })
    .min(1, 'Email is required')
    .email('Invalid email'),
});

export const newPasswordSchema = object({
  password: string({ required_error: 'Password is required' })
    .min(1, 'Password is required')
    .min(6, 'Password must be more than 6 characters')
    .max(32, 'Password must be less than 32 characters'),
  confirmPassword: string({ required_error: 'Confirm password is required' })
    .min(1, 'Confirm password is required')
    .min(6, 'Confirm password must be more than 6 characters')
    .max(32, 'Confirm password must be less than 32 characters'),
});
