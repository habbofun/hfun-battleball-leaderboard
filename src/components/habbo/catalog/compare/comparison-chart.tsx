'use client';

import React from 'react';

import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { CatalogItem } from '@/types/habbo';

interface ComparisonChartProps {
  items: CatalogItem[];
}

export function ComparisonChart({ items }: ComparisonChartProps) {
  if (items.some((item) => item.priceHistory.length === 0)) {
    return (
      <div className="h-[200px] w-full mb-4 flex items-center justify-center text-muted-foreground">
        Price history is not available for one or more items
      </div>
    );
  }

  const combinedData = items[0].priceHistory.map((entry, index) => ({
    date: entry.date,
    [items[0].name]: entry.price,
    [items[1].name]: items[1].priceHistory[index].price,
  }));

  const chartConfig = {
    price: {
      label: 'Price',
    },
  };

  return (
    <ChartContainer config={chartConfig} className="h-[200px] w-full mb-4">
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={combinedData}>
          <XAxis dataKey="date" />
          <YAxis />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Legend />
          <Line type="monotone" dataKey={items[0].name} stroke="#8884d8" />
          <Line type="monotone" dataKey={items[1].name} stroke="#82ca9d" />
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}
