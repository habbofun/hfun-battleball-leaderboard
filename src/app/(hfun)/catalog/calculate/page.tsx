import { BackToCatalogButton } from '@/components/habbo/catalog/back-to-catalog-button';
import TradingCalculator from '@/components/habbo/catalog/calculate/trading-calculator';
import { fetchCatalogData } from '@/data/catalog-data';

export default async function TradePage() {
  const catalogData = await fetchCatalogData();

  return (
    <div className="container mx-auto p-4">
      <BackToCatalogButton />
      <TradingCalculator catalogData={catalogData} />
    </div>
  );
}
