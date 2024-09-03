import { CatalogTabs } from '@/components/habbo/catalog/catalog-tabs';
import { fetchCatalogData } from '@/data/catalogData';

export default async function CatalogPage() {
  const catalogData = await fetchCatalogData();

  return (
    <div className="container mx-auto p-4">
      <CatalogTabs catalogData={catalogData} />
    </div>
  );
}
