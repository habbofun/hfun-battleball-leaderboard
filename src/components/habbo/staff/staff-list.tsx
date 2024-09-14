'use client';

import { useEffect, useState } from 'react';

import Image from 'next/image';

import { HabboStaff, HobbaGroup } from '@prisma/client';
import { ClockIcon, GemIcon, StarIcon, UserIcon } from 'lucide-react';

import { CountdownTimer } from '@/components/habbo/leaderboard/countdown-timer';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { fetchStaffData } from '@/server/actions/habbo/fetch-staff-data';

export function StaffList() {
  const [staff, setStaff] = useState<HabboStaff[]>([]);
  const [nextUpdateIn, setNextUpdateIn] = useState<number>(0);

  const loadStaffData = async () => {
    const { staff, nextUpdateIn } = await fetchStaffData();
    setStaff(staff);
    setNextUpdateIn(nextUpdateIn);
  };

  useEffect(() => {
    loadStaffData();
  }, []);

  const groupedStaff = staff.reduce(
    (acc, member) => {
      if (!acc[member.hobbaGroup]) {
        acc[member.hobbaGroup] = [];
      }
      acc[member.hobbaGroup].push(member);
      return acc;
    },
    {} as Record<HobbaGroup, HabboStaff[]>,
  );

  Object.keys(groupedStaff).forEach((group) => {
    groupedStaff[group as HobbaGroup].sort((a, b) =>
      a.name.localeCompare(b.name),
    );
  });

  const isOnline = (lastOnline: Date) => {
    const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);
    return new Date(lastOnline) > fiveMinutesAgo;
  };

  const orderedGroups: HobbaGroup[] = ['GOLD', 'SILVER'];

  return (
    <div className="space-y-8">
      <CountdownTimer
        initialSeconds={nextUpdateIn / 1000}
        totalSeconds={300}
        onComplete={loadStaffData}
        label="Staff list updates in:"
        tooltipContent={
          <p>
            This timer shows when the staff list will be refreshed with the
            latest data from our database.
          </p>
        }
        toastMessage="Staff list updated!"
      />
      {orderedGroups.map(
        (group) =>
          groupedStaff[group] &&
          groupedStaff[group].length > 0 && (
            <div key={group} className="space-y-4">
              <h2 className="text-2xl font-bold flex items-center">
                {group === 'GOLD' ? (
                  <GemIcon className="mr-2 text-yellow-500 w-6 h-6" />
                ) : (
                  <StarIcon className="mr-2 text-gray-400 w-6 h-6" />
                )}
                {group}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {groupedStaff[group].map((member) => (
                  <Card key={member.id}>
                    <CardHeader className="pb-2">
                      <CardTitle className="flex justify-between items-center">
                        <span>{member.name}</span>
                        <Badge
                          variant={
                            isOnline(member.lastOnline)
                              ? 'success'
                              : 'secondary'
                          }
                        >
                          {isOnline(member.lastOnline) ? 'Online' : 'Offline'}
                        </Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center space-x-4">
                        <div className="relative w-24 h-32 flex-shrink-0">
                          <Image
                            src={member.imageUrl}
                            alt={member.name}
                            fill
                            style={{ objectFit: 'contain' }}
                            className="rounded-lg"
                          />
                        </div>
                        <div className="flex-grow space-y-2">
                          <div className="flex items-center text-sm text-muted-foreground">
                            <ClockIcon className="w-4 h-4 mr-2 flex-shrink-0" />
                            <span className="truncate">
                              {isOnline(member.lastOnline)
                                ? 'Online Now'
                                : `Last Online: ${new Date(member.lastOnline).toLocaleString()}`}
                            </span>
                          </div>
                          <div className="flex items-center text-sm text-muted-foreground">
                            <UserIcon className="w-4 h-4 mr-2 flex-shrink-0" />
                            <span className="truncate">
                              Member Since:{' '}
                              {new Date(
                                member.accountCreatedAt,
                              ).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ),
      )}
    </div>
  );
}
