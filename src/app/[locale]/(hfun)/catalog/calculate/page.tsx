import TradingCalculator from '@/components/habbo/catalog/calculate/trading-calculator';
import { BackButton } from '@/components/ui/back-to-button';
import { fetchCatalogData } from '@/server/actions/catalog/fetch-catalog-data';

export default async function TradePage() {
  const catalogData = await fetchCatalogData();

  return (
    <div className="container mx-auto p-4">
      <BackButton href="/catalog" text="catalog" />
      <TradingCalculator catalogData={catalogData} />
    </div>
  );
}
