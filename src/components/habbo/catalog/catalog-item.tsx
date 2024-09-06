import Image from 'next/image';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { CatalogItem as CatalogItemType } from '@/types/habbo';

interface CatalogItemProps {
  item: CatalogItemType;
}

export function CatalogItem({ item }: CatalogItemProps) {
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
                  className="object-contain"
                />
              )}
            </div>
            <div className="text-left min-w-0">
              <h3 className="font-bold truncate">{item.name}</h3>
              <p className="text-sm text-muted-foreground truncate">
                {item.description}
              </p>
            </div>
          </div>
          <div className="flex items-center flex-shrink-0 ml-2">
            <span className="font-bold mr-2 whitespace-nowrap">
              {item.price} VIP
            </span>
          </div>
        </div>
      </Button>
    </Link>
  );
}
