'use client';

import { useState } from 'react';

import { TeamRole } from '@prisma/client';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { addTeamMember } from '@/server/actions/habbo/team/manage';

export const AddTeamMemberForm = () => {
  const [username, setUsername] = useState('');
  const [role, setRole] = useState<TeamRole>(TeamRole.DEVELOPER);

  const handleAddTeamMember = async () => {
    const result = await addTeamMember(username, role);

    if (!result.success) {
      toast.error(result.error);
      return;
    }

    setUsername('');
    setRole(TeamRole.DEVELOPER);
    toast.success('Team member added successfully');
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add Team Member</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="add-username">Username</Label>
          <Input
            id="add-username"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <p className="text-sm text-muted-foreground">
            Enter the Habbo username of the new team member
          </p>
        </div>
        <div className="space-y-2">
          <Label htmlFor="add-role">Role</Label>
          <Select
            value={role}
            onValueChange={(value) => setRole(value as TeamRole)}
          >
            <SelectTrigger id="add-role">
              <SelectValue placeholder="Select role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={TeamRole.ADMIN}>Admin</SelectItem>
              <SelectItem value={TeamRole.DEVELOPER}>Developer</SelectItem>
              <SelectItem value={TeamRole.DESIGNER}>Designer</SelectItem>
              <SelectItem value={TeamRole.HEADWRITER}>Head Writer</SelectItem>
              <SelectItem value={TeamRole.WRITER}>Writer</SelectItem>
            </SelectContent>
          </Select>
          <p className="text-sm text-muted-foreground">
            Choose the role for the new team member
          </p>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={handleAddTeamMember} className="w-full">
          Add Team Member
        </Button>
      </CardFooter>
    </Card>
  );
};
