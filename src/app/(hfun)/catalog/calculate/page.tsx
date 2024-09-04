import { TradingCalculator } from '@/components/habbo/catalog/calculate/trading-calculator';
import { fetchCatalogData } from '@/data/catalogData';

export default async function TradePage() {
  const catalogData = await fetchCatalogData();

  return (
    <div className="container mx-auto p-4">
      <TradingCalculator catalogData={catalogData} />
    </div>
  );
}
