import { CompareCatalogItems } from '@/components/habbo/catalog/compare/compare-items';
import { fetchCatalogData } from '@/data/catalogData';

export default async function ComparePageWrapper() {
  const catalogData = await fetchCatalogData();

  return (
    <div className="container mx-auto p-4">
      <CompareCatalogItems catalogData={catalogData} />
    </div>
  );
}
