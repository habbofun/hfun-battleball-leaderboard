import type { Hobba } from '@prisma/client';

import db from '@/lib/db';

export async function getHobba(
  username: string,
): Promise<{ success: boolean; data?: Hobba; message?: string }> {
  const dbHobba = await db.hobba.findFirst({
    where: { name: username },
  });

  if (!dbHobba) {
    return { success: false, message: 'Hobba not found' };
  }

  const hobba = {
    id: dbHobba.id,
    name: dbHobba.name,
    imageUrl: dbHobba.imageUrl,
    hobbaGroup: dbHobba.hobbaGroup,
    lastOnline: dbHobba.lastOnline,
    accountCreatedAt: dbHobba.accountCreatedAt,
    updatedAt: dbHobba.updatedAt,
  };

  return { success: true, data: hobba };
}

export async function getAllHobbas(): Promise<{
  success: boolean;
  data?: Hobba[];
  message?: string;
}> {
  const dbHobbas = await db.hobba.findMany();

  if (!dbHobbas || dbHobbas.length === 0) {
    return { success: false, message: 'No hobbas found' };
  }

  const hobbas = dbHobbas.map((hobba) => ({
    id: hobba.id,
    name: hobba.name,
    imageUrl: hobba.imageUrl,
    hobbaGroup: hobba.hobbaGroup,
    lastOnline: hobba.lastOnline,
    accountCreatedAt: hobba.accountCreatedAt,
    updatedAt: hobba.updatedAt,
  }));

  return { success: true, data: hobbas };
}
