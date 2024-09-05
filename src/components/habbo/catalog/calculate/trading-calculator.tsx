'use client';

import { useCallback, useEffect, useState } from 'react';

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
import { CatalogData, CatalogItem } from '@/types/habbo';

interface TradingCalculatorProps {
  catalogData: CatalogData;
}

export function TradingCalculator({ catalogData }: TradingCalculatorProps) {
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
    <Card>
      <CardHeader>
        <CardTitle>Trading Calculator</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Input
              id="quantity1"
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              value={quantity1}
              onChange={handleQuantityChange}
              className="w-16 text-center"
            />
            <span className="font-medium">x</span>
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
          <span className="text-2xl font-bold mx-4">=</span>
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
          <div className="mt-6 p-4 bg-secondary rounded-lg">
            <p className="text-lg font-semibold mb-2">Trade Result:</p>
            <div className="flex items-center space-x-2">
              <Image
                src={item1.itemImageUrl || '/catalog/missing.png'}
                alt={item1.name}
                width={32}
                height={32}
                className="mr-2"
              />
              <span className="font-medium">
                {quantity1} x {item1.name}
              </span>
            </div>
            <div className="flex items-center my-2">
              <span className="text-2xl font-bold mx-4">=</span>
            </div>
            <div className="flex items-center space-x-2">
              <Image
                src={item2.itemImageUrl || '/catalog/missing.png'}
                alt={item2.name}
                width={32}
                height={32}
                className="mr-2"
              />
              <span className="font-medium">
                {result} x {item2.name}
              </span>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              Total VIP value: {item1.price * parseInt(quantity1)}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
