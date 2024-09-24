import Link from 'next/link';

import { ChevronLeft } from 'lucide-react';

import { Button } from '@/components/ui/button';

interface BackButtonProps {
  href: string;
  text: string;
}

export function BackButton({ href, text }: BackButtonProps) {
  return (
    <Link href={href} passHref>
      <Button variant="outline" className="mb-4">
        <ChevronLeft className="mr-2 h-4 w-4" />
        Back to {text}
      </Button>
    </Link>
  );
}
