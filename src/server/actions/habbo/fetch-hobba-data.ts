'use server';

import { cache } from 'react';

import { Hobba } from '@prisma/client';

import { prisma } from '@/lib/db';

const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

let cachedData: Hobba[] | null = null;
let lastFetchTime = 0;

export const fetchHobbaData = cache(
  async (): Promise<{
    hobbas: Hobba[];
    nextUpdateIn: number;
  }> => {
    const currentTime = Date.now();

    if (cachedData && currentTime - lastFetchTime < CACHE_DURATION) {
      return {
        hobbas: cachedData,
        nextUpdateIn: CACHE_DURATION - (currentTime - lastFetchTime),
      };
    }

    try {
      const hobbas = await prisma.hobba.findMany({
        orderBy: { lastOnline: 'desc' },
      });

      cachedData = hobbas;
      lastFetchTime = currentTime;

      return { hobbas, nextUpdateIn: CACHE_DURATION };
    } catch (error) {
      throw new Error('Failed to fetch hobba data');
    }
  },
);
