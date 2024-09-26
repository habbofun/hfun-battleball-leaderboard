'use client';

import { useEffect } from 'react';

import { TeamGroup } from '@/components/habbo/team/list/team-group';
import { TeamListSkeleton } from '@/components/habbo/team/list/team-list-skeleton';
import { useTeamStore } from '@/store/team';

export const TeamList = () => {
  const { teamList, fetchTeamMembers, loading } = useTeamStore();

  useEffect(() => {
    fetchTeamMembers();
  }, [fetchTeamMembers]);

  if (loading) return <TeamListSkeleton />;
  if (teamList.length === 0)
    return (
      <div className="text-center text-muted-foreground">
        No team members found
      </div>
    );

  return (
    <div className="space-y-8">
      {teamList.map(([role, members]) => (
        <TeamGroup key={role} role={role} members={members} />
      ))}
    </div>
  );
};
