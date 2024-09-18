'use client';

import { useState } from 'react';

import { HobbaGroup } from '@prisma/client';
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
import { addHobbaMember } from '@/server/actions/habbo/hobba/manage';

export const AddHobbaForm = () => {
  const [username, setUsername] = useState('');
  const [group, setGroup] = useState<HobbaGroup>(HobbaGroup.SILVER);

  const handleAddHobba = async () => {
    const result = await addHobbaMember(username, group);

    if (!result.success) {
      toast.error(result.error);
      return;
    }

    setUsername('');
    setGroup(HobbaGroup.SILVER);
    toast.success('Hobba added successfully');
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add Hobba</CardTitle>
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
            Enter the Habbo username of the new Hobba
          </p>
        </div>
        <div className="space-y-2">
          <Label htmlFor="add-group">Group</Label>
          <Select
            value={group}
            onValueChange={(value) => setGroup(value as HobbaGroup)}
          >
            <SelectTrigger id="add-group">
              <SelectValue placeholder="Select group" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={HobbaGroup.GOLD}>Gold</SelectItem>
              <SelectItem value={HobbaGroup.SILVER}>Silver</SelectItem>
            </SelectContent>
          </Select>
          <p className="text-sm text-muted-foreground">
            Choose the Hobba group for the new member
          </p>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={handleAddHobba} className="w-full">
          Add Hobba
        </Button>
      </CardFooter>
    </Card>
  );
};
