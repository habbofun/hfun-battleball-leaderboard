'use client';

import { Line, LineChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';

interface ItemChartProps {
  priceHistory: { date: string; price: number }[];
}

export default function ItemChart({ priceHistory }: ItemChartProps) {
  const chartConfig = {
    price: {
      label: 'Price',
      color: 'hsl(var(--primary))',
    },
  };

  return (
    <ChartContainer config={chartConfig} className="h-[200px] w-full mb-4">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={priceHistory}>
          <XAxis dataKey="date" />
          <YAxis />
          <ChartTooltip content={<ChartTooltipContent />} />
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
