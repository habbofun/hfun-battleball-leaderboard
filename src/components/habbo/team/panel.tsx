import { RoleGate } from '@/components/auth/role-gate/role-gate';
import { AddTeamMemberForm } from '@/components/habbo/team/admin/add-team-member-form';
import { DeleteTeamMemberForm } from '@/components/habbo/team/admin/delete-team-member-form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const TeamAdminPanel = () => {
  return (
    <div className="container mx-auto mt-8 max-w-4xl">
      <Card>
        <CardHeader>
          <CardTitle>Team Management</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <RoleGate allowedRole="admin">
            <AddTeamMemberForm />
            <DeleteTeamMemberForm />
          </RoleGate>
        </CardContent>
      </Card>
    </div>
  );
};
