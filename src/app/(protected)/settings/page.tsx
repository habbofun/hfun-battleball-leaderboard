'use client';

import { useState } from 'react';

import HabboOnboarding from '@/components/auth/habbo/link-account';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useCurrentUser } from '@/hooks/use-current-user';

export default function SettingsPage() {
  const user = useCurrentUser();
  const [name, setName] = useState(user?.name || '');
  const [isTwoFactorEnabled, setIsTwoFactorEnabled] = useState(
    user?.isTwoFactorEnabled || false,
  );
  const [avatarUrl, setAvatarUrl] = useState(user?.image || '');

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <p>You are not logged in</p>
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement profile update logic here
    console.log('Profile updated:', { name, isTwoFactorEnabled });
  };

  const handleDeleteAccount = () => {
    // TODO: Implement account deletion logic here
    console.log('Account deleted');
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex justify-center p-4 mt-8">
      <div className="w-full max-w-4xl flex gap-4">
        <div className="flex-1 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Profile Settings</CardTitle>
              <CardDescription>
                Manage your account settings and preferences.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex items-center space-x-4">
                  <Avatar className="h-20 w-20">
                    <AvatarImage src={avatarUrl} alt={name} />
                    <AvatarFallback>{name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <Label htmlFor="avatar">Change Avatar</Label>
                    <Input
                      id="avatar"
                      type="file"
                      accept="image/*"
                      onChange={handleAvatarChange}
                      className="mt-1"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    value={user?.email || ''}
                    disabled
                    className="bg-muted"
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="two-factor"
                    checked={isTwoFactorEnabled}
                    onCheckedChange={setIsTwoFactorEnabled}
                  />
                  <Label htmlFor="two-factor">
                    Enable Two-Factor Authentication
                  </Label>
                </div>
              </form>
            </CardContent>
            <CardFooter>
              <div className="flex justify-between w-full">
                <Button type="submit" disabled>
                  Update Profile
                </Button>
                <Button
                  variant="destructive"
                  onClick={handleDeleteAccount}
                  disabled
                >
                  Delete Account
                </Button>
              </div>
            </CardFooter>
          </Card>
        </div>

        <div className="w-64">
          <HabboOnboarding email={user?.email || ''} />
        </div>
      </div>
    </div>
  );
}
