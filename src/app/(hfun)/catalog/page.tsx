import { CatalogTabs } from '@/components/habbo/catalog/catalog-tabs';
import { CatalogData } from '@/types/habbo';

// Update the catalogData declaration
const catalogData: CatalogData = {
  Rares: [
    {
      name: 'DRAGON EGG',
      description: 'The stuff of legend',
      price: 1.75,
      currencyImageUrl: '/catalog/vip.png',
    },
    {
      name: 'BLUE BIRD BATH',
      description: 'For our feathered friends',
      price: 1.0,
      currencyImageUrl: '/catalog/vip.png',
    },
    { name: 'HOLO-GIRL', description: "You're her only hope...", price: 0.7 },
    {
      name: 'RED LASER DOOR',
      description: 'Energy beams. No trespassers!',
      price: 0.5,
    },
  ],
  'Mega Rares': [
    {
      name: 'TYPEWRITER',
      description: 'Write that bestseller',
      price: 950,
      itemImageUrl: '/catalog/mega-rare/typewriter.png',
    },
    {
      name: 'BRONZE HABBO TROPHY',
      description: 'Bronze Habbo Trophy',
      price: 0,
    },
    { name: 'SILVER DRAGON', description: 'N/A', price: 0 },
  ],
  'Funky Friday': [
    { name: 'FF: 2X2 TABLE', description: 'Hip plastic furniture', price: 20 },
    {
      name: 'FF POD/CHAIR',
      description: 'SEE #PRICEUPDATES ON DISCORD FOR EACH VALUE',
      price: 10,
    },
  ],
  'HC Rares': [
    {
      name: 'HC SOFA',
      description: 'Exclusive Habbo Club furniture',
      price: 15,
    },
    { name: 'HC LAMP', description: 'Illuminate your HC room', price: 8 },
  ],
};

export default function CatalogPage() {
  return (
    <div className="container mx-auto p-4">
      <CatalogTabs catalogData={catalogData} />
    </div>
  );
}
