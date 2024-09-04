import Image from 'next/image';

import { Button } from '@/components/ui/button';
import { CatalogItem as CatalogItemType } from '@/types/habbo';

interface CatalogItemProps {
  item: CatalogItemType;
  isSelected: boolean;
  onClick: () => void;
}

export function CatalogItem({ item, isSelected, onClick }: CatalogItemProps) {
  return (
    <Button
      variant={isSelected ? 'secondary' : 'ghost'}
      className="w-full justify-between h-auto p-4 cursor-pointer"
      onClick={onClick}
    >
      <div className="flex items-center w-full">
        <div className="flex items-center flex-grow overflow-hidden">
          {item.itemImageUrl && (
            <Image
              src={item.itemImageUrl || '/catalog/missing.png'}
              alt={item.name}
              width={42}
              height={42}
              className="mr-4 flex-shrink-0"
            />
          )}
          <div className="text-left min-w-0">
            <h3 className="font-bold truncate">{item.name}</h3>
            <p className="text-sm text-muted-foreground truncate">
              {item.description}
            </p>
          </div>
        </div>
        <div className="flex items-center flex-shrink-0 ml-2">
          <span className="font-bold mr-2 whitespace-nowrap">
            {item.price || 'N/A'}
          </span>
          <Image
            src={'/catalog/vip.png'}
            alt="Currency"
            width={32}
            height={24}
            className="flex-shrink-0"
          />
        </div>
      </div>
    </Button>
  );
}
