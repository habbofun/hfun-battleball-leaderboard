
import { decodeHex } from 'oslo/encoding';
import { TOTPController } from 'oslo/otp';

import db from '@/lib/db';
import { lucia } from '@/server/lucia';

export const validateTwoFactor = async (sessionId: string, otp: string) => {
    const { user } = await lucia.validateSession(sessionId);

    if (!user) {
        return {
            success: false,
            error: 'User not found',
        };
    }

    const result = await db.user.findUnique({
        where: {
            id: user.id,
        },
    });

    if (!result || !result.twoFactorToken) {
        return {
            success: false,
            error: 'User not found',
        };
    }

    const totp = new TOTPController().verify(
        otp,
        decodeHex(result.twoFactorToken),
    );

    if (!totp) {
        return {
            success: false,
            error: 'Invalid code',
        };
    }

    return {
        success: true,
    };
};