import { CompareCatalogItems } from '@/components/habbo/catalog/compare/compare-items';
import { BackButton } from '@/components/ui/back-to-button';
import { fetchCatalogData } from '@/server/actions/catalog/fetch-catalog-data';

export default async function ComparePageWrapper() {
  const catalogData = await fetchCatalogData();

  return (
    <div className="container mx-auto p-4">
      <BackButton href="/catalog" text="catalog" />
      <CompareCatalogItems catalogData={catalogData} />
    </div>
  );
}
