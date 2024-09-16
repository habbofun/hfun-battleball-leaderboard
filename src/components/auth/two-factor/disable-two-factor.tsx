import { TwoFactorVerify } from './two-factor-verify';

interface DisableTwoFactorProps {
  sessionId: string;
}

export function DisableTwoFactor({ sessionId }: DisableTwoFactorProps) {
  return (
    <div className="flex justify-center">
      <TwoFactorVerify sessionId={sessionId} action="disable" />
    </div>
  );
}
