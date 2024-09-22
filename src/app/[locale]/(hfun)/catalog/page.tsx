import { Terminal } from 'lucide-react';

import { CatalogTabs } from '@/components/habbo/catalog/catalog-tabs';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { fetchCatalogData } from '@/server/actions/catalog/fetch-catalog-data';

export const revalidate = 3600; // Revalidate every hour

export default async function CatalogPage() {
  const catalogData = await fetchCatalogData();

  return (
    <div className="container mx-auto p-4">
      <Alert className="mb-4">
        <Terminal className="h-4 w-4" />
        <AlertTitle>Heads up!</AlertTitle>
        <AlertDescription>
          This is a beta version of the catalog. Prices may not be accurate.
        </AlertDescription>
      </Alert>
      <CatalogTabs catalogData={catalogData} />
    </div>
  );
}
