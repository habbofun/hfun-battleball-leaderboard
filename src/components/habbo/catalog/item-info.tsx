'use client';

import Image from 'next/image';

import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import { ConfirmationAlert } from '@/components/confirmation/confirmation-alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CatalogItem } from '@/types/habbo';

// Mock data for the chart
const chartData = [
  { name: 'Jan', value: 1.5 },
  { name: 'Feb', value: 1.8 },
  { name: 'Mar', value: 2.0 },
  { name: 'Apr', value: 2.0 },
  { name: 'May', value: 1.9 },
  { name: 'Jun', value: 1.8 },
];

interface ItemInfoProps {
  selectedItem: CatalogItem | null;
  onDeselect: () => void;
}

export function ItemInfo({ selectedItem, onDeselect }: ItemInfoProps) {
  return (
    <Card className="mt-8">
      <CardHeader>
        <CardTitle>Item Info</CardTitle>
        {selectedItem && (
          <ConfirmationAlert
            message="Are you sure you want to deselect this item?"
            onConfirm={onDeselect}
            trigger={
              <Button variant="destructive" size="sm" className="mt-2">
                Deselect Item
              </Button>
            }
          />
        )}
      </CardHeader>
      <CardContent>
        {selectedItem ? (
          <>
            <div className="flex items-center mb-4">
              {selectedItem.itemImageUrl && (
                <Image
                  src={selectedItem.itemImageUrl}
                  alt={selectedItem.name}
                  className="mr-4 object-contain"
                  width={64}
                  height={64}
                />
              )}
              <h2 className="text-2xl font-bold">{selectedItem.name}</h2>
            </div>
            <p className="mb-4">{selectedItem.description}</p>
            <div className="h-[200px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="hsl(var(--primary))"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              The values provided are a guideline. While the nature of a
              shifting market means that no fansite/individual can provide
              entirely accurate values, we aim to offer the most accurate
              listings based on market rates. We recommend a leeway of up to
              20%+- above and below each item to account for potential market
              volatility at any time.
            </p>
          </>
        ) : (
          <p>Select an item to view details</p>
        )}
      </CardContent>
    </Card>
  );
}
