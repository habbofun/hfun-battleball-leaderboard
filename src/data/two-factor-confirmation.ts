import db from '@/lib/db';

export const getTwoFactorConfirmation = async (userId: string) => {
  try {
    const twoFactorConfirmation = await db.twoFactorConfirmation.findUnique({
      where: {
        userId,
      },
    });

    return twoFactorConfirmation;
  } catch {
    return null;
  }
};
