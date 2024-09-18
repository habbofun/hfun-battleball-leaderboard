'use client';

import { useEffect, useState } from 'react';

import Link from 'next/link';

import { CatalogCategory } from '@/components/habbo/catalog/catalog-category';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import type { CatalogData, CatalogItem } from '@/types/habbo';

interface CatalogTabsProps {
  catalogData: CatalogData;
}

export function CatalogTabs({ catalogData }: CatalogTabsProps) {
  const [selectedCategory, setSelectedCategory] = useState('Rares');
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredItems, setFilteredItems] = useState<CatalogItem[]>([]);

  useEffect(() => {
    const items = catalogData[selectedCategory];

    if (!items) {
      setFilteredItems([]);
      return;
    }

    const filtered = items.filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()),
    );
    setFilteredItems(filtered);
  }, [selectedCategory, searchTerm, catalogData]);

  return (
    <div className="space-y-4">
      <div className="flex items-end space-x-4">
        <div className="flex-grow">
          <Label htmlFor="item-filter" className="block mb-2">
            Search
          </Label>
          <Input
            id="item-filter"
            placeholder="Enter item name to filter in this category"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
          />
        </div>
        <Link href="/catalog/compare" passHref>
          <Button variant="outline">Compare Items</Button>
        </Link>
        <Link href="/catalog/calculate" passHref>
          <Button>Trading Calculator</Button>
        </Link>
      </div>
      <Tabs
        defaultValue="Rares"
        className="w-full"
        onValueChange={setSelectedCategory}
      >
        <TabsList className="grid w-full grid-cols-4">
          {Object.keys(catalogData).map((category) => (
            <TabsTrigger key={category} value={category}>
              {category}
            </TabsTrigger>
          ))}
        </TabsList>
        {Object.entries(catalogData).map(([category, items]) => (
          <TabsContent key={category} value={category} className="mt-4">
            <CatalogCategory category={category} items={filteredItems} />
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
