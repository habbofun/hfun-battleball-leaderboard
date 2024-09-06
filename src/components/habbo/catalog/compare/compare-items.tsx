'use client';

import React, { useState } from 'react';

import Image from 'next/image';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CatalogData, CatalogItem } from '@/types/habbo';

import { ComparisonChart } from './comparison-chart';
import { ItemSelector } from './item-selector';

interface CompareCatalogItemsProps {
  catalogData: CatalogData;
}

export function CompareCatalogItems({ catalogData }: CompareCatalogItemsProps) {
  const [selectedItems, setSelectedItems] = useState<CatalogItem[]>([]);

  const handleItemSelect = (item: CatalogItem) => {
    if (selectedItems.length < 2) {
      setSelectedItems([...selectedItems, item]);
    } else {
      setSelectedItems([selectedItems[1], item]);
    }
  };

  return (
    <Card className="mt-8">
      <CardHeader>
        <CardTitle>Compare Items</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <ItemSelector
            onSelect={handleItemSelect}
            selectedItems={selectedItems}
            catalogData={catalogData}
          />
          <ItemSelector
            onSelect={handleItemSelect}
            selectedItems={selectedItems}
            catalogData={catalogData}
          />
        </div>
        {selectedItems.length > 0 && (
          <div className="flex items-center justify-center space-x-4 mb-4">
            {selectedItems.map((item, index) => (
              <div key={index} className="flex items-center">
                <Image
                  src={item.imageUrl || '/catalog/missing.png'}
                  alt={item.name}
                  width={32}
                  height={32}
                  className="mr-2"
                />
                <span>{item.name}</span>
                {index === 0 && selectedItems.length === 2 && (
                  <span className="mx-2">vs</span>
                )}
              </div>
            ))}
          </div>
        )}
        {selectedItems.length === 2 && (
          <ComparisonChart items={selectedItems} />
        )}
      </CardContent>
    </Card>
  );
}
