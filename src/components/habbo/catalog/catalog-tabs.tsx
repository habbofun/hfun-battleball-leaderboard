'use client';

import { useState } from 'react';

import { CatalogCategory } from '@/components/habbo/catalog/catalog-category';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CatalogData } from '@/types/habbo';

interface CatalogTabsProps {
  catalogData: CatalogData;
}

export function CatalogTabs({ catalogData }: CatalogTabsProps) {
  const [selectedCategory, setSelectedCategory] = useState('Rares');

  return (
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
          <CatalogCategory category={category} items={items} />
        </TabsContent>
      ))}
    </Tabs>
  );
}
