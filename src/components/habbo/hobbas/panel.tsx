import Link from 'next/link';

import { RoleGate } from '@/components/auth/role-gate/role-gate';
import { AddHobbaForm } from '@/components/habbo/hobbas/admin/add-hobba-form';
import { DeleteHobbaForm } from '@/components/habbo/hobbas/admin/delete-hobba-form';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const HobbasAdminPanel = () => {
  return (
    <div className="container mx-auto mt-8 max-w-4xl">
      <div className="mb-6 flex justify-between items-center">
        <Link href="/hobbas">
          <Button variant="outline">Back to Hobbas</Button>
        </Link>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Hobba Management</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <RoleGate allowedRole="admin">
            <AddHobbaForm />
            <DeleteHobbaForm />
          </RoleGate>
        </CardContent>
      </Card>
    </div>
  );
};
