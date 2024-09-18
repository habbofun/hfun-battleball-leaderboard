'use client';

import { useState } from 'react';

import { toast } from 'sonner';

import { BadgeList } from '@/components/habbo/finder/badge-list';
import { LoadingSkeleton } from '@/components/habbo/finder/loading-skeleton';
import { SearchBar } from '@/components/habbo/finder/search-bar';
import { UserProfile } from '@/components/habbo/finder/user-profile';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { fetchHabboUserInfo } from '@/server/actions/habbo/user/fetch-user-data';
import type { HabboUserInfo as HabboUserInfoType } from '@/types/habbo';

export function HabboUserInfo() {
  const [userInfo, setUserInfo] = useState<HabboUserInfoType | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (username: string) => {
    setLoading(true);
    setUserInfo(null);

    const result = await fetchHabboUserInfo(username);

    setLoading(false);

    if (result.error) {
      toast.error(result.error);
    } else if (result.data) {
      setUserInfo(result.data);
      toast.success('User info fetched successfully');
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Habbo Finder</CardTitle>
      </CardHeader>
      <CardContent>
        <SearchBar onSearch={handleSearch} loading={loading} />
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
