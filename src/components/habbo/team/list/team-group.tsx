import type { TeamMember } from '@prisma/client';
import { UserIcon } from 'lucide-react';

import { TeamMemberCard } from '@/components/habbo/team/list/team-member-card';

interface TeamGroupProps {
  role: string;
  members: TeamMember[];
}

export const TeamGroup = ({ role, members }: TeamGroupProps) => (
  <div>
    <h2 className="text-xl font-bold mb-4 flex items-center">
      <UserIcon className="mr-2 w-5 h-5" />
      {role}
    </h2>
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
      {members.map((member) => (
        <TeamMemberCard key={member.id} member={member} />
      ))}
    </div>
  </div>
);
