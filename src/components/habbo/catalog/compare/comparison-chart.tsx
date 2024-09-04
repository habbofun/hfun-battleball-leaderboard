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

import { CatalogItem } from '@/types/habbo';

interface ComparisonChartProps {
  items: CatalogItem[];
}

export function ComparisonChart({ items }: ComparisonChartProps) {
  const combinedData = items[0].priceHistory.map((entry, index) => ({
    date: entry.date,
    [items[0].name]: entry.price,
    [items[1].name]: items[1].priceHistory[index].price,
  }));

  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={combinedData}>
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey={items[0].name} stroke="#8884d8" />
        <Line type="monotone" dataKey={items[1].name} stroke="#82ca9d" />
      </LineChart>
    </ResponsiveContainer>
  );
}
