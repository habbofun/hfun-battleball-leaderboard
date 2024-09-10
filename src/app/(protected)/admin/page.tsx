'use client';

import { Role } from '@prisma/client';
import { Shield } from 'lucide-react';

import { RoleGate } from '@/components/auth/role-gate/role-gate';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const AdminPage = () => {
  return (
    <div className="container mx-auto p-6 min-h-screen flex items-center justify-center bg-background">
      <RoleGate allowedRoles={Role.admin}>
        <Card className="w-full max-w-2xl">
          <CardHeader>
            <CardTitle className="text-2xl font-bold flex items-center">
              <Shield className="mr-2 h-6 w-6" />
              Admin Page
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-6">
              Welcome to the admin page. This area is restricted to
              administrators only.
            </p>
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Quick Actions</h2>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>Manage user accounts</li>
                <li>View system logs</li>
                <li>Update site settings</li>
                <li>Generate reports</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </RoleGate>
    </div>
  );
};

export default AdminPage;
