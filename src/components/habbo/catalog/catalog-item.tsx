import Image from 'next/image';
import Link from 'next/link';

import { PriceDisplay } from '@/components/habbo/catalog/price-display';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import type { CatalogItem as CatalogItemType } from '@/types/habbo';

interface CatalogItemProps {
  item: CatalogItemType;
  category: string;
}

export function CatalogItem({ item, category }: CatalogItemProps) {
  return (
    <Link href={`/catalog/item/${encodeURIComponent(item.name)}`} passHref>
      <Button
        variant="ghost"
        className="w-full justify-between h-auto p-4 cursor-pointer"
      >
        <div className="flex items-center w-full">
          <div className="flex items-center flex-grow overflow-hidden">
            <div className="w-[64px] h-[64px] mr-4 flex-shrink-0 relative">
              {item.imageUrl && (
                <Image
                  src={item.imageUrl || '/catalog/missing.png'}
                  alt={item.name}
                  fill
                  sizes="64px"
                  className="object-contain"
                />
              )}
            </div>
            <div className="text-left min-w-0">
              <h3 className="font-bold truncate">{item.name}</h3>
              <p className="text-sm text-muted-foreground truncate">
                {item.description}
              </p>
              <Badge variant="secondary" className="mt-1">
                {category}
              </Badge>
            </div>
          </div>
          <div className="flex items-center flex-shrink-0 ml-2">
            <PriceDisplay price={item.price} />
          </div>
        </div>
      </Button>
    </Link>
  );
}
