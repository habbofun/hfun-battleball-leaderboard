'use client';

import { useState } from 'react';

import Image from 'next/image';

import { toast } from 'sonner';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { HabboUserInfo as HabboUserInfoType } from '@/types/habbo';

export function HabboUserInfo() {
  const [username, setUsername] = useState('');
  const [userInfo, setUserInfo] = useState<HabboUserInfoType | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchUserInfo = async () => {
    setLoading(true);
    setUserInfo(null);
    try {
      const response = await fetch(`/api/habbo/user-info?username=${username}`);
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('User not found');
        }
        throw new Error('Failed to fetch user info');
      }
      const data: HabboUserInfoType = await response.json();
      setUserInfo(data);
      toast.success('User info fetched successfully');
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Failed to fetch user info. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 w-full max-w-2xl">
      <div className="flex space-x-2">
        <Input
          type="text"
          placeholder="Enter Habbo username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="flex-grow"
        />
        <Button onClick={fetchUserInfo} disabled={loading}>
          {loading ? 'Loading...' : 'Search'}
        </Button>
      </div>
      {userInfo && (
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl">{userInfo.name}</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6">
              <div className="md:w-1/3">
                <Image
                  src={`https://www.habbo.es/habbo-imaging/avatarimage?&figure=${userInfo.figureString}&size=l`}
                  alt={userInfo.name}
                  width={128}
                  height={220}
                  className="object-contain mx-auto"
                />
              </div>
              <div className="md:w-2/3 space-y-3">
                <p className="text-lg font-semibold">{userInfo.motto}</p>
                <div className="grid grid-cols-2 gap-2">
                  <StatusBadge label="Online" status={userInfo.online} />
                  <StatusBadge label="Profile Visible" status={userInfo.profileVisible} />
                </div>
                <InfoItem label="Last Access" value={formatDate(userInfo.lastAccessTime)} />
                <InfoItem label="Member Since" value={formatDate(userInfo.memberSince)} />
                <InfoItem label="Level" value={userInfo.currentLevel.toString()} />
                <InfoItem label="Total Experience" value={userInfo.totalExperience.toString()} />
                <InfoItem label="Star Gem Count" value={userInfo.starGemCount.toString()} />
                <div className="mt-2">
                  <label className="text-sm text-slate-500">Level Progress</label>
                  <div className="w-full bg-slate-200 rounded-full h-2.5">
                    <div
                      className="bg-green-600 h-2.5 rounded-full"
                      style={{
                        width: `${userInfo.currentLevelCompletePercent}%`,
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
            {userInfo.selectedBadges.length > 0 && (
              <div className="mt-6">
                <h4 className="font-semibold text-lg mb-2">Badges:</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {userInfo.selectedBadges.map((badge) => (
                    <Badge key={badge.badgeIndex} variant="secondary" className="p-2">
                      {badge.name} - {badge.description}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}

function StatusBadge({ label, status }: { label: string; status: boolean }) {
  return (
    <div className={`flex items-center space-x-2 p-2 rounded-md ${status ? 'bg-green-100' : 'bg-red-100'}`}>
      <div className={`w-3 h-3 rounded-full ${status ? 'bg-green-500' : 'bg-red-500'}`}></div>
      <span className="text-sm font-medium text-slate-500">
        {label}: {status ? 'Yes' : 'No'}
      </span>
    </div>
  );
}

function InfoItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <label className="text-sm text-slate-500">{label}</label>
      <p className="font-medium">{value}</p>
    </div>
  );
}

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}
