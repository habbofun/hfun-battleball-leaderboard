import type { NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

import bcrypt from 'bcryptjs';
import { nanoid } from 'nanoid';

import db from '@/lib/db';
import { sendEmailVerification } from '@/lib/mail';
import { loginSchema } from '@/lib/zod';

export const config = {
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        const { data, success } = loginSchema.safeParse(credentials);

        if (!success) {
          throw new Error('Invalid credentials');
        }

        const user = await db.user.findUnique({
          where: {
            email: data.email,
          },
        });

        if (!user || !user.password) {
          throw new Error('User not found');
        }

        const isValidPassword = await bcrypt.compare(
          data.password,
          user.password,
        );

        if (!isValidPassword) {
          throw new Error('Invalid password');
        }

        if (!user.emailVerified) {
          if (!user.email) {
            throw new Error('User email not found');
          }

          const verifyTokenExists = await db.verificationToken.findFirst({
            where: {
              identifier: user.email,
            },
          });

          if (verifyTokenExists?.identifier) {
            await db.verificationToken.delete({
              where: {
                identifier: user.email,
              },
            });
          }

          const token = nanoid();

          await db.verificationToken.create({
            data: {
              identifier: user.email,
              token,
              expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
            },
          });

          // enviar email de verificación
          await sendEmailVerification(user.email, token);

          throw new Error('Please check your email for verification');
        }

        return user;
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.role = user.role;
      }
      return token;
    },
    session({ session, token }) {
      if (session.user) {
        session.user.role = token.role;
      }
      return session;
    },
  },
  trustHost: true,
  pages: {
    signIn: '/login',
    signOut: '/logout',
    error: '/error',
  },
} satisfies NextAuthConfig;
