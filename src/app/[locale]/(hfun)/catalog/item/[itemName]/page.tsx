import dynamic from 'next/dynamic';
import Image from 'next/image';
import { notFound } from 'next/navigation';

import { BackToCatalogButton } from '@/components/habbo/catalog/back-to-catalog-button';
import { PriceDisplay } from '@/components/habbo/catalog/price-display';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { fetchCatalogData } from '@/server/actions/catalog/fetch-catalog-data';
import type { CatalogItem } from '@/types/habbo';

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

  // Find the item and its category in the catalog data
  let item: CatalogItem | undefined;
  let itemCategory: string | undefined;

  for (const [category, items] of Object.entries(catalogData)) {
    item = items.find(
      (i: CatalogItem) => i.name === decodeURIComponent(itemName),
    );
    if (item) {
      itemCategory = category;
      break;
    }
  }

  if (!item) {
    notFound();
  }

  return (
    <div className="container mx-auto p-4">
      <BackToCatalogButton />
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>{item.name}</CardTitle>
            {itemCategory && (
              <Badge variant="secondary" className="ml-2">
                {itemCategory}
              </Badge>
            )}
          </div>
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
              <div className="font-bold mt-2 flex items-center">
                <PriceDisplay price={item.price} />
              </div>
              {item.releaseDate && (
                <p className="text-sm text-muted-foreground mt-1">
                  Released: {new Date(item.releaseDate).toLocaleDateString()}
                </p>
              )}
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
