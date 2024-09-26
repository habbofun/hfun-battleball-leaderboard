import Image from 'next/image';

import type { TeamMember } from '@prisma/client';
import { CircleIcon } from 'lucide-react';

import { Card3D } from '@/components/ui/3d-card';
import { Badge } from '@/components/ui/badge';
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

export const TeamMemberCard = ({ member }: { member: TeamMember }) => {
  const isOnline =
    new Date(member.lastOnline).getTime() > Date.now() - 5 * 60 * 1000;

  return (
    <Card3D className="w-full h-full" maxRotation={10} scale={1.02}>
      <div className="bg-card text-card-foreground rounded-lg border shadow-md hover:shadow-lg transition-shadow duration-300 h-full w-full flex flex-col items-center p-4">
        <div className="absolute top-2 right-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className={`relative ${isOnline ? 'animate-pulse' : ''}`}>
                  <CircleIcon
                    className={`h-3 w-3 ${
                      isOnline ? 'text-green-500' : 'text-gray-400'
                    }`}
                  />
                  {isOnline && (
                    <CircleIcon
                      className="h-3 w-3 text-green-500 absolute top-0 left-0 animate-ping"
                      style={{ animationDuration: '3s' }}
                    />
                  )}
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>{isOnline ? 'Online' : 'Offline'}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        <h3 className="font-bold text-center mb-4">{member.name}</h3>

        <div className="w-24 h-24 mb-4 relative">
          <Image
            src={member.imageUrl}
            alt={member.name}
            fill
            sizes="96px"
            style={{ objectFit: 'contain' }}
            quality={90}
            priority
          />
        </div>

        <div className="h-12 flex items-center justify-center mb-4">
          <p className="italic text-center text-sm text-muted-foreground px-2 w-full break-words">
            {member.motto && member.motto.trim() !== ''
              ? `"${member.motto}"`
              : 'User has no motto'}
          </p>
        </div>

        <Separator className="w-full mb-4" />

        <Badge variant="outline" className="mb-4">
          {member.role}
        </Badge>

        <div className="w-full text-xs text-muted-foreground mt-auto space-y-1">
          <p className="flex justify-between">
            <span>Last Seen:</span>
            <span>{formatDate(new Date(member.lastOnline))}</span>
          </p>
          <p className="flex justify-between">
            <span>Joined:</span>
            <span>{formatDate(new Date(member.accountCreatedAt))}</span>
          </p>
        </div>
      </div>
    </Card3D>
  );
};
