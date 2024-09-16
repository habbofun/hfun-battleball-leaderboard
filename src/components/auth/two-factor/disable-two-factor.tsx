import { TwoFactorVerify } from './two-factor-verify';

interface DisableTwoFactorProps {
  sessionId: string;
}

export function DisableTwoFactor({ sessionId }: DisableTwoFactorProps) {
  return <TwoFactorVerify sessionId={sessionId} action="disable" />;
}
