'use client';

import { useState } from 'react';

import { toast } from 'sonner';

import { ConfirmationAlert } from '@/components/confirmation/confirmation-alert';
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
import { removeTeamMember } from '@/server/actions/habbo/team/manage';

export const DeleteTeamMemberForm = () => {
  const [username, setUsername] = useState('');

  const handleDeleteTeamMember = async () => {
    const result = await removeTeamMember(username);

    if (!result.success) {
      toast.error(result.error);
      return;
    }

    setUsername('');
    toast.success('Team member deleted successfully');
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Delete Team Member</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="delete-username">Username</Label>
          <Input
            id="delete-username"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <p className="text-sm text-muted-foreground">
            Enter the Habbo username of the team member to be removed
          </p>
        </div>
      </CardContent>
      <CardFooter>
        <ConfirmationAlert
          message={`Are you sure you want to delete the team member "${username}"?`}
          onConfirm={handleDeleteTeamMember}
          trigger={
            <Button variant="destructive" className="w-full">
              Delete Team Member
            </Button>
          }
        />
      </CardFooter>
    </Card>
  );
};
