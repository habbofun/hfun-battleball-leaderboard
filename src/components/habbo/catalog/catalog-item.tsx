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
      <div className="text-left">
        <h3 className="font-bold">{item.name}</h3>
        <p className="text-sm text-muted-foreground">{item.description}</p>
      </div>
      <div className="flex items-center">
        <span className="font-bold mr-2">{item.price || 'N/A'}</span>
        <Image
          src={item.imageUrl || '/catalog/vip.png'}
          alt="Currency"
          width={42}
          height={32}
        />
      </div>
    </Button>
  );
}
