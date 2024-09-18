'use client';

import { CatalogItem } from '@/components/habbo/catalog/catalog-item';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import type { CatalogItem as CatalogItemType } from '@/types/habbo';

interface CatalogCategoryProps {
  category: string;
  items: CatalogItemType[];
}

export function CatalogCategory({ category, items }: CatalogCategoryProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{category}</CardTitle>
        <CardDescription>
          {category === 'Rares'
            ? 'Catalogue Rares'
            : category === 'Mega Rares'
              ? 'Mega rares! OMG!'
              : category === 'Funky Friday'
                ? 'Funky friday catalogue items'
                : 'Habbo Club monthly items'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Separator className="mb-4" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {items.map((item, index) => (
            <CatalogItem key={index} item={item} category={category} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
