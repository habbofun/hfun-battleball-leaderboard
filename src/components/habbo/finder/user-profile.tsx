import React from 'react';
import { useState } from 'react';

import Image from 'next/image';

import {
  ClockIcon,
  GemIcon,
  StarIcon,
  TrendingUpIcon,
  UserIcon,
} from 'lucide-react';

import { InfoItem } from '@/components/habbo/finder/info-item';
import { ProgressBar } from '@/components/habbo/finder/progress-bar';
import { StatusBadge } from '@/components/habbo/finder/status-badge';
import { Progress } from '@/components/ui/progress';
import type { HabboUserInfo } from '@/types/habbo';

interface UserProfileProps {
  userInfo: HabboUserInfo;
}

export function UserProfile({ userInfo }: UserProfileProps) {
  const [imageError, setImageError] = useState(false);

  return (
    <div className="flex flex-col lg:flex-row items-center lg:items-start space-y-6 lg:space-y-0 lg:space-x-6">
      <div className="w-full lg:w-1/3 flex flex-col items-center">
        <div className="relative w-48 h-48 sm:w-64 sm:h-64">
          {!imageError ? (
            <Image
              src={`https://www.habbo.es/habbo-imaging/avatarimage?&figure=${userInfo.figureString}`}
              alt={userInfo.name}
              fill
              sizes="(max-width: 640px) 192px, (max-width: 1024px) 256px, 192px"
              style={{ objectFit: 'contain' }}
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-500">
              Image not available
            </div>
          )}
        </div>
        <h2 className="text-2xl font-bold mt-3 text-center">{userInfo.name}</h2>
        <p className="text-sm italic mt-1 text-center">
          &ldquo;{userInfo.motto}&rdquo;
        </p>
      </div>
      <div className="w-full lg:w-2/3 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <StatusBadge label="Online" status={userInfo.online} />
          <StatusBadge
            label="Profile Visible"
            status={userInfo.profileVisible}
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <InfoItem
            icon={<UserIcon />}
            label="Member Since"
            value={formatDate(userInfo.memberSince)}
          />
          <InfoItem
            icon={<ClockIcon />}
            label="Last Access"
            value={formatDate(userInfo.lastAccessTime)}
          />
          <InfoItem
            icon={<StarIcon />}
            label="Level"
            value={userInfo.currentLevel.toString()}
          />
          <InfoItem
            icon={<GemIcon />}
            label="Star Gems"
            value={userInfo.starGemCount.toString()}
          />
        </div>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <TrendingUpIcon className="w-4 h-4" />
            <span className="text-sm font-medium">Level Progress</span>
          </div>
          <ProgressBar progress={userInfo.currentLevelCompletePercent} />
        </div>
      </div>
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
