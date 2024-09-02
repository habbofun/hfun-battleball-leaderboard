import { PageHeader } from "@/components/page-header";

export default function CatalogPage() {
    return (
        <div className="flex flex-col min-h-screen bg-background text-foreground">
            <PageHeader />
            <main className="flex-grow flex flex-col justify-center items-center space-y-4 px-4">
                <h1>Catalog</h1>
            </main>
        </div>
    );
}
