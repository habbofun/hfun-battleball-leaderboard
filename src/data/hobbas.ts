import { NextResponse } from 'next/server';

import db from '@/lib/db';

export async function getHobba(username: string) {
  const dbHobba = await db.hobba.findFirst({
    where: { name: username },
  });

  if (!dbHobba) {
    return NextResponse.json(
      { success: false, message: 'Hobba not found' },
      { status: 404 },
    );
  }

  const hobba = {
    id: dbHobba.id,
    name: dbHobba.name,
    imageUrl: dbHobba.imageUrl,
    hobbaGroup: dbHobba.hobbaGroup,
    lastOnline: dbHobba.lastOnline,
    accountCreatedAt: dbHobba.accountCreatedAt,
  };

  return NextResponse.json({ success: true, data: hobba }, { status: 200 });
}

export async function getAllHobbas() {
  const dbHobbas = await db.hobba.findMany();

  if (!dbHobbas || dbHobbas.length === 0) {
    return NextResponse.json(
      { success: false, message: 'No hobbas found' },
      { status: 404 },
    );
  }

  const hobbas = dbHobbas.map((hobba) => ({
    id: hobba.id,
    name: hobba.name,
    imageUrl: hobba.imageUrl,
    hobbaGroup: hobba.hobbaGroup,
    lastOnline: hobba.lastOnline,
    accountCreatedAt: hobba.accountCreatedAt,
  }));

  return NextResponse.json({ success: true, data: hobbas }, { status: 200 });
}
