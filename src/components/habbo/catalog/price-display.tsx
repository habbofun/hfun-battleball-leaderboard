import Image from 'next/image';

interface PriceDisplayProps {
  price: number;
}

export function PriceDisplay({ price }: PriceDisplayProps) {
  return (
    <span className="font-bold whitespace-nowrap flex items-center">
      {price === 0 ? (
        'N/A'
      ) : (
        <>
          {price}
          <Image
            src="/catalog/vip.png"
            alt="VIP"
            width={24}
            height={24}
            className="inline-block ml-1"
          />
        </>
      )}
    </span>
  );
}
