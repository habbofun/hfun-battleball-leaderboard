import React from 'react';

import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import { ChartContainer, ChartTooltip } from '@/components/ui/chart';
import { CatalogItem } from '@/types/habbo';

interface CatalogChartProps {
  selectedItem: CatalogItem | null;
}

export function CatalogChart({ selectedItem }: CatalogChartProps) {
  if (!selectedItem || !selectedItem.priceHistory) {
    return null;
  }

  const chartConfig = {
    price: {
      label: 'Price',
      color: 'hsl(var(--primary))',
    },
  };

  return (
    <ChartContainer config={chartConfig} className="h-[200px] w-full mt-4">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={selectedItem.priceHistory}>
          <XAxis dataKey="date" />
          <YAxis />
          <ChartTooltip />
          <Line
            type="monotone"
            dataKey="price"
            stroke="var(--color-price)"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}
