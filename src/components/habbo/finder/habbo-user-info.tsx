'use client';

import { useState } from 'react';

import { toast } from 'sonner';

import { BadgeList } from '@/components/habbo/finder/badge-list';
import { LoadingSkeleton } from '@/components/habbo/finder/loading-skeleton';
import { SearchBar } from '@/components/habbo/finder/search-bar';
import { UserProfile } from '@/components/habbo/finder/user-profile';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { HabboUserInfo as HabboUserInfoType } from '@/types/habbo';

export function HabboUserInfo() {
  const [userInfo, setUserInfo] = useState<HabboUserInfoType | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchUserInfo = async (username: string) => {
    setLoading(true);
    setUserInfo(null);
    try {
      const response = await fetch(`/api/habbo/user-info?username=${username}`);
      if (!response.ok) {
        throw new Error(
          response.status === 404
            ? 'User not found'
            : 'Failed to fetch user info',
        );
      }
      const data: HabboUserInfoType = await response.json();
      setUserInfo(data);
      toast.success('User info fetched successfully');
    } catch (err) {
      toast.error(
        err instanceof Error
          ? err.message
          : 'Failed to fetch user info. Please try again.',
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Habbo Finder</CardTitle>
      </CardHeader>
      <CardContent>
        <SearchBar onSearch={fetchUserInfo} loading={loading} />
        {loading && <LoadingSkeleton />}
        {userInfo && (
          <div className="mt-8 space-y-8">
            <UserProfile userInfo={userInfo} />
            {userInfo.selectedBadges.length > 0 && (
              <BadgeList badges={userInfo.selectedBadges} />
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default HabboUserInfo;
