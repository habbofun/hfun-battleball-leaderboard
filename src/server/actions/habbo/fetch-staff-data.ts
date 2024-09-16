'use server';

import { cache } from 'react';

import { HabboStaff } from '@prisma/client';

import { prisma } from '@/lib/db';

const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

let cachedData: HabboStaff[] | null = null;
let lastFetchTime = 0;

export const fetchStaffData = cache(
  async (): Promise<{
    staff: HabboStaff[];
    nextUpdateIn: number;
  }> => {
    const currentTime = Date.now();

    if (cachedData && currentTime - lastFetchTime < CACHE_DURATION) {
      return {
        staff: cachedData,
        nextUpdateIn: CACHE_DURATION - (currentTime - lastFetchTime),
      };
    }

    try {
      const staff = await prisma.habboStaff.findMany({
        orderBy: { lastOnline: 'desc' },
      });

      cachedData = staff;
      lastFetchTime = currentTime;

      return { staff, nextUpdateIn: CACHE_DURATION };
    } catch (error) {
      throw new Error('Failed to fetch staff data');
    }
  },
);
