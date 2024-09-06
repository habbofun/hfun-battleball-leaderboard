import dynamic from 'next/dynamic';
import Image from 'next/image';
import { notFound } from 'next/navigation';

import { BackToCatalogButton } from '@/components/habbo/catalog/back-to-catalog-button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { fetchCatalogData } from '@/data/catalogData';
import { CatalogItem } from '@/types/habbo.d';

// Dynamically import the chart component with SSR disabled
const DynamicItemChart = dynamic(
  () => import('@/components/habbo/catalog/item-chart'),
  {
    ssr: false,
    loading: () => <p>Loading chart...</p>,
  },
);

export default async function ItemPage({
  params,
}: {
  params: { itemName: string };
}) {
  const { itemName } = params;
  const catalogData = await fetchCatalogData();

  // Find the item in the catalog data
  const item = Object.values(catalogData)
    .flat()
    .find((item: CatalogItem) => item.name === decodeURIComponent(itemName));

  if (!item) {
    notFound();
  }

  return (
    <div className="container mx-auto p-4">
      <BackToCatalogButton />
      <Card>
        <CardHeader>
          <CardTitle>{item.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center mb-4">
            {item.imageUrl && (
              <Image
                src={item.imageUrl}
                alt={item.name}
                className="mr-4 object-contain"
                width={64}
                height={64}
              />
            )}
            <div>
              <p className="text-sm text-muted-foreground">
                {item.description}
              </p>
              <p className="font-bold mt-2">Price: {item.price} VIP</p>
            </div>
          </div>
          {item.priceHistory && (
            <DynamicItemChart priceHistory={item.priceHistory} />
          )}
          <p className="mt-4 text-sm text-muted-foreground">
            Los valores proporcionados son orientativos. Aunque la naturaleza de
            un mercado cambiante hace que ninguna fansite ni ninguna persona
            pueda ofrecer valores totalmente exactos, nuestro objetivo es
            ofrecer los listados más precisos basados en los precios de mercado.
            Recomendamos un margen de hasta un 20% por encima y por debajo de
            cada artículo para tener en cuenta la posible volatilidad del
            mercado en cualquier momento.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
