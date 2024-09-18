import { redirect } from 'next/navigation';
import type { NextRequest} from 'next/server';
import { NextResponse } from 'next/server';

import { verifyPasswordReset } from '@/data/password';

export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get('token');

  if (!token) {
    return NextResponse.json(
      { success: false, message: 'Token not found' },
      { status: 400 },
    );
  }

  try {
    const result = await verifyPasswordReset(token);

    if (!result.success) {
      return NextResponse.json(
        { success: false, message: result.message },
        { status: 400 },
      );
    }
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Invalid token' },
      { status: 400 },
    );
  } finally {
    return redirect('/');
  }
}
