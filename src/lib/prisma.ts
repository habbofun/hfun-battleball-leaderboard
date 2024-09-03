import { PrismaClient } from '@prisma/client';
import 'server-only';

const client = new PrismaClient();

const globalForPrisma = global as unknown as {
  prisma: typeof client;
};

export const prisma = globalForPrisma.prisma || client;

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export default prisma;
