'use client';

import React, { useCallback, useEffect, useState } from 'react';

import Image from 'next/image';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import type { CatalogData, CatalogItem } from '@/types/habbo';

interface TradingCalculatorProps {
  catalogData: CatalogData;
}

export default function TradingCalculator({
  catalogData,
}: TradingCalculatorProps) {
  const [item1, setItem1] = useState<CatalogItem | null>(null);
  const [item2, setItem2] = useState<CatalogItem | null>(null);
  const [quantity1, setQuantity1] = useState<string>('1');
  const [result, setResult] = useState<number | null>(null);

  const allItems = Object.values(catalogData).flat();

  const calculateTrade = useCallback(() => {
    const parsedQuantity = parseInt(quantity1);
    if (item1 && item2 && parsedQuantity > 0) {
      const totalVips = item1.price * parsedQuantity;
      const resultQuantity = totalVips / item2.price;
      setResult(Number(resultQuantity.toFixed(2)));
    } else {
      setResult(null);
    }
  }, [item1, item2, quantity1]);

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '' || /^\d+$/.test(value)) {
      setQuantity1(value);
    }
  };

  useEffect(() => {
    calculateTrade();
  }, [item1, item2, quantity1, calculateTrade]);

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-center">Trading Calculator</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4 items-end">
            <div className="w-full sm:w-1/3">
              <label
                htmlFor="quantity1"
                className="block text-sm font-medium mb-1"
              >
                Quantity
              </label>
              <Input
                id="quantity1"
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                value={quantity1}
                onChange={handleQuantityChange}
                className="w-full text-center"
              />
            </div>
            <div className="w-full sm:w-2/3">
              <label htmlFor="item1" className="block text-sm font-medium mb-1">
                Item 1
              </label>
              <Select
                onValueChange={(value) =>
                  setItem1(allItems.find((item) => item.name === value) || null)
                }
              >
                <SelectTrigger id="item1">
                  <SelectValue placeholder="Select item 1" />
                </SelectTrigger>
                <SelectContent>
                  {allItems.map((item) => (
                    <SelectItem key={item.name} value={item.name}>
                      {item.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex justify-center items-center">
            <span className="text-2xl font-bold">=</span>
          </div>

          <div className="w-full">
            <label htmlFor="item2" className="block text-sm font-medium mb-1">
              Item 2
            </label>
            <Select
              onValueChange={(value) =>
                setItem2(allItems.find((item) => item.name === value) || null)
              }
            >
              <SelectTrigger id="item2">
                <SelectValue placeholder="Select item 2" />
              </SelectTrigger>
              <SelectContent>
                {allItems.map((item) => (
                  <SelectItem key={item.name} value={item.name}>
                    {item.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {result !== null && item1 && item2 && (
            <div className="mt-8 p-4 bg-secondary rounded-lg">
              <h3 className="text-lg font-semibold mb-4">Trade Result:</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Image
                      src={item1.imageUrl || '/catalog/missing.png'}
                      alt={item1.name}
                      width={32}
                      height={32}
                    />
                    <span className="font-medium">
                      {quantity1} x {item1.name}
                    </span>
                  </div>
                  <span className="text-xl font-bold">=</span>
                  <div className="flex items-center space-x-2">
                    <Image
                      src={item2.imageUrl || '/catalog/missing.png'}
                      alt={item2.name}
                      width={32}
                      height={32}
                    />
                    <span className="font-medium">
                      {result} x {item2.name}
                    </span>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground text-center">
                  Total VIP value: {item1.price * parseInt(quantity1)}
                </p>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
