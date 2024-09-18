import Image from 'next/image';

import type { Hobba } from '@prisma/client';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

export const HobbaCard = ({ hobba }: { hobba: Hobba }) => (
  <Card className="flex flex-col h-full">
    <CardContent className="flex flex-col items-center p-4 h-full">
      <h3 className="font-bold text-center mb-2">{hobba.name}</h3>
      <div className="relative w-24 h-24 mb-2">
        <Image
          src={hobba.imageUrl}
          alt={hobba.name}
          fill
          sizes="96px"
          style={{ objectFit: 'contain' }}
          quality={90}
          priority
        />
      </div>
      <Badge
        variant="outline"
        className={`mb-2 ${
          hobba.hobbaGroup === 'GOLD'
            ? 'bg-yellow-100 text-yellow-800 border-yellow-300'
            : 'bg-gray-100 text-gray-800 border-gray-300'
        }`}
      >
        {hobba.hobbaGroup}
      </Badge>
      <div className="w-full text-xs text-muted-foreground mt-auto">
        <p className="flex justify-between">
          <span>Last Seen:</span>
          <span>{new Date(hobba.lastOnline).toLocaleDateString()}</span>
        </p>
        <p className="flex justify-between">
          <span>Registered:</span>
          <span>{new Date(hobba.accountCreatedAt).toLocaleDateString()}</span>
        </p>
      </div>
    </CardContent>
  </Card>
);
