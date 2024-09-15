import Image from 'next/image';

import { CheckCircle, Copy } from 'lucide-react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface Step1QRCodeProps {
  token: string;
  qrCode: string;
  onNext: () => void;
}

export function Step1QRCode({ token, qrCode, onNext }: Step1QRCodeProps) {
  const copyToClipboard = (text: string) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        toast.success('Token copied to clipboard');
      })
      .catch((err) => {
        console.error('Failed to copy: ', err);
        toast.error('Failed to copy token');
      });
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-lg font-semibold mb-2">Scan QR Code</h3>
        <p className="text-sm">
          Use your authenticator app to scan the QR code or enter the token
          manually.
        </p>
      </div>
      <div className="p-4 rounded-lg flex items-center justify-center">
        {qrCode ? (
          <Image
            src={qrCode}
            alt="QR Code"
            width={200}
            height={200}
            className="rounded-md"
          />
        ) : (
          <p>Loading QR Code...</p>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="token" className="text-sm font-medium">
          Manual entry token
        </Label>
        <div className="flex items-center space-x-2">
          <Input id="token" value={token} readOnly className="font-mono" />
          <Button
            size="icon"
            variant="outline"
            onClick={() => copyToClipboard(token)}
            title="Copy token"
          >
            <Copy className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <Button
        onClick={onNext}
        className="w-full bg-primary hover:bg-primary-dark transition-colors"
      >
        <CheckCircle className="mr-2 h-4 w-4" />
        I&apos;ve added the token
      </Button>
    </div>
  );
}
