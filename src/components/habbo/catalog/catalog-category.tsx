'use client';

import { useState } from 'react';

import { CatalogItem } from '@/components/habbo/catalog/catalog-item';
import { ItemInfo } from '@/components/habbo/catalog/item-info';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { CatalogItem as CatalogItemType } from '@/types/habbo';

interface CatalogCategoryProps {
  category: string;
  items: CatalogItemType[];
}

export function CatalogCategory({ category, items }: CatalogCategoryProps) {
  const [selectedItem, setSelectedItem] = useState<CatalogItemType | null>(
    null,
  );

  const handleItemClick = (item: CatalogItemType) => {
    setSelectedItem(item);
  };

  const handleDeselectItem = () => {
    setSelectedItem(null);
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>{category}</CardTitle>
          <CardDescription>
            {category === 'Rares'
              ? 'Catalogue Rares'
              : category === 'Super Rares'
                ? 'Super rares! omg!'
                : category === 'Funky Friday'
                  ? 'Funky friday catalogue items'
                  : 'Habbo Club monthly rares'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {items.map((item, index) => (
              <CatalogItem
                key={index}
                item={item}
                isSelected={selectedItem?.name === item.name}
                onClick={() => handleItemClick(item)}
              />
            ))}
          </div>
        </CardContent>
      </Card>
      <ItemInfo selectedItem={selectedItem} onDeselect={handleDeselectItem} />
    </>
  );
}
