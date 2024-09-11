import { object, string, z } from 'zod';

export const registerSchema = object({
  username: string({ required_error: 'Name is required' })
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

export type RegisterSchema = z.infer<typeof registerSchema>;

export const loginSchema = object({
  email: string({ required_error: 'Email is required' })
    .min(1, 'Email is required')
    .email('Invalid email'),
  password: string({ required_error: 'Password is required' })
    .min(1, 'Password is required')
    .min(6, 'Password must be more than 6 characters')
    .max(32, 'Password must be less than 32 characters'),
});

export type LoginSchema = z.infer<typeof loginSchema>;
