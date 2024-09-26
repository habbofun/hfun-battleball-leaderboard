import TradingCalculator from '@/components/habbo/catalog/calculate/trading-calculator';
import { generateMetadata as generatePageMetadata } from '@/lib/metadata';
import { fetchCatalogData } from '@/server/actions/catalog/fetch-catalog-data';

export async function generateMetadata() {
  return generatePageMetadata({
    description: 'Catalog calculate',
  });
}

export default async function TradePage() {
  const catalogData = await fetchCatalogData();

  return (
    <div className="container mx-auto p-4">
      <TradingCalculator catalogData={catalogData} />
    </div>
  );
}
