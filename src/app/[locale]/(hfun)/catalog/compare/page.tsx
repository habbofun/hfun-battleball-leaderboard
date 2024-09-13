import { BackToCatalogButton } from '@/components/habbo/catalog/back-to-catalog-button';
import { CompareCatalogItems } from '@/components/habbo/catalog/compare/compare-items';
import { fetchCatalogData } from '@/server/actions/catalog/fetch-catalog-data';

export default async function ComparePageWrapper() {
  const catalogData = await fetchCatalogData();

  return (
    <div className="container mx-auto p-4">
      <BackToCatalogButton />
      <CompareCatalogItems catalogData={catalogData} />
    </div>
  );
}
