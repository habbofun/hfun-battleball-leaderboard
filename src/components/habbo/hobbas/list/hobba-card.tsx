import Image from 'next/image';

import type { Hobba } from '@prisma/client';
import { CircleIcon } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(date);
};

export const HobbaCard = ({ hobba }: { hobba: Hobba }) => {
  const isOnline =
    new Date(hobba.lastOnline).getTime() > Date.now() - 5 * 60 * 1000; // Consider online if last seen within 5 minutes

  return (
    <Card className="flex flex-col h-full relative shadow-md hover:shadow-lg transition-shadow duration-300">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <CircleIcon
              className={`absolute top-2 right-2 h-3 w-3 ${
                isOnline ? 'text-green-500' : 'text-gray-400'
              }`}
            />
          </TooltipTrigger>
          <TooltipContent>
            <p>{isOnline ? 'Online' : 'Offline'}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
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
        <Separator className="w-full my-2" />
        <div className="w-full text-xs text-muted-foreground mt-auto">
          <p className="flex justify-between">
            <span>Last Seen:</span>
            <span>{formatDate(new Date(hobba.lastOnline))}</span>
          </p>
          <p className="flex justify-between">
            <span>Registered:</span>
            <span>{formatDate(new Date(hobba.accountCreatedAt))}</span>
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
