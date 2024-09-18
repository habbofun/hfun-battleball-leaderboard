'use client';

import React from 'react';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import type { CatalogData, CatalogItem } from '@/types/habbo';

interface ItemSelectorProps {
  onSelect: (item: CatalogItem) => void;
  selectedItems: CatalogItem[];
  catalogData: CatalogData;
}

export function ItemSelector({
  onSelect,
  selectedItems,
  catalogData,
}: ItemSelectorProps) {
  const allItems = Object.values(catalogData).flat();

  return (
    <Select
      onValueChange={(value) =>
        onSelect(allItems.find((item) => item.name === value)!)
      }
    >
      <SelectTrigger>
        <SelectValue placeholder="Select an item" />
      </SelectTrigger>
      <SelectContent>
        {allItems.map((item) => (
          <SelectItem
            key={item.name}
            value={item.name}
            disabled={selectedItems.some((i) => i.name === item.name)}
          >
            {item.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
