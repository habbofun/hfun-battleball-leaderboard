'use server';

import { cache } from 'react';

import { prisma } from '@/lib/db';
import type { CatalogData, CatalogItem } from '@/types/habbo';

const CACHE_DURATION = 60 * 60 * 1000;

let cachedData: CatalogData | null = null;
let lastFetchTime = 0;

export const fetchCatalogData = cache(
  async (page = 1, pageSize = 50): Promise<CatalogData> => {
    const currentTime = Date.now();

    if (cachedData && currentTime - lastFetchTime < CACHE_DURATION) {
      return cachedData;
    }

    try {
      const items = await prisma.catalogItem.findMany({
        include: {
          priceHistory: {
            orderBy: {
              date: 'asc',
            },
          },
        },
        skip: (page - 1) * pageSize,
        take: pageSize,
      });

      const catalogData: CatalogData = {};

      items.forEach((item) => {
        if (!catalogData[item.category]) {
          catalogData[item.category] = [];
        }

        const catalogItem: CatalogItem = {
          name: item.name,
          description: item.description,
          price: item.price,
          imageUrl: item.imageUrl,
          priceHistory:
            item.priceHistory.length > 0
              ? item.priceHistory.map((history) => ({
                  date: history.date.toISOString().split('T')[0],
                  price: history.price,
                }))
              : [],
          releaseDate: item.releaseDate
            ? new Date(item.releaseDate)
            : undefined,
        };

        catalogData[item.category].push(catalogItem);
      });

      cachedData = catalogData;
      lastFetchTime = currentTime;

      return catalogData;
    } catch (error) {
      throw new Error('Failed to fetch catalog data');
    }
  },
);
