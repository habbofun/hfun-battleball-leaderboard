import { NextResponse } from 'next/server';

import { updateAllHobbaData } from '@/server/actions/habbo/hobba/manage-hobba';

export async function GET(request: Request) {
  const authHeader = request.headers.get('authorization');

  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response('Unauthorized', {
      status: 401,
    });
  }

  try {
    const result = await updateAllHobbaData();

    console.log('Hobba data updated:', result);
    return NextResponse.json(result);
  } catch (error) {
    console.error('Error updating hobba data:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 },
    );
  }
}

export const maxDuration = 300; // 5 minutes
