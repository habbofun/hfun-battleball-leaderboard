import { CatalogTabs } from '@/components/habbo/catalog/catalog-tabs';
import { fetchCatalogData } from '@/data/catalogData';

export default async function CatalogPage() {
  const catalogData = await fetchCatalogData();

  return (
    <div className="container mx-auto p-4">
      <div className="bg-yellow-600 text-white p-4 rounded-md mb-4">
        <p className="text-sm">Warning: The chart data is yet test data.</p>
      </div>
      <CatalogTabs catalogData={catalogData} />
    </div>
  );
}
