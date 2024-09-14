'use client';

import { useEffect, useState } from 'react';

import Image from 'next/image';

import { HabboStaff, HobbaGroup } from '@prisma/client';
import { ClockIcon, GemIcon, StarIcon, UserIcon } from 'lucide-react';

import { CountdownTimer } from '@/components/habbo/leaderboard/countdown-timer';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
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

  // Sort staff members alphabetically within each group
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
    <div className="flex flex-col items-center">
      <div className="w-full max-w-4xl">
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
              <div key={group} className="mb-8">
                <h2 className="text-2xl font-bold mb-4 flex items-center">
                  {group === 'GOLD' ? (
                    <GemIcon className="mr-2 text-yellow-500 w-6 h-6" />
                  ) : (
                    <StarIcon className="mr-2 text-gray-400 w-6 h-6" />
                  )}
                  {group}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {groupedStaff[group].map((member) => (
                    <Card key={member.id} className="overflow-hidden">
                      <CardContent className="p-4">
                        <div className="flex justify-between items-center mb-2">
                          <h3 className="font-bold text-lg">{member.name}</h3>
                          <Badge
                            variant={
                              isOnline(member.lastOnline)
                                ? 'success'
                                : 'secondary'
                            }
                          >
                            {isOnline(member.lastOnline) ? 'Online' : 'Offline'}
                          </Badge>
                        </div>
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
                          <div className="flex-grow">
                            <div className="flex items-center text-sm text-muted-foreground mb-1">
                              <ClockIcon className="w-6 h-6 mr-2" />
                              <span>
                                {isOnline(member.lastOnline)
                                  ? 'Online Now'
                                  : `Last Online: ${new Date(member.lastOnline).toLocaleString()}`}
                              </span>
                            </div>
                            <div className="flex items-center text-sm text-muted-foreground">
                              <UserIcon className="w-6 h-6 mr-2" />
                              <span>
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
    </div>
  );
}
