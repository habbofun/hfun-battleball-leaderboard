import { CompareCatalogItems } from '@/components/habbo/catalog/compare/compare-items';
import { generateMetadata as generatePageMetadata } from '@/lib/metadata';
import { fetchCatalogData } from '@/server/actions/catalog/fetch-catalog-data';

export async function generateMetadata() {
  return generatePageMetadata({
    description: 'Catalog compare',
  });
}

export default async function ComparePageWrapper() {
  const catalogData = await fetchCatalogData();

  return (
    <div className="container mx-auto p-4">
      <CompareCatalogItems catalogData={catalogData} />
    </div>
  );
}
